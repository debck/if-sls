import {success, failure} from './../utils/responseLib';
import Profile from './../services/companyProfile';

exports.companyProfile = function companyProfile(event, context, callback) {
	
	const lambdaContext = context;
	lambdaContext.callbackWaitsForEmptyEventLoop = false;

	try {

		const promiseResult = Profile(event.queryStringParameters);
		promiseResult.then( result => {
			if(result.status === true) {
				return callback(null, success({ status : true, data: result.data, message: result.message}));
			}

			const errorMessage = result.message;
			console.log(errorMessage, JSON.stringify({result, body: event.body}));
			return callback(null, failure({ status : false, message: errorMessage, errorType: result.errorType}));


		}).catch( error => {

			const errorMessage = `Unexpected error getting the company. ${error.message}`;
			console.log(errorMessage, JSON.stringify({error, body: event.body}));
			return callback(null, failure({ status : false, message: errorMessage, errorType: `INTERNAL_ERROR`}));
		});

	} catch(err) {

		const errorMessage = `Unexpected failure getting the company. ${err.message}`;
		console.log(errorMessage, JSON.stringify({ err, body: event.body}));
		return callback(null, failure({ status: false, message: errorMessage, errorType: `UNKNOWN_ERROR`}));

	}

	return false;
};