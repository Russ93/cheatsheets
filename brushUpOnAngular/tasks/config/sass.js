/*
 * Compiles SASS files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * Only the `assets/styles/importer.sass` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-sass
 */
module.exports = function(grunt) {

	grunt.config.set('sass', {

		'dist': {

			'files': {
				"www/public/styles/main.css": "assets/styles/*.sass"
			}

		}
	});

	return grunt.loadNpmTasks('grunt-contrib-sass');

};