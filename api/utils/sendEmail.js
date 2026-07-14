import { BrevoClient } from "@getbrevo/brevo";
const brevoClient = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

export const sendEmail = async (to, subject, html) => {
  try {
    await brevoClient.transactionalEmails.sendTransacEmail({
      sender: {
        name: "GharBasao",
        email: process.env.BREVO_EMAIL,
      },
      to: [
        {
          email: to,
        },
      ],
      subject,
      htmlContent: html,
    });

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.log(
      "❌ Email error:",
      error.message
    );
  }
};