import nodemailer from 'nodemailer';
import fs from 'fs';


const transporter = nodemailer.createTransport({
  service: "gmail",
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});



fs.readFileSync("playwright-report/index.html", "utf-8");

const mailOptions = {
  from: process.env.SMTP_USER,
  subject: "Playwright Test Report",
  to: process.env.TO_EMAIL?.split(',').map(email => email.trim()) || ['qa.citrusbug@gmail.com'],
  text: `Hello Bluedrop Academy,

The automated Playwright test suite has completed.

Please find the detailed report attached.

Best regards,
Your Automation Team
`,
}
// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('❌ Error sending email:', error.toString());
    process.exit(1);
  } else {
    console.log('📧 Email sent successfully:', info.response);
  }
});

