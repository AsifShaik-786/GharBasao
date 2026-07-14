import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 5000,
  greetingTimeout: 5000,
  socketTimeout: 5000,
});

export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"GharBasao" <hazexample123@gmail.com>`,
      to,
      subject,
      html,
    });

    console.log(`✅ Email sent to ${to}`);
    console.log(info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Email Error:");
    console.error(error.message);

    throw error;
  }
};