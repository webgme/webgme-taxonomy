/**
 * This rollup config builds all the entry points into self-contained files
 * (using the webgme-setup.json)
 */
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import copy from "rollup-plugin-copy";
import fs from "node:fs/promises";
import path from "node:path";
import webgmeSetup from "./webgme-setup.json" assert { type: "json" };
import tsconfig from "./tsconfig.json" assert { type: "json" };
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import assert from "node:assert/strict";

const external = [
  "express",
  "path",
  "fs/promises",
  "oxide.ts",
  "webgme-transformations",
  "assert",
  "webgme",
  "jsonwebtoken",
  "os",
  "fs",
  "zip-a-folder",
  "mongodb",
  "underscore",
  "node-fetch",
  "newtype-ts",
  "stream",
  "util",
  fileURLToPath(
    new URL(
      "config/index.js",
      import.meta.url,
    ),
  ),
  // plugin externals
  "plugin/PluginBase",
  "webgme-json-importer/JSONImporter",
];

// set "include" to be relative to rootDir - not project root. This was the source of a tricky
// bug that only didn't find the metadata.json files when running tsc through rollup...
tsconfig.include = tsconfig.include.map(
  (ptrn) => ptrn.replace(tsconfig.compilerOptions.rootDir + "/", ""),
);
tsconfig.exclude = tsconfig.exclude.map(
  (ptrn) => ptrn.replace(tsconfig.compilerOptions.rootDir + "/", ""),
);

const require = createRequire(import.meta.url);
tsconfig.include.push(
  path.relative(process.cwd(), require.resolve("webgme/package.json")),
);
console.log(tsconfig);

// All regular files will just go through commonjs & typescript
const pluginPaths = await Promise.all(
  Object.keys(webgmeSetup.components.plugins).map(
    async (name) => {
      const paths = [
        path.join("src", "plugins", name, name + ".ts"),
        path.join("src", "plugins", name, name + ".js"),
      ];
      return await asyncFind(paths, exists);
    },
  ),
);

const buildPlugins = await Promise.all(pluginPaths
  .map(async (pluginPath) => {
    const outpath = pluginPath.replace(/^src/, "build").replace(/\.ts$/, ".js");
    const isTs = pluginPath.endsWith(".ts");

    // Determine the target (browser or nodejs) based on server-only execution or not
    const metadataPath = path.dirname(pluginPath) + "/metadata.json";
    const metadata = JSON.parse(await fs.readFile(metadataPath, "utf8"));
    const cjsOpts = {
      // Dynamic require used by config/ (imported by MongoDB adapter)
      ignoreDynamicRequires: true,
    };
    const plugins = isTs
      ? [
        commonjs(cjsOpts),
        typescript(tsconfig),
        json(),
      ]
      : [
        commonjs(cjsOpts),
        json(),
      ];

    if (metadata.disableBrowserSideExecution) {
      console.log("Found nodejs only plugin:", pluginPath);
      // } else {
      //   plugins.unshift(nodeResolve({ resolveOnly: ["oxide.ts"] }));
    }

    plugins.push(
      copy({
        targets: [{
          src: `${path.dirname(pluginPath)}/metadata.json`,
          dest: path.dirname(outpath),
        }],
      }),
    );

    return {
      input: pluginPath,
      external,
      output: {
        sourcemap: true,
        file: outpath,
        format: "amd",
      },
      plugins,
    };
  }));

const buildRouters = Object.entries(webgmeSetup.components.routers).map(
  ([name, info]) => {
    const routerPath = path.join("src", "routers", name, name + ".ts");
    const outpath = `${info.src}/${name}.js`;
    const plugins = [
      commonjs({
        // exclude config
        transformMixedEsModules: true,
        // Dynamic require used by config/ (imported by MongoDB adapter)
        ignoreDynamicRequires: true,
      }),
      typescript(tsconfig),
      json(),
    ];

    if (info.assets) {
      const targets = info.assets.map((dirname) => ({
        src: path.join(path.dirname(routerPath), dirname),
        dest: info.src + "/" + path.dirname(dirname),
      }));
      plugins.push(copy({ targets }));
    }
    return {
      input: routerPath,
      external,
      output: {
        sourcemap: true,
        file: outpath,
        format: "commonjs",
      },
      plugins,
    };
  },
);

// If testing, we should build common files so they can be tested
console.log("NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "test") {
  const files = (await readdir("./src/common"))
    .concat(
      (await readdir("./src/routers/Search")).filter((name) =>
        !name.endsWith("/Search.ts") && !name.includes("dashboard")
      ),
    )
    .filter((name) => !name.endsWith(".d.ts"));
  const [tsFiles, jsFiles] = partition(files, (name) => name.endsWith(".ts"));

  const plugins = [
    commonjs({
      // exclude config
      transformMixedEsModules: true,
      // Dynamic require used by config/ (imported by MongoDB adapter)
      ignoreDynamicRequires: true,
    }),
    typescript(tsconfig),
    json(),
  ];
  const configs = tsFiles
    .map((filename) => ({
      input: filename,
      external,
      output: {
        sourcemap: true,
        file: filename.replace(/^src/, "build").replace(/\.ts/, ".js"),
        format: "commonjs",
      },
      plugins,
    }));

  // Copy over the JS files
  if (jsFiles.length) {
    assert(
      tsFiles.length > 0,
      "Cannot copy over JS files without any ts files",
    );
    const targets = jsFiles.map((filepath) => ({
      src: filepath,
      dest: path.dirname(filepath.replace(/^src/, "build")),
    }));
    configs[0].plugins = configs[0].plugins.concat(copy({ targets }));
  }

  console.log(`About to build ${configs.length} files for testing:`);
  console.log(
    configs.map((cfg) => cfg.output.file).map((name) => "\t" + name).join("\n"),
  );
  buildRouters.push(...configs);
}

export default buildRouters.concat(buildPlugins);

/**
 * Read a directory recursively and return a list of all files
 */
async function readdir(dirname) {
  const names = await fs.readdir(dirname);
  const absPaths = names.map((name) => path.join(dirname, name));
  return (await Promise.all(absPaths.map(async (name) => {
    const stats = fs.stat(name);
    if ((await stats).isDirectory()) {
      return await readdir(name);
    } else {
      return name;
    }
  }))).flat();
}

/**
 * Check that a file path exists.
 */
async function exists(filepath) {
  const exists = await fs.access(filepath)
    .then(() => true)
    .catch((_err) => false);

  return exists;
}

/**
 * Filter a list using an async function
 */
async function asyncFilter(list, fn) {
  const keep = await Promise.all(list.map(fn));
  return list.filter((_item, index) => keep[index]);
}

/**
 * Just like Array.prototype.find but with an async function
 */
async function asyncFind(list, fn) {
  // This is inefficient but fine for now
  const filtered = await asyncFilter(list, fn);
  return filtered[0];
}

/**
 * Partition the given list into 2 using the given partition function.
 *
 * Returns 2 lists: the first containing all items such that f(item) == true and
 * the latter contains all the others.
 */
function partition(list, fn) {
  return list.reduce((partitions, item) => {
    const index = fn(item) ? 0 : 1;
    partitions[index].push(item);
    return partitions;
  }, [[], []]);
}
