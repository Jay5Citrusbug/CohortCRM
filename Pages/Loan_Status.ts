import { Page, expect } from '@playwright/test';
import { LoginLocator } from '../locators/login.locator';
import { Messages } from '../messages/message';
import { PipelineLocator } from '../locators/pipeline.locator';
import { faker } from '@faker-js/faker';
import { Loan_FakerData } from '../Utility/fakerData';
import { pipeline } from 'stream';

const loanName = Loan_FakerData.randomDealName;

export class LoanStatus {
  readonly page: Page;


  constructor(page: Page) {
    this.page = page;
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

    async changeStatusToUnderwriting() {

    await
      console.log(`Created loan: ${loanName}`);

    // Log for debugging/reference
    console.log(`✅ Verified created loan name: ${loanName}`);
    await this.page.getByRole(PipelineLocator.Searchbar.role, { name: PipelineLocator.Searchbar.name }).isVisible();
    await this.page.getByRole(PipelineLocator.Searchbar.role, { name: PipelineLocator.Searchbar.name }).fill(loanName);
    await this.page.waitForTimeout(3000);
    await expect(
      this.page.locator('div').filter({ hasText: 'Name of loan#StatusLoan' }).nth(3)
    ).toBeVisible({ timeout: 10000 });

    await this.page.getByText('New Enquiry').first().isVisible();
    await this.page.locator("//html/body/div/div/div/div/div/div/div/div/div/div[2]/table/tbody/tr[2]/td[3]/div/div/span/span[2]").click();
    await this.page.getByText('Underwriting Process').click();
    await this.page.getByText('Confirm Status Change').click();
    await this.page.getByRole('button', { name: 'Confirm' }).click();
    await this.page.getByRole('cell', { name: 'Underwriting Process' }).first().isVisible();
    await this.page.getByRole('link', { name: 'Underwriting' }).click();
    await
      console.log(`Created loan: ${loanName}`);

    // Log for debugging/reference
    console.log(`✅ Verified created loan name: ${loanName}`);
    await this.page.getByRole('textbox', { name: 'Search New Loans' }).fill(loanName);
    await this.page.waitForTimeout(3000);


  }

}