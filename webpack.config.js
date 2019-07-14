const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	
	entry : slsw.lib.entries,
	target : "node",
	// Since aws-sdk is not compatible with webpack, 
	// we exclude all node dependencies
	externals : [nodeExternals({
		whitelist: ['mysql']
	})], 
	// mode: slsw.lib.webpack.isLocal ? "development" : "production",
	// Run babel on all .js files and skip node_modules
	module : {
		rules : [
			{
				test : /\.js$/,
				loader : "babel-loader",
				include : __dirname,
				exclude : /node_modules/ 
			}
		]
	},
	node: {
		__dirname: true,
		__filename: true,
		fs: 'empty',
	},
	plugins: [
		new CopyWebpackPlugin([
	    	{ from: './models/*', to: './' }
		], {})
	],
};