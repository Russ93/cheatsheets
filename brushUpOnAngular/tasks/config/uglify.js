/*
 * Minify files with UglifyJS.
 *
 * ---------------------------------------------------------------
 *
 * Minifies client-side javascript `assets`.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function(grunt) {
	grunt.config.set('uglify', {

		'dist': {

			'files': grunt.file.expandMapping(['www/public/js/**/*.js'], "./", {

				rename: function(destBase, destPath) {
					return destBase + destPath;
				}

			})

		}
	});

	return grunt.loadNpmTasks('grunt-contrib-uglify');

};