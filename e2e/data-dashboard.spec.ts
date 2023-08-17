import { expect, test } from "@playwright/test";

test.describe("Data dashboard", function () {
  test("can load data dashboard", async ({ page }) => {
    await page.goto(
      "http://localhost:8080/routers/Search/guest%2Be2e_tests/branch/master/%2FC/static/",
    );

    await expect(page).toHaveTitle(/TestContentUpload Dashboard/);
  });

  // test("can create repo", async ({ page }) => {
  //   await page.goto(
  //     "http://localhost:8080/routers/Search/guest%2Be2e_tests/branch/master/%2FC/static/",
  //   );

  //   await page.getByLabel(/Upload/).click();
  //   await page.getByLabel(/Name/).fill("Example");
  //   await page.getByLabel(/Submit/).click();
  // });
});
