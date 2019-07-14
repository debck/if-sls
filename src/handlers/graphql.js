import { graphqlLambda } from 'apollo-server-lambda';
import lambdaPlayground from 'graphql-playground-middleware-lambda';
import { mergeSchemas } from 'graphql-tools';
import jwt from "jsonwebtoken";

import schema from './../schema';
import resolvers from './../resolvers';

const myGraphQLSchema = mergeSchemas({
	schemas: schema,
	resolvers,
	logger: console,
});

exports.graphqlHandler = function graphqlHandler(event, context, callback) {
	let user = null;
	context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line
	
	function callbackFilter(error, output) {
		// eslint-disable-next-line no-param-reassign
		const outputWithHeader = Object.assign({}, output, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		});
		callback(error, outputWithHeader);
	}
	
	const handler = graphqlLambda({ schema: myGraphQLSchema, tracing: true, context: { event , lambda_context : context, user} });
	
	return handler(event, context, callbackFilter);

};

// for local endpointURL is /graphql and for prod it is /stage/graphql
exports.playgroundHandler = lambdaPlayground({
	endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT
	? process.env.REACT_APP_GRAPHQL_ENDPOINT
	: '/graphql',
});