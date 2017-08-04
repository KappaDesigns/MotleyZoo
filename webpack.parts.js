const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCopyPlugin = require('copy-webpack-plugin');
const cssnano = require('cssnano');
const webpack = require('webpack');

exports.devServer = ({ host, port } = {}) => ({
	devServer: {
		historyApiFallback: true,
		stats: 'errors-only',
		host,
		port,
		overlay: {
			errors: true,
			warnings: true,
		},
	},
});

exports.lintJS = ({ include, exclude, options }) => ({
	module: {
		rules: [
			{
				test: /\.js$/,
				include,
				exclude,
				enforce: 'pre',
				loader: 'eslint-loader',
				options,
			},
		],
	},
});

exports.loadCSS = ({ include, exclude } = {}) => ({
	module: {
		rules: [
			{
				test: /\.scss$/,
				include,
				exclude,
				use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
			},
			{
				test: /\.css$/,
				include,
				exclude,
				use: ['style-loader', 'css-loader?sourceMap'],
			}
		],
	},
});


exports.extractCSS = ({ include, exclude, use }) => {
	const plugin = new ExtractTextPlugin({
		filename: '[name].[contenthash:8].css',
	});

	return {
		module: {
			rules: [
				{
					test: /\.css$/,
					include,
					exclude,
					use: plugin.extract({
						use,
						fallback: 'style-loader',
					}),
				},
				{
					test: /\.scss$/,
					include,
					exclude,
					use: plugin.extract({
						use,
						fallback: 'style-loader',
					}),
				},
			],
		},
		plugins: [ plugin ],
	};
};

exports.autoprefix = () => ({
	loader: 'postcss-loader',
	options: {
		plugins: () => ([
			require('autoprefixer')(),
		]),
	},
});

exports.purifyCSS = ({ paths }) => ({
	plugins: [
		new PurifyCSSPlugin({
			styleExtensions: ['.css', '.scss'],
			moduleExtensions: ['.html', '.js'],
			paths,
		}),
	],
});

exports.lintCSS = ({ include, exclude }) => ({
	module: {
		rules: [
			{
				test: /\.scss$/,
				include,
				exclude,
				enforce: 'pre',

				loader: 'postcss-loader',
				options: {
					plugins: () => ([
						require('stylelint')(),
					]),
				},
			},
		],
	},
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
	module: {
		rules: [
			{
				test: /\.(png|jpg|svg)$/,
				include,
				exclude,
				loaders: [
					{
						loader: 'file-loader?name=imgs/[name].[ext]',
						options,
					},
				],
			},
		],
	},
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
	module: {
		rules: [
			{
				test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				include,
				exclude,
				use: {
					loader: 'file-loader',
					options,
				},
			},
		],
	},
});

exports.loadJS = ({ include, exclude }) => ({
	module: {
		rules: [
			{
				test: /\.js$/,
				include,
				exclude,
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
				},
			},
		],
	},
});

exports.generateSourceMaps = ({ type }) => ({
	devtool: type,
});

exports.extractBundles = (bundles) => ({
	plugins: bundles.map((bundle) => (
		new webpack.optimize.CommonsChunkPlugin(bundle)
	)),
});

exports.clean = (path) => ({
	plugins: [
		new CleanWebpackPlugin([path]),
	],
});

exports.minifyJavascript = () => ({
	plugins: [
		new BabiliPlugin(),
	],
});

exports.minifyCSS = ({ options }) => ({
	plugins: [
		new OptimizeCSSAssetsPlugin({
			cssProcessor: cssnano,
			cssProcessorOptions: options,
			canPrint: false,
		}),
	],
});

exports.setFreeVariable = (key, value) => {
	const env = {};
	env[key] = JSON.stringify(value);
	return {
		plugins: [
			new webpack.DefinePlugin(env),
		],
	};
};

exports.page = ({
	path = '',
	template = require.resolve(
		'html-webpack-plugin/default_index.ejs'
	),
	title,
	entry,
	chunks,
} = {}) => ({
	entry,
	plugins: [
		new HtmlWebpackPlugin({
			filename: `${path && path + '/'}index.html`,
			template,
			title,
			chunks,
		}),
	],
});

exports.copyPublic = () => ({
	plugins: [
		new WebpackCopyPlugin([
			{
				from: path.join(__dirname, 'public'),
				to: path.join(__dirname, 'build', 'public'),
			},
		]),
	],
});
