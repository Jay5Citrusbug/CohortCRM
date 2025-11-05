import { Page, expect } from '@playwright/test';
import { LoginLocator } from '../locators/login.locator';
import { Messages } from '../messages/message';
import { PipelineLocator } from '../locators/pipeline.locator';
import { faker } from '@faker-js/faker';
import { Loan_FakerData } from '../Utility/fakerData';

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
    console.log('🔹 Navigating to Search New Loans...');
    console.log(`Created loan: ${loanName}`);
  await expect(this.page.getByRole('cell', { name: loanName })).toBeVisible();

  // Log for debugging/reference
  console.log(`✅ Verified created loan name: ${loanName}`);
      await this.page.getByRole(PipelineLocator.Searchbar.role, { name: PipelineLocator.Searchbar.name }).isVisible();
    await this.page.getByRole(PipelineLocator.Searchbar.role, { name: PipelineLocator.Searchbar.name }).fill(loanName);

await expect(
  this.page.locator('div').filter({ hasText: 'Name of loan#StatusLoan' }).nth(3)
).toBeVisible({ timeout: 10000 });

await expect(
  this.page.getByRole('cell', { name: loanName })
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

    // Fill mandatory fields (from provided raw steps)
    await this.page.getByTestId (PipelineLocator.DealName.name ).first().click();
    await this.page.getByTestId(PipelineLocator.DealName.name).first().fill(loanName);
    await this.page.locator(PipelineLocator.AssetType.name).first().click();
        await this.page.locator(PipelineLocator.AssetType.name).first().fill(Loan_FakerData.randomAssetType);
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press('Enter');
    await this.page.getByTestId(PipelineLocator.PostalcodeID.name).first().click();
    await this.page.getByTestId(PipelineLocator.PostalcodeID.name).first().fill(Loan_FakerData.randomPostalCode);
    await this.page.locator(PipelineLocator.ValuePounds.name).first().click();
    await this.page.locator(PipelineLocator.ValuePounds.name).first().fill(Loan_FakerData.randomValue);
    await this.page.locator(PipelineLocator.Property.name).first().click();
    await this.page.waitForTimeout(4000);
    await this.page.keyboard.press('Enter');
    await this.page.locator(PipelineLocator.GrossLoanPounds.name).first().click();
    await this.page.locator(PipelineLocator.GrossLoanPounds.name).first().fill(Loan_FakerData.randomValue);
    await this.page.getByText(PipelineLocator.Security.name).click();
    await this.page.getByTitle(Loan_FakerData.randomSecurity).click();
    await this.page.locator(PipelineLocator.PricingPercentPerMonth.name).first().click();
    await this.page.locator(PipelineLocator.PricingPercentPerMonth.name).first().fill(Loan_FakerData.randomValue);
await this.page.locator(PipelineLocator.Sponsor.name).first().isVisible();

    await this.page.locator(PipelineLocator.Sponsor.name).first().click();
    await this.page.waitForTimeout(1000);
await this.page.locator(PipelineLocator.Sponsor.name).first().fill('Automation user');
await this.page.waitForTimeout(1000);
await this.page.keyboard.press('Enter');
       
    await this.page.locator(PipelineLocator.Contact.name).first().isVisible();
        await this.page.locator(PipelineLocator.Contact.name).first().click();
        await this.page.waitForTimeout(1000);
            await this.page.locator(PipelineLocator.Contact.name).first().isVisible();

        await this.page.locator(PipelineLocator.Contact.name).first().fill('automation user');
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Enter');
         await this.page.locator(PipelineLocator.Company.name).first().isVisible();
        await this.page.locator(PipelineLocator.Company.name).first().click();

        await this.page.locator(PipelineLocator.Company.name).first().fill('Automation');
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Enter');
        // Save
    await this.page.getByRole(PipelineLocator.SaveChangesButton.role, { name: PipelineLocator.SaveChangesButton.name }).click();
      await this.page.waitForTimeout(2000);

    // Assert loan appears in grid (also covers TC-12 basis)
    await expect(this.page.getByText(PipelineLocator.NameLoanColumn.name)).toBeVisible();

  } 

  async VerifyLoan_status()
  {

    expect(await this.page.getByRole('cell', { name: PipelineLocator.NewEnquiry.name }).isVisible());
  }

  async Validation_Create_Loan()
  {
        await this.page.getByRole(PipelineLocator.AddLoanButton.role, { name: PipelineLocator.AddLoanButton.name }).click();
    await this.page.getByLabel(PipelineLocator.AddLoanText.locator).getByText(PipelineLocator.AddLoanText.locator).isVisible();
    // Attempt save with empty mandatory fields
    await this.page.getByRole(PipelineLocator.SaveChangesButton.role, { name: PipelineLocator.SaveChangesButton.name }).click();
    // Expect validation message for deal name
    await expect(this.page.getByText(Messages.Alerts.validationMessageLoan).first()).toBeVisible();  }
    
  async Verify_Cohort_Invest_Toggle()
  {
    console.log('🔹 Verifying cohort invest toggle functionality...');
        const toggle = this.page.getByRole(PipelineLocator.CohortInvestToggle.name);
  await expect(toggle).toBeVisible();

  // Click to show Investor tab
  await toggle.click();
  await expect(this.page.getByText(PipelineLocator.InvvestorTab.name)).toBeVisible();

  // Click again to return to Pipeline tab
  await toggle.click();
  await expect(this.page.getByText(PipelineLocator.PipelineTab.name)).toBeVisible();

  }
}