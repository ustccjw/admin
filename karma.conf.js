const webpack = require('webpack')
const postcssNested = require('postcss-nested')
const postcssCssnext = require('postcss-cssnext')

module.exports = function (config) {
	config.set({
		hostname: 'crmtest.baixing.com.cn',
		proxies: {
			'/weini': 'http://crmtest.baixing.com.cn:80/weini',
			'/api': 'http://crmtest.baixing.com.cn:80/api',
		},
		browsers: ['Chrome'],
		singleRun: true,
		frameworks: ['mocha'],
		files: [
			'node_modules/babel-polyfill/dist/polyfill.js',
			'test.webpack.js',
		],
		preprocessors: {
			'test.webpack.js': ['webpack', 'sourcemap'],
		},
		reporters: ['dots'],
		webpack: {
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
			postcss: [postcssNested, postcssCssnext],
			plugins: [
				new webpack.DefinePlugin({
					'process.env.NODE_ENV': JSON.stringify('test'),
				}),
			],
			devtool: 'inline-source-map',
		},
		webpackServer: {
			noInfo: true,
		},
	})
}
