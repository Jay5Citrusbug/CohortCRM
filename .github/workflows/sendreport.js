import nodemailer from 'nodemailer';
import fs from 'fs';

const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const toEmails = process.env.TO_EMAIL?.split(',').map(e => e.trim()) || ['qa.citrusbug@gmail.com'];

// ✅ Read the HTML report file
const reportPath = 'playwright-report/index.html';
const htmlReport = fs.readFileSync(reportPath, 'utf-8');

// ✅ Create the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

// ✅ Compose the email
const mailOptions = {
  from: smtpUser,
  to: toEmails,
  subject: 'Playwright Test Report',
  text: `Hello Bluedrop Academy,

The automated Playwright test suite has completed.

You can view the full report as an attachment, or inline below (if supported).

Best regards,
Your Automation Team
`,
  html: htmlReport,
  attachments: [
    {
      filename: 'Playwright_Report.html',
      path: reportPath,
      contentType: 'text/html',
    },
  ],
};

// ✅ Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('❌ Error sending email:', error);
    process.exit(1);
  } else {
    console.log('📧 Email sent successfully:', info.response);
  }
});
