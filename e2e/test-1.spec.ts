import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:8080/');
  await page.getByTitle('Open', { exact: true }).click();
  await page.getByRole('link', { name: '' }).click();
  await page.getByRole('link', { name: 'Open Content Type Dashboard ' }).click();
  await page.getByRole('combobox').selectOption('taxonomy');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Run...' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('link', { name: 'Open' }).nth(1).click();
  await page1.getByLabel('Upload dataset').click();
  await page1.getByRole('textbox', { name: 'Name' }).click();
  await page1.getByRole('textbox', { name: 'Name' }).fill('test 2');
  await page1.getByRole('button', { name: 'Submit' }).click();
  await page1.goto('http://127.0.0.1:8080/routers/Search/guest%2Be2e_tests/commit/%2336da19fc86adad04b9d43459f1fc4175dbf31242/%2FC/static/?searchQuery=&filterTags=%5B%5D');
  await page1.getByText('test 2').click();
  await page1.getByRole('button', { name: 'Upload', exact: true }).click();
  await page1.getByText('Select dataset to upload.').click();
  await page1.locator('#append-artifact-content div').filter({ hasText: 'Select dataset to upload.' }).setInputFiles('EHR_Test_Data.csv');
  await page1.getByRole('button', { name: 'Upload' }).first().click();
  await page1.getByText('test 2').click();
  await page1.getByRole('button', { name: 'more_vert' }).click();
  await page1.getByText('Show all...').click();
  await page1.getByText('test 2').click();
});