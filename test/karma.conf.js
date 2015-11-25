'use strict';

module.exports = function (config) {

    var configuration = {
        basePath: '..',
        files: [
            // vendors
            'www/js/ionic.bundle.js',
            // app
            'www/js/templates.js',
            'www/js/app.js',
            // specs from `app/` and `test/unit/`
            '.tmp/**/*.spec.js',
            'test/unit/**/*.spec.js'],
        singleRun: true,
        logLevel: 'INFO',
        frameworks: ['jasmine'],
        reporters: ['progress', 'coverage', 'junit'],
        preprocessors: {
            'build/gen/js/**/*.js': ['coverage']
        },
        coverageReporter: {
            type: 'html',
            dir: 'doc/test/coverage'
        },
        junitReporter: {
            outputDir: 'doc/test/junit/'
        },
        browsers: ['Chrome']
    };

    config.set(configuration);
};