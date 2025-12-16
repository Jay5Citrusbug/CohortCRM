import { Page, expect } from '@playwright/test';
import { LoginLocator } from '../locators/login.locator';
import { Messages } from '../messages/message';
import { PipelineLocator } from '../locators/pipeline.locator';
import { faker } from '@faker-js/faker';
import { Loan_FakerData } from '../Utility/fakerData';
import { ContactLocator } from '../locators/contact.locator';

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();

export class ContactPage {
  readonly page: Page;


  constructor(page: Page) {
    this.page = page;
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
    await this.page.getByRole(ContactLocator.AddContactbtn.role, { name: ContactLocator.AddContactbtn.name }).click();
    // await expect(this.page.getByText(Messages.Alerts.ContactAdded)).toBeVisible();

    //Search Contact assetion pending as search feature is not working
    await this.page.getByRole('textbox', { name: 'Search Contacts' }).fill(firstName);
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
    // await this.page.getByTestId(ContactLocator.FirstNameInput.testId).fill('Automation');
    await this.page.getByTestId(ContactLocator.LastNameInput.testId).fill(lastName);

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