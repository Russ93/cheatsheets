/*
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript and css from a defined array. Creates concatenated files in
 * .tmp/public/contact directory
 * [concat](https://github.com/gruntjs/grunt-contrib-concat)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function(grunt) {
	grunt.config.set('concat', {

		'js': {

			'src': [
				'assets/js/app.js',
				'assets/js/classes/{,*/}*.js',
				'assets/js/providers/{,*/}*.js',
				'assets/js/{,*/}*.js'
			],

			'dest': 'www/public/js/app.js'

		}
	});

	return grunt.loadNpmTasks('grunt-contrib-concat');
};