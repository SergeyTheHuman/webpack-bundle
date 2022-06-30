const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

function getFilename(ext, isExtCanChange = false) {
	if (isExtCanChange) {
		return isDev ? `[name]${ext}` : `[name].[contenthash]${ext}`
	}
	return isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`
}

function setMode() {
	let mode = 'development'
	if (process.env.NODE_ENV === 'production') mode = 'production'
	return mode
}

function getCssLoader() {
	return process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader
}

module.exports = {
	mode: setMode(),
	context: path.resolve(__dirname, 'src'),
	entry: {
		main: ['./js/index.js'],
		analytics: ['./js/analytics.js'],
	},
	devtool: isDev ? 'source-map' : false,
	output: {
		filename: `./js/${getFilename('js')}`,
		assetModuleFilename: 'assets/[hash][ext][query]',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	devServer: {
		open: true,
		hot: false,
		port: '2611',
		static: {
			directory: path.resolve(__dirname, 'src'),
			watch: true,
		},
	},
	plugins: [
		new HTMLWebpackPlugin({
			filename: `./index.html`,
			template: './pug/index.pug',
		}),
		new HTMLWebpackPlugin({
			filename: `./about.html`,
			template: './pug/about.pug',
		}),
		new MiniCssExtractPlugin({
			filename: `./css/${getFilename('css')}`,
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/files'),
					to: path.resolve(__dirname, 'dist/assets/files'),
				},
			],
		}),
		new SpriteLoaderPlugin({
			plainSprite: true,
		}),
	],
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					getCssLoader(),
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[
										'postcss-preset-env',
										{
											//options
										},
									],
								],
							},
						},
					},
					'sass-loader',
				],
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader',
				exclude: /(node_modules|bower_components)/,
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.svg$/,
				loader: 'svg-sprite-loader',
				options: {
					extract: true,
					spriteFilename: 'assets/images/sprite.svg',
				},
			},
			{
				test: /\.(png|jpg|jpeg|avif|gif|webp|ico)$/i,
				type: 'asset/resource',
				generator: {
					filename: `assets/images/${getFilename('[ext]', true)}`,
				},
			},
			{
				test: /\.(otf|ttf|woff|woff2|eot)$/i,
				type: 'asset/resource',
				generator: {
					filename: `assets/fonts/${getFilename('[ext]', true)}`,
				},
			},
		],
	},
}
