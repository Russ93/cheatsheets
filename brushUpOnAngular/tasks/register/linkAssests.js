module.exports = function (grunt) {
	grunt.registerTask('linkAssets', [
		'sails-linker:Js',
		'sails-linker:Styles',
		'sails-linker:JsJade',
		'sails-linker:StylesJade',
		'bowerInstall',
	]);
};