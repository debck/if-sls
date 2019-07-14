import jwt from 'jsonwebtoken';

import UserModel from './../models/user';

export default async function verifyUserOtp(args) {
	
	console.log("Verify User OTP Args", { args });

	const authTokenSecret = process.env.JWT_SECRET || `ind!@AthenaF@stener`;


	try {
		
		const { otpCode, userId } = args;

		if(otpCode === undefined || otpCode === null || otpCode.length === 0) {
			return {
				status: false,
				errorType: `INPUT_ERROR`,
				message: `OTP cannot be blank!`
			}
		}

		if(userId === undefined || userId === null || userId.length === 0) {
			return {
				status: false,
				errorType: `INPUT_ERROR`,
				message: `User cannot be blank`
			}
		}

		const user = await UserModel.query().where('id', userId).first();

		if(user === undefined || user === null) {
			
			return {
				status: false,
				errorType: `AUTH_ERROR`,
				message: `Invalid user! Please verify your email address`,
			}

		}

		const userOtpStatus = user.otpStatus;
		const userOtpCode = user.otpCode;

		if(userOtpStatus !== UserModel.statusOtpPending) {

			const userObj = user.publicObject();
			const authToken = jwt.sign({user: userObj}, authTokenSecret);

			return {
				status: true,
				data: {
					user: userObj,
					authToken
				},
				message: `Your account is already verified!`
			}
		}

		if(userOtpCode !== otpCode) {
			
			return {
				status: false,
				message: `Invalid OTP. Please enter the correct OTP!`
			}			
		}

		const updateUser = await UserModel.query().where('id', userId).patch({ otpStatus: UserModel.statusOtpDone});
		if(updateUser) {

			const userObj = user.publicObject();
			const authToken = jwt.sign({user: userObj}, authTokenSecret);

			return {
				status: true,
				data: {
					user: userObj,
					authToken
				},
				message: `Thank you! Your OTP was successfully verified!`,
			}
		} 

		return {
			status: false,
			message: `Error updating the OTP verification for user!`,
			errorType: `INTERNAL_ERROR`
		}
		

	} catch(err) {
		
		const errorMessage = `Error verifying the user OTP. ${err.message}`;

		console.log(errorMessage, { args, err });

		return {
			status: false,
			message: errorMessage,
			errorType: `INTERNAL_ERROR`
		}
	}

}