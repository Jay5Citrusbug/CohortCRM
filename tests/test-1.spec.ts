// // import { test, expect } from '@playwright/test';

// // test('test', async ({ page }) => {

//   await page.getByLabel('Status').getByRole('button', { name: 'filter' }).click();
//   await page.getByRole('menuitem', { name: 'New Enquiry' }).getByLabel('', { exact: true }).uncheck();
//   await page.getByRole('menuitem', { name: 'Terms Accepted' }).getByLabel('', { exact: true }).uncheck();
//   await page.getByRole('menuitem', { name: 'Underwriting Process' }).getByLabel('', { exact: true }).uncheck();
//   await page.getByRole('button', { name: 'OK' }).click();
//   await page.getByLabel('Status').getByRole('button', { name: 'filter' }).click();
//   await page.getByRole('button', { name: 'Reset' }).click();
//   await page.getByRole('menuitem', { name: 'NPW' }).getByLabel('', { exact: true }).check();
//   await page.getByRole('button', { name: 'OK' }).click();
//   await page.getByRole('cell', { name: 'NPW' }).first().click();
//   await page.getByRole('heading', { name: 'Main Section' }).click();
//   await page.getByRole('checkbox', { name: 'Potential MCQ' }).check();
// // });