// jshint node: true
"use strict";
process.chdir(__dirname);

var gmeConfig = require("./config"),
  webgme = require("webgme"),
  myServer;

webgme.addToRequireJsPaths(gmeConfig);

myServer = new webgme.standaloneServer(gmeConfig);
myServer.start(function (err) {
  console.log(err);
  //console.log('server up');
});
