import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/login.page';

 test.beforeAll(async ({ browser }) => {
        let loginPage: LoginPage;

        const context = await browser.newContext();
        const page = await context.newPage();
        loginPage = new LoginPage(page);
    
        console.log('🌐 Opening login page before all tests...');
        await loginPage.gotoLoginPage();
      });

test('test', async ({ page }) => {
  
        
      await page.getByRole('link', { name: 'Pipeline' }).isVisible();

});
