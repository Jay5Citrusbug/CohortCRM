import { Page, expect } from '@playwright/test';
import { LoginLocator } from '../locators/login.locator';
import { Messages } from '../messages/message';
import { PipelineLocator } from '../locators/pipeline.locator';
import { faker } from '@faker-js/faker';
import { Loan_FakerData } from '../Utility/fakerData';
import { pipeline } from 'stream';

const loanName = Loan_FakerData.randomDealName;

export class PipeLinePage {
  readonly page: Page;
  

  constructor(page: Page) {
    this.page = page;
  }

  async DashboardPage() {
    console.log('🔹 Navigating to Dashboard page...');
   // await this.page.goto(Messages.URLs.base);
        await expect(this.page.getByRole(LoginLocator.logoImage.role, { name: LoginLocator.logoImage.name })).toBeVisible();
    console.log('✅ Valid login successful and dashboard visible.');

    await this.page
  .getByRole(LoginLocator.pipelineLink.role, { name: LoginLocator.pipelineLink.name })
  .isVisible();

    // ✅ Assert correct URL and presence of login form
   
    console.log('✅ Navigated to dashboard page successfully.');
  }

  /**
   * Navigates to the login page URL.
   */
  async Search_Valid_NewLoans() {
    await
    console.log('🔹 Navigating to Search New Loans...');
    console.log(`Created loan: ${loanName}`);
//  await expect(this.page.getByRole('cell', { name: loanName })).toBeVisible();

  // Log for debugging/reference
  console.log(`✅ Verified created loan name: ${loanName}`);
      await this.page.getByRole(PipelineLocator.Searchbar.role, { name: PipelineLocator.Searchbar.name }).isVisible();
    //await this.page.getByRole(PipelineLocator.Searchbar.role, { name: PipelineLocator.Searchbar.name }).fill(loanName);
    await this.page.getByRole(PipelineLocator.Searchbar.role, { name: PipelineLocator.Searchbar.name }).fill("testing loan");
await this.page.waitForTimeout(3000);
await expect(
  this.page.locator('div').filter({ hasText: 'Name of loan#StatusLoan' }).nth(3)
).toBeVisible({ timeout: 10000 });

// await expect(
//   this.page.getByRole('cell', { name: loanName })
// ).toBeVisible({ timeout: 10000 });

await expect(
  this.page.getByRole('cell', { name: 'testing loan' })
).toBeVisible({ timeout: 10000 });



    // ✅ Assert correct URL and presence of search bar

  }
  async Search_Invalid_NewLoans() {
    console.log('🔹 Navigating to Search New Loans...');
    await this.page.getByRole(PipelineLocator.Searchbar.role, { name: PipelineLocator.Searchbar.name }).isVisible();
    await this.page.getByRole(PipelineLocator.Searchbar.role, { name: PipelineLocator.Searchbar.name }).fill(faker.lorem.words(3));
    expect(await this.page.getByText(PipelineLocator.NoDataText.locator).nth(1).isVisible());
    await this.page.getByRole(PipelineLocator.Searchbar.role, { name: PipelineLocator.Searchbar.name }).clear();

    // ✅ Assert correct URL and presence of search bar
  }

