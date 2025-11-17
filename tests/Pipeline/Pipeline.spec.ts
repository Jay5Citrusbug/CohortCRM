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

  test.skip('🔍 TC-11 Verify Search Bar Visibility and Functionality', async () => {
    console.log('➡️ Test Start: Verify Search Bar Visibility and Functionality');
    await pipeLinePage.Search_Valid_NewLoans();
  });


  test('❌ TC-12 Verify Search with Invalid/Non-Existing Keyword', async () => {
    console.log('➡️ Test Start: Verify Search with Invalid/Non-Existing Keyword');
    await pipeLinePage.Search_Invalid_NewLoans();
  });

  test('🔄 TC-13 Verify cohort invest toggle updates state and refreshes screen with new tabs', async () => {
    console.log('➡️ Test Start: Verify cohort invest toggle updates state and refreshes screen with new tabs');
    await pipeLinePage.Verify_Cohort_Invest_Toggle();
  });
  test('🔍 TC-14 Verify MCQ filtering functionality in pipeline', async () => {
    console.log('➡️ Test Start: Verify MCQ filtering functionality in pipeline');
    await pipeLinePage.MCQ_Filtering();
  });
  test('🔍 TC-15 Verify Status filtering functionality in pipeline', async () => {
    console.log('➡️ Test Start: Verify Status filtering functionality in pipeline');
    await pipeLinePage.Verify_Default_Status_Filter();
  });
  test('✅ TC-16Verify New Inquiry status filter functionality in pipeline', async () => {
    console.log('➡️ Test Start: Verify New Inquiry status filter functionality in pipeline');
    await pipeLinePage.Apply_Status_Filter();
  });

  test('✅ TC-17  Verify Edit option opens Edit Loan pop-up screen and Discrd', async () => {
    console.log('➡️ Test Start: Verify Edit option opens Edit Loan pop-up screen');
    await pipeLinePage.Edit_Loan_Discard();
  });

  test('✅ TC-18  Verify Edit option opens Edit Loan pop-up screen and editing the name', async () => {
    console.log('➡️ Test Start: Verify Edit option opens Edit Loan pop-up screen and editing the name');
    await pipeLinePage.Edit_Loan_Update();
  });
  test('🔄 Verify loan status can be updated from New Inquiry to Underwriting Process', async () => {
    await pipeLinePage.Validation_Create_Loan();

    await pipeLinePage.CreateLoan();
    console.log('➡️ Test Start: Verify loan status');
    await pipeLinePage.changeStatusToUnderwriting()


  })

  test('✅ TC-19  Verify navigation to Loan Detail page from Loan Listing', async () => {
    console.log('➡️ Test Start: Verify navigation to Loan Detail page from Loan Listing');
    await pipeLinePage.Loan_Listing();
  });
  test('✅ TC-20   Verify that clicking Cancel closes the Add Comment popup', async () => {
    console.log('➡️ Test Start:  Verify that clicking Cancel closes the Add Comment popup');
    await pipeLinePage.Comment_cancel();
  });

  test('✅ TC-22 Verify that validation messages are displayed for empty comment submission', async () => {
    console.log('➡️ Test Start: Verify that validation messages are displayed for empty comment submission');
    await pipeLinePage.Comment_validation();
  });
  test('✅ TC-23  Verify that user can successfully add a comment', async () => {
    console.log('➡️ Test Start: Verify that user can successfully add a comment');
    await pipeLinePage.Comment_Creation();
  });
  
  //  test.skip('✅ TC-24  Verify Cancel Action on Status Change Popup', async () => {
  //   console.log('➡️ Test Start: Verify Cancel Action on Status Change Popup');
  //   await pipeLinePage.StatusNPW_cancel();
  // });
});