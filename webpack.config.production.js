const path = require('path')
const webpack = require('webpack')
const postcssNested = require('postcss-nested')
const postcssCssnext = require('postcss-cssnext')

module.exports = {
	entry: [
		'babel-polyfill',
		'./index.jsx',
	],
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/weini/admin/static/',
	},
	resolve: {
		extensions: ['', '.jsx', '.js', '.css'],
	},
	module: {
		loaders: [{
			test: /(\.js|\.jsx)$/,
			exclude: /(node_modules)/,
			loader: 'babel',
		}, {
			test: /\.css$/,
			loader: 'style!css!postcss',
		}, {
			test: /\.(png|jpg|jpeg)$/,
			loader: 'url?limit=3072',
		}],
	},
	externals: {},
	postcss: [postcssNested, postcssCssnext],
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				screw_ie8: true,
				warnings: false,
			},
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
	],
}
