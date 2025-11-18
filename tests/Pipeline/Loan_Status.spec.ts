import { test, expect } from '@playwright/test';
import { PipeLinePage } from '../../Pages/Pipelinepage';
import {LoanStatus} from '../../Pages/Loan_Status'

test.describe('Pipeline screen Tests', () => {
  let loanStatusPage: LoanStatus;
    let pipeLinePage: PipeLinePage;

  let createdLoanName: string | undefined;

  // ✅ No need to create new browser or context manually.
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    loanStatusPage = new LoanStatus(page);
    pipeLinePage = new PipeLinePage(page);

    console.log('🌐 Opening dashboard page before all tests...');
    await page.goto('https://crm-admin-staging.web.app/');
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
    await loanStatusPage.Verify_Default_Status_Filter();
  });
  test('✅ TC-16Verify New Inquiry status filter functionality in pipeline', async () => {
    console.log('➡️ Test Start: Verify New Inquiry status filter functionality in pipeline');
    await loanStatusPage.Apply_Status_Filter();
  });
     test('✅ TC-24  Verify Cancel Action on Status Change Popup', async () => {
    console.log('➡️ Test Start: Verify Cancel Action on Status Change Popup');
    await loanStatusPage.StatusNPW_cancel();
   })

  test('🔄 Verify loan status can be updated from New Inquiry to Underwriting Process', async () => {
    await pipeLinePage.Validation_Create_Loan();
    await pipeLinePage.CreateLoan();
    console.log('➡️ Test Start: Verify loan status');
    await loanStatusPage.changeStatusToUnderwriting()

  })


  });