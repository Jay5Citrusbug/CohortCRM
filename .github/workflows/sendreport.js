import nodemailer from "nodemailer";
import fs from "fs";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const htmlReport = fs.readFileSync("playwright-report/index.html", "utf-8");

const mailOptions = {
  from: process.env.SMTP_USER,
  to: "qa.citrusbug@gmail.com",
  subject: "Playwright Test Report",
  html: htmlReport,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email:", error);
  } else {
    console.log("Email sent:", info.response);
  }
});
