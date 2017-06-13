const path = require('path');

module.exports = (config) => {
	const tests = 'tests/*.test.js';

	process.env.BABEL_ENV = 'karma';

	config.set({
		frameworks: ['mocha'],
		files: [
			{
				pattern: tests,
			},
		],
		preprocessors: {
			[tests]: ['webpack'],
		},
		singleRun:true,
		webpack: require('./webpack.parts').loadJS({
			include: path.join(__dirname, 'tests', 'coverage_'),
		}),
		reporters: ['coverage'],
		coverageReporter: {
			dir: 'build_info/test_reports',
			reporters: [
				{ type: 'html' },
				{ type: 'lcov' },
			],
		},
	});
};
