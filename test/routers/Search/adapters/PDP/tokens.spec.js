describe("Tokens", function () {
  const testFixture = require("../../../../globals");
  const gmeConfig = testFixture.getGmeConfig();
  const withTokens =
    require("../../../../../build/routers/Search/adapters/PDP/tokens")
      .default;
  const assert = require("assert");
  const projectId = "test_projectId";

  it("should record token", async function () {
    const token = "token123";
    await withTokens(gmeConfig, (tokens) => tokens.update(projectId, token));
    const readToken = await withTokens(gmeConfig, (t) => t.get(projectId));
    assert.equal(token, readToken);
  });

  it("should save latest token", async function () {
    const token = "token123";
    const newToken = "token234";

    const readToken = await withTokens(gmeConfig, async (tokens) => {
      await tokens.update(projectId, token);
      await tokens.update(projectId, newToken);

      const count = await tokens._collection.count({});
      assert.equal(count, 1);

      return await tokens.get(projectId);
    });

    assert.equal(newToken, readToken);
  });
});
