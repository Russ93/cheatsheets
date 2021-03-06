// Karma configuration
// Generated on 2016-05-15

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    'autoWatch': true,

    // base path, that will be used to resolve files and exclude
    'basePath': '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    'frameworks': [
      // 'jasmine',
      'mocha',
      'chai',
    ],

    // list of files / patterns to load in the browser
    'files': [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    'exclude': [
    ],

    // web server port
    'port': 8080,

    // Start these browsers, currently available:
    'browsers': [
      'PhantomJS',

      'Chrome',
      // 'ChromeCanary',
      'Firefox',
      // 'Opera',
      // 'PhantomJS',
      // 'Safari', // (only Mac)
      // 'IE', // (only Windows)
    ],

    // Which plugins to enable
    'plugins': [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      // 'karma-jasmine',
      'karma-mocha',
      'karma-chai',
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    'singleRun': false,

    'colors': true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    'logLevel': config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};