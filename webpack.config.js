const path = require('path');
const parts = require('./webpack.parts');
const merge = require('webpack-merge');
const glob = require('glob');
const webpack = require('webpack');

const PATHS = {
	app: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'build'),
	records: path.join(__dirname, 'build_info'),
	recordJSON: path.join(__dirname, 'build_info', 'records.json'),
	HTML: {
		home: path.join(__dirname, 'src', 'pages', 'index.html'),
		about: path.join(__dirname, 'src', 'pages', 'about.html'),
		contact: path.join(__dirname, 'src', 'pages', 'contact.html'),
		involvement: path.join(__dirname, 'src', 'pages', 'involvement.html'),
		events: path.join(__dirname, 'src', 'pages', 'events.html'),
	},
	JS: {
		home: path.join(__dirname, 'src', 'home.js'),
		about: path.join(__dirname, 'src', 'about.js'),
		contact: path.join(__dirname, 'src', 'contact.js'),
		involvement: path.join(__dirname, 'src', 'involvement.js'),
		events: path.join(__dirname, 'src', 'events.js'),
	},
};

const commonConfig = merge([
	{
		output: {
			path: PATHS.build,
			filename:'[name].js',
		},
		plugins: [
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
			}),
		],
	},
	parts.lintJS({include: PATHS.app}),
	parts.lintCSS({ include: PATHS.app }),
	parts.loadFonts({
		options: {
			name: '[name].[hash:8].[ext]',
		},
	}),
	parts.loadJS({ include: PATHS.app }),
]);

const productionConfig = merge([
	{
		output: {
			chunkFilename: '[name].[chunkhash:8].js',
			filename: '[name].[chunkhash:8].js',
		},
		plugins: [
			new webpack.HashedModuleIdsPlugin(),
		],
		recordsPath: PATHS.recordJSON,
	},
	parts.clean(PATHS.build),
	parts.minifyJavascript(),
	parts.minifyCSS({
		options: {
			discardComments: {
				removeAll: true,
			},
			safe: true,
		}
	}),
	parts.generateSourceMaps({ type: 'source-map' }),
	parts.loadImages({
		options: {
			limit: 15000,
			name: '[name].[hash:8].[ext]',
		},
	}),
	parts.extractCSS({
		use: ['css-loader', parts.autoprefix(), 'sass-loader'],
	}),
	parts.purifyCSS({
		paths: glob.sync(`${PATHS.app}/**/*.html`, { nodir: true }),
	}),
	parts.extractBundles([
		{
			name: 'vendor',
			minChunks: ({ resource }) => (
				resource &&
				resource.indexOf('node_modules') >= 0 &&
				resource.match(/\.js$/)
			),
		},
		{
			name: 'manifest',
			minChunks: Infinity,
		}
	]),
	parts.setFreeVariable(
		'process.env.NODE_ENV',
		'production'
	),
	parts.copyPublic(),
]);

const developmentConfig = merge([
	{
		output: {
			devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
		},
	},
	parts.generateSourceMaps({ types: 'cheap-module-eval-source-map' }),
	parts.devServer({
		host: process.env.HOST,
		port: process.env.PORT,
	}),
	parts.loadImages({
		options: {
			limit: 15000,
			name: '[name].[ext]',
		},
	}),
	parts.loadCSS(),
]);

module.exports = (env) => {
	const pages = [
		parts.page({
			title: 'Motley Zoo: Home',
			template: PATHS.HTML.home,
			entry: {
				home: PATHS.JS.home,
			},
			chunks: ['home', 'manifest', 'vendor'],
		}),
		parts.page({
			title: 'Motley Zoo: About',
			template: PATHS.HTML.about,
			path: 'about',
			entry: {
				about: PATHS.JS.about,
			},
			chunks: ['about', 'manifest', 'vendor'],
		}),
		parts.page({
			title: 'Motley Zoo: Contact',
			template: PATHS.HTML.contact,
			path: 'contact',
			entry: {
				contact: PATHS.JS.contact,
			},
			chunks: ['contact', 'manifest', 'vendor'],
		}),
		parts.page({
			title: 'Motley Zoo: Involvement',
			template: PATHS.HTML.involvement,
			path: 'involvement',
			entry: {
				involvement: PATHS.JS.involvement,
			},
			chunks: ['involvement', 'manifest', 'vendor'],
		}),
		parts.page({
			title: 'Motley Zoo: Events',
			template: PATHS.HTML.events,
			path: 'events',
			entry: {
				events: PATHS.JS.events,
			},
			chunks: ['events', 'manifest', 'vendor'],
		}),
	];
	const config = env === 'production' ?
		productionConfig :
		developmentConfig;

	return merge([commonConfig, config].concat(pages));
};
