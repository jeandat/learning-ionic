'use strict';

module.exports.tasks = {

    // Unit tests
    karma: {
        options: {
            configFile: 'test/karma.conf.js'
        },
        dev: {
            singleRun: true
        },
        'dev-w': {
            singleRun: false,
            // I'm deactivating the junit and coverage reporters cause they are not necessary and makes debugging quite impossible.
            reporters: ['kjhtml', 'progress'],
            browsers: ['Chrome']
        },
        // SauceLabs karma conf
        'dev-saucelabs': {
            configFile: 'test/karma-saucelabs.conf.js'
        }
    },

    parallel: {
        // Launch a karma server in watch mode and a watch server for source files.
        'test-w': {
            options: {
                stream: true,
                grunt: true
            },
            tasks: ['karma:dev-w', 'chokidar']
        }
    },

    chokidar:{
        jsSpecs: {
            files: ['<%= src %>/**/*.spec.js', 'test/unit/**/*.spec.js'],
            tasks: ['newer:replace', 'newer:jshint:dev']
        }
    }
};
