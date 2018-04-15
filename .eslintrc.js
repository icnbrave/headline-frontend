
module.exports = {
	root: true,
	parser: 'babel-eslint',
	parseOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
	},
	extends: 'standard',
	plugins: [
		'html'
	],
	'rules': {
		'arrow-parent': 0,
		'generator-star-spacing': 0,
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
	}
}