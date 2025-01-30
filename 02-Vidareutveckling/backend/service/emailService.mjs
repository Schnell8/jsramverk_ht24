import mailgun from 'mailgun-js';

import 'dotenv/config';

const mailgunClient = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
});

export const sendEmail = async (to, subject, text) => {
    try {
        const emailData = {
            from: 'noreply@my-test-domain.com',
            to,
            subject,
            text,
        };

        const result = await mailgunClient.messages().send(emailData);

        console.log(`Email sent: ${result.message}`);
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email');
    }
};
