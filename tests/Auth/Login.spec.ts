// tests/login/login.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../../Pages/login.page';
import { Messages } from '../../messages/message';
import { log } from 'console';

test.describe('🔐 Login Page Automation', () => {
  let loginPage: LoginPage;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    loginPage = new LoginPage(page);

    console.log('🌐 Opening login page before all tests...');
    await loginPage.gotoLoginPage();
  });

  test('🔗 Verify Forgot Password redirection', async () => {
    console.log('➡️ Test Start: Verify Forgot Password link redirects correctly');
    await loginPage.clickForgotPassword();
    console.log('✅ Test Completed: Forgot Password redirect verified.');
    await loginPage.page.goBack();
    console.log('✅ Test Completed: Forgot Password redirect verified and navigated back.');
});

  test('⚠️ Empty email or password field validation', async () => {
    console.log('➡️ Test Start: Empty email or password field validation');
    await loginPage.validateEmptyFieldErrors();
    console.log('✅ Test Completed: Empty field validation successful.');
  });

  test('❌ Invalid login with wrong credentials', async () => {
    console.log('➡️ Test Start: Invalid login with wrong credentials');
    await loginPage.login(Messages.Credentials.invalidEmail, Messages.Credentials.invalidPassword);
    await loginPage.validateInvalidCredentialsMessage();
    console.log('✅ Test Completed: Invalid login validation successful.');
  });

  test('✅ Valid login with correct credentials', async () => {
    console.log('➡️ Test Start: Valid login with correct credentials');
    await loginPage.validLogin();
    console.log('✅ Test Completed: Valid login successful.');
  });

});
