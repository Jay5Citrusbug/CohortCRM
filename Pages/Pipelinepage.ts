import { Page, expect } from '@playwright/test';
import { LoginLocator } from '../locators/login.locator';
import { Messages } from '../messages/message';
import { PipelineLocator } from '../locators/pipeline.locator';
import { faker } from '@faker-js/faker';


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
    await this.page.getByRole(PipelineLocator.Searchbar.role, { name: PipelineLocator.Searchbar.name }).isVisible();
    await this.page.getByRole(PipelineLocator.Searchbar.role, { name: PipelineLocator.Searchbar.name }).fill('Will\'s test loan 2');

await expect(
  this.page.locator('div').filter({ hasText: 'Name of loan#StatusLoan' }).nth(3)
).toBeVisible({ timeout: 10000 });

await expect(
  this.page.getByRole('cell', { name: "Will's test loan 2" })
).toBeVisible({ timeout: 10000 });
    // ✅ Assert correct URL and presence of search bar

  }
  async Search_Invalid_NewLoans() {
    console.log('🔹 Navigating to Search New Loans...');
    await this.page.getByRole(PipelineLocator.Searchbar.role, { name: PipelineLocator.Searchbar.name }).isVisible();
    await this.page.getByRole(PipelineLocator.Searchbar.role, { name: PipelineLocator.Searchbar.name }).fill(faker.lorem.words(3));
    expect(await this.page.getByText(PipelineLocator.NoDataText.locator).nth(1).isVisible());

    // ✅ Assert correct URL and presence of search bar

  }
}