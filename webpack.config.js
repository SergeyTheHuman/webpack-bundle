const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let mode = 'development'

function setMode() {
	if (process.env.NODE_ENV === 'production') mode = 'production'
}

function getCssLoader() {
	return mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader
}

module.exports = {
	mode: setMode(),
	entry: {
		main: ['@babel/polyfill', path.resolve(__dirname, 'src/index.js')],
		analytics: ['@babel/polyfill', path.resolve(__dirname, 'src/analytics.js')],
	},
	devtool: 'source-map',
	output: {
		filename: '[name].[contenthash].js',
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
			filename: 'index.html',
			template: path.resolve(__dirname, 'src/index.pug'),
		}),
		new HTMLWebpackPlugin({
			filename: 'about.html',
			template: path.resolve(__dirname, 'src/about.pug'),
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
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
				test: /\.(png|jpg|jpeg|avif|gif|svg|webp)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/images/[name][ext]',
				},
			},
			{
				test: /\.(otf|ttf|woff|woff2|eot)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[name][ext]',
				},
			},
		],
	},
}
