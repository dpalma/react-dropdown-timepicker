const webpack = require("webpack")
const path = require("path")

module.exports = {
	entry: [
		'./example/index.js',
	],

	output: {
		path: path.join(__dirname, '/example'),
		filename: './bundle.js',
		publicPath: 'example/'
	},

	module: {
		loaders: [
			{ test: /\.js$/, exclude: [/node_modules/], loaders: ['babel-loader'] }
        ]
    }
    
    
}