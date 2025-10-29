// import { chromium, FullConfig } from '@playwright/test';
// import { defineConfig, devices } from '@playwright/test';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// /**
//  * Read environment variables from file.
//  * https://github.com/motdotla/dotenv
//  */
// // import dotenv from 'dotenv';
// // import path from 'path';
// // dotenv.config({ path: path.resolve(__dirname, '.env') });

// /**
//  * See https://playwright.dev/docs/test-configuration.
//  */
// export default defineConfig({


  
//   testDir: './tests',
//   //globalSetup: 'D:/Automation/Playwright/Cohort CRM/Config/global-setup.ts',


//   /* Run tests in files in parallel */
//   fullyParallel: true,
//   /* Fail the build on CI if you accidentally left test.only in the source code. */
//   forbidOnly: !!process.env.CI,
//   /* Retry on CI only */
//   retries: process.env.CI ? 2 : 0,
//   /* Opt out of parallel tests on CI. */
//   workers: process.env.CI ? 1 : undefined,
//   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
//   reporter: [
//       ['html', { outputFolder: 'playwright-report', open: 'never', title: 'Cohort CRM - Automation Report' }],
//       ['list'],
//       ['json', { outputFile: 'playwright-report/report.json' }]

//   ],
//   /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  

//   use: {
//     // ✅ Base URL for your app
//     baseURL: 'https://crm-admin-staging.web.app/',

//     // ✅ Reuse login session
//   storageState: path.resolve(__dirname, './storageState.json'),

//     // ✅ Record video only when test fails
//     video: 'retain-on-failure',

//     // ✅ Take screenshot automatically when test fails
//     screenshot: 'only-on-failure',

//   },
  
  
//   /* Configure projects for major browsers */
//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },

//   //       {
//   //        name: 'Login-tests',
//   //        testMatch: /.*[\\/]Auth[\\/]Login\.spec\.ts$/, // ✅ Correct path for Windows and POSIX
//   //   use: {
//   //     storageState: undefined, // no session for login tests
//   //   },
//   // },
//   // {
//   //   name: 'authenticated-tests',
//   //   testIgnore: /.*[\\/]Auth[\\/]Login\.spec\.ts$/, // ✅ ignore same login spec for session tests
//   //   use: {
//   //     storageState: path.resolve(__dirname, './storageState.json'), // reuse session
//   //   },
//  // },

//     // {
//     //   name: 'firefox',
//     //   use: { ...devices['Desktop Firefox'] },
//     // },

//     // {
//     //   name: 'webkit',
//     //   use: { ...devices['Desktop Safari'] },
//     // },

//     /* Test against mobile viewports. */
//     // {
//     //   name: 'Mobile Chrome',
//     //   use: { ...devices['Pixel 5'] },
//     // },
//     // {
//     //   name: 'Mobile Safari',
//     //   use: { ...devices['iPhone 12'] },
//     // },

//     /* Test against branded browsers. */
//     // {
//     //   name: 'Microsoft Edge',
//     //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
//     // },
//     // {
//     //   name: 'Google Chrome',
//     //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
//     // },
//   ],

//   /* Run your local dev server before starting the tests */
//   // webServer: {
//   //   command: 'npm run start',
//   //   url: 'http://localhost:3000',
//   //   reuseExistingServer: !process.env.CI,
//   // },

// });

// import { defineConfig, devices } from '@playwright/test';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Detect if login.spec.ts is part of the run
// const isLoginTest = process.argv.some(arg => arg.includes('login.spec.ts'));

// export default defineConfig({
//   testDir: './tests',

//   // ✅ Run global setup only if NOT running login.spec.ts
//   globalSetup: !isLoginTest ? './Config/global-setup.ts' : undefined,

//   fullyParallel: true,
//   forbidOnly: !!process.env.CI,
//   retries: process.env.CI ? 2 : 0,
//   workers: process.env.CI ? 1 : undefined,

//   reporter: [
//     ['html', { outputFolder: 'playwright-report', open: 'never', title: 'Cohort CRM - Automation Report' }],
//     ['list'],
//     ['json', { outputFile: 'playwright-report/report.json' }]
//   ],

//   use: {
//     baseURL: 'https://crm-admin-staging.web.app/',
//     // ✅ Skip session for login tests
//     storageState: isLoginTest ? undefined : path.resolve(__dirname, './storageState.json'),
//     video: 'retain-on-failure',
//     screenshot: 'only-on-failure',
//   },

//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },
//   ],
// });
import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Define the storage state path
const STORAGE_STATE = path.resolve(__dirname, './storageState.json');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never', title: 'Cohort CRM - Automation Report' }],
    ['list'],
    ['json', { outputFile: 'playwright-report/report.json' }]
  ],

  // --- Base 'use' options inherited by all projects ---
  use: {
    baseURL: 'https://crm-admin-staging.web.app/',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  /* * ❌ REMOVE globalSetup and storageState from the top level.
   * globalSetup: !isLoginTest ? './Config/global-setup.ts' : undefined,
   * storageState: isLoginTest ? undefined : path.resolve(__dirname, './storageState.json'),
   */

  // --- ✅ DEFINE PROJECTS ---
  projects: [
    {
      // --- Project 1: Run login test ---
      name: 'Login Test',
      
      // Tell Playwright to only run this spec file in this project
      testMatch: /.*Login\.spec\.ts/,      
      // This project runs FRESH. No setup, no saved state.
      use: {
        ...devices['Desktop Chrome'],
        // storageState is NOT set here
      },
      // globalSetup is NOT set here
    },

    {
      // --- Project 2: Run all other tests ---
      name: 'Authenticated Tests',
      
      // Tell Playwright to IGNORE the login spec file (it's handled above)
      testIgnore: /.*Login\.spec\.ts/,   
      
      // Use the storage state created by the global setup
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
      },
    },

    /*
    // You can add other browsers that also use the authenticated setup
    {
      name: 'Authenticated Firefox',
      testIgnore: /.*login\.spec\.ts/,
      globalSetup: './Config/global-setup.ts',
      use: {
        ...devices['Desktop Firefox'],
        storageState: STORAGE_STATE,
      },
    },
    */
  ],
});