describe("TaskQueue", function () {
  const assert = require("assert");
  const { default: TaskQueue, Status } = require(
    "../../../src/routers/Search/build/TaskQueue",
  );
  const { UserError } = require("../../../src/common/routers/Utils");
  const { sleep, fromResult } = require(
    "../../../src/routers/Search/build/Utils",
  );

  class MockRunnable {
    constructor(delay = 10, fn = Date.now) {
      this.delay = delay;
      this.fn = fn;
    }

    async run() {
      await sleep(this.delay);
      return this.fn();
    }
  }

  class ThrowingRunnable {
    async run() {
      throw new Error("throw!");
    }
  }

  describe("submitTask", function () {
    it("should run tasks in order", async function () {
      const queue = new TaskQueue();
      const t1 = new MockRunnable(20);
      const t2 = new MockRunnable(10);
      const id1 = queue.submitTask(t1);
      const id2 = queue.submitTask(t2);

      while (queue.getStatus(id2) !== Status.Complete) {
        await sleep(5);
      }
      const r1 = fromResult(queue.getResult(id1));
      const r2 = fromResult(queue.getResult(id2));
      assert(r1 < r2);
    });

    it("should queue subsequent tasks", async function () {
      const queue = new TaskQueue();
      const t1 = new MockRunnable(20);
      const t2 = new MockRunnable(10);
      const id1 = queue.submitTask(t1);
      const id2 = queue.submitTask(t2);

      await sleep(5);
      assert.equal(queue.getStatus(id1), Status.Running);
      assert.equal(queue.getStatus(id2), Status.Created);
    });
  });

  describe("getStatus", function () {
    it("should throw user error if task not found", function () {
      const queue = new TaskQueue();
      try {
        queue.getStatus(1);
        assert(false, "No error thrown on getStatus w/ invalid ID");
      } catch (err) {
        assert(err instanceof UserError);
      }
    });

    it("should get error it task throws error", async function () {
      const queue = new TaskQueue();
      const t1 = new ThrowingRunnable();
      const id1 = queue.submitTask(t1);
      await sleep(5);
      const result = queue.getResult(id1);
      assert(result.isErr());
      assert.throws(() => fromResult(result));
    });
  });

  describe("getResult", function () {
    it("should throw user error if task not complete", function () {
      const queue = new TaskQueue();
      const t1 = new MockRunnable(20);
      const id = queue.submitTask(t1);
      try {
        queue.getResult(id);
        assert(false, "No error thrown on getResult");
      } catch (err) {
        assert(err instanceof UserError);
      }
    });

    it("should clear results on retrieval", async function () {
      const queue = new TaskQueue();
      const t1 = new MockRunnable();
      const id = queue.submitTask(t1);
      while (queue.getStatus(id) !== Status.Complete) {
        await sleep(10);
      }
      queue.getResult(id);
      try {
        queue.getResult(id);
        assert(false, "No error thrown on 2nd call to getResult");
      } catch (err) {
        assert(err instanceof UserError);
      }
    });
  });
});
