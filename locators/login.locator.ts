// locators/login.locator.ts
// Purpose: Contains all selectors used on the Login and Forgot Password pages.

export const LoginLocator = {
  // --- Page Headings ---
  stayConnectedHeading: { role: 'heading', name: 'Stay connected...' }, // Main login heading
  forgotPasswordHeading: { role: 'heading', name: 'Forgot Password' }, // Forgot Password page heading

  // --- Links ---
  forgotPasswordLink: { role: 'link', name: 'Forgot Password?' }, // Link for Forgot Password navigation

  // --- Input Fields (prefer data-testid when available) ---
  emailInput: { testId: 'email' }, // Email field
  passwordInput: { testId: 'password' }, // Password field

  // --- Buttons ---
  loginButton: { role: 'button', name: 'Login' }, // Login button on login page

  // --- Error Messages ---
  invalidCredentialsText: 'text=Email or password is invalid.', // Invalid credentials alert
  emptyEmailText: 'text=Please enter your email!', // Empty email validation
  emptyPasswordText: 'text=Please enter your password!', // Empty password validation

  // --- Navigation Elements ---
  logoImage: { role: 'img', name: 'logo' }, // App logo
  pipelineLink: { role: 'link', name: 'Pipeline' }, // Pipeline navigation link
} as const;
