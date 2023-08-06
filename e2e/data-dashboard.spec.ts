import { expect, test } from "@playwright/test";
// import { repoTest } from "./tests/repo-test";
import RepoImpl from "./common/fixtures/RepoImpl";

const TIMEOUT_TO_WAIT_FOR_PROJECT_CREATION_MS = 3000;
const TIMEOUT_TO_WAIT_FOR_LOCATOR_CHECK_TO_COMPLETE = 3000;



test.describe(`Data dashboard`, function () {

  let repoData: RepoImpl; // This is an anti-pattern, but it works for now

  test("can create repo", async ({ page }) => {

    repoData = new RepoImpl("/routers/Search/guest%2Be2e_tests/branch/master/%2FC/static/");

    const newLocal = await repoData.getRepoRoute();
    await page.goto(newLocal);

    // Create a new repo
    await page.getByLabel(/Upload dataset/).click();
    const textBoxLocator = page.getByRole("textbox", { name: "Name" });
    const textBoxLocatorIsVisible = await poll(
      () => textBoxLocator.isVisible(),
      {
        timeout: TIMEOUT_TO_WAIT_FOR_LOCATOR_CHECK_TO_COMPLETE,
      }
    );

    if (!textBoxLocatorIsVisible) {
      throw new Error(
        `Repository didn't show up after ${TIMEOUT_TO_WAIT_FOR_PROJECT_CREATION_MS} ms (possible "Error: Not authorized to read project [guest+taxonomy]")`
      );
    }

    const repoName = await repoData.getRepoName();
    await textBoxLocator.fill(repoName);

    await page.getByRole("button", { name: "Submit" }).click();

    // check that the new repository is there
    // FIXME: there has to be a better way to do this...
    const element = page.getByTestId(repoName);

    const isVisible = await poll(() => element.isVisible(), {
      timeout: TIMEOUT_TO_WAIT_FOR_PROJECT_CREATION_MS,
    });
    if (!isVisible) {
      throw new Error(
        `Repository didn't show up after ${TIMEOUT_TO_WAIT_FOR_PROJECT_CREATION_MS} ms`
      );
    }
  });

  test("can select repo", async ({ page }) => {
    // Targets
    // "Datas in NewExample-1691336450520" - label
    // "Showing 0-0 of 0"

    // Assumes that even though previous test fails, the repo is still populated

    const repoRoute = await repoData.getRepoRoute();
    debugger;
    await page.goto(repoRoute);
    const repoName = await repoData.getRepoName();

    await page.getByText(repoName).click();
    await expect(page.getByRole("heading", { name: `Datas in ${repoName.trim()}` })).toBeDefined();
  });

  test("can upload data to repo", async ({ page }) => {
    await page.goto(await repoData.getRepoRoute());
    const repoName = await repoData.getRepoName();
    await page.getByText(repoName, { exact: true }).click();
    await page.getByRole('button', { name: 'Upload', exact: true }).click();
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByText('Select dataset to upload.').click();
    const fileChooser = await fileChooserPromise;
    fileChooser.setFiles("e2e\resources\test-file.txt")
    debugger;

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
  opts?: PollOptions
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
