// jshint node: true
"use strict";
process.chdir(__dirname);

var gmeConfig = require("./config"),
  webgme = require("webgme"),
  myServer;

webgme.addToRequireJsPaths(gmeConfig);

if (!gmeConfig.rest.components?.Search?.options?.metadataStorageConfig) {
  throw new Error("Missing configuration for metadata storage!");
}

myServer = new webgme.standaloneServer(gmeConfig);
myServer.start(function (err) {
  if (err) console.log(err);
  // console.log('server started');
});
