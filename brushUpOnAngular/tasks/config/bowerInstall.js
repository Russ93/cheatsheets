/*
  * Links the bower files to the index.html
  *
  * ---------------------------------------------------------------
  *
  *
  * For usage docs see:
  * 		https://github.com/gruntjs/grunt-contrib-clean
 */
module.exports = function(grunt) {

  grunt.config.set('bowerInstall', {

    'target': {

      'src': ["www/index.html"]

    }

  });

  return grunt.loadNpmTasks("grunt-bower-install");
};