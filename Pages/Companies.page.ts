import { Page, expect } from '@playwright/test';
import { Messages } from '../messages/message';
import { faker } from '@faker-js/faker';
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
    await this.page.getByRole(CompaniesLocator.UpdateCompanybtn.role, { name: CompaniesLocator.AddCompanybtn.name }).click();
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
    expect(await this.page.getByRole(ContactLocator.editIcon.role, { name: ContactLocator.editIcon.name }).first().isDisabled());
    expect(await this.page.getByRole(ContactLocator.DeleteContactbtn.role, { name: ContactLocator.DeleteContactbtn.name }).first().isDisabled());
    await this.page.getByRole(CompaniesLocator.SearchCompanyInput.role, { name: CompaniesLocator.SearchCompanyInput.name }).clear();

  }
}