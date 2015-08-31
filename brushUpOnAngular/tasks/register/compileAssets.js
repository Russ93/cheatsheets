module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		// 'clean:dev',
		'sass:dist',
		'coffee:dev',
		'linkAssets',
	]);
};
