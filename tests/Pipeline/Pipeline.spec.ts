import { test, expect } from '@playwright/test';
import { PipeLinePage } from '../../Pages/Pipelinepage';
import { faker } from '@faker-js/faker';


test.describe('Pipeline Tests', () => {
  let pipeLinePage: PipeLinePage;
  let createdLoanName: string | undefined;

  // ✅ No need to create new browser or context manually.
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    pipeLinePage = new PipeLinePage(page);
    console.log('🌐 Opening dashboard page before all tests...');
    await page.goto('https://crm-admin-staging.web.app/');
   // await pipeLinePage.DashboardPage();
  });



  test('⛔ TC-10 Validate loan creation blocked when mandatory fields are empty', async () => {
    console.log('➡️ Test Start: Validate loan creation blocked when mandatory fields are empty');
    await pipeLinePage.Validation_Create_Loan();
  });

  test('✅ TC-11 Create a new loan successfully when all mandatory fields are filled', async () => {
    console.log('➡️ Test Start: Create a new loan successfully when all mandatory fields are filled');
  await pipeLinePage.CreateLoan();
  });

    test('🔍 TC-08 Verify Search Bar Visibility and Functionality', async () => {
    console.log('➡️ Test Start: Verify Search Bar Visibility and Functionality');
    await pipeLinePage.Search_Valid_NewLoans();
  });

    test('✅ Verify newly created loan appears in the loan listing', async () => {
    console.log('➡️ Test Start: Verify loan status');
    await pipeLinePage.VerifyLoan_status();
  });

  test('❌ TC-09 Verify Search with Invalid/Non-Existing Keyword', async () => {
    console.log('➡️ Test Start: Verify Search with Invalid/Non-Existing Keyword');
    await pipeLinePage.Search_Invalid_NewLoans();
  });
  


});
