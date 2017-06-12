const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const parts = require('./webpack.parts');
const merge = require('webpack-merge');

const PATHS = {
	app: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
	{
		entry: {
			app: PATHS.app,
		},
		output: {
			path: PATHS.build,
			filename:'[name].js',
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: 'Motley Zoo',
				template: `${PATHS.app}/index.html`,
			}),
		],
	},
	parts.lintJS({include: PATHS.app}),
]);

const productionConfig = merge([
]);

const developmentConfig = merge([
	parts.devServer({
		host: process.env.HOST,
		port: process.env.PORT,
	}),
]);

module.exports = (env) => {
	if (env === 'production') {
		return merge(commonConfig, productionConfig);
	}
	return merge(commonConfig, developmentConfig);
}
