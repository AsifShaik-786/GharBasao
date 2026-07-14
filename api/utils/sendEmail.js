import { TransactionalEmailsApi, TransactionalEmailsApiApiKeys, SendSmtpEmail } from "@getbrevo/brevo";

const apiInstance = new TransactionalEmailsApi();

apiInstance.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export const sendEmail = async (to, subject, html) => {
  try {
    const sendSmtpEmail = new SendSmtpEmail();

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;

    sendSmtpEmail.sender = {
      name: "GharBasao",
      email: process.env.BREVO_EMAIL,
    };

    sendSmtpEmail.to = [
      {
        email: to,
      },
    ];

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.log(
      "❌ Email error:",
      error.response?.body || error.message
    );
  }
};