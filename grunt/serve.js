'use strict';

module.exports = function (grunt) {

    // Launch in parallel a watch server and an ionic run … command.
    // Custom task that will create dynamically a parallel configuration.
    // I'm doing that in order to be able to give command line arguments from npm to that parallel task.
    grunt.registerTask('run', function (platform) {
        if (!platform) {
            grunt.fail.fatal('Syntax: grunt run:<platform> [--proxy]');
            return;
        }

        // Boolean value that indicate if we are using the built-in `--livereload` option from `ionic run`.
        var useLivereload = grunt.option('proxy');

        var config = {
            parallel: {
                run: {
                    options: {
                        stream: true
                    },
                    tasks: [{
                        grunt: true,
                        args: ['chokidar']
                    }, {
                        cmd: 'ionic',
                        args: ['run', platform, '-c', '-s', useLivereload ? '--livereload' : '']
                    }]
                }
            }
        };
        grunt.config.merge(config);

        grunt.task.run('parallel:run');
    });

    // Launch in parallel a watch server and an ioni serve … command.
    // Custom task that will create dynamically a parallel configuration.
    // I'm doing that in order to be able to give command line arguments from npm to that parallel task.
    grunt.registerTask('serve', function () {

        // Boolean value that indicate if we are using the built-in `--livereload` option from `ionic serve`. 
        var useLivereload = grunt.option('proxy');
        // Boolean value that indicate if we are using the built-in `--lab` option from `ionic serve`.
        var useLab = grunt.option('lab');

        // wrapper for `ionic serve` command which launch a local web server serving `www` folder.
        var config = {
            parallel: {
                serve: {
                    options: {
                        stream: true
                    },
                    tasks: [{
                        grunt: true,
                        args: ['chokidar']
                    }, {
                        cmd: 'ionic',
                        args: ['serve', '-a', '-c', '-s', '--nogulp', useLivereload ? '--livereload' : '', useLab ? '--lab' : '']
                    }]
                }
            }
        };
        grunt.config.merge(config);

        grunt.task.run('parallel:serve');
    });

    // All othe serving tasks notably the rest of my parallel configuration.
    return {
        tasks: {

            // With that configuration, I tell chokidar to reuse the same process on change events.
            // This is very important.
            // Indeed, if you launch your first grunt process with some options like `--lab` or `--patterns` and that process
            // starts chokidar, all tasks started by it will then share the same options.
            chokidar: {
                options: {
                    spawn: false
                }
            }

        }

    };
};
