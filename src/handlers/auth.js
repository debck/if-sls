import {success, failure} from './../utils/responseLib';
import createUser from './../services/createUser';
import loginUser from './../services/loginUser';
import verifyUserOtp from './../services/verifyUserOtp';

exports.signUp = function signUp(event, context, callback) {
	
	const lambdaContext = context;
	lambdaContext.callbackWaitsForEmptyEventLoop = false;

	try {

		const input = JSON.parse(event.body);
		const promiseResult = createUser(input);
		promiseResult.then( result => {
			if(result.status === true) {
				return callback(null, success({ status : true, data: result.data, message: result.message}));
			}

			const errorMessage = result.message;
			console.log(errorMessage, JSON.stringify({result, body: event.body}));
			return callback(null, failure({ status : false, message: errorMessage, errorType: result.errorType}));


		}).catch( error => {

			const errorMessage = `Unexpected error creating the user. ${error.message}`;
			console.log(errorMessage, JSON.stringify({error, body: event.body}));
			return callback(null, failure({ status : false, message: errorMessage, errorType: `INTERNAL_ERROR`}));
		});

	} catch(err) {

		const errorMessage = `Unexpected failure creating the user. ${err.message}`;
		console.log(errorMessage, JSON.stringify({ err, body: event.body}));
		return callback(null, failure({ status: false, message: errorMessage, errorType: `UNKNOWN_ERROR`}));

	}

	return false;
};

exports.login = function login(event, context, callback) {
	
	const lambdaContext = context;
	lambdaContext.callbackWaitsForEmptyEventLoop = false;

	try {

		const input = JSON.parse(event.body);
		const promiseResult = loginUser(input);
		promiseResult.then( result => {
			if(result.status === true) {
				return callback(null, success({ status : true, data: result.data, message: result.message}));
			}

			const errorMessage = result.message;
			console.log(errorMessage, JSON.stringify({result, body: event.body}));
			return callback(null, failure({ status : false, message: errorMessage, errorType: result.errorType}));


		}).catch( error => {

			const errorMessage = `Unexpected error signing-in the user. ${error.message}`;
			console.log(errorMessage, JSON.stringify({error, body: event.body}));
			return callback(null, failure({ status : false, message: errorMessage, errorType: `INTERNAL_ERROR`}));
		});

	} catch(err) {

		const errorMessage = `Unexpected failure signing-in the user. ${err.message}`;
		console.log(errorMessage, JSON.stringify({ err, body: event.body}));
		return callback(null, failure({ status: false, message: errorMessage, errorType: `UNKNOWN_ERROR`}));

	}

	return false;
};


exports.verifyOtp = function verifyOtp(event, context, callback) {

	const lambdaContext = context;
	lambdaContext.callbackWaitsForEmptyEventLoop = false;

	try {

		const input = JSON.parse(event.body);
		const promiseResult = verifyUserOtp(input);
		promiseResult.then( result => {
			if(result.status === true) {
				return callback(null, success({ status : true, data: result.data, message: result.message}));
			}

			const errorMessage = result.message;
			console.log(errorMessage, JSON.stringify({result, body: event.body}));
			return callback(null, failure({ status : false, message: errorMessage, errorType: result.errorType}));


		}).catch( error => {

			const errorMessage = `Unexpected error verifying user OTP. ${error.message}`;
			console.log(errorMessage, JSON.stringify({error, body: event.body}));
			return callback(null, failure({ status : false, message: errorMessage, errorType: `INTERNAL_ERROR`}));
		});

	} catch(err) {

		const errorMessage = `Unexpected failure verifying user OTP. ${err.message}`;
		console.log(errorMessage, JSON.stringify({ err, body: event.body}));
		return callback(null, failure({ status: false, message: errorMessage, errorType: `UNKNOWN_ERROR`}));

	}

	return false;

}