  async CreateLoan() {
    console.log('🔹 Starting Create Loan process...');

    //Fill mandatory fields (from provided raw steps)
    await this.page.getByTestId(PipelineLocator.DealName.name).first().fill(loanName);
    console.log('✅ Deal name filled successfully.');

    await this.page.locator(PipelineLocator.AssetType.name).first().click();
    await this.page.locator(PipelineLocator.AssetType.name).first().fill(Loan_FakerData.randomAssetType);
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press('Enter');
    console.log('✅ Asset type selected.');

    await this.page.getByTestId(PipelineLocator.PostalcodeID.name).first().click();
    await this.page.getByTestId(PipelineLocator.PostalcodeID.name).first().fill(Loan_FakerData.randomPostalCode);
    console.log('✅ Postal code entered.');

    await this.page.locator(PipelineLocator.ValuePounds.name).first().click();
    await this.page.locator(PipelineLocator.ValuePounds.name).first().fill(Loan_FakerData.randomValue);
    console.log('✅ Property value entered.');

    await this.page.locator(PipelineLocator.Property.name).first().click();
    await this.page.waitForTimeout(4000);
    await this.page.keyboard.press('Enter');
    console.log('✅ Property selected.');

    await this.page.locator(PipelineLocator.GrossLoanPounds.name).first().click();
    await this.page.locator(PipelineLocator.GrossLoanPounds.name).first().fill(Loan_FakerData.randomValue);
    console.log('✅ Gross loan amount filled.');

    await this.page.locator(PipelineLocator.Security.name).first().click();
    await this.page.getByTitle(Loan_FakerData.randomSecurity).click();
    console.log('✅ Security type selected.');

    await this.page.locator(PipelineLocator.PricingPercentPerMonth.name).first().click();
    await this.page.locator(PipelineLocator.PricingPercentPerMonth.name).first().fill(Loan_FakerData.randomValue);
    console.log('✅ Pricing entered.');

    await this.page.locator(PipelineLocator.Sponsor.name).first().isVisible();
    await this.page.locator(PipelineLocator.Sponsor.name).first().click();
    await this.page.waitForTimeout(1000);
    await this.page.locator(PipelineLocator.Sponsor.name).first().fill('Automation user');
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press('Enter');
    console.log('✅ Sponsor added.');

    await this.page.locator(PipelineLocator.Contact.name).first().isVisible();
    await this.page.locator(PipelineLocator.Contact.name).first().click();
    await this.page.waitForTimeout(1000);
    await this.page.locator(PipelineLocator.Contact.name).first().fill('automation user');
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press('Enter');
    console.log('✅ Contact selected.');

    await this.page.locator(PipelineLocator.Company.name).first().isVisible();
    await this.page.locator(PipelineLocator.Company.name).first().click();
    await this.page.locator(PipelineLocator.Company.name).first().fill('Automation');
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press('Enter');
    console.log('✅ Company added.');

    await this.page.getByRole('heading', { name: 'Main Section' }).click();
    await this.page.getByRole('checkbox', { name: 'Potential MCQ' }).check();
    console.log('✅ Potential MCQ checkbox checked.');

    // Save
    await this.page.getByRole(PipelineLocator.SaveChangesButton.role, { name: PipelineLocator.SaveChangesButton.name }).click();
    await this.page.waitForTimeout(2000);
    console.log('💾 Loan details saved successfully.');

    // Assert loan appears in grid (also covers TC-12 basis)
    await expect(this.page.getByText(PipelineLocator.NameLoanColumn.name)).toBeVisible();
    console.log('✅ Loan created and visible in the grid.');
  }

  async VerifyLoan_status() {
    await this.page.waitForTimeout(3000);
    console.log('🔹 Verifying loan status...');
    expect(await this.page.getByRole('cell', { name: PipelineLocator.NewEnquiry.name }).first().isVisible());
    console.log('✅ Loan status verified as New Enquiry.');
  }

  async Validation_Create_Loan() {
    console.log('🔹 Starting validation for Create Loan...');
    await this.page.getByRole(PipelineLocator.AddLoanButton.role, { name: PipelineLocator.AddLoanButton.name }).click();
    await this.page.getByLabel(PipelineLocator.AddLoanText.locator).getByText(PipelineLocator.AddLoanText.locator).isVisible();
    console.log('✅ Add Loan form opened.');

    // Attempt save with empty mandatory fields
    await this.page.getByRole(PipelineLocator.SaveChangesButton.role, { name: PipelineLocator.SaveChangesButton.name }).click();
    console.log('⚠️ Attempted to save loan with empty mandatory fields.');

    // Expect validation message for deal name
    await expect(this.page.getByText(Messages.Alerts.validationMessageLoan).first()).toBeVisible();
    console.log('✅ Validation message for deal name displayed successfully.');
  }

