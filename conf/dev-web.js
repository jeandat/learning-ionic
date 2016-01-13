var pkg = require('../package.json');
var extend = require('node.extend');
module.exports = extend(true, {}, require('./dev'), {
    ngCordovaScript: 'js/ng-cordova-mocks.js',
    ngCordovaModuleName: 'ngCordovaMocks',
    apiEndpoint: '/api'
});