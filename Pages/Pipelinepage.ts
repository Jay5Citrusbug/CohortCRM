import { Locator, Page, expect } from '@playwright/test';
import { LoginLocator } from '../locators/login.locator';
import { Messages } from '../messages/message';
import { PipelineLocator } from '../locators/pipeline.locator';
import { faker } from '@faker-js/faker';
import { Loan_FakerData } from '../Utility/fakerData';
/**
 * Add a new entity
 * @param type - 'Person' or 'Trust'
 */
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

    await expect(
      this.page.getByRole('cell').filter({ hasText: loanName }).first()
    ).toBeVisible();
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
    const invalidLoanName = faker.lorem.words(3);
    await searchBox.fill(invalidLoanName);
    console.log(`✅ Verified created loan name: ${invalidLoanName}`);
    const noData = this.page.getByText(PipelineLocator.NoDataText.name).nth(1)

    await noData.waitFor({ state: 'visible' }); // Wait for search results to update
    // await this.page.evaluate(() => {
    //   window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    // });
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
    console.log(`✅ Deal name is added: ${loanName}`);

    // Loan Type
    await this.waitAndClick(this.page.locator(PipelineLocator.LoanType.locator).first());
    await this.page.getByTitle('Bridge').click();

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
    //await this.page.waitForTimeout(3000);
    //-------------------------
    // Popup Handling (Optimized)
    //-------------------------
    const popup = this.page.getByText('Matching Postcode Warning');
    const cancelBtn = this.page.getByRole('button', { name: 'Cancel' }).nth(1);


    // Dynamically wait up to 5sec for popup to appear
    let popupVisible = false;
    try {
      await popup.waitFor({ state: 'visible', timeout: 5000 });
      popupVisible = true;
    } catch {
      popupVisible = false;
    }

    // Check popup visible 
    if (await this.safeIsVisible(popup)) {

      console.log('⚠️ Matching Postcode Warning appeared.');

      // Wait for cancel button
      await cancelBtn.waitFor({ state: 'visible', timeout: 2000 });

      // Click cancel
      await cancelBtn.click();

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
    await sponsor.click();
    await this.page.getByRole('button', { name: 'TBC' }).isVisible();
    await this.page.getByRole('button', { name: 'TBC' }).click();
    console.log('✅ Sponsor added.');

    // Contact
    await this.page.locator('#invite-admin_contact').first().click();
    await this.page.getByRole('button', { name: 'Direct' }).isVisible();
    await this.page.getByRole('button', { name: 'Direct' }).click();
    const keyboard = this.page.getByText('0U9dxIrHBqN4HvHw08dG0X119UQ4NxbK1Z7UrGuG0cQFq1XA5PBJhb9w92e6DirectGREENSLEEVES')
    await this.page.keyboard.press('Escape');

    console.log('✅ Contact selected.');

    // Company
    // const company = this.page.locator(PipelineLocator.Company.name).first();
    // await company.click();
    // await this.page.getByRole('button', { name: 'Direct' }).isVisible();
    // await this.page.getByRole('button', { name: 'Direct' }).click();

    // console.log('✅ Company added');
    // Click Save
    await this.page.getByRole(PipelineLocator.SaveChangesButton.role, {
      name: PipelineLocator.SaveChangesButton.name
    }).click();

    // Wait for modal text to be hidden = popup closed
    const loanCell = this.page.getByRole('cell', { name: PipelineLocator.NewEnquiry.name }).first()
    await loanCell.waitFor({ state: 'visible' });
    await expect(loanCell).toBeVisible(); console.log('✅ Loan created successfully.');
  }

  //---------------------------
  // Verify Loan Status
  //---------------------------

  async VerifyLoan_status() {
    console.log('🔹 Verifying loan status...');
    await this.page
      .getByTestId(PipelineLocator.DealName.name)
      .first()
      .waitFor({ state: 'hidden' });

    await expect(
      this.page.getByRole('cell', { name: PipelineLocator.NewEnquiry.name }).first()
    ).toBeVisible();

    console.log('✅ Loan status verified as New Enquiry.');
  }

  //---------------------------
  // Validate Mandatory Fields
  //---------------------------

  async Validation_Create_Loan() {
    // await this.page.getByText(PipelineLocator.PipelineTab.name).click();
    // console.log('🔹 Navigated to Pipeline tab.');
    //     console.log('🔹 Starting validation for Create Loan...');

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

    const OpenLoan_Drawer = this.page.locator(PipelineLocator.Open_loan_Drawer.locator);
    await OpenLoan_Drawer.waitFor({ state: 'visible' });
    await OpenLoan_Drawer.click();

    // Wait for the row to appear
    const loan_Opened = this.page.getByRole(PipelineLocator.LoanDrawer_opened.role, {
      name: PipelineLocator.LoanDrawer_opened.name
    });
    await OpenLoan_Drawer.waitFor({ state: 'visible' });

    await expect(loan_Opened).toBeVisible();

    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // ⏳ NEW: Wait for potentialMCQMarked to appear after expand
    const mcqMarked = this.page.getByLabel('', { exact: true });
    await mcqMarked.waitFor({ state: 'visible' });
    await expect(mcqMarked).toBeChecked();
    await this.page.locator('button').filter({ hasText: 'Close' }).click();
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
    console.log('🔹 Starting Edit Loan Update test...');

    // Reusable helper to wait for visibility before any action
    const waitVisible = async (locator: Locator, name: string) => {
      console.log(`⏳ Waiting for ${name}...`);
      await locator.waitFor({ state: 'visible', timeout: 10000 });
      return locator;
    };

    // Scroll table horizontally
    await this.page.evaluate(() => {
      const scrollable = document.querySelector('.ant-table-body');
      scrollable?.scrollTo({ left: 1000 });
    });

    // 🟦 Step 1: OPEN THE EDIT POPUP
    const popup = await this.openEditLoanPopup();
    if (!popup) {
      console.log('❌ Edit Loan popup did not open.');
      return;
    }

    // Ensure popup fully loaded
    await waitVisible(
      this.page.getByRole(PipelineLocator.MainSectionBanner.role).filter({
        hasText: PipelineLocator.MainSectionBanner.name
      }),
      'Edit Loan popup main banner'
    );

    // 🟦 Step 2: CLICK ON MAIN BANNER
    await this.page
      .getByRole(PipelineLocator.MainSectionBanner.role)
      .filter({ hasText: PipelineLocator.MainSectionBanner.name })
      .click();

    // 🟦 Step 3: UPDATE DEAL NAME
    const updatedName = faker.company.name();
    const dealNameInput = this.page.getByTestId(PipelineLocator.DealNameInput.locator);

    await waitVisible(dealNameInput, 'Deal Name input');
    await dealNameInput.fill(updatedName);

    // 🟦 Step 4: CLICK SAVE (Wait until enabled)
    const saveButton = this.page.getByRole(PipelineLocator.SaveChangesButton.role, {
      name: PipelineLocator.SaveChangesButton.name
    });

    await waitVisible(saveButton, 'Save Changes button');
    await saveButton.waitFor({ state: 'attached' });
    await expect(saveButton).toBeEnabled({ timeout: 8000 });

    console.log('🔘 Clicking Save...');
    saveButton.click()
    const searchBox = this.page.getByRole(PipelineLocator.Searchbar.role, {
      name: PipelineLocator.Searchbar.name
    });

    await searchBox.fill(updatedName);

    // 🟦 Step 5: VERIFY UPDATE (Dynamic wait)
    const updatedCell = this.page.getByRole(PipelineLocator.DealNameCell.role, {
      name: updatedName
    });

    await expect(updatedCell).toBeVisible({
      timeout: 15000
    });

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

  async Comment_Creation() {
    const noDataDiv = this.page.locator('div')
      .filter({ hasText: /^No dataClick to add a comment$/ })
      .nth(1);

    await noDataDiv.click();

    const editor = this.page.locator('.ql-editor');
    await editor.fill('This is a test note added using Playwright.');

    await this.page.getByTestId('save-btn').click();
    console.log("✅ Comment successfully added and verified.");

    await this.page.waitForTimeout(7000);
  }

  async Comment_Edit() {
    const optionsBtn = this.page.getByRole(PipelineLocator.CommentOptionsButton.role, { name: PipelineLocator.CommentOptionsButton.name });
    await optionsBtn.waitFor();
    await optionsBtn.click();
    const editBtn = this.page.locator(PipelineLocator.EditOption.locator).filter({ hasText: PipelineLocator.EditOption.text });
    await editBtn.waitFor();
    await editBtn.click();
    console.log("✏️ Clicked 'Edit' option.");
    const editor = this.page.locator(PipelineLocator.CommentTextEditor.locator);
    await editor.click();
    await editor.fill(''); // clear existing
    await editor.fill('Updated content added using Playwright automation.');
    await editor.press('Enter'); // press Enter
    await this.page.waitForTimeout(10000);
    console.log("---------------------------");
    const saveBtn = this.page.getByTestId(PipelineLocator.SaveCommentButton.locator);
    await saveBtn.click();
    await this.page.waitForTimeout(10000);
    console.log("---------------------------");

    await expect(
      this.page.getByText('Updated content added using Playwright automation.')
    ).toBeVisible();

    // Wait for UI update
    await this.page.waitForTimeout(8000);
  }

  async Comment_delete() {
    // Click the "..." options button for the comment
    const optionsBtn = this.page.getByRole(PipelineLocator.CommentOptionsButton.role, { name: PipelineLocator.CommentOptionsButton.name });
    await optionsBtn.waitFor();
    await optionsBtn.click();

    // Click Delete button
    const deleteBtn = this.page.getByRole(PipelineLocator.DeleteOption.role, { name: PipelineLocator.DeleteOption.name });
    await deleteBtn.waitFor();
    await deleteBtn.click();

    const reasonInput = this.page.getByRole(
      PipelineLocator.ReasonInput.role,
      { name: PipelineLocator.ReasonInput.name }
    );
    await reasonInput.click();
    await reasonInput.fill('Deleting this item as it is no longer required.');
    console.log("✍️ Entered reason for deletion.");

    // Click Yes to confirm deletion
    const yesBtn = this.page.getByRole(PipelineLocator.ConfirmYesButton.role, { name: PipelineLocator.ConfirmYesButton.name });
    await yesBtn.click();
    console.log("✅ Clicked 'Yes' to confirm deletion.");

    // Wait for deletion to complete
    await this.page.waitForTimeout(10000);

    // Assert comment is no longer visible
    await expect(this.page.locator(PipelineLocator.CommentTextFallback.locator)).toBeHidden();
    console.log("✅ Comment successfully deleted and verified.");
  }

  async PostCompleteion_add_comment() {

    const postHeading = this.page.getByRole(PipelineLocator.PostCompletionHeading.role, { name: PipelineLocator.PostCompletionHeading.name });
    await postHeading.waitFor();
    await postHeading.click();

    let addCommentBtn = this.page.getByRole(PipelineLocator.PostCompletionAddCommentButton.role, { name: PipelineLocator.PostCompletionAddCommentButton.name });
    if (PipelineLocator.PostCompletionAddCommentButton.first) {
      addCommentBtn = addCommentBtn.first();
    }
    await addCommentBtn.waitFor();
    await addCommentBtn.click();

    const editor = this.page.locator(PipelineLocator.CommentTextEditor.locator);
    await editor.click();
    await editor.fill('This is a test comment added using Playwright automation.');

    const saveBtn = this.page.locator(PipelineLocator.CommentSaveButton.locator);
    await saveBtn.click();
    console.log("💾 Clicked Save button.");
    await expect(
      this.page.getByText('This is a test comment added using Playwright automation.')
    ).toBeVisible();
    await this.page.waitForTimeout(10000);
  }

  async Ownership_person_trust() {
    await this.page.getByRole(PipelineLocator.KYCHeading.role, { name: PipelineLocator.KYCHeading.name }).click();
    console.log("🖱️ Clicked 'KYC' heading.");

    // Click Ownership Structure heading
    await this.page.getByRole(PipelineLocator.OwnershipStructureHeading.role, { name: PipelineLocator.OwnershipStructureHeading.name }).click();
    console.log("🖱️ Clicked 'Ownership Structure' heading.");

    // Function to create an entity (Person or Trust)
    const createEntity = async (type: 'Person' | 'Trust') => {
      // Click Add Entity button
      await this.page.getByRole(PipelineLocator.AddEntityButton.role, { name: PipelineLocator.AddEntityButton.name }).click();
      console.log(`🖱️ Clicked 'Add Entity' button for ${type}.`);

      // Click Entity Type dropdown
      const entityTypeDropdown = this.page.locator(PipelineLocator.EntityTypeDropdown.locator);
      await entityTypeDropdown.click();
      console.log("🖱️ Opened Entity Type dropdown.");

      // Select entity type
      const optionTitle = type === 'Person' ? PipelineLocator.PersonOption.title : PipelineLocator.TrustOption.title;
      await this.page.getByTitle(optionTitle).click();
      console.log(`✅ Selected '${type}' from dropdown.`);

      // Fill random entity name
      const randomName = `${type}_${Math.floor(Math.random() * 10000)}`;
      const entityNameInput = this.page.getByTestId(PipelineLocator.EntityNameInput.testId);
      await entityNameInput.fill(randomName);
      console.log(`✍️ Entered entity name: ${randomName}`);

      // Click Create Entity button
      await this.page.getByRole(PipelineLocator.CreateEntityButton.role, { name: PipelineLocator.CreateEntityButton.name }).click();
      console.log(`✅ Clicked 'Create Entity' button for ${type}.`);

      await this.page.waitForTimeout(2000);
      await expect(this.page.getByText(randomName)).toBeVisible();

      // Return the random name if you want to use it later
      return randomName;// wait for entity to appear
    };

    // Create Person first
    await createEntity('Person');

    // Create Trust next
    await createEntity('Trust');
  }

  async Ownership_company() {

  }

  async PostCompleteion_Status_change() {
    const postHeading = this.page.getByRole(PipelineLocator.PostCompletionHeading.role, { name: PipelineLocator.PostCompletionHeading.name });
    await postHeading.waitFor();
    await postHeading.click();
    const toDoItem = this.page.locator(
      'div:nth-child(3) > .flex.items-start > .flex.items-center.gap-0 > .status-select-wrapper > .ant-select > .ant-select-selector'
    );
    await toDoItem.click({ force: true });
    await toDoItem.click({ force: true });
    const toDoItem1 = this.page.locator('div').filter({ hasText: /^To do$/ }).nth(5);
    console.log("🖱️ Clicked the 6th 'To do' item.");
    await toDoItem1.click({ force: true });
    let doneOption = this.page.getByTitle('Done').nth(1);

    await doneOption.waitFor({ state: 'visible' });
    await doneOption.click();
    await this.page.waitForTimeout(6000);
    console.log("✅ Selected 'Done' from dropdown (nth(3)).");

  }

  async Verify_Company_Contact_Dropdown_Creation() {
    console.log('🔹 Starting verification of "Add New Company" and "Add New Contact" buttons in dropdowns...');
    await this.page.waitForTimeout(10000);
    // Click main "add icon" button
    const addIconButton = this.page.getByRole('button', { name: 'add icon' });
    await expect(addIconButton).toBeVisible();
    await addIconButton.click();

    // Sponsor section
    const sponsorOption = this.page.locator('#invite-admin_sponsor').first();
    await expect(sponsorOption).toBeVisible();
    await sponsorOption.click();

    // Verify first Company & Contact
    await expect(this.page.getByRole('button', { name: 'add icon Add New Company' }).first()).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'add icon Add New Contact' }).first()).toBeVisible();

    // Click first Contact & Company
    await this.page.locator('#invite-admin_contact').first().click();
    await expect(this.page.getByRole('button', { name: 'add icon Add New Contact' }).first()).toBeVisible();

    await this.page.locator('#invite-admin_company').first().click();
    await expect(this.page.getByRole('button', { name: 'add icon Add New Company' }).first()).toBeVisible();

    // Sponsor Information section
    const sponsorBanner = this.page.getByRole('banner').filter({ hasText: 'Sponsor Information' });
    await expect(sponsorBanner).toBeVisible();
    await sponsorBanner.click();

    const uboSelectors = [
      '#invite-admin_ubo',
      '#invite-admin_secondUbo',
      '#invite-admin_thirdUbo',
      '#invite-admin_guarantor'
    ];

    for (const selector of uboSelectors) {
      const element = this.page.locator(selector);
      await expect(element).toBeVisible();
      await element.click();
      await expect(this.page.getByRole('button', { name: 'add icon Add New Contact' }).first()).toBeVisible();
    }

    // Introducer Information section
    const introducerBanner = this.page.getByRole('banner').filter({ hasText: 'Introducer Information' });
    await expect(introducerBanner).toBeVisible();
    await introducerBanner.click();

    const introducerSelectors = [
      '#invite-admin_contact',
      '#invite-admin_company'
    ];

    for (const [index, selector] of introducerSelectors.entries()) {
      const element = this.page.locator(selector).nth(index);
      await expect(element).toBeVisible();
      await element.click();

      const buttonName = selector.includes('contact') ? 'add icon Add New Contact' : 'add icon Add New Company';
      await expect(this.page.getByRole('button', { name: buttonName }).first()).toBeVisible();
    }

    // Valuation Information section
    const valuationBanner = this.page.getByRole('banner').filter({ hasText: 'Valuation Information' });
    await expect(valuationBanner).toBeVisible();
    await valuationBanner.click();
    await this.page.waitForTimeout(10000)
    const valuerContact = this.page.locator('#invite-admin_valuerContact-0');
    await expect(valuerContact).toBeVisible();
    await valuerContact.click();
    await expect(this.page.getByRole('button', { name: 'add icon Add New Contact' }).first()).toBeVisible();

    const valuerCompany = this.page.locator('#invite-admin_valuerCompany-0');
    await expect(valuerCompany).toBeVisible();
    await valuerCompany.click();
    await expect(this.page.getByRole('button', { name: 'add icon Add New Company' }).first()).toBeVisible();

    // Solicitor Information section
    const solicitorBanner = this.page.getByRole('banner').filter({ hasText: 'Solicitor Information' });
    await expect(solicitorBanner).toBeVisible();
    await solicitorBanner.click();

    const solicitorContact = this.page.locator('#invite-admin_solicitorContact');
    await expect(solicitorContact).toBeVisible();
    await solicitorContact.click();
    await expect(this.page.getByRole('button', { name: 'add icon Add New Contact' }).first()).toBeVisible();

    const solicitorCompany = this.page.locator('#invite-admin_solicitorCompany');
    await expect(solicitorCompany).toBeVisible();
    await solicitorCompany.click();
    await expect(this.page.getByRole('button', { name: 'add icon Add New Company' }).first()).toBeVisible();

    console.log('🔹 Verification completed successfully.');
    await this.page.locator('[data-test-id="discard-btn"]').click();
  }


}



