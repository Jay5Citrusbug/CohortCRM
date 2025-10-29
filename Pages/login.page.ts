// pages/login.page.ts
import { Page, expect } from '@playwright/test';
import { LoginLocator } from '../locators/login.locator';
import { Messages } from '../messages/message';
import { faker } from '@faker-js/faker';

/**
 * LoginPage class encapsulates all actions related to the Login page.
 */
export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to the login page URL.
   */
  async gotoLoginPage() {
    console.log('🔹 Navigating to login page...');
    await this.page.goto(Messages.URLs.login);
    console.log('✅ Navigated to login page.');
  }

  /**
   * Clicks on the "Forgot Password" link and verifies redirection.
   */
  async clickForgotPassword() {
    console.log('🔹 Clicking on Forgot Password link...');
    await this.page.getByRole(LoginLocator.forgotPasswordLink.role, { name: LoginLocator.forgotPasswordLink.name }).isVisible();
    await this.page.getByRole(LoginLocator.forgotPasswordLink.role, { name: LoginLocator.forgotPasswordLink.name }).click();

    await expect(this.page.getByRole(LoginLocator.forgotPasswordHeading.role, { name: LoginLocator.forgotPasswordHeading.name }))
      .toBeVisible();
    console.log('✅ Redirected to Forgot Password page.');
  }

  /**
   * Attempts login with given credentials.
   */
  async login(email: string, password: string) {
    console.log(`🔹 Attempting login with email: ${email}`);
    await this.page.getByTestId(LoginLocator.emailInput.testId).fill(email);
    await this.page.getByTestId(LoginLocator.passwordInput.testId).fill(password);
    await this.page.getByRole(LoginLocator.loginButton.role, { name: LoginLocator.loginButton.name }).isVisible();
        await this.page.getByRole(LoginLocator.loginButton.role, { name: LoginLocator.loginButton.name }).click();

    console.log('✅ Login button clicked.');
  }

  /**
   * Validates error message for invalid credentials.
   */
  async validateInvalidCredentialsMessage() {
    console.log('🔹 Validating invalid login error message...');
    await expect(this.page.locator(LoginLocator.invalidCredentialsText)).toBeVisible();
    console.log('✅ Invalid credentials message displayed correctly.');
  }

  /**
   * Validates empty field errors when email and password are not filled.
   */
  async validateEmptyFieldErrors() {
    console.log('🔹 Validating empty field error messages...');
    await this.page.getByRole(LoginLocator.loginButton.role, { name: LoginLocator.loginButton.name }).click();
    await expect(this.page.locator(LoginLocator.emptyEmailText)).toBeVisible();
    await expect(this.page.locator(LoginLocator.emptyPasswordText)).toBeVisible();
    console.log('✅ Empty field validation messages displayed.');
  }

  /**
   * Performs valid login and verifies successful redirection.
   */
  async validLogin() {
    console.log('🔹 Performing valid login...');
    await this.login(Messages.Credentials.validEmail, Messages.Credentials.validPassword);
    await expect(this.page.getByRole(LoginLocator.logoImage.role, { name: LoginLocator.logoImage.name })).toBeVisible();
    console.log('✅ Valid login successful and dashboard visible.');
  }

  /**
   * Verifies session persistence by reloading page and checking if user remains logged in.
   */
  async verifySessionPersistence() {
    console.log('🔹 Checking session persistence after reload...');
    await this.page.reload();
    await expect(this.page.getByRole(LoginLocator.logoImage.role, { name: LoginLocator.logoImage.name })).toBeVisible();
    console.log('✅ Session persisted successfully.');
  }
}
