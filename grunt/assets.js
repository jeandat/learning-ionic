'use strict';

module.exports.tasks = {

    copy: {
        img: {
            files: [
                {
                    dest: '<%= pub %>/',
                    src: [
                        'img/*'
                    ]
                }
            ]
        },
        fonts:{
            files: [
                {
                    dest: '<%= pub %>/css/fonts/',
                    src: [
                        'vendor/ionic/release/fonts/*'
                    ],
                    expand: true,
                    flatten: true
                }
            ]
        }
    }

};
