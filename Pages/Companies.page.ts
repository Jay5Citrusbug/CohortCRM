import { Page, expect } from '@playwright/test';
import { Messages } from '../messages/message';
import { faker, fakerRO } from '@faker-js/faker';
import { CompaniesLocator } from '../locators/Companies.locator';
import { ContactLocator } from '../locators/contact.locator';

const CompanyName = faker.company.name();
const UpdatedCompanyName = `Updated ${faker.company.name()}`;

export class CompaniesPage {
  readonly page: Page;


  constructor(page: Page) {
    this.page = page;
  }

  async CompaniesCreate_Validation() {

    await this.page.getByRole(CompaniesLocator.AddCompaniesTab.role, { name: CompaniesLocator.AddCompaniesTab.name }).click();
    expect(await this.page.getByRole(CompaniesLocator.OpenAddCompanyModal.role, { name: CompaniesLocator.OpenAddCompanyModal.name }).isVisible());
    await this.page.getByRole(CompaniesLocator.OpenAddCompanyModal.role, { name: CompaniesLocator.OpenAddCompanyModal.name }).click();
    await this.page.getByRole(CompaniesLocator.AddCompanybtn.role, { name: CompaniesLocator.AddCompanybtn.name }).click();
    expect(await this.page.getByText(Messages.Alerts.CompanyNameRequired).isVisible());

  }

  async Add_Company() {
    // Add New Company
    await this.page.getByTestId(CompaniesLocator.Name.testId).fill(CompanyName);
    await this.page.getByRole(CompaniesLocator.AddCompanybtn.role, { name: CompaniesLocator.AddCompanybtn.name }).click();
  }
  async SearchCompany() {

    //Search Company
    await this.page.getByRole(CompaniesLocator.AddCompaniesTab.role, { name: CompaniesLocator.AddCompaniesTab.name }).click();

    await this.page.getByRole(CompaniesLocator.SearchCompanyInput.role, { name: CompaniesLocator.SearchCompanyInput.name }).fill(CompanyName);
    await expect(
      this.page.locator(
        CompaniesLocator.firstCompanyInList.locator,
        { hasText: CompanyName }
      )
    ).toBeVisible();
    await this.page.getByRole(CompaniesLocator.SearchCompanyInput.role, { name: CompaniesLocator.SearchCompanyInput.name }).clear();

  }

  async Open_Company_Details() {
    // Open Company Details
    await this.page.getByText(CompanyName).isVisible();
    await this.page.getByText(CompanyName).click();
  
  }

  async SearchInvalidCompany() {

    //Search Company
    await this.page.getByRole(CompaniesLocator.AddCompaniesTab.role, { name: CompaniesLocator.AddCompaniesTab.name }).click();

    await this.page.getByRole(CompaniesLocator.SearchCompanyInput.role, { name: CompaniesLocator.SearchCompanyInput.name }).fill(faker.person.firstName());
    await expect(this.page.getByText(CompaniesLocator.No_data).nth(1)).toBeVisible();
    await this.page.getByRole(CompaniesLocator.SearchCompanyInput.role, { name: CompaniesLocator.SearchCompanyInput.name }).clear();
  }

