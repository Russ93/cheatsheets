/*
	* Compile CoffeeScript files to JavaScript.
	*
	* ---------------------------------------------------------------
	*
	* Compiles coffeeScript files from `assest/js` into Javascript and places them into
	* `.tmp/public/js` directory.
	*
	* For usage docs see:
	* 		https://github.com/gruntjs/grunt-contrib-coffee
 */
module.exports = function(grunt) {

	grunt.config.set('coffee', {
		'dev': {

			'options': {
				'join': true
			},

			'files': {
				"www/public/js/app.js": [
					'assets/js/app.coffee',
					'assets/js/classes/{,*/}*.coffee',
					'assets/js/providers/{,*/}*.coffee',
					'assets/js/{,*/}*.coffee'
				]
			}

		}
	});

	return grunt.loadNpmTasks('grunt-contrib-coffee');
};