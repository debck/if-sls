import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import UserModel from './../models/user';

export default async function loginUser(args) {

	console.log("Login user args", { args });

	const { username, password } = args;

	if(username === undefined || password === undefined) {
		return {
			status: false,
			message: `Invalid Input!`,
			errorType: `INPUT_ERROR`
		}
	}

	const authTokenSecret = process.env.JWT_SECRET || `ind!@AthenaF@stener`;

	const user = await UserModel.query().where('email', username).first();
	if(user) {

		const isPasswordSame = bcrypt.compareSync(password, user.password);
		console.log("Is User Password Matched", { username, isPasswordSame });


		if(isPasswordSame === true) {

			if(user.otpStatus === 0) {
			
				return {
					status: false,
					message: `Account not Verified`,
					errorType: `ACCOUNT_NOT_VERIFIED`,
				}
			}

			const userObj = user.publicObject();
			const authToken = jwt.sign({user: userObj}, authTokenSecret);

			return {
				
				status: true,
				data: {
					user: userObj,
					authToken
				},
				message: `Login Successful. Welcome to IndiaFasteners!`
			}
		}

		return {
			status: false,
			message: `Invalid Credentials`,
			errorType: `AUTH_ERROR`
		}

	}

	return {
		status: false,
		message: `User not found!`,
		errorType: `USER_ERROR`
	}
}