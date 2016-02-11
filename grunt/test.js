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
        wdev: {
            singleRun: false
        }
    },

    parallel: {
        // Launch a karma server in watch mode and a watch server for source files.
        wtest: {
            options: {
                stream: true,
                grunt: true
            },
            tasks: ['karma:wdev', 'chokidar']
        }
    },

    chokidar:{
        jsSpecs: {
            files: ['<%= src %>/**/*.spec.js', 'test/unit/**/*.spec.js'],
            tasks: ['newer:replace', 'newer:jshint:dev']
        }
    }
};
