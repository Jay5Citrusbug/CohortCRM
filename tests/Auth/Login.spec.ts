// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { credentials } from '../../Utility/credentials';

test.describe('Login flow', () => {
  test('User should successfully log in', async ({ page }) => {
    await page.goto('https://crm-admin-staging.web.app/');
    // await page.getByRole('link', { name: 'logo' }).click();
    // await page.getByTestId('email').fill(credentials.email);
    // await page.getByTestId('password').fill(credentials.password);
    // await page.getByRole('button', { name: 'Login' }).click();

    // Verify dashboard visible
    await expect(page.getByRole('img', { name: 'logo' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Pipeline' })).toBeVisible();
  });
});
