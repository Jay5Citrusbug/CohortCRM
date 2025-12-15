  import { test, expect, Page, BrowserContext } from '@playwright/test';
import { ContactPage } from '../../Pages/contact.page';


  test.describe('Contact Screen Tests', () => {
    let context: BrowserContext;
    let page: Page;
    let contactPage: ContactPage;

    test.beforeAll(async ({ browser }) => {
      console.log('🌐 Launching single browser context and page...');
      context = await browser.newContext();
      page = await context.newPage();
      contactPage = new ContactPage(page);
      await page.goto('https://crm-admin-staging.web.app/');
    });

    test('⚠️ TC-18 Verify validation messages on Add New Contact pop-up', async () => {
      // Navigate to Contacts

       await contactPage.ContactCreate_Validation();
    });
    test('➕ TC-19 Verify user can successfully create a new contact', async () => {
      // Navigate to Contacts
      await contactPage.Add_Contact();
    });
    test('✏️ TC-20 Verify user can successfully edit an existing contact', async () => {
      // Navigate to Contacts
      await contactPage.Edit_Contact();
    });

    test('🗑️ TC-21 Verify user can successfully delete a contact', async () => {
      // Navigate to Contacts
      await contactPage.Delete_Contact();
    });


    test.afterAll(async () => {
      console.log('🧹 Closing browser context...');
      await context.close();
    });
  });
