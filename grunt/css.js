'use strict';

//var sassFiles = {
//    '<%= pub %>/css/app.css': ['<%= tmp %>/**/*.scss']
//};

module.exports = function () {

    return {
        tasks: {

            copy: {
                cssVendor: {
                    files: [
                        {
                            dest: '<%= pub %>/css/',
                            src: [
                                'ion-autocomplete/dist/ion-autocomplete.css'
                            ],
                            expand: true,
                            flatten: true,
                            cwd: 'vendor'
                        }
                    ]
                }
            },

            sass: {
                options: {
                    style: 'expanded',
                    sourceMap: true
                },
                app: {
                    files: {
                        '<%= pub %>/css/app.css': ['<%= tmp %>/app.scss']
                    }
                }
            },

            sass_compile_imports: {
                app: {
                    options: {
                        removeExtension: true
                    },
                    target: '<%= tmp %>/_partials.scss',
                    files: [{
                        src: ['<%= src %>/_ionic.app.scss', '<%= src %>/**/_variables.scss',
                            '<%= src %>/common/fonts/*', '<%= src %>/**/_*.scss']
                    }]
                }
            },

            postcss: {
                options: {
                    map: true,
                    processors: [
                        require('autoprefixer')({
                            // We are using crosswalk 12 for android which is using chromium 41
                            browsers: ['iOS >= 8', 'Chrome >= 41']
                        })
                    ]
                },
                app: {
                    src: '<%= pub %>/css/app.css'
                }
            },

            // Watcher for css files
            chokidar: {
                cssApp: {
                    files: ['<%= src %>/**/*.scss'],
                    tasks: ['newer:replace', 'sass_compile_imports', 'sass', 'newer:postcss']
                }
            }
        }
    };
};