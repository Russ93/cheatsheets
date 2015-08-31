/*
	* Autoinsert script tags (or other filebased tags) in an html file.
	*
	* ---------------------------------------------------------------
	*
	* Automatically inject <script> tags for javascript files and <link> tags
	* for css files.  Also automatically links an output file containing precompiled
	* templates using a <script> tag.
	*
	* For usage docs see:
	* 		https://github.com/Zolmeister/grunt-sails-linker
	*
 */
module.exports = function(grunt) {
	grunt.config.set('sails-linker', {
		'Js': {
			'options': {
				'startTag': '<!--SCRIPTS-->',
				'endTag': '<!--SCRIPTS END-->',
				'fileTmpl': '<script src="public%s"></script>',
				'appRoot': 'www/public'
			},
			'files': {
				'www/public/**/*.html': require('../pipeline').jsFilesToInject,
				'www/**/*.html': require('../pipeline').jsFilesToInject,
				'www/**/*.ejs': require('../pipeline').jsFilesToInject
			}
		},
		'Styles': {
			'options': {
				'startTag': '<!--STYLES-->',
				'endTag': '<!--STYLES END-->',
				'fileTmpl': '<link rel="stylesheet" href="public%s">',
				'appRoot': 'www/public'
			},
			'files': {
				'www/public/**/*.html': require('../pipeline').cssFilesToInject,
				'www/**/*.html': require('../pipeline').cssFilesToInject,
				'www/**/*.ejs': require('../pipeline').cssFilesToInject
			}
		},
		'JsJade': {
			'options': {
				'startTag': '// SCRIPTS',
				'endTag': '// SCRIPTS END',
				'fileTmpl': 'script(src="public%s")',
				'appRoot': 'www/public'
			},
			'files': {
				'www/**/*.jade': require('../pipeline').jsFilesToInject
			}
		},
		'StylesJade': {
			'options': {
				'startTag': '// STYLES',
				'endTag': '// STYLES END',
				'fileTmpl': 'link(rel="stylesheet", href="public%s")',
				'appRoot': 'www/public'
			},
			'files': {
				'www/**/*.jade': require('../pipeline').cssFilesToInject
			}
		}
	});
	return grunt.loadNpmTasks('grunt-sails-linker');
};