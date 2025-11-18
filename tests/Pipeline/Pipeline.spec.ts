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

  test('⛔ TC-08 Validate loan creation blocked when mandatory fields are empty', async () => {
    console.log('➡️ Test Start: Validate loan creation blocked when mandatory fields are empty');
    await pipeLinePage.Validation_Create_Loan();
  });

  test('✅ TC-09 Create a new loan successfully when all mandatory fields are filled', async () => {
    console.log('➡️ Test Start: Create a new loan successfully when all mandatory fields are filled');
    await pipeLinePage.CreateLoan();
    console.log('➡️ Test Start: Verify loan status');

  });

  test('✅ TC-10 Loan creation and status verification successful', async () => {
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


  test('✅ TC-19  Verify navigation to Loan Detail page from Loan Listing', async () => {
    console.log('➡️ Test Start: Verify navigation to Loan Detail page from Loan Listing');
    await pipeLinePage.Loan_details();
  });

    test('✅ TC-22 Verify that validation messages are displayed for empty comment submission', async () => {
    console.log('➡️ Test Start: Verify that validation messages are displayed for empty comment submission');
    await pipeLinePage.Comment_validation();
  });

    test('✅ TC-20   Verify that clicking Cancel closes the Add Comment popup', async () => {
    console.log('➡️ Test Start:  Verify that clicking Cancel closes the Add Comment popup');
    await pipeLinePage.Comment_cancel();
  });

  test('✅ TC-20  Verify that user can successfully add a comment', async () => {
    console.log('➡️ Test Start: Verify that user can successfully add a comment');
    await pipeLinePage.Comment_Creation();
  });

  
  test('✅ TC-17  Verify Edit option opens Edit Loan pop-up screen and Discard', async () => {
    console.log('➡️ Test Start: Verify Edit option opens Edit Loan pop-up screen');
    await pipeLinePage.Edit_Loan_Discard();
  });

  test('✅ TC-18  Verify Edit option opens Edit Loan pop-up screen and editing the name', async () => {
    console.log('➡️ Test Start: Verify Edit option opens Edit Loan pop-up screen and editing the name');
    await pipeLinePage.Edit_Loan_Update();
  });

 
   });
