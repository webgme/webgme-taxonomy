import { expect, type Page, test, ElementHandle } from "@playwright/test";
// import { repoTest } from "./tests/repo-test";
import RepoImpl from "./_archive/fixtures/RepoImpl";
import { poll } from "./test-helper";
import os from "os";
import * as path from "path";
import * as fs from "fs/promises";

const TIMEOUT_TO_WAIT_FOR_PROJECT_CREATION_MS = 3000;
const TIMEOUT_TO_WAIT_FOR_LOCATOR_CHECK_TO_COMPLETE = 3000;
const TIMEOUT_TO_WAIT_FOR_CREATED_TOAST_POPUP = 5000;

const ROUND_ONE = "round_1";
const ROUND_TWO = "round_2";
const contentName = "ExampleContent";
const SOURCE_TEST_FILE = "./e2e/resources/test-file.txt";

async function getCurrentTimestampLong() {
  return Date.now();
}

/**
 *
 * @param page
 * @param repoName
 * @param repoIndex
 * @param testFileIndex
 * @param testFileList
 */
async function testUpload(
  page: Page,
  repoName: string,
  repoIndex: string,
  testFileIndex: number,
  testFileList: string[]
) {
  await page.getByText(repoName, { exact: true }).click();
  await page.getByRole("button", { name: "Upload", exact: true }).click();

  const nameInput = page.getByRole("textbox", { name: "Name" });
  const uniqueTimestampForRepoName = await getCurrentTimestampLong();
  const currentRepoName = `${contentName}-${uniqueTimestampForRepoName}-${repoIndex}`;
  nameInput.fill(currentRepoName);

  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.getByText("Select dataset to upload.").click();
  const fileChooser = await fileChooserPromise;

  /**
  Create copy of test file into temp location,
  then reference temp file; permits for numbered
  instances for later validation and disambiguation
  for testing.
   */
  const tempFile = await fs.readFile(SOURCE_TEST_FILE);
  const tempDirFolder = os.tmpdir();
  const uniqueTimestampForTestFileName = await getCurrentTimestampLong();
  const newTestFileName = `${uniqueTimestampForTestFileName}-test-file_${testFileIndex}.txt`;
  const newTestFilePath = path.join(tempDirFolder, newTestFileName);
  testFileList.push(newTestFilePath);
  await fs.writeFile(newTestFilePath, tempFile);

  await fileChooser.setFiles(newTestFilePath);
  // Contained in div.dialog-actions.svelte-1owpu03
  await page.getByRole("button", { name: "Upload" }).first().click();

  // wait for the upload complete toast
  const isUploadComplete = await poll(
    () => page.getByText("Upload complete!").isVisible(),
    {
      interval: 100,
      timeout: 20000,
    }
  );
  expect(isUploadComplete).toBeTruthy();

  return currentRepoName;
}

/**
 * For a given uploadIndex string, check to see if the file was uploaded.
 * @param page
 * @param uploadIndex
 */
async function testIfUploadWorked(page: Page, currentRepoName: string) {
  const content = page.getByTestId(currentRepoName);
  const isContentShowing = await poll(() => content.isVisible(), {
    timeout: TIMEOUT_TO_WAIT_FOR_LOCATOR_CHECK_TO_COMPLETE,
  });
  expect(isContentShowing).toBeTruthy();
}

async function gotoPage(page: Page, baseURL: string | undefined) {
  await page.goto(
    `${baseURL}routers/Search/guest%2Be2e_tests/branch/master/%2FC/static/`
  );
}

// To ensure that the tests are run in order
test.describe.configure({ mode: "serial" });

