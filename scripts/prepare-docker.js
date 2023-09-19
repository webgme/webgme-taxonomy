/// This script removes test dependencies from the docker image before building it.
const pkgJson = require("../package.json");
const fs = require("fs");
const path = require("path");

pkgJson.testDependencies.forEach((dep) => {
  delete pkgJson.devDependencies[dep];
});

fs.writeFileSync(
  path.join(__dirname, "..", "package-docker.json"),
  JSON.stringify(pkgJson, null, 2),
);
