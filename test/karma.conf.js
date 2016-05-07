'use strict';

module.exports = function (config) {

    var configuration = {
        basePath: '..',
        files: [
            // vendors
            'www/js/md5.js',
            'www/js/ionic.js',
            'www/js/angular.js',
            'www/js/angular-animate.js',
            'www/js/angular-sanitize.js',
            'www/js/angular-ui-router.js',
            'www/js/ionic-angular.js',
            'www/js/lodash.js',
            'vendor/karma-read-json/karma-read-json.js',
            'vendor/angular-mocks/angular-mocks.js',
            'www/js/ng-cordova-mocks.js',
            'www/js/angular-local-storage.js',
            'www/js/angular-cache.js',
            'www/js/restangular.js',
            'www/js/imgcache.js',
            'www/js/angular-imgcache.js',
            'www/js/firebase-debug.js',
            'www/js/angularfire.js',
            // app
            'www/js/templates.js',
            '.tmp/**/*.module.js',
            '.tmp/**/!(*.spec).js',
            // globals for tests
            'test/unit/global.js',
            // fixtures used in tests
            {pattern: 'test/unit/fixtures/**/*.json', included: false},
            // specs from `app/` and `test/unit/`
            '.tmp/**/*.spec.js',
            'test/unit/**/*.spec.js'],
        singleRun: true,
        logLevel: 'INFO',
        frameworks: ['jasmine'],
        reporters: ['progress', 'coverage', 'junit'],
        preprocessors: {
            '.tmp/**/!(*.spec).js': ['coverage']
        },
        coverageReporter: {
            type: 'lcov',
            dir: 'doc/test/coverage/',
            subdir: 'phantom'
        },
        junitReporter: {
            outputDir: 'doc/test/junit/',
            // Name is very important for Sonar: don't change it !
            outputFile: 'TESTS-xunit.xml',
            useBrowserName: false
        },
        //browsers: ['Chrome'],
        browsers: ['PhantomJS'],
        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        }
    };

    config.set(configuration);
};
