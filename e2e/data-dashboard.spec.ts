import { expect, test } from "@playwright/test";

test.describe(`Data dashboard`, function () {
  test.only("can create repo", async ({ page }) => {
    const repoName = "NewExample-" + Date.now();
    await page.goto(
      "http://localhost:8080/routers/Search/guest%2Be2e_tests/branch/master/%2FC/static/",
    );

    // Create a new repo
    // page.on("console", (msg) => console.log(msg.text()));
    await page.getByLabel(/Upload dataset/).click();
    await page.getByRole("textbox", { name: "Name" }).fill(repoName);
    await page.getByRole("button", { name: "Submit" }).click();

    // check that the new repository is there
    const element = page.getByTestId(repoName);
    expect(await element.isVisible()).toBeTruthy();
  });
});
