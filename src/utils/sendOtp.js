import SendOtp from 'sendotp';


const msg91Key = process.env.MSG91_KEY;
const msgSender = process.env.MSG_SENDER || `INDFAST`;
const otpDigit = 6;

const sendOtpInstance = new SendOtp(msg91Key);

export function generateOtp() {
	return Math.floor( 10 ** (otpDigit - 1) + Math.random() * (9 ** (otpDigit - 1)));
}

export async function sendOtp(contactNumber, otpCode) { // eslint-disable-line import/prefer-default-export
	
	try {

		const otpResult = await new Promise((resolve, reject) => {

			sendOtpInstance.send(contactNumber, msgSender, otpCode, (err, data) => {
				if(err) {
					return reject(err);
				}
				return resolve(data);
			});
			
		});

		console.log("OTP Service Result", { contactNumber, otpCode, msgSender, otpResult});

		return {
			status: true,
			data: {
				otpCode
			}
		}
		

	} catch(err) {
		return {
			status: false,
			message: `Error sending the OTP to the user!. ${err.message}`,
			errorType: `SERVICE_ERROR`
		}
	}
	
}