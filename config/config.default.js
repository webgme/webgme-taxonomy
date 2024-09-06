"use strict";

var config = require("./config.webgme"),
  validateConfig = require("webgme/config/validator");

// Add/overwrite any additional settings here
config.server.port = +process.env.PORT || 8080;
config.plugin.allowServerExecution = true;
// config.mongo.uri = 'mongodb://127.0.0.1:27017/webgme_my_app';

config.requirejsPaths["webgme-taxonomy/lib"] = "./lib";
config.requirejsPaths.react = "./lib/react.production.min";
config.client.onlyVandyDelete = true;

validateConfig(config);
module.exports = config;
