/* eslint-disable sort-keys */
module.exports = {
	parser: false,

	plugins: {
		'postcss-nesting'          : {},
		'postcss-selector-matches' : {},
		'postcss-selector-not'     : {},
		'postcss-custom-properties': {},

		'postcss-preset-env': {
			stage: 0,
		},

		'autoprefixer': {},
	},
};
