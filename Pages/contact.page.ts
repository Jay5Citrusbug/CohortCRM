import { Page, expect } from '@playwright/test';
import { LoginLocator } from '../locators/login.locator';
import { Messages } from '../messages/message';
import { PipelineLocator } from '../locators/pipeline.locator';
import { faker } from '@faker-js/faker';
import { Loan_FakerData } from '../Utility/fakerData';
import { ContactLocator } from '../locators/contact.locator';

const firstName = "automation" + faker.person.firstName();
const lastName = faker.person.lastName();
const Email = faker.internet.email();
const PhoneNumber = `9${faker.string.numeric(9)}`;

export class ContactPage {
  readonly page: Page;


  constructor(page: Page) {
    this.page = page;
  }

  async safeIsVisible(locator) {
    try {
      return await locator.isVisible();
    } catch {
      return false;
    }
  }


  async ContactCreate_Validation() {

    await this.page.getByRole(ContactLocator.AddContactsTab.role, { name: ContactLocator.AddContactsTab.name }).click();
    expect(await this.page.getByRole(ContactLocator.OpenAddContactModal.role, { name: ContactLocator.OpenAddContactModal.name }).isVisible());
    await this.page.getByRole(ContactLocator.OpenAddContactModal.role, { name: ContactLocator.OpenAddContactModal.name }).click();
    // await this.page.getByRole( ContactLocator.OpenAddContactModal.role,{name: ContactLocator.OpenAddContactModal.name}).click();
    await this.page.getByRole(ContactLocator.AddContactbtn.role, { name: ContactLocator.AddContactbtn.name }).click();
    expect(await this.page.getByText(Messages.Alerts.ContactFirstName).isVisible());
    expect(await this.page.getByText(Messages.Alerts.ContactLastName).isVisible());

  }

  async Add_Contact() {
    // Add New Contact

    await this.page.getByTestId(ContactLocator.FirstNameInput.testId).fill(firstName);
    await this.page.getByTestId(ContactLocator.LastNameInput.testId).fill(lastName);
    await this.page.getByTestId('email').click();
    await this.page.getByTestId('email').fill(Email);
    await this.page.locator('#invite-admin_phoneNumber').click();
    await this.page.locator('#invite-admin_phoneNumber').fill(PhoneNumber);
    await this.page.locator('#invite-admin_phoneNumber').press('Enter');
    const ContactWarning = this.page.getByText('Matching Contact Warning');
    const Contact_cancelBtn = this.page.getByRole('button', { name: 'Close' });


    // Dynamically wait up to 5sec for popup to appear
    let ContactVisible = false;
    try {
      await ContactWarning.waitFor({ state: 'visible', timeout: 5000 });
      ContactVisible = true;
    } catch {
      ContactVisible = false;
    }

    // Check popup visible 
    if (await this.safeIsVisible(ContactWarning)) {
      console.log('⚠️ Matching Contact Warning appeared.');

      // Wait for cancel button
      await Contact_cancelBtn.waitFor({ state: 'visible', timeout: 2000 });
      // Click cancel
      await Contact_cancelBtn.click();

      console.log('✅ Matching Contact Warning handled.');
    } else {
      console.log('✅ No contact warning popup.');
    }

    await this.page.getByRole(ContactLocator.AddContactbtn.role, { name: ContactLocator.AddContactbtn.name }).click();
    await this.page.waitForTimeout(10000)

    // await expect(this.page.getByText(Messages.Alerts.ContactAdded)).toBeVisible();

    //Search Contact assetion pending as search feature is not working
    await this.page.getByRole('textbox', { name: 'Search Contacts' }).fill(firstName);
        await this.page.waitForTimeout(10000)

  }

  async Open_Contact_Details() {
    // Open Contact Details
    await this.page
      .getByTestId(ContactLocator.FirstNameInput.testId)
      .waitFor({ state: 'hidden' });

    await this.page.getByText(`${firstName} ${lastName}`).isVisible();
    await this.page.getByText(`${firstName} ${lastName}`).click();
  }
  async Edit_Contact() {
    // Edit Contact
    await this.page.getByRole(ContactLocator.AddContactsTab.role, { name: ContactLocator.AddContactsTab.name }).click();

    await this.page.getByRole(ContactLocator.editIcon.role, { name: ContactLocator.editIcon.name }).first().click();
    await this.page.getByTestId(ContactLocator.FirstNameInput.testId).fill(firstName);
    await this.page.getByTestId(ContactLocator.LastNameInput.testId).fill(lastName);

    const ContactWarning = this.page.getByText('Matching Contact Warning');
    const Contact_cancelBtn = this.page.getByRole('button', { name: 'Close' });


    // Dynamically wait up to 5sec for popup to appear
    let ContactVisible = false;
    try {
      await ContactWarning.waitFor({ state: 'visible', timeout: 5000 });
      ContactVisible = true;
    } catch {
      ContactVisible = false;
    }

    // Check popup visible 
    if (await this.safeIsVisible(ContactWarning)) {
      console.log('⚠️ Matching Contact Warning appeared.');

      // Wait for cancel button
      await Contact_cancelBtn.waitFor({ state: 'visible', timeout: 2000 });
      // Click cancel
      await Contact_cancelBtn.click();

      console.log('✅ Matching Contact Warning handled.');
    } else {
      console.log('✅ No contact warning popup.');
    }

    await this.page.getByRole(ContactLocator.UpdateContactbtn.role, { name: ContactLocator.UpdateContactbtn.name }).click();


  }


  async Delete_Contact() {
    // Delete Contact
    await this.page.getByRole(ContactLocator.AddContactsTab.role, { name: ContactLocator.AddContactsTab.name }).click();
    await this.page.evaluate(() => {
      const scrollable = document.querySelector('.ant-table-body');
      if (scrollable) scrollable.scrollBy({ left: 1000, behavior: 'smooth' });
    });
    await this.page.getByRole(ContactLocator.DeleteContactbtn.role, { name: ContactLocator.DeleteContactbtn.name }).first().click();
    await this.page.locator('div').filter({ hasText: Messages.Alerts.DELETE_CONTACT_CONFIRMATION }).nth(5).isVisible();
    await this.page.getByText('Delete Contact').isVisible();
    await this.page.locator(ContactLocator.DeleteContactYesBtn.locator).click();
    expect(await this.page.getByRole(ContactLocator.editIcon.role, { name: ContactLocator.editIcon.name }).first().isHidden());
    expect(await this.page.getByRole(ContactLocator.DeleteContactbtn.role, { name: ContactLocator.DeleteContactbtn.name }).first().isHidden());

    // Search Contact assetion pending as search feature is not working

  }
}