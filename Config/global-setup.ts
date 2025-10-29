// import { chromium, FullConfig } from '@playwright/test';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { credentials } from '../Utility/credentials'; // adjust import if needed

// // ✅ Fix for "__dirname" not defined in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const BASE_URL = 'https://crm-admin-staging.web.app/';
// const LOGIN_URL = `${BASE_URL}login`;
// const PROTECTED_URL = `${BASE_URL}`; // used for session validation
// const STORAGE_PATH = path.resolve(__dirname, '../storageState.json');

// /**
//  * Check if storageState.json exists
//  */
// function hasStorageFile(): boolean {
//   return fs.existsSync(STORAGE_PATH);
// }

// /**
//  * Try to validate the existing session
//  */
// async function isSessionValid(): Promise<boolean> {
//   if (!hasStorageFile()) return false;

//   console.log('🔍 Checking existing session validity...');
//   const browser = await chromium.launch({ headless: true });
//   const context = await browser.newContext({ storageState: STORAGE_PATH });
//   const page = await context.newPage();

//   try {
//     await page.goto(PROTECTED_URL, { waitUntil: 'domcontentloaded', timeout: 15000 });
//     const currentUrl = page.url();

//     if (currentUrl.includes('/login')) {
//       console.log('⚠️ Session invalid or expired — redirected to login.');
//       await browser.close();
//       return false;
//     }

//     console.log('✅ Existing session is still valid.');
//     await browser.close();
//     return true;
//   } catch (error) {
//     console.log('❌ Session validation failed:', (error as Error).message);
//     await browser.close();
//     return false;
//   }
// }

// /**
//  * Perform login and save new session
//  */
// async function loginAndSaveSession(): Promise<void> {
//   console.log('🔐 Logging in with provided credentials...');

//   const browser = await chromium.launch({ headless: true });
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded' });

//   await page.getByTestId('email').fill(credentials.email);
//   await page.getByTestId('password').fill(credentials.password);
//   await page.getByRole('button', { name: 'Login' }).click();

//   // wait for dashboard
//   await page.getByRole('img', { name: 'logo' }).first().waitFor({ state: 'visible', timeout: 20000 });
//   await page.getByRole('link', { name: 'Pipeline' }).waitFor({ state: 'visible', timeout: 20000 });

//   console.log('🎉 Login successful — saving session...');

//   // Ensure directory exists
//   fs.mkdirSync(path.dirname(STORAGE_PATH), { recursive: true });

//   await context.storageState({ path: STORAGE_PATH });
//   await browser.close();

//   console.log(`💾 New session saved to: ${STORAGE_PATH}`);
// }

// /**
//  * Global setup entry
//  */
// export default async function globalSetup() {
//   console.log('🚀 Starting Playwright global setup...');

//   const hasSession = hasStorageFile();
//   console.log(hasSession ? '📁 Found existing storageState.json.' : '📂 No existing session found.');

//   const valid = await isSessionValid();

//   if (!valid) {
//     console.log('🔁 Creating a new session...');
//     await loginAndSaveSession();
//   }

//   console.log('✅ Global setup completed successfully.');
// }


import { chromium, FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { credentials } from '../Utility/credentials';

// ✅ Fix for "__dirname" not defined in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://crm-admin-staging.web.app/';
const LOGIN_URL = `${BASE_URL}login`;
const PROTECTED_URL = `${BASE_URL}`;
// ✅ Correct storage path - relative to project root
const STORAGE_PATH = path.resolve(__dirname, '../storageState.json');

/**
 * Check if storageState.json exists
 */
function hasStorageFile(): boolean {
  return fs.existsSync(STORAGE_PATH);
}

/**
 * Try to validate the existing session
 */
async function isSessionValid(): Promise<boolean> {
  if (!hasStorageFile()) return false;

  console.log('🔍 Checking existing session validity...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ storageState: STORAGE_PATH });
  const page = await context.newPage();

  try {
    await page.goto(PROTECTED_URL, { waitUntil: 'domcontentloaded', timeout: 15000 });
    const currentUrl = page.url();

    if (currentUrl.includes('/login')) {
      console.log('⚠️ Session invalid or expired — redirected to login.');
      await browser.close();
      return false;
    }

    console.log('✅ Existing session is still valid.');
    await browser.close();
    return true;
  } catch (error) {
    console.log('❌ Session validation failed:', (error as Error).message);
    await browser.close();
    return false;
  }
}

/**
 * Perform login and save new session
 */
async function loginAndSaveSession(): Promise<void> {
  console.log('🔐 Logging in with provided credentials...');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded' });

  await page.getByTestId('email').fill(credentials.email);
  await page.getByTestId('password').fill(credentials.password);
  await page.getByRole('button', { name: 'Login' }).click();

  // wait for dashboard
  await page.getByRole('img', { name: 'logo' }).first().waitFor({ state: 'visible', timeout: 20000 });
  await page.getByRole('link', { name: 'Pipeline' }).waitFor({ state: 'visible', timeout: 20000 });

  console.log('🎉 Login successful — saving session...');

  // Ensure directory exists
  fs.mkdirSync(path.dirname(STORAGE_PATH), { recursive: true });

  await context.storageState({ path: STORAGE_PATH });
  await browser.close();

  console.log(`💾 New session saved to: ${STORAGE_PATH}`);
}

/**
 * Global setup entry
 */
export default async function globalSetup(config: FullConfig) {
  // ✅ CRITICAL: Skip global setup when running login tests
  if (process.env.SKIP_GLOBAL_SETUP === 'true') {
    console.log('⏭️ Skipping global setup - running login tests');
    return;
  }

  console.log('🚀 Starting Playwright global setup...');

  const hasSession = hasStorageFile();
  console.log(hasSession ? '📁 Found existing storageState.json.' : '📂 No existing session found.');

  const valid = await isSessionValid();

  if (!valid) {
    console.log('🔁 Creating a new session...');
    await loginAndSaveSession();
  }

  console.log('✅ Global setup completed successfully.');
}