test.describe(`Data dashboard`, function () {
  let page: Page;
  let repoName: string = "NewExample-" + Date.now();
  let testFileIndex = 0;
  let testFileList: Array<string> = [];
  let currentRepoName: string;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test("Can navigate to repo management", async ({ baseURL }) => {
    await gotoPage(page, baseURL);
  });

  test("can create repo", async () => {
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

    await textBoxLocator.fill(repoName);

    await page.getByRole("button", { name: "Submit" }).click();

    // check that the new repository is there
    // FIXME: there has to be a better way to do this...
    const element = page.getByTestId(repoName);

    const toastNotificationText: string = await page
      .locator("._toastItem")
      .innerText();

    expect(toastNotificationText.includes("Created!")).toBeTruthy();

    // FIXME
    // expect(await page.locator('div.status')).toContainText("Created!")
  });

  test("can select repo", async () => {
    const newRepo = await page.getByText(repoName);
    await newRepo.click();
    expect(
      // FIXME -- apply aria-label to strongly bind to heading
      page.getByRole("heading", {
        name: `TestContentUploads in ${repoName.trim()}`,
      })
    ).toBeDefined();
  });

  test(`can upload data to repo (${ROUND_ONE})`, async () => {
    currentRepoName = await testUpload(
      page,
      repoName,
      ROUND_ONE,
      testFileIndex,
      testFileList
    );
    testFileIndex++;
  });

  test(`can view uploaded data (${ROUND_ONE})`, async () => {
    await testIfUploadWorked(page, currentRepoName);
  });

  test(`can upload data to repo (${ROUND_TWO})`, async () => {
    currentRepoName = await testUpload(
      page,
      repoName,
      ROUND_TWO,
      testFileIndex,
      testFileList
    );
    testFileIndex++;
  });

  test(`can view uploaded data (${ROUND_TWO})`, async () => {
    await testIfUploadWorked(page, currentRepoName);
  });

  test("can download data from repo", async () => {
    const numberOfItemsToDownload = 1;

    const fileReferenceForDownload = await page.getByTestId(currentRepoName);

    const checkbox = await fileReferenceForDownload.getByRole("checkbox");
    // .locator('input[type="check"]');
    expect(checkbox).toBeTruthy();
    await checkbox.check();
    const downloadButton = page.getByRole("button", { name: "Download" });
    expect(downloadButton).toBeTruthy;
    await downloadButton.click();

    let messageText = `Downloading ${numberOfItemsToDownload} from ${repoName}`;
    const isDownloading = await poll(
      () => page.getByText(messageText).isVisible(),
      {
        interval: 100,
        timeout: 20000,
      }
    );
    expect(isDownloading).toBeTruthy();

    // TODO -- Need to check file system for successful download using Node?
  });

  test("can filter repo using search text", async () => {
    await page.getByLabel("Search...").fill(repoName);
    // let listOfRepos = await page.getByRole("list").locator("li:visible");
    let listOfRepos = page.locator('ul[role="list"] li:visible');
    let visibleReposCount = await listOfRepos.count();
    expect(visibleReposCount).toStrictEqual(1);
    expect(listOfRepos.getByText(repoName)).toBeTruthy();

    await page.getByLabel("Search...").fill(repoName.substring(0, 5));
    visibleReposCount = await listOfRepos.count();
    expect(visibleReposCount).toBeGreaterThanOrEqual(1);

    expect(listOfRepos.getByText(repoName)).toBeTruthy();
  });

  test("can filter repo using text tag", async ({ baseURL }) => {
    await gotoPage(page, baseURL);

    await page.locator('div[aria-label="Base arrow"]').click();

    await page.locator('div[aria-label="name arrow"]').click();

    await page.getByLabel("value", { exact: true }).click();

    await page.locator("span").filter({ hasText: repoName }).first().click();

    await page.locator("div[aria-label='value checkbox'] input").check();

    expect(page.getByTestId(repoName).getByText(repoName)).toBeTruthy();

    expect(page.locator("div.mdc-drawer-app-content main ul li")).toHaveCount(
      1
    );
  });

  test("can filter repo using enum tag", async ({ baseURL }) => {
    await gotoPage(page, baseURL);
    test.fixme();
  });

  test("can filter repo using set tag", async ({ baseURL }) => {
    await gotoPage(page, baseURL);
    test.fixme();
  });

  test("can filter repo using numeric tag", async ({ baseURL }) => {
    await gotoPage(page, baseURL);
    test.fixme();
  });
});
