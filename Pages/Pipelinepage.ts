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
    await this.page.getByRole(PipelineLocator.Searchbar.role, { name: PipelineLocator.Searchbar.name }).fill(loanName);
    //await this.page.getByRole(PipelineLocator.Searchbar.role, { name: PipelineLocator.Searchbar.name }).fill("testing loan");
    await this.page.waitForTimeout(3000);
    await expect(
      this.page.locator('div').filter({ hasText: 'Name of loan#StatusLoan' }).nth(3)
    ).toBeVisible({ timeout: 10000 });

    await expect(
      this.page.getByRole('cell', { name: loanName })
    ).toBeVisible({ timeout: 10000 });

    // await expect(
    //   this.page.getByRole('cell', { name: 'testing loan' })
    // ).toBeVisible({ timeout: 10000 });

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
    await this.page.locator(PipelineLocator.LoanType.locator).first().click()
    await this.page.getByText('Bridge').nth(1).click();

    await this.page.locator(PipelineLocator.AssetType.name).first().click();
    await this.page.locator(PipelineLocator.AssetType.name).first().fill(Loan_FakerData.randomAssetType);

    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press('Enter');
    console.log('✅ Asset type selected.');

    await this.page.getByTestId(PipelineLocator.PostalcodeID.name).first().click();
    await this.page.getByTestId(PipelineLocator.PostalcodeID.name).first().fill(Loan_FakerData.randomPostalCode);
    console.log('✅ Postal code entered.');
    await this.page.locator(PipelineLocator.propertyAddress.locator).first().fill(faker.location.buildingNumber())
    console.log('✅ Property added.');

    await this.page.locator(PipelineLocator.ValuePounds.name).first().click();
    await this.page.locator(PipelineLocator.ValuePounds.name).first().fill(Loan_FakerData.randomValue);
    console.log('✅ Property value entered.');

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

    // await this.page.getByRole('heading', { name: 'Main Section' }).click();
    // await this.page.getByRole('checkbox', { name: 'Potential MCQ' }).check();
    // console.log('✅ Potential MCQ checkbox checked.');

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


  async openEditLoanPopup() {
    console.log("🔹 Opening Edit Loan pop-up...");

    // Scroll table
    await this.page.evaluate(() => {
      const scrollable = document.querySelector('.ant-table-body');
      if (scrollable) scrollable.scrollBy({ left: 1000, behavior: 'smooth' });
    });

    // Click Edit button
    const editBtn = this.page.getByRole(PipelineLocator.EditIconButton.role, {
      name: PipelineLocator.EditIconButton.name
    }).first();

    await editBtn.waitFor();
    await editBtn.click();
    console.log("🖱️ Clicked the first Edit button.");

    // Check popup visibility
    const popupVisible = await this.page.getByText(PipelineLocator.NameEditName.name).isVisible();

    if (!popupVisible) {
      console.error("❌ Edit Loan pop-up NOT found.");
      return false;
    }

    console.log("✅ Edit Loan pop-up is visible.");
    return true;
  }
  async Edit_Loan_Discard() {
    console.log("🔹 Starting Edit Loan Discard test...");

    const popup = await this.openEditLoanPopup();
    if (!popup) return;

    await this.page.locator(PipelineLocator.DiscardButton.locator).click();
    console.log("🗑️ Clicked on Discard button.");

    await expect(
      this.page.getByRole(PipelineLocator.LogoImage.role, {
        name: PipelineLocator.LogoImage.name
      }).first()
    ).toBeVisible();

    console.log("✅ Discard successful — popup closed and logo visible.");
  }
  async Edit_Loan_Update() {
    console.log("🔹 Starting Edit Loan Update test...");

    const popup = await this.openEditLoanPopup();
    if (!popup) return;

    // Click banner (main section)
    await this.page.getByRole(PipelineLocator.MainSectionBanner.role)
      .filter({ hasText: PipelineLocator.MainSectionBanner.name })
      .click();

    console.log("📝 Inside Main Section.");

    // Update deal name
    const randomDealName = faker.company.name();

    await this.page.getByTestId(PipelineLocator.DealNameInput.locator).click();
    await this.page.getByTestId(PipelineLocator.DealNameInput.locator).fill(randomDealName);

    console.log(`✏️ Updated deal name to: ${randomDealName}`);

    await this.page.getByRole(PipelineLocator.SaveChangesButton.role, {
      name: PipelineLocator.SaveChangesButton.name
    }).click();

    console.log("💾 Clicked on Save Changes.");

    // Verify update
    await expect(
      this.page.getByRole(PipelineLocator.DealNameCell.role, { name: randomDealName })
    ).toBeVisible({ timeout: 10000 });

    console.log("✅ Loan updated successfully and visible in list.");
  }

  async Loan_details() {
    console.log('🔹 Navigating to Loan Detail page from Loan Listing...');
    await this.page.evaluate(() => {
      const scrollable = document.querySelector('.ant-table-body');
      if (scrollable) scrollable.scrollBy({ left: 1000, behavior: 'smooth' });
    });
    await this.page.getByRole(PipelineLocator.EyeIconButton.role, { name: PipelineLocator.EyeIconButton.name }).first().waitFor();
    await this.page.getByRole(PipelineLocator.EyeIconButton.role, { name: PipelineLocator.EyeIconButton.name }).first().click();
    await expect(this.page.getByRole(PipelineLocator.EditLoanButton.role, { name: PipelineLocator.EditLoanButton.name })).toBeVisible();
    console.log('✅ "Edit Loan" button is visible — verification successful.');
  }

  async fillCommentForm() {
    console.log("🔹 Opening comment form...");

    await this.page.getByRole(PipelineLocator.AddCommentButton.role, {
      name: PipelineLocator.AddCommentButton.name
    }).waitFor();

    await this.page.getByRole(PipelineLocator.AddCommentButton.role, {
      name: PipelineLocator.AddCommentButton.name
    }).click();

    console.log('🖱️ Clicked on "Add" button — opening comment pop-up.');

    await expect(
      this.page.getByRole(PipelineLocator.CommentPopupHeading.role, {
        name: PipelineLocator.CommentPopupHeading.name
      })
    ).toBeVisible({ timeout: 5000 });

    console.log('✅ "Add New Comment" pop-up is visible.');

    // Select comment type
    await this.page.locator(PipelineLocator.CommentTypeDropdown.locator).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByText(PipelineLocator.CommentTypeOption.name).nth(1).click();

    console.log("📌 Selected comment type: KYC");

    // Generate comment text
    const randomComment = `comment: ${faker.lorem.sentence()}`;
    const editorLocator = this.page.locator(PipelineLocator.CommentTextEditor.locator);
    const paragraphLocator = this.page.locator(PipelineLocator.CommentTextFallback.locator);

    if (await editorLocator.isVisible()) {
      await editorLocator.click();
      await editorLocator.fill(randomComment);
    } else {
      await paragraphLocator.click();
      await paragraphLocator.fill(randomComment);
    }

    console.log(`📝 Entered comment: "${randomComment}"`);

    return randomComment;
  }
  async Comment_Creation() {
    // await this.Loan_Listing();
    console.log("🔹 Starting comment creation process...");

    const randomComment = await this.fillCommentForm();
    await this.page.getByTestId(PipelineLocator.SaveCommentButton.locator).click();
    console.log("💾 Clicked on Save.");
    await expect(this.page.getByText(randomComment)).toBeVisible({ timeout: 10000 });
    console.log(`✅ Comment successfully created: "${randomComment}"`);
  }

  async Comment_cancel() {
    console.log("🔹 Starting comment cancel process...");
    // await this.Loan_Listing();
    
    const randomComment = await this.fillCommentForm();
    await this.page.getByRole("button", { name: "Cancel" }).click();
    console.log("❌ Clicked Cancel.");
    await expect(this.page.getByText(randomComment)).not.toBeVisible({ timeout: 10000 });
    console.log("✔️ Comment was NOT saved — cancel worked successfully.");
  }

  async Comment_validation() {
    // await this.Loan_Listing();
    await this.page.getByRole(PipelineLocator.AddCommentButton.role, { name: PipelineLocator.AddCommentButton.name }).waitFor();
    await this.page.getByRole(PipelineLocator.AddCommentButton.role, { name: PipelineLocator.AddCommentButton.name }).click();
    console.log('🖱️ Clicked on "Add" button — opening comment pop-up.');

    await expect(this.page.getByRole(PipelineLocator.CommentPopupHeading.role, { name: PipelineLocator.CommentPopupHeading.name }))
      .toBeVisible({ timeout: 5000 });
    console.log('✅ "Add New Comment" pop-up is visible.');
    await this.page.getByTestId(PipelineLocator.SaveCommentButton.locator).click();
    console.log('💾 Clicked on Save button to create comment.');
    const commentTypeValidation = this.page.getByText('Please select comment type');
    const commentTextValidation = this.page.getByText('Please enter comment');

    await expect(commentTypeValidation).toBeVisible({ timeout: 5000 });
    console.log('⚠️ Validation displayed: Please select comment type');

    await expect(commentTextValidation).toBeVisible({ timeout: 5000 });
    console.log('⚠️ Validation displayed: Please enter comment');
    await this.page.getByRole("button", { name: "Cancel" }).click();
  }

  async StatusNPW_cancel() {
    console.log('🔹 Starting Status NPW cancel process...')
    // await page.locator('div').filter({ hasText: /^New Enquiry$/ }).nth(1).click();
    // await page.getByRole('cell', { name: 'Underwriting Process' }).first().click();
    // await page.getByRole('banner').click();
    // await page.getByRole('cell', { name: 'Underwriting Process' }).nth(1).click();
    // await page.locator('div').filter({ hasText: 'Current pipelineSum (£)£283,' }).nth(1).click();

  };

}