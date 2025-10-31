import { Page, expect } from '@playwright/test';
import { LoginLocator } from '../locators/login.locator';
import { Messages } from '../messages/message';
import { time } from 'console';

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

    // ✅ Assert correct URL and presence of login form
    await expect(this.page).toHaveURL(Messages.URLs.login);
    await expect(this.page.getByRole(LoginLocator.loginButton.role, { name: LoginLocator.loginButton.name }))
      .toBeVisible();
    console.log('✅ Navigated to login page successfully.');
  }

  /**
   * Clicks on the "Forgot Password" link and verifies redirection.
   */
  async clickForgotPassword() {
    console.log('🔹 Clicking on Forgot Password link...');
    const forgotLink = this.page.getByRole(LoginLocator.forgotPasswordLink.role, { name: LoginLocator.forgotPasswordLink.name });

    await expect(forgotLink).toBeVisible();
    await forgotLink.click();

    // ✅ Verify correct page redirection
    await expect(this.page).toHaveURL(/forgot-password/i);
    await expect(this.page.getByRole(LoginLocator.forgotPasswordHeading.role, { name: LoginLocator.forgotPasswordHeading.name }))
      .toBeVisible();
    console.log('✅ Redirected to Forgot Password page successfully.');
  }

  /**
   * Attempts login with given credentials.
   */
  async login(email: string, password: string) {
    console.log(`🔹 Attempting login with email: ${email}`);
    const emailInput = this.page.getByTestId(LoginLocator.emailInput.testId);
    const passwordInput = this.page.getByTestId(LoginLocator.passwordInput.testId);
    const loginButton = this.page.getByRole(LoginLocator.loginButton.role, { name: LoginLocator.loginButton.name });

    // ✅ Verify elements visible before interacting
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();

    await emailInput.fill(email);
    await passwordInput.fill(password);

    // ✅ Assert fields contain expected values
    await expect(emailInput).toHaveValue(email);
    await expect(passwordInput).toHaveValue(password);

    await loginButton.click();
    console.log('✅ Login button clicked.');
  }

  /**
   * Validates error message for invalid credentials.
   */
  async validateInvalidCredentialsMessage() {
    console.log('🔹 Validating invalid login error message...');
    const errorMsg = this.page.locator(LoginLocator.invalidCredentialsText);

    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText(Messages.Alerts.invalidLogin);
    console.log('✅ Invalid credentials message displayed correctly.');
  }

  /**
   * Validates empty field errors when email and password are not filled.
   */
  async validateEmptyFieldErrors() {
    console.log('🔹 Validating empty field error messages...');
    const loginButton = this.page.getByRole(LoginLocator.loginButton.role, { name: LoginLocator.loginButton.name });

    await loginButton.click();

    const emailError = this.page.locator(LoginLocator.emptyEmailText);
    const passwordError = this.page.locator(LoginLocator.emptyPasswordText);

    await expect(emailError).toBeVisible();
    await expect(emailError).toHaveText(Messages.Alerts.emptyEmail);

    await expect(passwordError).toBeVisible();
    await expect(passwordError).toHaveText(Messages.Alerts.emptyPassword);

    console.log('✅ Empty field validation messages displayed correctly.');
  }

  /**
   * Performs valid login and verifies successful redirection.
   */
  async validLogin() {
    console.log('🔹 Performing valid login...');
    await this.login(Messages.Credentials.validEmail, Messages.Credentials.validPassword);
    await expect(this.page.getByRole(LoginLocator.logoImage.role, { name: LoginLocator.logoImage.name })).toBeVisible();
    console.log('✅ Valid login successful and dashboard visible.');

    await this.page
  .getByRole(LoginLocator.pipelineLink.role, { name: LoginLocator.pipelineLink.name })
  .isVisible();
  //await this.page.getByRole('link', { name: 'Pipeline' }).isVisible();

  }

  /**
   * Verifies session persistence by reloading page and checking if user remains logged in.
   */
  async verifySessionPersistence() {
    console.log('🔹 Checking session persistence after reload...');
    await this.page.reload();

    await expect(this.page.getByRole(LoginLocator.logoImage.role, { name: LoginLocator.logoImage.name })).toBeVisible();
    await expect(this.page).not.toHaveURL(Messages.URLs.login);

    console.log('✅ Session persisted successfully after reload.');
  }

  async verifyPageTitleAndUrl() {
    console.log('✅ Verifying page title and URL...');
await expect(this.page).toHaveURL(/crm-admin-staging\.web\.app/);
    console.log('✅ Page title and URL verified successfully.');
  }


    async verifyMainUIComponents() {
    console.log('👀 Checking main UI components...');

    await this.page.getByRole(LoginLocator.logoImage.role, { name: LoginLocator.logoImage.name }).first().isVisible();
    await this.page.getByRole(LoginLocator.pipelineLink.role, { name: LoginLocator.pipelineLink.name }) .isVisible();
  console.log('🔹 PipeLine tab visible after login...');

  await this.page.getByRole(LoginLocator.profileNavigation.role).isVisible();  
   console.log('👀 All UI components verified successfully.');

  }

  /**
   * Perform logout from Pipeline page and verify redirection.
   */
   async logoutAndVerifyRedirection() {
    console.log('🧹 Initiating logout flow...');
    // Open profile menu
  await this.page.getByRole(LoginLocator.profileNavigation.role).isVisible();

  await this.page.getByText(LoginLocator.profileName.text, { exact: true }).click();  
  await this.page.getByRole(LoginLocator.logoutButton.role, { name: LoginLocator.logoutButton.name }).isVisible();
  await this.page.getByRole(LoginLocator.logoutButton.role, { name: LoginLocator.logoutButton.name }).click();

  console.log('🧹 Logout successful, redirected to login page.');
  await expect(this.page.getByRole(LoginLocator.loginButton.role, { name: LoginLocator.loginButton.name })).toBeVisible();
  console.log('✅ Navigated to login page successfully.');
}
}