import { test, expect } from '@playwright/test';
import { PipeLinePage } from '../../Pages/Pipelinepage';
import { ContactPage } from '../../Pages/contact.page';
import { CompaniesPage } from '../../Pages/Companies.page';


test.describe('Pipeline loan Status', () => {
    let page;
    let pipeLinePage: PipeLinePage;
    let contactPage: ContactPage;
    let companiesPage: CompaniesPage;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();  // 👉 Only ONE page created here

        pipeLinePage = new PipeLinePage(page);
        contactPage = new ContactPage(page);
        companiesPage = new CompaniesPage(page);

        console.log('🌐 Opening dashboard page...');
        await page.goto('https://crm-admin-staging.web.app/');
    });

    test('🔄 Reload Loan, Company and Contact Page', async () => {
        console.log("🔹 Opening Edit Loan pop-up...");

        await page.evaluate(() => {
            const scrollable = document.querySelector('.ant-table-body');
            if (scrollable) scrollable.scrollBy({ left: 1000, behavior: 'smooth' });
        });

        await page.getByRole('button', { name: 'eye' }).first().click();
        console.log("🔹 View Loan Opened");
        await expect(page.getByText('Comments Add')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Edit Loan' })).toBeVisible();
        await page.reload();

        // Contact Page
        await page.getByRole('link', { name: 'Contacts' }).click();
        await contactPage.ContactCreate_Validation();
        await contactPage.Add_Contact();
        await contactPage.Open_Contact_Details();

        const contactHeader = await page.getByRole('heading', { name: 'First Name' });
        await contactHeader.waitFor({ state: 'visible' });
        await expect(contactHeader).toBeVisible();
        await page.reload();
        await contactHeader.waitFor({ state: 'visible' });
        await expect(contactHeader).toBeVisible();

        // Company Page
        await page.getByRole('link', { name: 'Companies' }).click();
        await companiesPage.CompaniesCreate_Validation();
        await companiesPage.Add_Company();
        await companiesPage.SearchCompany();
        await companiesPage.Open_Company_Details();
        const companyHeader = page.getByRole('heading', { name: 'Company Information' });
        await expect(companyHeader).toBeVisible();
        await page.reload();
        await companyHeader.waitFor({ state: 'visible' });
        await expect(companyHeader).toBeVisible();

    });
});
