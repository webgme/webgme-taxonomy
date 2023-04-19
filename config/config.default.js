"use strict";

var config = require("./config.webgme"),
  validateConfig = require("webgme/config/validator");

// Add/overwrite any additional settings here
config.server.port = +process.env.PORT || 8080;
// config.mongo.uri = 'mongodb://127.0.0.1:27017/webgme_my_app';

const path = require("path");
const jsonImporterDir = path.dirname(
  require.resolve("webgme-json-importer/app.js"),
);
config.plugin.basePaths.push(path.join(jsonImporterDir, "src/plugins"));

config.requirejsPaths["webgme-transformations"] = path.relative(
  path.join(__dirname, ".."),
  path.dirname(
    require.resolve("webgme-transformations/package.json"),
  ),
);

config.requirejsPaths.react =
  "./src/visualizers/widgets/TagCreator/lib/react.production.min",
  validateConfig(config);
module.exports = config;
