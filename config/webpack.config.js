// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const {hostName, port} = require('./local.default');

module.exports = {
	context: path.resolve(__dirname, '../app'),

	devServer: {
		contentBase       : path.join(__dirname, '..','dist'),
		disableHostCheck  : true,
		historyApiFallback: true,
		host              : hostName,
		port              : port,
	},

	devtool: isProduction ? false : 'cheap-module-eval-source-map',
	entry  : './index.js',
	mode   : isProduction ? 'production' : 'development',

	module: {
		rules: [
			{
				exclude: /node_modules/,
				loader : 'babel-loader',
				query  : require('./babel'),
				test   : /\.js$/,
			},

			{
				include: [
					path.resolve(__dirname, '../app'),
					path.resolve(__dirname, '../node_modules'),
				],

				test: /\.css$/,

				use: isProduction
					? [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',

							options: {
								importLoaders: 1,

								modules: {
									localIdentName: '[local]__[hash:base64:5]',
									mode          : 'global',
								},
							},
						},

						{loader: 'postcss-loader'},
					]

					: [
						{loader: 'style-loader'},

						{
							loader: 'css-loader',

							options: {
								importLoaders: 1,

								modules: {
									localIdentName: '[local]__[hash:base64:5]',
									mode          : 'global',
								},

								sourceMap: true,
							},
						},

						{loader: 'postcss-loader'},
					],
			},

			{
				test: /\.svg$/,
				use : ['@svgr/webpack', 'url-loader'],
			},

			{
				loaders: [
					'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
					'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
				],

				test: /\.(jpe?g|png|gif)$/i,
			},
		],
	},

	optimization: {
		minimizer: [
			new TerserPlugin({
				cache    : true,
				parallel : true,
				sourceMap: true,
			}),
		],
	},

	output: {
		filename  : isProduction ? '[name]-[chunkhash].bundle.js' : '[name].bundle.js',
		path      : path.join(__dirname, '..', 'dist'),
		pathinfo  : !isProduction,
		publicPath: '/',
	},

	performance: {hints: false},

	plugins: [
		new CopyPlugin([
			{from: 'assets', to: 'assets'},
		]),

		new MiniCssExtractPlugin({
			chunkFilename: '[name].[contenthash:8].chunk.css',
			filename     : '[name].[contenthash:8].css',
		}),

		new HtmlWebpackPlugin(
			isProduction
				? {
					inject: true,

					minify: {
						collapseWhitespace           : true,
						keepClosingSlash             : true,
						minifyCSS                    : true,
						minifyJS                     : true,
						minifyURLs                   : true,
						removeComments               : true,
						removeEmptyAttributes        : true,
						removeRedundantAttributes    : true,
						removeStyleLinkTypeAttributes: true,
						useShortDoctype              : true,
					},

					template: '../public/index.html',
				}

				: {template: '../public/index.html'},
		),
	],

	resolve: {
		alias: {
			'app': path.join(__dirname, '../app'),
		},

		extensions: ['.json', '.js'],

		modules: [
			path.resolve(__dirname, '..', 'app'),
			path.resolve(__dirname, '..', 'node_modules'),
		],
	},


}
