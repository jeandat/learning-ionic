'use strict';

module.exports = function (config) {

    var configuration = {
        basePath: '..',
        files: [
            // vendors
            'www/js/ionic.bundle.js',
            'www/js/lodash.js',
            'vendor/angular-mocks/angular-mocks.js',
            // app
            'www/js/templates.js',
            'www/js/app.js',
            // specs
            '.tmp/**/*.spec.js',
            'test/unit/**/*.spec.js'],
        singleRun: true,
        logLevel: 'INFO',
        frameworks: ['jasmine'],
        reporters: ['progress', 'coverage', 'junit'],
        preprocessors: {
            '.tmp/**/!(*spec).js': ['coverage']
        },
        coverageReporter: {
            type: 'lcov',
            dir: 'doc/test/coverage'
        },
        junitReporter: {
            outputDir: 'doc/test/junit/'
        },
        browsers: ['PhantomJS'],
        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        }
    };

    config.set(configuration);
};