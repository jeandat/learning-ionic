'use strict';

module.exports.tasks = {

    // Unit tests
    karma: {
        options: {
            configFile: 'test/karma.conf.js'
        },
        dev: {
            browsers: ['Chrome']
        },
        'wdev': {
            browsers: ['Chrome'],
            singleRun: false
        }
    }
};