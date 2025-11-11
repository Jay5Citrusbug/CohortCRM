import { test, expect } from '@playwright/test';
import { PipeLinePage } from '../../Pages/Pipelinepage';

test.describe('Pipeline screen Tests', () => {
  let pipeLinePage: PipeLinePage;
  let createdLoanName: string | undefined;

  // ✅ No need to create new browser or context manually.
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    pipeLinePage = new PipeLinePage(page);
    console.log('🌐 Opening dashboard page before all tests...');
    await page.goto('https://crm-admin-staging.web.app/');
  });

  test.skip('⛔ TC-08 Validate loan creation blocked when mandatory fields are empty', async () => {
    console.log('➡️ Test Start: Validate loan creation blocked when mandatory fields are empty');
    await pipeLinePage.Validation_Create_Loan();
  });

  test.skip('✅ TC-09 Create a new loan successfully when all mandatory fields are filled', async () => {
    console.log('➡️ Test Start: Create a new loan successfully when all mandatory fields are filled');
  await pipeLinePage.CreateLoan();
  console.log('➡️ Test Start: Verify loan status');

  });

   test.skip('✅ TC-10 Loan creation and status verification successful', async () => {
    await pipeLinePage.VerifyLoan_status();
  console.log('✅ Test Completed: Loan creation and status verification successful.');
  });

    test('🔍 TC-11 Verify Search Bar Visibility and Functionality', async () => {
    console.log('➡️ Test Start: Verify Search Bar Visibility and Functionality');
    await pipeLinePage.Search_Valid_NewLoans();
  });


  test('❌ TC-12 Verify Search with Invalid/Non-Existing Keyword', async () => {
    console.log('➡️ Test Start: Verify Search with Invalid/Non-Existing Keyword');
    await pipeLinePage.Search_Invalid_NewLoans();
  });
  
  test('🔄 TC-12 Verify cohort invest toggle updates state and refreshes screen with new tabs', async () => {
    console.log('➡️ Test Start: Verify cohort invest toggle updates state and refreshes screen with new tabs');
    await pipeLinePage.Verify_Cohort_Invest_Toggle();
  });
  test('🔍 TC-13 Verify MCQ filtering functionality in pipeline', async () => {
      console.log('➡️ Test Start: Verify MCQ filtering functionality in pipeline');
      await pipeLinePage.MCQ_Filtering();
});
  test('🔍 TC-14 Verify Status filtering functionality in pipeline', async () =>
    {
      console.log('➡️ Test Start: Verify Status filtering functionality in pipeline');
      await pipeLinePage.Verify_Default_Status_Filter();
});
  test('✅ TC-15  Verify New Inquiry status filter functionality in pipeline', async () => {
    console.log('➡️ Test Start: Verify New Inquiry status filter functionality in pipeline');
    await pipeLinePage.Apply_Status_Filter();
  });
    test('✅ TC-16  Verify navigation to Loan Detail page from Loan Listing', async () => {
    console.log('➡️ Test Start: Verify navigation to Loan Detail page from Loan Listing');
    await pipeLinePage.Loan_Listing();
  });
});