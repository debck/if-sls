import bcrypt from 'bcrypt-nodejs';
import moment from 'moment';

import UserModel from './../models/user';

import { sendOtp, generateOtp } from './../utils/sendOtp';

export default async function createUser(args) {

	console.log("SignUp user args", { args });

	const defaultOtpStatus = UserModel.statusOtpPending;
	const { defaultCountryCode, defaultAccessLevel } = UserModel;
	
	const dateFormat = `YYYY-MM-DD HH:mm:ss`;

	const today = moment();
	const todayStr = today.format(dateFormat);

	const {
		username,
		companyName,
		countryCode,
		mobile,
		email,
		password,
	} = args;

	const userExists = await UserModel.query().where('email', email).first();
	if(userExists) {
		return {
			status: false,
			message: `User with given email already exists`,
			errorType: `USER_ERROR`
		}
	}

	const passwordHash = bcrypt.hashSync(password);

	const otpCode = generateOtp();

	const userGraph = {
		name: username,
		companyName,
		countryCode: countryCode || defaultCountryCode,
		mobile,
		password: passwordHash,
		email,
		otpStatus: defaultOtpStatus,
		accessLevel: defaultAccessLevel,
		otpCode,
		createdAt: todayStr
	}

	try {

		const newUser = await UserModel.query().insertGraph(userGraph);
		console.log(newUser);
		
		if(newUser) {

			const sendOtpResult = await sendOtp(newUser.fullMobileNumber(), otpCode);
			if(sendOtpResult.status === false) {
				return sendOtpResult;
			}

			const userObj = newUser.publicObject();

			return {
				status: true,
				data: {
					user: userObj
				},
				message: `Thank you for joining India Fastener; kindly confirm OTP received on your mobile number`,
			}
		}

	} catch(err) {
		
		const errorMessage = `Error creating a user record. ${err.message}`;

		console.log(errorMessage, { args, err });

		return {
			status: false,
			message: errorMessage,
			errorType: `INTERNAL_ERROR`
		}
	}

	return false;
}