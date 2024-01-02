import nodemailer from "nodemailer";

import env from "../config/validateEnv";

interface EmailOptions {
  email: string;
  subject: string;
  content: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    secure: false,
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    text: options.content,
  };

  await transporter.sendMail(mailOptions);
};
