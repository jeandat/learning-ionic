'use strict';

module.exports = function (grunt) {

    return {
        tasks: {

            parallel:{
                // Launch a web server and a watch server.
                serve:{
                    options:{
                        stream: true
                    },
                    tasks:[{
                        grunt: true,
                        args: ['chokidar']
                    },{
                        grunt: true,
                        args: ['shell:serve']
                    }]
                }
            },

            shell: {
                // wrapper for `ionic serve` command which launch a local web server serving `www` folder.
                // You may pass the classical `--lab` option.
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