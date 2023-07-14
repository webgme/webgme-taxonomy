import { expect, request, test } from "@playwright/test";
import TestMethods from "./common/test-methods";

// TODO - Where to pull from config?
const BASE_URL = "http://127.0.0.1:8080/";
const TEST_SPEC_ISSUE_URL = "https://github.com/webgme/webgme-taxonomy/issues/304"
const PROJECT_NAMER = TestMethods.project_name_generator();

test.describe(`Data dashboard`, function () {

  test.beforeAll(async () => {
    console.log(TEST_SPEC_ISSUE_URL)
  })


  // test("can load data dashboard", async ({ page }) => {
  //   await page.goto(
  //     "http://localhost:8080/routers/Search/guest%2Be2e_tests/branch/master/%2FC/static/",
  //   );

  //   await expect(page).toHaveTitle(/Data Dashboard/);
  // });

  test("Create new repo (and it shows up).", async ({ page }) => {

    const current_project_name: string = PROJECT_NAMER.next().value;

    // TODO 
    // Need to figure out how to add handshake.headers.cookie to permit
    // call in C:\_\wl\webgme_projects\webgme-taxonomy\node_modules\webgme-engine\src\server\storage\websocket.js
    // line 885, socket.on('simpleRequest', function (data, callback)  {
    // const cookies = await request.cookies();


    // Note -- example of selector
    // await page.waitForSelector('div[class="modal-backdrop fade in"]');

    // Note: Need to dispatch 'keyup' event after fill, if validation check dependency.

    await page.goto(BASE_URL);
    await page.getByRole("button", { name: "Create new..." }).click();
    // TODO -- inspect interface further to determine if can chain, or needs to re-query placeholder?
    // TODO -- Text name for placeholder seems fragile for hook; is there a more stable selector?
    const projectName = page.getByPlaceholder("Project name...");
    await expect(projectName).toBeVisible();
    await projectName.fill(current_project_name);
    await projectName.dispatchEvent("keyup");
    await page.getByRole("button", { name: "Create" }).click();

    /**
     * TODO
     * - Will there always be a static type of project to select?
     * - Should this grab the list of all projects and test for each one?
     * - potential selector: div.create-new-project-dialog select.selector
     */

    await page.getByRole("combobox").selectOption("file:TaxonomyProject");
    await page.getByRole("button", { name: "Create" }).click();


  });

  test.fixme("Upload new artifact to a repo and ensure it shows up", async ({ page }) => { });

  test.fixme("Download artifact", async ({ page }) => { });

  test.fixme("View/download the metadata for the artifact (ensure correct)", async ({ page }) => { });

  test.fixme("Filter using:", async ({ page }) => { });

});