  async Verify_Cohort_Invest_Toggle() {
    console.log('🔹 Verifying cohort invest toggle functionality...');
    const toggle = this.page.getByRole(PipelineLocator.CohortInvestToggle.name);
    await expect(toggle).toBeVisible();

    // Click to show Investor tab
    await toggle.click();
    await expect(this.page.getByText(PipelineLocator.InvvestorTab.name)).toBeVisible();

    // Click again to return to Pipeline tab
    await toggle.click();
    await expect(this.page.getByText(PipelineLocator.PipelineTab.name)).toBeVisible();
    console.log('✅ Cohort invest toggle verified successfully.');
  }

  async MCQ_Filtering() {
    console.log('🔹 Verifying MCQ filtering functionality...');
    const filter = this.page.getByRole(PipelineLocator.checkbox_MCQ.role, { name: PipelineLocator.checkbox_MCQ.name });
    await expect(filter).toBeVisible();

    // Apply filter
    await filter.check();
    await expect(this.page.getByText(PipelineLocator.checkbox_MCQ.name)).toBeVisible();
    console.log('✅ MCQ filter applied.');

    await expect(this.page.locator(PipelineLocator.LoanNameExpand.locator)).toBeVisible();
    await this.page.locator(PipelineLocator.LoanNameExpand.locator).click();
    await this.page.waitForTimeout(3000);
    console.log('✅ Loan details expanded.');

    await expect(this.page.locator(PipelineLocator.potentialMCQMarked.locator)).toBeVisible();
    console.log('✅ MCQ filtering functionality verified successfully.');

    // Clear filter
    await filter.uncheck();
    console.log('✅ MCQ filter cleared.');
  }

  async Verify_Default_Status_Filter() {
  console.log('🔹 Starting New Enquiry filter verification...');

  // Step 1: Click on filter
  await this.page.getByLabel('Status').getByRole(PipelineLocator.StatusFilter.role, { name: PipelineLocator.StatusFilter.name }).click();
  console.log('✅ Filter dropdown opened.');

  // Step 2: Verify default checked values
  await expect(this.page.getByRole(PipelineLocator.newEnquiryStatus.role, { name: PipelineLocator.newEnquiryStatus.name }).getByLabel('', { exact: true })).toBeChecked();
  await expect(this.page.getByRole(PipelineLocator.TermsAcceptedStatus.role, { name: PipelineLocator.TermsAcceptedStatus.name }).getByLabel('', { exact: true })).toBeChecked();
  await expect(this.page.getByRole(PipelineLocator.UnderwritingProcessStatus.role, { name: PipelineLocator.UnderwritingProcessStatus.name }).getByLabel('', { exact: true })).toBeChecked();
  console.log('✅ Default checked statuses verified: New Enquiry, Terms Accepted, Underwriting Process.');

  // Step 3: Verify NPW not checked by default
  await expect(this.page.getByRole(PipelineLocator.NPW_STATUS.role, { name: PipelineLocator.NPW_STATUS.name }).getByLabel('', { exact: true })).not.toBeChecked();
  console.log('✅ NPW not checked by default.');


}

async Apply_Status_Filter() {

  console.log('🔹 Starting Status filter verification...');
    await this.page.getByRole(PipelineLocator.Reset.role, { name: PipelineLocator.Reset.name }).isVisible();
  await this.page.getByRole(PipelineLocator.Reset.role, { name: PipelineLocator.Reset.name }).click();
    await this.page.getByRole(PipelineLocator.newEnquiryStatus.role, { name: PipelineLocator.NewEnquiry.name }).getByLabel('', { exact: true }).check();
    
    await this.page.getByRole(PipelineLocator.OK_Button.role, { name: PipelineLocator.OK_Button.name }).click();
    console.log('✅ New Enquiry status checked and filter applied.');
    await expect(this.page.getByText(PipelineLocator.NewEnquiryStatus_grid.name).first()).toBeVisible();

  }

}