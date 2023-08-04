import { test } from "@playwright/test";

test.describe(`Data dashboard`, function () {
  test("can create repo", async ({ page }) => {
    const repoName = "NewExample-" + Date.now();
    await page.goto(
      "/routers/Search/guest%2Be2e_tests/branch/master/%2FC/static/",
    );

    // Create a new repo
    await page.getByLabel(/Upload dataset/).click();
    await page.getByRole("textbox", { name: "Name" }).fill(repoName);
    await page.getByRole("button", { name: "Submit" }).click();

    // check that the new repository is there
    // FIXME: there has to be a better way to do this...
    const element = page.getByTestId(repoName);
    const isVisible = await poll(() => element.isVisible(), { timeout: 3000 });
    if (!isVisible) {
      throw new Error(`Repository didn't show up after 3000 ms`);
    }
  });

  test("can select repo", async ({ page }) => {
    test.fail();
  });

  test("can upload data to repo", async ({ page }) => {
    test.fail();
  });

  test("can view uploaded data", async ({ page }) => {
    test.fail();
  });

  test("can view more uploaded data", async ({ page }) => {
    test.fail();
  });

  test("can download data from repo", async ({ page }) => {
    test.fail();
  });

  test("can filter repo using search text", async ({ page }) => {
    test.fail();
  });

  test("can filter repo using text tag", async ({ page }) => {
    test.fail();
  });

  test("can filter repo using enum tag", async ({ page }) => {
    test.fail();
  });

  test("can filter repo using set tag", async ({ page }) => {
    test.fail();
  });

  test("can filter repo using numeric tag", async ({ page }) => {
    test.fail();
  });
});

// TODO: it would be good to move these to a utils file or something
interface PollOptions {
  timeout?: number;
  interval?: number;
}

async function poll(
  fn: () => Promise<boolean>,
  opts?: PollOptions,
): Promise<boolean> {
  const maxDuration = opts?.timeout || 1000;
  const interval = opts?.interval || 10;

  let duration = 0;
  let isPassing = await fn();
  while (!isPassing && duration < maxDuration) {
    await sleep(interval);
    duration += interval;
    isPassing = await fn();
  }
  return isPassing;
}
async function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}
