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
import { fileURLToPath } from "node:url";
const external = [
  "express",
  "path",
  "fs/promises",
  "plugin/PluginBase",
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
];

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

const buildPlugins = pluginPaths
  .map((pluginPath) => {
    const outpath = pluginPath.replace(/^src/, "build").replace(/\.ts$/, ".js");
    const isTs = pluginPath.endsWith(".ts");
    const plugins = isTs
      ? [
        commonjs({
          // Dynamic require used by config/ (imported by MongoDB adapter)
          ignoreDynamicRequires: true,
        }),
        typescript(),
        json(),
      ]
      : [commonjs(), json()];

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
        file: outpath,
        format: "amd",
      },
      plugins,
    };
  });

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
      typescript(),
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
        file: outpath,
        format: "commonjs",
      },
      plugins,
    };
  },
);

// If testing, we should build common files so they can be tested
if (process.env.NODE_ENV === "test") {
  const files = (await readdir("./src/common"))
    .concat(
      (await readdir("./src/routers/Search")).filter((name) =>
        !name.endsWith("/Search.ts") && !name.includes("dashboard")
      ),
    )
    .filter((name) => name.endsWith(".ts") && !name.endsWith(".d.ts"));

  const plugins = [
    commonjs({
      // exclude config
      transformMixedEsModules: true,
      // Dynamic require used by config/ (imported by MongoDB adapter)
      ignoreDynamicRequires: true,
    }),
    typescript(),
    json(),
  ];
  const configs = files
    .map((filename) => ({
      input: filename,
      external,
      output: {
        file: filename.replace(/^src/, "build").replace(/\.ts/, ".js"),
        format: "commonjs",
      },
      plugins,
    }));
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
