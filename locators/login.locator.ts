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


  profileButton: { role: 'navigation', name: 'TT' },

  // Logout options visible under user profile dropdown
  logoutOptionDiv: "div:has-text('Logout')", // first logout in dropdown
  logoutButton: { role: 'button', name: 'Logout' },



  // Example UI components for validation
  filterSection: 'data-testid=filter-section',
  // --- Profile Section ---
  profileNavigation: { role: 'navigation' }, // Navigation container for user profile
  profileName: { text: 'TT', exact: true }, // Profile initials/name displayed in header

  // --- Logout Elements ---
} as const;
