'use strict';

//var sassFiles = {
//    '<%= pub %>/css/app.css': ['<%= tmp %>/**/*.scss']
//};

module.exports = function () {

    return {
        tasks: {

            //copy: {
            //    cssVendor: {
            //        files: [
            //            {
            //                dest: '<%= pub %>/css',
            //                src: [
            //                    ''
            //                ],
            //                expand: true,
            //                cwd: 'vendor',
            //                flatten: true
            //            }
            //        ]
            //    }
            //},

            sass: {
                options: {
                    style: 'expanded',
                    sourceMap: true
                },
                ionic: {
                    files:{
                        '<%= pub %>/css/ionic.app.css': '<%= tmp %>/ionic.app.scss'
                    }
                },
                app: {
                    files: {
                        '<%= pub %>/css/app.css': ['<%= tmp %>/**/*.scss', '!<%= tmp %>/ionic.app.scss']
                    }
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
                cssIonic: {
                    files: ['<%= src %>/ionic.app.scss'],
                    tasks: ['newer:replace', 'sass:ionic', 'newer:postcss']
                },
                cssApp: {
                    files: ['<%= src %>/**/*.scss', '!<%= src %>/ionic.app.scss'],
                    tasks: ['newer:replace', 'sass:app', 'newer:postcss']
                }
                //cssVendor: {
                //    files: ['vendor/**/*.css'],
                //    tasks: ['copy:cssVendor']
                //}
            }
        }
    };
};