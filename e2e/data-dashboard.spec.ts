import { expect, test } from "@playwright/test";
import crypto from "crypto"

// Global hyphen search
const HYPEN_RE: RegExp = /\-/gi;
const REPLACEMENT_TOKEN: string = "_";
const PROJECT_PREFIX: string = "Project_"

/**
 * Generator to create random project name for each iteration
 */
function* project_name_generator(): Generator<string> {
  let guid: string = crypto.randomUUID().toString()
  guid = guid.replace(HYPEN_RE, REPLACEMENT_TOKEN);
  const project_name: string = `${PROJECT_PREFIX}${guid}`;
  return project_name;
}

const PROJECT_NAMER = project_name_generator();

// TODO - Where to pull from config?
const BASE_URL = "http://127.0.0.1:8080/";

test.describe("Data dashboard", function () {
  test("can load data dashboard", async ({ page }) => {
    await page.goto(
      "http://localhost:8080/routers/Search/guest%2Be2e_tests/branch/master/%2FC/static/",
    );

    await expect(page).toHaveTitle(/Data Dashboard/);
  });

  test("Project created; shows up without refresh", async ({ page }) => {

    const current_project_name: string = PROJECT_NAMER.next().value;

    // Note -- example of selector
    // await page.waitForSelector('div[class="modal-backdrop fade in"]');

    // Note: Need to dispatch 'keyup' event after fill, if validation check dependency.
  
    await page.goto(BASE_URL);
    await page.getByRole("button", { name: "Create new..." }).click();
    // TODO -- inspect interface further to determine if can chain, or needs to re-query placeholder?
    // TODO -- Text name for placeholder seems fragile for hook; is there a more stable selector?
    await page.getByPlaceholder("Project name...").fill(current_project_name);
    await page.getByPlaceholder("Project name...").dispatchEvent("keyup");
    await page.getByRole("button", { name: "Create" }).click();
    // TODO -- Get list of projects from which to choose?  Select same or randomly select?
    await page.getByRole("combobox").selectOption("file:TaxonomyProject");
    // TODO
    // await page.getByRole("button", { name: "Create" }).click();
    // await page.getByRole("button", { name: project_name });
  });
});



