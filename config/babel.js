module.exports = {
	babelrc       : false,
	cacheDirectory: false,

	plugins: [
		'@babel/plugin-transform-runtime',
		['@babel/plugin-proposal-class-properties', {'loose': true}],
	],

	presets: [
		'@babel/preset-env',
		'@babel/preset-react',
	],
};
