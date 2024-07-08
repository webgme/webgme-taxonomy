import { expect, type Page, test } from "@playwright/test";
// import { repoTest } from "./tests/repo-test";
import RepoImpl from "./_archive/fixtures/RepoImpl";
import { poll } from "./test-helper";

const TIMEOUT_TO_WAIT_FOR_PROJECT_CREATION_MS = 3000;
const TIMEOUT_TO_WAIT_FOR_LOCATOR_CHECK_TO_COMPLETE = 3000;
const TIMEOUT_TO_WAIT_FOR_CREATED_TOAST_POPUP = 5000;

// To ensure that the tests are run in order
test.describe.configure({ mode: "serial" });

test.describe(`Data dashboard`, function () {
  let page: Page;
  let repoName: string = "NewExample-" + Date.now();
  let contentName = "ExampleContent";

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test("Can navigate to repo management", async ({ baseURL }) => {
    await page.goto(
      `${baseURL}routers/Search/guest%2Be2e_tests/branch/master/%2FC/static/`,
    );
  });

  test("can create repo", async () => {
    // Create a new repo
    await page.getByLabel(/Upload dataset/).click();

    const createRepoDialog = page.getByLabel("Create new repository");
    await createRepoDialog.isVisible();
    await createRepoDialog.getByRole("button", { name: "Next" }).click();

    const textBoxLocator = page.getByRole("textbox", { name: "Name" });
    const textBoxLocatorIsVisible = await poll(
      () => textBoxLocator.isVisible(),
      {
        timeout: TIMEOUT_TO_WAIT_FOR_LOCATOR_CHECK_TO_COMPLETE,
      },
    );

    if (!textBoxLocatorIsVisible) {
      throw new Error(
        `Repository didn't show up after ${TIMEOUT_TO_WAIT_FOR_PROJECT_CREATION_MS} ms (possible "Error: Not authorized to read project [guest+taxonomy]")`,
      );
    }

    await textBoxLocator.fill(repoName);

    await page.getByRole("button", { name: "Create" }).click();

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

  test("reload to get entry to show up (FIXME)", async () => {
    // FIXME: dump this when the test "new repo shows up in list" works
    await page.reload();
  });

  test("can select repo", async () => {
    await page.getByText(repoName).click();
    expect(
      page.getByRole("heading", { name: `Datas in ${repoName.trim()}` }),
    ).toBeDefined();
  });

  test("can upload data to repo", async () => {
    await page.getByText(repoName, { exact: true }).click();
    await page.getByRole("button", { name: "Upload", exact: true }).click();
    await page.getByRole("button", { name: "Next" }).click();

    const nameInput = page.getByRole("textbox", { name: "Name" });
    nameInput.fill(contentName);

    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("Select dataset to upload.").click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(
      "./e2e/resources/test-file.txt",
    );
    // Contained in div.dialog-actions.svelte-1owpu03
    await page.getByRole("button", { name: "Upload" }).first().click();

    // wait for the upload complete toast
    const isUploadComplete = await poll(
      () => page.getByText("Upload complete!").isVisible(),
      {
        interval: 100,
        timeout: 20000,
      },
    );
    expect(isUploadComplete).toBeTruthy();
  });

  test("can view uploaded data", async () => {
    const content = page.getByTestId(contentName);
    const isContentShowing = await poll(
      () => content.isVisible(),
      {
        timeout: TIMEOUT_TO_WAIT_FOR_LOCATOR_CHECK_TO_COMPLETE,
      },
    );
    expect(isContentShowing).toBeTruthy();
  });

  test("can view more uploaded data", async () => {
    test.fixme();
  });

  test("can download data from repo", async () => {
    test.fixme();
  });

  test("can filter repo using search text", async () => {
    test.fixme();
  });

  test("can filter repo using text tag", async () => {
    test.fixme();
  });

  test("can filter repo using enum tag", async () => {
    test.fixme();
  });

  test("can filter repo using set tag", async () => {
    test.fixme();
  });

  test("can filter repo using numeric tag", async () => {
    test.fixme();
  });
});
