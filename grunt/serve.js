'use strict';

module.exports = function (grunt) {

    return {
        tasks: {

            concurrent: {
                options: {
                    logConcurrentOutput: true
                },
                // Launch a web server and a watch server.
                serve: {
                    tasks: ['chokidar', 'shell:serve']
                },
                // Launch a karma server in watch mode for Chrome only and a watch server.
                // When developing a test case for the first time, I launch karma in watch mode and test in chrome only to have
                // a quick feedback.
                wtest: {
                    tasks: ['karma:wdev', 'chokidar']
                }
            },

            // wrapper for `ionic serve` command
            shell: {
                serve: {
                    command: function () {
                        var labArg = grunt.option('lab');
                        return 'ionic serve' + (labArg ? ' --lab' : '');
                    }
                }
            }

        }

    };
};