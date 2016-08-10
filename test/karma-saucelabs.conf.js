'use strict';

module.exports = function (config) {

    // Check out https://saucelabs.com/platforms for all browser/platform combos
    var customLaunchers = {
        sl_ios_93: {
            base: 'SauceLabs',
            browserName: 'Safari',
            platform: 'iOS 9.3',
            version: '9.3',
            device: 'iPhone 6 Simulator'
        },
        sl_ios_84: {
            base: 'SauceLabs',
            browserName: 'Safari',
            platform: 'iOS 8.4',
            version: '8.4',
            device: 'iPhone 6 Simulator'
        },
        sl_android_51: {
            base: 'SauceLabs',
            browserName: 'Android',
            platform: 'Linux',
            version: '5.1'
        },
        sl_android_44: {
            base: 'SauceLabs',
            browserName: 'Android',
            platform: 'Linux',
            version: '4.4'
        }
    };

    var _ = require('lodash');
    var sharedConf = require('./karma-shared.conf.js');

    var configuration = _.defaults({
        reporters: ['progress', 'saucelabs'],
        sauceLabs: {
            testName: 'learning-ionic unit tests',
            recordScreenshots: false,
            username: 'oabman',
            accessKey: 'fee30b92-b391-4b93-b77d-ea4d1a497e7c'
        },
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        browserDisconnectTimeout: 4 * 60 * 1000,
        browserDisconnectTolerance: 1,
        browserNoActivityTimeout: 20 * 60 * 1000,
        captureTimeout: 40 * 60 * 1000
    }, sharedConf);

    config.set(configuration);
};
