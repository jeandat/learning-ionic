'use strict';

module.exports = function () {

    return {
        tasks: {

            copy: {
                jsVendor: {
                    files: [{
                        dest: '<%= pub %>/js',
                        src: [
                            'jquery/dist/jquery.js',
                            'md5/md5.js',
                            'ionic/release/js/ionic.js',
                            'angular/angular.js',
                            'angular-animate/angular-animate.js',
                            'angular-sanitize/angular-sanitize.js',
                            'angular-ui-router/release/angular-ui-router.js',
                            'ionic/release/js/ionic-angular.js',
                            'lodash/lodash.js',
                            'ngCordova/dist/ng-cordova.js',
                            'ngCordova/dist/ng-cordova-mocks.js',
                            'angular-local-storage/dist/angular-local-storage.js',
                            'angular-cache/dist/angular-cache.js',
                            'restangular/dist/restangular.js',
                            'imgcache.js/js/imgcache.js',
                            'angular-imgcache/angular-imgcache.js',
                            'ionic-native-transitions/dist/ionic-native-transitions.js'
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
                    files: ['<%= src %>/**/*.js', '<%= src %>/../i18n/*.js', '!<%= src %>/**/*.spec.js', '.jshintrc', '.jscsrc'],
                    tasks: [
                        'newer:replace',
                        'newer:jshint:dev',
                        'newer:jscs',
                        'ngAnnotate']
                }
            }
        }
    };
};
