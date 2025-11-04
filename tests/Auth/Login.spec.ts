// tests/login/login.spec.ts
import { Page, test } from '@playwright/test';
import { LoginPage } from '../../Pages/login.page';
import { Messages } from '../../messages/message';

test.describe('🔐 Login and Logout tests', () => {
  let loginPage: LoginPage;
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    console.log('🌐 Opening login page before all tests...');
    const context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
  });

  test('🔗 TC_01 - Verify Forgot Password redirection', async () => {
    console.log('➡️ Test Start: Verify Forgot Password link redirects correctly');
    await loginPage.clickForgotPassword();
    await loginPage.page.goBack();
    console.log('✅ Test Completed: Forgot Password redirect verified and navigated back.');
  });

  test('⚠️ TC_02 - Empty email or password field validation', async () => {
    console.log('➡️ Test Start: Empty email or password field validation');
    await loginPage.validateEmptyFieldErrors();
    console.log('✅ Test Completed: Empty field validation successful.');
  });

  test('❌ TC_03 - Invalid login with wrong credentials', async () => {
    console.log('➡️ Test Start: Invalid login with wrong credentials');
    await loginPage.validateInvalidCredentialsMessage();
    console.log('✅ Test Completed: Invalid login validation successful.');
  });

  test('✅ TC_04 - Valid login with correct credentials', async () => {
    console.log('➡️ Test Start: Valid login with correct credentials');
    await loginPage.validLogin();
    console.log('✅ Test Completed: Valid login successful.');
  });

  test('🧭 TC_05 - Verify page title and URL after login', async () => {
    console.log('Starting test: Verify page title and URL...');
    await loginPage.verifyPageTitleAndUrl();
  });

  test('👀 TC_06 - Verify main UI components load correctly', async () => {
    console.log('Starting test: Verify UI components...');
    await loginPage.verifyMainUIComponents();
  });

  test('🧹 TC_07 - Validate logout redirects back to login screen', async () => {
    console.log('Starting test: Verify logout flow...');
    await loginPage.logoutAndVerifyRedirection();
  });

  test.afterAll(async () => {
    console.log('🧽 Closing browser context...');
    await page.context().close();
  });
}); 
