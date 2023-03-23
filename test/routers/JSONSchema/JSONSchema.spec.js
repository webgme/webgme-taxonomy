describe("JSONSchema", function () {
  var testFixture = require("../../globals"), // TODO: May need to change this if not created from webgme-cli
    superagent = testFixture.superagent,
    expect = testFixture.expect,
    gmeConfig = testFixture.getGmeConfig(),
    server = testFixture.WebGME.standaloneServer(gmeConfig),
    // TODO: If not using webgme-cli, replace the mntPt w/ the desired mount point
    // If using the webgme-cli, this will look up the mount point for the given router
    mntPt =
      require("../../../webgme-setup.json").components.routers["JSONSchema"]
        .mount,
    urlFor = function (action) {
      return [
        server.getUrl(),
        mntPt,
        action,
      ].join("/");
    };

  before(function (done) {
    server.start(done);
  });

  after(function (done) {
    server.stop(done);
  });

  xit("should get to /schema.json", function (done) {
    superagent.get(urlFor("schema.json"))
      .end(function (err, res) {
        try {
          expect(res.statusCode).to.equal(200);
          done();
        } catch (e) {
          done(e);
        }
      });
  });
});
