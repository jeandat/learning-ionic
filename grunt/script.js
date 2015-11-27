'use strict';

module.exports = function () {

    return {
        tasks: {

            copy: {
                jsVendor: {
                    files: [{
                        dest: '<%= pub %>/js',
                        src: [
                            'ionic/js/ionic.bundle.js',
                            'lodash/lodash.js'
                        ],
                        expand: true,
                        cwd: 'vendor',
                        flatten: true
                    }]
                }
            },

            // Rewrite angular functions using dependency injection to be compatible with a minification process.
            ngAnnotate: {
                options: {
                    add: true,
                    singleQuotes: true
                },
                build: {
                    files: [{
                        dest: '<%= pub %>/js/app.js',
                        src: [
                            '<%= tmp %>/**/*.module.js',
                            '<%= tmp %>/**/*.js',
                            '!<%= tmp %>/**/*.spec.js']
                    }]
                }
            },

            // Minify js files
            uglify: {
                dist: {
                    options: {
                        mangle: true,
                        compress: true,
                        beautify: false,
                        report: 'min',
                        preserveComments: false,
                        screwIE8: true
                    },
                    files: [{
                        src: '<%= pub %>/js/app.js'
                    }]
                }
            },

            // Watcher for js files
            chokidar: {
                jsVendor: {
                    files: ['vendor/**/*.js'],
                    tasks: ['newer:copy:jsVendor']
                },
                jsApp: {
                    files: ['<%= src %>/**/*.js', '!<%= src %>/**/*.spec.js', '.jshintrc', '.jscsrc'],
                    tasks: [
                        'newer:jshint:dev',
                        'newer:jscs',
                        'newer:replace',
                        'ngAnnotate']
                }
            }
        }
    };
};