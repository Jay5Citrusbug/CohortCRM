import nodemailer from 'nodemailer';
import fs from 'fs';


const transporter = nodemailer.createTransport({
  service: "gmail",
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465

  auth: {
    user: 'jay5.citrusbug@gmail.com',
    pass: process.env.SMTP_PASS,
  },
});

const mailOptions = {
  from: 'jay5.citrusbug@gmail.com',
  subject: "Playwright Test Report",
  to: 'qa.citrusbug@gmail.com',
  text: `Hello,

The automated Playwright test suite has completed.

Please find the detailed report attached.

Best regards,
QA Team
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

