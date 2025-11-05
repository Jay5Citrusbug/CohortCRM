import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'jay5.citrusbug@gmail.com',
    pass: process.env.SMTP_PASS,
  },
});

// Environment-based data
const totalTests = Number(process.env.TOTAL || '0');
const passedTests = Number(process.env.PASSED || '0');
const failedTests = Number(process.env.FAILED || '0');
const skippedTests = Number(process.env.SKIPPED || '0');

const reportDate = process.env.REPORT_TIMESTAMP || new Date().toLocaleString();
const repoOwner = process.env.REPO_OWNER || 'your-org';
const repoName = process.env.REPO_NAME || 'your-repo';
const reportUrl = process.env.REPORT_URL || 
  `https://${repoOwner}.github.io/${repoName}/all-reports/${process.env.REPORT_DATE || ''}/report.html`;

// 🖼️ Local SVG logo path
const logoPath = path.resolve('.github/workflows/logo.svg'); // adjust if logo in assets/

// HTML summary
const summaryTable = `
  <h3>🧪 Test Summary</h3>
  <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: sans-serif;">
    <tr style="background-color: #f2f2f2;">
      <th>Total</th>
      <th>Passed</th>
      <th>Failed</th>
      <th>Skipped</th>
    </tr>
    <tr>
      <td>${totalTests}</td>
      <td style="color: green;">${passedTests}</td>
      <td style="color: red;">${failedTests}</td>
      <td style="color: gray;">${skippedTests}</td>
    </tr>
  </table>
  <br />
`;

// Email configuration
const mailOptions = {
  from: 'jay5.citrusbug@gmail.com',
  to: 'qa.citrusbug@gmail.com',
  subject: `Playwright Test Report - ${process.env.GITHUB_REF_NAME} - ${process.env.REPORT_DATE || reportDate}`,
  text: `Hello William,

The automated Playwright test suite has completed.

Date: ${reportDate}
Total: ${totalTests}
Passed: ${passedTests}
Failed: ${failedTests}
Skipped: ${skippedTests}

View the full report: ${reportUrl}

Best regards,
Citrusbug QA Team`,

  html: `
  <div style="text-align: left; margin-bottom: 20px;">
    <img src="cid:logo_cid" alt="App Logo" width="120" style="display: inline-block; margin-bottom:10px;" />
  </div>
 
  <p>Hello <strong>William</strong>,</p>
  <p>The automated <strong>Playwright test suite</strong> for branch <strong>${process.env.GITHUB_REF_NAME}</strong> has completed.</p>
  <p><strong>Date:</strong> ${reportDate}</p>
  ${summaryTable}
  <div style="margin: 20px 0;">
    <a href="${reportUrl}" target="_blank" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">📄 View Full Report</a>
  </div>
  <p>Best regards,<br/>Citrusbug QA Team</p>
  `,

  attachments: [
    {
      filename: 'logo.svg',
      path: logoPath,
      cid: 'logo_cid',
    },
  ],
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('❌ Error sending email:', error.toString());
    process.exit(1);
  } else {
    console.log(`📧 Email sent successfully at ${reportDate}: ${info.response}`);
  }
});
