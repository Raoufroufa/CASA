import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

import * as dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Use your email environment variable name
      pass: process.env.EMAIL_PASS, // Use your email password environment variable name
    },
  })
);

export  {transporter};
