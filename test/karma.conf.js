'use strict';

module.exports = function (config) {

    var _ = require('lodash');
    var sharedConf = require('./karma-shared.conf.js');

    var configuration = _.defaults({
        reporters: ['progress', 'coverage', 'junit'],
        preprocessors: {
            '.tmp/**/!(*.spec).js': ['coverage']
        },
        coverageReporter: {
            dir: 'doc/test/coverage/',
            reporters: [
                // {type: 'lcov', subdir: 'lcov'},
                {type: 'lcov', subdir: 'lcov'}
            ]
        },
        junitReporter: {
            outputDir: 'doc/test/junit/',
            // Name is very important for Sonar: don't change it !
            outputFile: 'TESTS-xunit.xml',
            useBrowserName: false
        },
        browsers: ['PhantomJS'],
        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        }
    }, sharedConf);

    config.set(configuration);
};
