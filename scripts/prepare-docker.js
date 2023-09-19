/// This script removes test dependencies from the docker image before building it.
const pkgJson = require("../package.json");
pkgJson.testDependencies.forEach((dep) => {
  delete pkgJson.devDependencies[dep];
});
