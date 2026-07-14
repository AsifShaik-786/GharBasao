import Brevo from '@getbrevo/brevo';

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export const sendEmail = async (to, subject, html) => {
  try {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.subject = subject;

    sendSmtpEmail.htmlContent = html;

    sendSmtpEmail.sender = {
      name: 'GharBasao',
      email: 'hazexample123@gmail.com', // Your verified Brevo sender
    };

    sendSmtpEmail.to = [
      {
        email: to,
      },
    ];

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log('✅ Email sent successfully');
    console.log(response);
  } catch (error) {
    console.error('❌ Brevo API Error');
    console.error(error.response?.body || error.message || error);
    throw error;
  }
};