  async Edit_Company() {
    // Edit Company

    await this.page.getByRole(CompaniesLocator.AddCompaniesTab.role, { name: CompaniesLocator.AddCompaniesTab.name }).click();
    await this.page.getByRole(CompaniesLocator.editIcon.role, { name: CompaniesLocator.editIcon.name }).first().click();
    await this.page.getByTestId(CompaniesLocator.Name.testId).waitFor({ state: 'visible' });;
    await this.page.waitForTimeout(5000)
    await this.page.getByTestId(CompaniesLocator.Name.testId).clear();
    await this.page.getByTestId(CompaniesLocator.Name.testId).fill(UpdatedCompanyName);
    await this.page.getByRole(CompaniesLocator.UpdateCompanybtn.role, { name: CompaniesLocator.UpdateCompanybtn
      .name }).click();
    await this.page.waitForTimeout(5000)
    await this.page.getByRole(CompaniesLocator.SearchCompanyInput.role, { name: CompaniesLocator.SearchCompanyInput.name }).fill(UpdatedCompanyName);
    // Wait until the first company name matches the updated name
    await expect(
      this.page.locator(CompaniesLocator.firstCompanyInList.locator, { hasText: UpdatedCompanyName })
    ).toBeVisible({ timeout: 5000 }); // waits up to 5s automatically for visibility
    await this.page.getByRole(CompaniesLocator.SearchCompanyInput.role, { name: CompaniesLocator.SearchCompanyInput.name }).clear();

  }
  async Delete_Company() {
    // Delete Company
    await this.page.getByRole(CompaniesLocator.AddCompaniesTab.role, { name: CompaniesLocator.AddCompaniesTab.name }).click();
    await this.page.getByRole(CompaniesLocator.SearchCompanyInput.role, { name: CompaniesLocator.SearchCompanyInput.name }).fill(UpdatedCompanyName);
    await this.page.evaluate(() => {
      const scrollable = document.querySelector('.ant-table-body');
      if (scrollable) scrollable.scrollBy({ left: 1000, behavior: 'smooth' });
    });
    await this.page.getByRole(CompaniesLocator.DeleteCompanybtn.role, { name: CompaniesLocator.DeleteCompanybtn.name }).first().click();
    await this.page.locator('div').filter({ hasText: Messages.Alerts.DELETE_COMPANY_CONFIRMATION }).nth(5).waitFor({ state: 'visible' });;
    await this.page.getByText(CompaniesLocator.Companydelete_header).waitFor({ state: 'visible' });;
    await this.page.locator(CompaniesLocator.DeleteCompanyYesBtn.locator).click();
    await this.page.waitForTimeout(8000)
    await expect(this.page.getByText('No data').nth(1)).toBeVisible();
  }

  async CreateContactInCompany() {
    await this.page.getByRole(CompaniesLocator.AddCompaniesTab.role, { name: CompaniesLocator.AddCompaniesTab.name }).click();

    await this.page.getByRole('button', { name: 'add icon Add New Company' }).click();
    await this.page.getByTestId('name').isVisible();
    await this.page.getByTestId('name').fill(faker.company.name());
    await this.page.getByTestId('post_code').isVisible();
    await this.page.getByTestId('post_code').fill(faker.location.zipCode());
    const field = this.page.locator('#invite-admin_address');

    await field.isVisible();

    await field.click();          // focus input
    await this.page.waitForTimeout(5000); // wait for dropdown

    await field.press('ArrowDown');
    await field.press('Enter');
    await this.page.getByTestId('companiesHouseNumber').isVisible();
    await this.page.getByTestId('companiesHouseNumber').fill(faker.string.numeric(4));
   // await this.page.locator('.ant-select.ant-select-outlined.ant-select-in-form-item.text-start.css-5uvb3z.ant-select-multiple > .ant-select-selector').first().click();
   // await this.page.locator('span').filter({ hasText: 'Enter shareholders' }).first().click();
    //await this.page.getByText('Ocean Holland', { exact: true }).click();
    await this.page.locator('div:nth-child(7) > .select-wrapper > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-overflow').click();
    await this.page.getByRole('button', { name: 'add icon Add New Contact' }).isVisible();

    await this.page.getByRole('button', { name: 'add icon Add New Contact' }).click();

    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    await this.page.getByTestId('firstname').isVisible();
    await this.page.getByTestId('firstName').fill(firstname);
    await this.page.getByTestId('lastName').isVisible();
    await this.page.getByTestId('lastName').fill(lastname);
    await this.page.getByTestId('email').isVisible();
    await this.page.getByTestId('email').fill(faker.internet.email());
    await this.page.getByTestId('phoneNumber').isVisible();
    await this.page.getByTestId('phoneNumber').fill(faker.phone.number());
    await this.page.getByTestId('phoneNumber').press('ControlOrMeta+a');
    await this.page.getByRole('button', { name: 'Add Contact' }).click();
    await this.page.waitForTimeout(5000);
    await expect(this.page.getByTestId('contacts').getByText(firstname + ' ' + lastname)).toBeVisible();
    await this.page.getByRole(CompaniesLocator.AddCompanybtn.role, { name: CompaniesLocator.AddCompanybtn.name }).click();


  }
}