describe("PdpApi", function () {
  const PdpApi = require(
    "../../../../../src/routers/Search/build/adapters/PDP/api",
  ).default;
  const assert = require("assert");
  describe("getObservationFiles", function () {
    it("should use default token if none provided", async function () {
      const userToken = "userToken";
      const api = new PdpApi("https://someUrl.com", userToken);

      // TODO: setup the mocks
      let authHeaders = [];
      api._rawFetch = async (_url, opts) => {
        authHeaders.push(opts.headers.Authorization);
        return {
          status: 400,
          text: () => "Just a mock method",
        };
      };

      const processId = "someProcessId";
      await api.getObservationFiles(
        processId,
        1,
        1,
      );

      assert(authHeaders.length > 0);
      authHeaders.forEach((auth) => assert.equal(`Bearer ${userToken}`, auth));
    });

    it("should encode URI components", async function () {
      const userToken = "userToken";
      const api = new PdpApi("https://someUrl.com", userToken);

      // TODO: setup the mocks
      let apiUrl;
      api._rawFetch = async (url, _opts) => {
        apiUrl = url;
        return {
          status: 400,
          text: () => "Just a mock method",
        };
      };

      const processId = "someProcessId";
      await api.getObservationFiles(
        processId,
        1,
        1,
      );

      assert(!apiUrl.includes("*"), "api includes *: " + apiUrl);
    });

    it("should use token, if provided", async function () {
      const userToken = "userToken";
      const api = new PdpApi("https://someUrl.com", userToken);

      // TODO: setup the mocks
      let authHeaders = [];
      api._rawFetch = async (_url, opts) => {
        authHeaders.push(opts.headers.Authorization);
        return {
          status: 400,
          text: () => "Just a mock method",
        };
      };

      const processId = "someProcessId";
      const callToken = "specialReadToken";
      await api.getObservationFiles(
        processId,
        1,
        1,
        { token: callToken },
      );

      assert(authHeaders.length > 0);
      authHeaders.forEach((auth) => assert.equal(`Bearer ${callToken}`, auth));
    });
  });

  it("should add trailing path", async function () {
    const userToken = "userToken";
    const api = new PdpApi("https://withoutPath.com", userToken);

    assert.equal(api.url, "https://withoutPath.com/");
  });

  it("should preserve trailing path", async function () {
    const userToken = "userToken";
    const api = new PdpApi("https://withPath.com/", userToken);

    assert.equal(api.url, "https://withPath.com/");
  });
});
