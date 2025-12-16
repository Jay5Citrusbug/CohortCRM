import { Page, expect } from '@playwright/test';
import { PipelineLocator } from '../locators/pipeline.locator';
import { PipeLinePage } from '../Pages/Pipelinepage';
import { Loan_FakerData } from '../Utility/fakerData';
import { faker } from '@faker-js/faker/locale/af_ZA';

const loanName = Loan_FakerData.randomDealName;
let pipeLinePage: PipeLinePage;

export class LoanStatus {
  readonly page: Page;


  constructor(page: Page) {
    this.page = page;
  }

  async Verify_Default_Status_Filter() {
    await this.page.getByText(PipelineLocator.PipelineTab.name).click();

    console.log('🔹 Starting New Enquiry filter verification...');
    await this.page.reload();
    await this.page.waitForTimeout(5000);
    console.log('✅ Page reloaded.');
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
    await this.page.reload();
    console.log('✅ Page reloaded.');

  }

  async Apply_Status_Filter() {

    await this.page.getByLabel('Status').getByRole(PipelineLocator.StatusFilter.role, { name: PipelineLocator.StatusFilter.name }).click();
    console.log('✅ Filter dropdown opened.');

    console.log('🔹 Starting Status filter verification...');
    await this.page.getByRole(PipelineLocator.Reset.role, { name: PipelineLocator.Reset.name }).isVisible();
    await this.page.getByRole(PipelineLocator.Reset.role, { name: PipelineLocator.Reset.name }).click();
    console.log('✅ Filter reset to default.');

    // await this.page.getByRole(PipelineLocator.newEnquiryStatus.role, { name: PipelineLocator.newEnquiryStatus.name }).getByLabel('', { exact: true }).check();
    // console.log('✅ New Enquiry status checked.');
    await this.page.getByText('NPW').click();
    console.log('✅ NPW status checked.');
    await this.page.getByRole(PipelineLocator.OK_Button.role, { name: PipelineLocator.OK_Button.name }).click();
    console.log('✅ New Enquiry status checked and filter applied.');
    await expect(this.page.getByTitle('NPW').first()).toBeVisible();
    //await expect(this.page.getByText(PipelineLocator.NewEnquiryStatus_grid.name).first()).toBeVisible();

  }
  async StatusNPW_cancel() {
    await this.page.getByRole('textbox', { name: 'Search New Loans' }).clear();
    console.log('🔹 Starting Status Change popup cancellation verification...');
    await this.page.getByRole('textbox', { name: 'Search New Loans' }).fill(loanName);

    const npwOption = this.page.locator(PipelineLocator.ChangeStatus.locator);
    await npwOption.waitFor({ state: 'visible' });
    await npwOption.isVisible();
    await npwOption.click();
    await this.page.waitForTimeout(4000);
    const npwText = this.page.locator('text=NPW', {
      hasNot: this.page.locator('[aria-hidden="true"]')
    });

    await npwText.waitFor({ state: 'visible' });
    await npwText.click();

    await this.page.getByText(PipelineLocator.ConfirmStatusChange.text).isVisible();
    await this.page.getByRole(PipelineLocator.CancelButton.role, { name: PipelineLocator.CancelButton.name }).click();

    await expect(
      this.page.getByRole(PipelineLocator.CancelButton.role, { name: PipelineLocator.CancelButton.name })).not.toBeVisible();
  }

  async npwReasonCancel() {
    console.log('🔹 Starting NPW reason popup cancellation verification...');
    const npwOption = this.page.locator(PipelineLocator.ChangeStatus.locator);
    await npwOption.waitFor({ state: 'visible' });
    await npwOption.isVisible();
    await npwOption.click();
    await this.page.waitForTimeout(4000);
    const npwText = this.page.locator('text=NPW', {
      hasNot: this.page.locator('[aria-hidden="true"]')
    });

    await npwText.waitFor({ state: 'visible' });
    await npwText.click();

    await this.page.getByText(PipelineLocator.ConfirmStatusChange.text).isVisible();

    await this.page.getByRole(PipelineLocator.PopupDialog.role).getByText(PipelineLocator.PopupNPWText.dialogNPWText, { exact: true }).isVisible();
    await this.page.waitForTimeout(3000);
    await this.page.getByRole(PipelineLocator.PopupCancelButton.role, { name: PipelineLocator.PopupCancelButton.name }).isVisible();
    await this.page.getByRole(PipelineLocator.PopupCancelButton.role, { name: PipelineLocator.PopupCancelButton.name }).click();
    await expect(this.page.getByRole(PipelineLocator.PopupDialog.role)).not.toBeVisible();
  }

