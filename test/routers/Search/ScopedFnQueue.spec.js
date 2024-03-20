describe.only("ScopedFnQueue", function () {
  const assert = require("assert");
  const ScopedFnQueue = require(
    "../../../build/routers/Search/ScopedFnQueue",
  );
  const { sleep } = require(
    "../../../build/routers/Search/Utils",
  );

  it("should return fn result", async function () {
    const queue = new ScopedFnQueue();
    const result = await queue.run("thing", async () => 1);
    assert.equal(result, 1);
  });

  it("should run fns in order", async function () {
    const queue = new ScopedFnQueue();
    const p1 = queue.run("thing", async () => {
      await sleep(10);
      const timestamp = Date.now();
      await sleep(5);
      return timestamp;
    });
    const p2 = queue.run("thing", async () => Date.now());
    const [r1, r2] = await Promise.all([p1, p2]);
    assert(r1 < r2);
  });

  it("should run diff scopes concurrently", async function () {
    const queue = new ScopedFnQueue();
    const p1 = queue.run("thing1", async () => {
      await sleep(10);
      const timestamp = Date.now();
      await sleep(5);
      return timestamp;
    });
    const p2 = queue.run("thing2", async () => Date.now());
    const [r1, r2] = await Promise.all([p1, p2]);
    assert(r1 > r2);
  });

  it("two instances should still use same queue", async function () {
    const queue1 = new ScopedFnQueue();
    const queue2 = new ScopedFnQueue();

    const p1 = queue1.run("thing", async () => {
      await sleep(10);
      const timestamp = Date.now();
      await sleep(5);
      return timestamp;
    });
    const p2 = queue2.run("thing", async () => Date.now());
    const [r1, r2] = await Promise.all([p1, p2]);
    assert(r1 < r2);
  });
});
