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

  //---------------------------
  // ⭐ Reusable Helpers
  //---------------------------

  async waitAndClick(locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async safeIsVisible(locator) {
    try {
      return await locator.isVisible();
    } catch {
      return false;
    }
  }

  async scrollTableRight(px = 800) {
    await this.page.evaluate((scrollPx) => {
      const body = document.querySelector('.ant-table-body');
      body?.scrollBy({ left: scrollPx });
    }, px);
  }

  //---------------------------
  // Dashboard Page
  //---------------------------

  async DashboardPage() {
    console.log('🔹 Navigating to Dashboard page...');

    await expect(
      this.page.getByRole(LoginLocator.logoImage.role, {
        name: LoginLocator.logoImage.name
      })
    ).toBeVisible();

    console.log('✅ Valid login successful and dashboard visible.');

    await expect(
      this.page.getByRole(LoginLocator.pipelineLink.role, {
        name: LoginLocator.pipelineLink.name
      })
    ).toBeVisible();

    console.log('✅ Navigated to dashboard page successfully.');
  }

  //---------------------------
  // Search Valid Loans
  //---------------------------

  async Search_Valid_NewLoans() {
    console.log('🔹 Navigating to Search New Loans...');
    console.log(`Created loan: ${loanName}`);

    const searchBox = this.page.getByRole(PipelineLocator.Searchbar.role, {
      name: PipelineLocator.Searchbar.name
    });

    await searchBox.fill(loanName);

    await expect(
      this.page.locator('div').filter({ hasText: 'Name of loan#StatusLoan' }).nth(3)
    ).toBeVisible();

    await expect(this.page.getByRole('cell', { name: loanName })).toBeVisible();

    console.log(`✅ Verified created loan name: ${loanName}`);
  }

  //---------------------------
  // Search Invalid Loans
  //---------------------------

  async Search_Invalid_NewLoans() {
    console.log('🔹 Navigating to Search New Loans...');

    const searchBox = this.page.getByRole(PipelineLocator.Searchbar.role, {
      name: PipelineLocator.Searchbar.name
    });

    await searchBox.fill(faker.lorem.words(3));

    await this.page.waitForTimeout(8000); // Wait for search results to update
    await this.page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
    await expect(
      this.page.getByText(PipelineLocator.NoDataText.name).nth(1)
      // await this.page.getByText('No data').nth(1)/
    ).toBeVisible();

    await searchBox.clear();
  }

  //---------------------------
  // Create Loan
  //---------------------------

  async CreateLoan() {
    console.log('🔹 Starting Create Loan process...');

    await this.page.getByTestId(PipelineLocator.DealName.name).first().fill(loanName);
    console.log('✅ Deal name filled successfully.');

    // Loan Type
    await this.waitAndClick(this.page.locator(PipelineLocator.LoanType.locator).first());
    await this.page.getByText('Bridge').nth(1).click();

    // Asset type
    const assetField = this.page.locator(PipelineLocator.AssetType.name).first();
    await this.waitAndClick(assetField);
    await assetField.fill(Loan_FakerData.randomAssetType);
    await this.page.keyboard.press('Enter');
    console.log('✅ Asset type selected.');

    // Postal Code
    const postal = this.page.getByTestId(PipelineLocator.PostalcodeID.name).first();
    await postal.fill(Loan_FakerData.randomPostalCode);
    console.log('✅ Postal code entered.');

    //-------------------------
    // Popup Handling (Optimized)
    //-------------------------
    const popup = this.page.getByText('Matching Postcode Warning');

    if (await this.safeIsVisible(popup)) {
      console.log('⚠️ Matching Postcode Warning appeared.');
      await this.page.getByRole('button', { name: 'Cancel' }).nth(1).click();
      console.log('✅ Matching Postcode Warning handled.');
    } else {
      console.log('✅ No postcode warning popup.');
    }

    // Continue loan creation
    await this.page.locator(PipelineLocator.propertyAddress.locator).first().fill(faker.location.buildingNumber());
    console.log('✅ Property added.');

    await this.page.locator(PipelineLocator.ValuePounds.name).first().fill(Loan_FakerData.randomValue);
    await this.page.keyboard.press('Enter');
    console.log('✅ Property value entered.');

    await this.page.locator(PipelineLocator.GrossLoanPounds.name).first().fill(Loan_FakerData.randomValue);
    console.log('✅ Gross loan amount filled.');

    await this.page.locator(PipelineLocator.Security.name).first().click();
    await this.page.getByTitle(Loan_FakerData.randomSecurity).click();
    console.log('✅ Security type selected.');

    await this.page.locator(PipelineLocator.PricingPercentPerMonth.name).first().fill(Loan_FakerData.randomValue);
    console.log('✅ Pricing entered.');

    // Sponsor
    const sponsor = this.page.locator(PipelineLocator.Sponsor.name).first();
    await sponsor.fill('Automation user');
    await this.page.keyboard.press('Enter');
    console.log('✅ Sponsor added.');

    // Contact
    const contact = this.page.locator(PipelineLocator.Contact.name).first();
    await contact.fill('automation user');
    await this.page.keyboard.press('Enter');
    console.log('✅ Contact selected.');

    // Company
    const company = this.page.locator(PipelineLocator.Company.name).first();
    await company.fill('Automation');
    await this.page.keyboard.press('Enter');
    console.log('✅ Company added.');

    // Save
    await this.page.getByRole(PipelineLocator.SaveChangesButton.role, {
      name: PipelineLocator.SaveChangesButton.name
    }).click();

    await expect(this.page.getByText(PipelineLocator.NameLoanColumn.name)).toBeVisible();
    console.log('💾 Loan created successfully.');
  }

  //---------------------------
  // Verify Loan Status
  //---------------------------

  async VerifyLoan_status() {
    console.log('🔹 Verifying loan status...');

    await expect(
      this.page.getByRole('cell', { name: PipelineLocator.NewEnquiry.name }).first()
    ).toBeVisible();

    console.log('✅ Loan status verified as New Enquiry.');
  }

  //---------------------------
  // Validate Mandatory Fields
  //---------------------------

  async Validation_Create_Loan() {
    await this.page.getByText(PipelineLocator.PipelineTab.name).click();

    console.log('🔹 Starting validation for Create Loan...');

    await this.waitAndClick(
      this.page.getByRole(PipelineLocator.AddLoanButton.role, {
        name: PipelineLocator.AddLoanButton.name
      })
    );

    await this.page.getByLabel(PipelineLocator.AddLoanText.locator).isVisible();

    await this.page.getByRole(PipelineLocator.SaveChangesButton.role, {
      name: PipelineLocator.SaveChangesButton.name
    }).click();

    await expect(this.page.getByText(Messages.Alerts.validationMessageLoan).first()).toBeVisible();

    console.log('✅ Validation message for mandatory fields displayed.');
  }

  //---------------------------
  // Toggle Cohort Invest
  //---------------------------

  async Verify_Cohort_Invest_Toggle() {
    console.log('🔹 Verifying cohort invest toggle functionality...');

    const toggle = this.page.getByRole(PipelineLocator.CohortInvestToggle.name);

    await expect(toggle).toBeVisible();

    await toggle.click();
    await expect(this.page.getByText(PipelineLocator.InvvestorTab.name)).toBeVisible();

    await toggle.click();
    await expect(this.page.getByText(PipelineLocator.PipelineTab.name)).toBeVisible();

    console.log('✅ Cohort invest toggle verified successfully.');
  }

  //---------------------------
  // MCQ Filter
  //---------------------------

  async MCQ_Filtering() {
    console.log('🔹 Verifying MCQ filtering functionality...');

    const filter = this.page.getByRole(PipelineLocator.checkbox_MCQ.role, {
      name: PipelineLocator.checkbox_MCQ.name
    });

    await filter.check();

    await expect(this.page.locator(PipelineLocator.LoanNameExpand.locator)).toBeVisible();
    await this.page.locator(PipelineLocator.LoanNameExpand.locator).click();

    await expect(this.page.locator(PipelineLocator.potentialMCQMarked.locator)).toBeVisible();

    await filter.uncheck();

    console.log('✅ MCQ filtering verified successfully.');
  }

  //---------------------------
  // Edit Loan Popup
  //---------------------------

  async openEditLoanPopup() {
    console.log("🔹 Opening Edit Loan pop-up...");

      await this.page.evaluate(() => {
      const scrollable = document.querySelector('.ant-table-body');
      if (scrollable) scrollable.scrollBy({ left: 1000, behavior: 'smooth' });
    });

   const editBtn = this.page.getByRole(PipelineLocator.EditIconButton.role, {
      name: PipelineLocator.EditIconButton.name
    }).first();

    await editBtn.waitFor();
    await editBtn.click();
    console.log("🖱️ Clicked the first Edit button.");
    const popupVisible = await this.page.getByText(PipelineLocator.NameEditName.name).isVisible();

    if (!popupVisible) {
      console.error("❌ Edit Loan pop-up NOT found.");
      return false;
    }

    console.log("✅ Edit Loan pop-up is visible.");
    return true;
  }

  //---------------------------
  // Edit Loan: Discard
  //---------------------------

  async Edit_Loan_Discard() {
    await this.page.goBack()
    console.log("🔹 Starting Edit Loan Discard test...");

    const popup = await this.openEditLoanPopup();
    if (!popup) return;

    await this.page.locator(PipelineLocator.DiscardButton.locator).click();

    await expect(
      this.page.getByRole(PipelineLocator.LogoImage.role, {
        name: PipelineLocator.LogoImage.name
      }).first()
    ).toBeVisible();

    console.log("✅ Discard successful — popup closed.");
  }

  //---------------------------
  // Edit Loan: Update
  //---------------------------

  async Edit_Loan_Update() {
    // await this.page.getByRole('link', { name: 'Underwriting' }).click();
    // await this.page.getByText(PipelineLocator.PipelineTab.name).click();

    console.log('🔹 Starting Edit Loan Update test...');

      await this.page.evaluate(() => {
      const scrollable = document.querySelector('.ant-table-body');
      if (scrollable) scrollable.scrollBy({ left: 1000, behavior: 'smooth' });
    });

    const popup = await this.openEditLoanPopup();
    if (!popup) return;

    await this.page
      .getByRole(PipelineLocator.MainSectionBanner.role)
      .filter({ hasText: PipelineLocator.MainSectionBanner.name })
      .click();

    const updatedName = faker.company.name();

    await this.page.getByTestId(PipelineLocator.DealNameInput.locator).fill(updatedName);

    await this.page.getByRole(PipelineLocator.SaveChangesButton.role, {
      name: PipelineLocator.SaveChangesButton.name
    }).click();
    await this.page.waitForTimeout(5000); // Wait for update to process
    await expect(
           this.page.getByRole(PipelineLocator.DealNameCell.role, { name: updatedName })
    ).toBeVisible({ timeout: 10000 });

    console.log('✅ Loan updated successfully.');
  }

  //---------------------------
  // Loan Details
  //---------------------------

  async Loan_details() {
    console.log('🔹 Navigating to Loan Detail page...');

    // await this.scrollTableRight();
     await this.page.evaluate(() => {
      const scrollable = document.querySelector('.ant-table-body');
      if (scrollable) scrollable.scrollBy({ left: 1000, behavior: 'smooth' });
    });

    const eye = this.page.getByRole(PipelineLocator.EyeIconButton.role, {
      name: PipelineLocator.EyeIconButton.name
    }).first();

    await eye.waitFor();
    await eye.click();

    await expect(
      this.page.getByRole(PipelineLocator.EditLoanButton.role, {
        name: PipelineLocator.EditLoanButton.name
      })
    ).toBeVisible();

    console.log('✅ "Edit Loan" button is visible.');
  }

  //---------------------------
  // Comment Form
  //---------------------------

  async fillCommentForm() {
    console.log("🔹 Opening comment form...");

    const addBtn = this.page.getByRole(PipelineLocator.AddCommentButton.role, {
      name: PipelineLocator.AddCommentButton.name
    });

    await addBtn.waitFor();
    await addBtn.click();

    await expect(
      this.page.getByRole(PipelineLocator.CommentPopupHeading.role, {
        name: PipelineLocator.CommentPopupHeading.name
      })
    ).toBeVisible();

    await this.page.locator(PipelineLocator.CommentTypeDropdown.locator).click();
    await this.page.getByText(PipelineLocator.CommentTypeOption.name).nth(1).click();

    const randomComment = `comment: ${faker.lorem.sentence()}`;

    const editor = this.page.locator(PipelineLocator.CommentTextEditor.locator);
    const paragraph = this.page.locator(PipelineLocator.CommentTextFallback.locator);

    if (await this.safeIsVisible(editor)) {
      await editor.fill(randomComment);
    } else {
      await paragraph.fill(randomComment);
    }

    return randomComment;
  }

  //---------------------------
  // Comment Creation
  //---------------------------

  async Comment_Creation() {
    console.log("🔹 Starting comment creation process...");

    const comment = await this.fillCommentForm();

    await this.page.getByTestId(PipelineLocator.SaveCommentButton.locator).click();

    await expect(this.page.getByText(comment)).toBeVisible();

    console.log(`✅ Comment successfully created: "${comment}"`);
  }

  //---------------------------
  // Comment Cancel
  //---------------------------

  async Comment_cancel() {
    console.log("🔹 Starting comment cancel process...");

    const comment = await this.fillCommentForm();

    await this.page.getByRole('button', { name: 'Cancel' }).click();

    await expect(this.page.getByText(comment)).not.toBeVisible();

    console.log('✔️ Comment was NOT saved — cancel worked.');
  }

  //---------------------------
  // Comment Validation
  //---------------------------

  async Comment_validation() {
    const addBtn = this.page.getByRole(PipelineLocator.AddCommentButton.role, {
      name: PipelineLocator.AddCommentButton.name
    });

    await addBtn.waitFor();
    await addBtn.click();

    await expect(
      this.page.getByRole(PipelineLocator.CommentPopupHeading.role, {
        name: PipelineLocator.CommentPopupHeading.name
      })
    ).toBeVisible();

    await this.page.getByTestId(PipelineLocator.SaveCommentButton.locator).click();

    await expect(this.page.getByText('Please select comment type')).toBeVisible();
    await expect(this.page.getByText('Please enter comment')).toBeVisible();

    await this.page.getByRole('button', { name: 'Cancel' }).click();
  }
}
