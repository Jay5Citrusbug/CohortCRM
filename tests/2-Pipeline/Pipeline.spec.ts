import { test, expect } from '@playwright/test';
import { PipeLinePage } from '../../Pages/Pipelinepage';

test.describe('Pipeline screen Tests', () => {
  test.describe.configure({ mode: 'serial' });
  let pipeLinePage: PipeLinePage;
  let createdLoanName: string | undefined;

  // ✅ No need to create new browser or context manually.
  test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    pipeLinePage = new PipeLinePage(page);
    console.log('🌐 Opening dashboard page before all tests...');
    await page.goto('https://crm-admin-staging.vercel.app/');
  });

  test('⛔ TC-08 Validate loan creation blocked when mandatory fields are empty', async () => {
    console.log('➡️ Test Start: Validate loan creation blocked when mandatory fields are empty');
    await pipeLinePage.Validation_Create_Loan();
  });

  test('✅ TC-09 Create a new loan successfully when all mandatory fields are filled', async () => {
    test.setTimeout(120000); // ✅ loan creation is multi-step — give it 2 minutes
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

  test('✅ TC-18  Verify Edit option opens Edit Loan pop-up screen and editing the name', async () => {
    console.log('➡️ Test Start: Verify Edit option opens Edit Loan pop-up screen and editing the name');
    await pipeLinePage.Edit_Loan_Update();
  });

  test('✅ TC-19  Verify navigation to Loan Detail page from Loan Listing', async () => {
    console.log('➡️ Test Start: Verify navigation to Loan Detail page from Loan Listing');
    await pipeLinePage.Loan_details();
  });

  test('✅ TC-20  Verify that user can successfully add a comment', async () => {
    console.log('➡️ Test Start: Verify that user can successfully add a comment');
    await pipeLinePage.Comment_Creation();
  });
  test('✅ TC-21  Verify that user can successfully edit a comment', async () => {
    console.log('➡️ Test Start: Verify that user can successfully edit a comment');
    await pipeLinePage.Comment_Edit();
  });

  test('✅ TC-22 Verify that clicking delete the comment gets deleted', async () => {
    console.log('➡️ Test Start: Verify that clicking delete the comment gets deleted');
    await pipeLinePage.Comment_delete();
  });

  test('✅ TC-23 Verify that comment is added in the Post Completion', async () => {
    console.log('➡️ Test Start: Verify that clicking delete the comment gets deleted');
    await pipeLinePage.PostCompleteion_add_comment();
  });

  test('✅ TC-24 Verify that status is changed in the Post Completion', async () => {
    console.log('➡️ Test Start: Verify that status is changed in the Post Completion');
    await pipeLinePage.PostCompleteion_Status_change();
  });
  test('✅ TC-25 Verify that person and trust are been added in the ownership structure', async () => {
    console.log('➡️ Test Start: Verify that person and trust are been added in the ownership structure');
    await pipeLinePage.Ownership_person_trust();
  });

  test('✅ TC-26 Verify that company is been added in the ownership structure', async () => {
    console.log('➡️ Test Start: Verify that company is been added in the ownership structure');
    await pipeLinePage.Ownership_company();
  });

  test('✅ TC-28  Verify Edit option opens Edit Loan pop-up screen and Discard', async () => {
    console.log('➡️ Test Start: Verify Edit option opens Edit Loan pop-up screen');
    await pipeLinePage.Edit_Loan_Discard();
  });


});

