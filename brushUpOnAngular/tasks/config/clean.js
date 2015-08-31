/*
  * Clean files and folders.
  *
  * ---------------------------------------------------------------
  *
  * This grunt task is configured to clean out the contents in the .tmp/public
  *
  * For usage docs see:
  * 		https://github.com/gruntjs/grunt-contrib-clean
 */
module.exports = function(grunt) {

  grunt.config.set('clean', {

    'dev': ['www/public/**']

  });

  return grunt.loadNpmTasks('grunt-contrib-clean');

};