  async ChangeStatusToNPW() {
    console.log('🔹 Starting NPW reason popup cancellation verification...');
    const npwOption = this.page.locator(PipelineLocator.ChangeStatus.locator);
    await npwOption.waitFor({ state: 'visible' });
    await npwOption.isVisible();
    await npwOption.click();
    await this.page.waitForTimeout(4000);
    const npwText = this.page.locator('text=NPW', {
      hasNot: this.page.locator('[aria-hidden="true"]')
    });

    await npwText.waitFor({ state: 'visible' });
    await npwText.click();

    await this.page.getByText(PipelineLocator.ConfirmStatusChange.text).isVisible();

    await this.page.getByRole(PipelineLocator.PopupDialog.role).getByText(PipelineLocator.PopupNPWText.dialogNPWText, { exact: true }).isVisible();
    await this.page.waitForTimeout(3000);
    await this.page.getByRole(PipelineLocator.NPWPopupconfirmButton.role, { name: PipelineLocator.NPWPopupconfirmButton.name }).isVisible();
    await this.page.getByRole(PipelineLocator.NPWPopupconfirmButton.role, { name: PipelineLocator.NPWPopupconfirmButton.name }).click();
    await this.page.getByRole('dialog').getByText('NPW', { exact: true }).isVisible();
    await this.page.locator('#Npw-form_reason').fill("Lost");
    await this.page.keyboard.press('Enter');
    await this.page.locator('#Npw-form_lostReason').isVisible();

    await this.page.keyboard.press('Enter');

    await this.page.locator('#Npw-form_lostReason').fill("rate too high");
    await this.page.keyboard.press('Enter');

    await this.page.getByTestId('npwComments').fill(faker.lorem.sentence());
    await this.page.getByTestId('save-btn').click();
    await this.page.waitForTimeout(5000);
    await this.page.getByRole('textbox', { name: 'Search New Loans' }).fill(loanName);

    console.log('✅ NPW status change completed successfully.');
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await expect(
      this.page.getByText(PipelineLocator.NoDataText.name).nth(1)
    ).toBeVisible();
    await this.page.getByRole('link', { name: 'Pipeline' }).click();

    //await this.Apply_Status_Filter();

    await this.page.getByRole('link', { name: 'Pipeline' }).click();
    await this.page.waitForTimeout(5000);
    await this.Apply_Status_Filter();

    // Search for the loan
    const searchBox = this.page.locator('//html/body/div/div/div/header/div[1]/div/input');

    await expect(searchBox).toBeVisible();
    await searchBox.click({ force: true });

    // Clear first
    await searchBox.fill(loanName, { timeout: 5000 });

    // Type with delay (important for React search)
    // Wait for search result
    await expect(this.page.getByRole('cell', { name: 'NPW' })).toBeVisible();

  }

  async changeStatusToUnderwriting() {
    console.log(`✅ Verified created loan name: ${loanName}`);

    // Wait for search bar visible, then type loan name
    const searchBar = this.page.getByRole(PipelineLocator.Searchbar.role, {
      name: PipelineLocator.Searchbar.name
    });
    await expect(searchBar).toBeVisible();
    await searchBar.fill(loanName);

    // ⛔ Removed static wait — replaced with dynamic wait for loan row
    await expect(
      this.page.locator('div').filter({ hasText: 'Name of loan#StatusLoan' }).nth(3)
    ).toBeVisible({ timeout: 10000 });

    // Wait for “New Enquiry” to be visible instead of checking .isVisible()
    const newEnquiry = this.page.getByText('New Enquiry').first();
    await expect(newEnquiry).toBeVisible();

    // Click the status dropdown
    const statusDropdown = this.page.locator(
      "//html/body/div/div/div/div/div/div/div/div/div/div[2]/table/tbody/tr[2]/td[3]/div/div/span/span[2]"
    );
    await expect(statusDropdown).toBeVisible();
    await statusDropdown.click();

    // Select "Underwriting Process"
    const underwritingOption = this.page.getByText('Underwriting Process');
    await expect(underwritingOption).toBeVisible();
    await underwritingOption.click();

    // Confirm status change popup
    const confirmStatusChange = this.page.getByText('Confirm Status Change');
    await expect(confirmStatusChange).toBeVisible();
    await confirmStatusChange.click();

    const confirmButton = this.page.getByRole('button', { name: 'Confirm' });
    await expect(confirmButton).toBeVisible();
    await confirmButton.click();

    // Run pipeline search for new loans
    pipeLinePage = new PipeLinePage(this.page);
    await pipeLinePage.Search_Valid_NewLoans();

    const searchBox = this.page.getByRole(PipelineLocator.Searchbar.role, {
      name: PipelineLocator.Searchbar.name
    });

    // Verify status changed to "Underwriting Process"
    const uwCell = this.page.getByRole('cell', { name: 'Underwriting Process' }).first();
    await expect(uwCell).toBeVisible({ timeout: 10000 });

    // Clear search
    await expect(searchBox).toBeVisible();
    await searchBox.clear();
  }

  async VerifyUnderwritingTab() {

    await this.page.getByRole('link', { name: 'Underwriting' }).click();
    await
      console.log(`Created loan: ${loanName}`);

    // Log for debugging/reference
    console.log(`✅ Verified created loan name: ${loanName}`);
    await this.page.getByRole('textbox', { name: 'Search New Loans' }).fill(loanName);
    // await this.page.waitForTimeout(3000);
    await expect(
      this.page.getByText('Underwriting Process').first()
    ).toBeVisible({ timeout: 6000 });


  }

  async changeStatusToLiveLoan() {
    await this.page.locator("//html/body/div/div/div/div/div/div/div/div/div/div[2]/table/tbody/tr[2]/td[3]/div/div/span/span[2]").click();
    await this.page.getByText('Loan Live').nth(1).click();
    await this.page.getByText('Confirm Status Change').click();
    await this.page.getByRole('button', { name: 'Confirm' }).click();

    const searchBox = this.page.getByRole(PipelineLocator.Searchbar.role, {
      name: PipelineLocator.Searchbar.name
    });
    await searchBox.fill(loanName);
    await expect(this.page.getByRole('cell', { name: 'Loan Live' }).first()).toBeHidden({ timeout: 3000 });

  }

  async Verify_LiveLoanTab() {

    await this.page.getByRole('link', { name: 'Live Loans' }).click();
    console.log(`✅ Verified updated loan status: ${loanName}`);
    await this.page.getByRole('textbox', { name: 'Search New Loans' }).fill(loanName);
    // await this.page.getByRole('textbox', { name: 'Search New Loans' }).fill("Automation Loan gT57NV");
    await this.page.waitForTimeout(3000);

    await expect(
      this.page.getByText('Loan Live').first()
    ).toBeVisible({ timeout: 3000 });

  }
}

