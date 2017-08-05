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
		whatWeDo: path.join(__dirname, 'src', 'pages', 'whatWeDo.html'),
		individual: path.join(__dirname, 'src', 'pages', 'individual.html'),
		coorporate: path.join(__dirname, 'src', 'pages', 'coorporate.html'),
		sponsors: path.join(__dirname, 'src', 'pages', 'sponsors.html'),
		pets: path.join(__dirname, 'src', 'pages', 'pets.html'),
	},
	JS: {
		home: path.join(__dirname, 'src', 'home.js'),
		about: path.join(__dirname, 'src', 'about.js'),
		contact: path.join(__dirname, 'src', 'contact.js'),
		involvement: path.join(__dirname, 'src', 'involvement.js'),
		events: path.join(__dirname, 'src', 'events.js'),
		whatWeDo: path.join(__dirname, 'src', 'whatWeDo.js'),
		individual: path.join(__dirname, 'src', 'individual.js'),
		coorporate: path.join(__dirname, 'src', 'coorporate.js'),
		sponsors: path.join(__dirname, 'src', 'sponsors.js'),
		pets: path.join(__dirname, 'src', 'pets.js'),
	},
};

const commonConfig = merge([
	{
		output: {
			path: PATHS.build,
			filename: '[name].js',
		},
		plugins: [
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
			}),
		],
	},
	parts.lintJS({ include: PATHS.app }),
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
		parts.page({
			title: 'Motley Zoo: What We Do',
			template: PATHS.HTML.whatWeDo,
			path: 'what-we-do',
			entry: {
				whatWeDo: PATHS.JS.whatWeDo,
			},
			chunks: ['whatWeDo', 'manifest', 'vendor'],
		}),
		parts.page({
			title: 'Motley Zoo: Individual Opportunity',
			template: PATHS.HTML.individual,
			path: 'individual',
			entry: {
				individual: PATHS.JS.individual,
			},
			chunks: ['individual', 'manifest', 'vendor'],
		}),
		parts.page({
			title: 'Motley Zoo: Coorporate Opportunity',
			template: PATHS.HTML.coorporate,
			path: 'coorporate',
			entry: {
				coorporate: PATHS.JS.coorporate,
			},
			chunks: ['coorporate', 'manifest', 'vendor'],
		}),
		parts.page({
			title: 'Motley Zoo: Sponsors',
			template: PATHS.HTML.sponsors,
			path: 'sponsors',
			entry: {
				sponsors: PATHS.JS.sponsors,
			},
			chunks: ['sponsors', 'manifest', 'vendor'],
		}),
		parts.page({
			title: 'Motley Zoo: Pets',
			template: PATHS.HTML.pets,
			path: 'pets',
			entry: {
				pets: PATHS.JS.pets,
			},
			chunks: ['pets', 'manifest', 'vendor'],
		}),
	];
	const config = env === 'production' ?
		productionConfig :
		developmentConfig;

	return merge([commonConfig, config].concat(pages));
};