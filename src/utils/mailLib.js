import sendgridEmail from "@sendgrid/mail";

sendgridEmail.setApiKey(process.env.SENDGRID_API_KEY);

const defaultFromEmail = 'SNM Digest <donotreply@societynmore.com>';

//  eslint-disable-next-line no-unused-vars, consistent-return, import/prefer-default-export
export async function sendMail(toEmail, subject, mailContent, extras = {}) { 
    
	const sendGridMessage = {
        to: toEmail,
        from: defaultFromEmail,
        subject,
        text: subject,
        html: mailContent,
    };

    try {

        const sendgridResult = await sendgridEmail.send(sendGridMessage);
        console.debug("Sendgrid Result Success", subject, toEmail, sendgridResult);
        return {
            status: true,
            message: `Mail sent Successfully (Subject: ${subject})!`
        }

    } catch(err) {
		console.error("Error sending the email! Internal Error", subject, toEmail, mailContent);
		console.debug(err);
        
		return {
            status: false,
            message: `Internal Error while sending the email! (${err.message})`
        }
    }
}