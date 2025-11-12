  import { test, expect, Page, BrowserContext } from '@playwright/test';
import { CompaniesPage } from '../../Pages/Companies.page';


  test.describe.only('Contact Screen Tests', () => {
    let context: BrowserContext;
    let page: Page;
    let companiesPage: CompaniesPage;

    test.beforeAll(async ({ browser }) => {
      console.log('🌐 Launching single browser context and page...');
      context = await browser.newContext();
      page = await context.newPage();
      companiesPage = new CompaniesPage(page);
      await page.goto('https://crm-admin-staging.web.app/');
    });

    test('⚠️ TC-22 Verify validation messages on Add New Company pop-up', async () => {
      // Navigate to Companies

       await companiesPage.CompaniesCreate_Validation();
    });
    test('➕ TC-23 Verify user can successfully create a new company', async () => {
      // Navigate to Companies
      await companiesPage.Add_Company();
    });

    test("🔍 TC-24 Verify user can search for a company", async () => {
      await companiesPage.SearchCompany();
    });

    test('🔍 TC-24 Verify user can search invalid for a company', async () => {
      await companiesPage.SearchInvalidCompany();
    });

    test('✏️ TC-25 Verify user can successfully edit an existing company', async () => {
      // Navigate to Companies
      await companiesPage.Edit_Company();
    });

    test('🗑️ TC-26 Verify user can successfully delete a company', async () => {
      // Navigate to Companies
      await companiesPage.Delete_Company();
    });

    test.afterAll(async () => {
      console.log('🧹 Closing browser context...');
      await context.close();
    });
  });
