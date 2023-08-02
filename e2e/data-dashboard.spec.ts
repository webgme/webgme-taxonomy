import { expect, request, test } from "@playwright/test";
import TestMethods from "./common/test-methods";
import { test_with_taxonomy } from "./common/fixtures/mock-taxonomy.fixtures";
import { configured_test } from "./common/fixtures/test-config.fixtures";

const GENERIC_PROJECT_NAMER = TestMethods.project_name_generator("General");
const TAXONOMY_PROJECT_NAMER = TestMethods.project_name_generator("Taxonomy");

const PROJECT_NAME_CSS_SELECTOR =
  "body > div.ui-layout-north.no-print.ui-layout-pane.ui-layout-pane-north > div > div.navbar.navbar-inverse.navbar-fixed-top > div > div.project-navigator-controller.ng-scope > nav > ul > li:nth-child(4) > div.label-container.ng-scope > span";

/**
 * Manual Change
 *
 * Had to make a change within
 *
 *    webgme-engine\src\server\storage\websocket.js
 *    line 884
 *
 *    Abstracted cookie lookup to closure to permit looking up within lower calling scope
 *
 *    const cookieRef = this.handshake.headers.cookie;
 *    const cookies = () => parseCookie(cookieRef);
 *
 * TODOs
 *
 * 1) Need to figure out how to add handshake.headers.cookie to permit
 *    call in C:\_\wl\webgme_projects\webgme-taxonomy\node_modules\webgme-engine\src\server\storage\websocket.js
 *    line 885, socket.on('simpleRequest', function (data, callback)  {
 *              const cookies = await request.cookies();
 * 2) Inspect interface further to determine if can chain, or needs to re-query placeholder?
 * 3) Text name for placeholder seems fragile for hook; is there a more stable selector?
 *
 * Questions
 *
 *  1) Will there always be a static type of project to select?
 *  2) Should this grab the list of all projects and test for each one?
 *    * potential selector: div.create-new-project-dialog select.selector
 *
 * Notes
 *
 * Example of waiting for a selector to show up in the DOM
 *
 *    await page.waitForSelector('div[class="modal-backdrop fade in"]');
 *
 * Handling textbox typing detection logic
 *  - Need to dispatch 'keyup' event after fill, if validation check dependency.
 *
 * Mechanism to check routes
 *
 *    await page.route(new RegExp(".+socket\.io.+$"), async (route, request) => {
 *       console.log(`********** BEGIN Route - ${request.url()}\nHeaders: ${prettyPrintJson(request.headers())}`);
 *       route.continue();
 *       await request.response();
 *       console.log(`********** END Route - ${request.url()}\nHeaders: ${prettyPrintJson(request.headers())}`);
 *    })
 *
 *    Can call
 *
 *    await setPageListener(page);
 *
 *    within code to monitor
 *
 * Mechanism to check websocket calls
 *
 *    page.on('websocket', ws => {
 *      console.log('open');
 *      ws.on('framesent', function (d) {
 *        return console.log(`framesent ------> ${prettyPrintJson(d)}`);
 *      });
 *      ws.on('framereceived', function (d) {
 *        return console.log(`framereceived --> ${prettyPrintJson(d)}`);
 *      });
 *    })
 */

test.describe(`Data dashboard`, function () {
  test.beforeAll(async () => {
    console.log(`Issue: https://github.com/webgme/webgme-taxonomy/issues/304`);
  });

  // HEAD
  configured_test("Create new repo (and it shows up).", async ({ page }) => {
    const current_project_name: string = GENERIC_PROJECT_NAMER.next().value;

    // Routes to / based on baseUrl in config
    await page.goto("/");

    // Get access to button and fire click event
    await page.getByRole("button", { name: "Create new..." }).click();

    // Get reference to text box
    const projectName = page.getByPlaceholder("Project name...");
    await expect(projectName).toBeVisible();

    // Fill in constructed project name and fire keyup to enable Create button
    await projectName.fill(current_project_name);
    await projectName.dispatchEvent("keyup");

    // Click Create and wait for combobox to select project type (see Question #2 at top)
    await page.getByRole("button", { name: "Create" }).click();
    await page.getByRole("combobox").selectOption("file:TaxonomyProject");
    await page.getByRole("button", { name: "Create" }).click();
    await expect(page.locator(PROJECT_NAME_CSS_SELECTOR)).toHaveText(
      current_project_name,
      { timeout: 300000 },
    );
    // Click Create and wait for combobox to select project type (see Question #2 at top)
    await page.getByRole("button", { name: "Create" }).click();
    await page.getByRole("combobox").selectOption("file:TaxonomyProject");
    await page.getByRole("button", { name: "Create" }).click();
    await expect(page.locator(PROJECT_NAME_CSS_SELECTOR)).toHaveText(
      current_project_name,
      { timeout: 300000 },
    );

    await page.close();
    await page.close();
  });

  test_with_taxonomy(
    "Upload new artifact to a repo and ensure it shows up",
    async ({ page, mock_taxonomy }) => {
      // Begin navigation
      await page.goto("/");

      const taxonomy = await mock_taxonomy.get();

      console.log(taxonomy);
    },
  );

  test.fixme("Download artifact", async ({ page }) => {});

  configured_test.fixme(
    "View/download the metadata for the artifact (ensure correct)",
    async ({ page }) => {},
  );

  configured_test.fixme("Filter using:", async ({ page }) => {});

  test("can create repo", async ({ page }) => {
    const repoName = "NewExample-" + Date.now();
    await page.goto(
      "http://localhost:8080/routers/Search/guest%2Be2e_tests/branch/master/%2FC/static/",
    );

    // Create a new repo
    await page.getByLabel(/Upload dataset/).click();
    await page.getByRole("textbox", { name: "Name" }).fill(repoName);
    await page.getByRole("button", { name: "Submit" }).click();

    // check that the new repository is there
    const element = page.getByTestId(repoName);
    expect(await element.isVisible()).toBeTruthy();
  });
});
