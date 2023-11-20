import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import fs from "node:fs/promises";
import path from "node:path";
import webgmeSetup from "./webgme-setup.json" assert { type: "json" };
import { fileURLToPath } from "node:url";
import nodePolyfill from "rollup-plugin-polyfill-node";
import del from "rollup-plugin-delete";

// TODO: common files should be... umd?
// TODO: is tsc already running like before? Is it generating all the files?

// All regular files will just go through commonjs & typescript
const pluginFiles = Object.keys(webgmeSetup.components.plugins)
  .filter((n) => n === "ExportToJSONSchema" && false)
  .map((name) => ({
    input: `src/plugins/${name}/${name}.ts`,
    output: {
      file: `build/plugins/${name}/${name}.js`,
      format: "amd",
    },
    plugins: [
      commonjs(),
      typescript(),
      json(),
    ],
  }));

async function exists(filepath) {
  const exists = await fs.access(filepath)
    .then(() => true)
    .catch((_err) => false);

  return exists;
}

async function filterP(list, fn) {
  const keep = await Promise.all(list.map(fn));
  return list.filter((_item, index) => keep[index]);
}

const routers = await filterP(
  Object.entries(webgmeSetup.components.routers),
  async ([name, _info]) =>
    exists(
      path.join("src", "routers", name, name + ".ts"),
    ),
);
const routerFiles = routers
  .flatMap((
    [name, info],
  ) => ({
    //input: `src/routers/${name}/${name}.ts`,
    input: `src/routers/${name}/${name}.ts`,
    //input: `tmp/${info.src}/${name}.js`,
    external: [
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
    ],
    output: {
      //file: `${info.src}/${name}.js`,
      format: "commonjs",
      dir: info.src,
      preserveModules: true,
    },
    plugins: [
      //nodePolyfill({ include: [/^config/, /^src/], sequential: true }), // resolve __dirname correctly
      commonjs({
        // exclude config
        transformMixedEsModules: true,
        exclude: [
          fileURLToPath(
            new URL(
              "config/*.js",
              import.meta.url,
            ),
          ),
        ],
        // Dynamic require used by config/ (imported by MongoDB adapter)
        // ignoreDynamicRequires: true,
        // dynamicRequireTargets: [
        //   fileURLToPath(
        //     new URL(
        //       "config/*.js",
        //       import.meta.url,
        //     ),
        //   ),
        // ],
      }),
      typescript({ rootDir: `src/routers/${name}/`, outDir: info.src }),
      json(),
    ],
  }));

console.log(
  fileURLToPath(
    new URL(
      "config/index.js",
      import.meta.url,
    ),
  ),
  routers,
  routerFiles,
);

// const cleanup = {
//   input: "tmp/*",
//   output: { file: "tmp/cleanup.del" },
//   plugins: [del({ targets: "tmp/*" })],
// };
export default pluginFiles.concat(routerFiles);
