var pkg = require('../package.json');
var extend = require('node.extend');
var grunt = require('grunt');

var proxy = grunt.option('proxy');
grunt.verbose.writeln('Proxy:', proxy);

var mock = grunt.option('mock');
grunt.verbose.writeln('Mock:', mock);

module.exports = extend(true, {}, pkg, {
    env: 'dev',
    apiEndpoint: proxy ? '/api' : 'http://gateway.marvel.com:80/v1/public',
    apiKey: '0a52dbf67ba6feb10084654c8a41e770',
    ngCordovaScript: mock ? 'js/ng-cordova-mocks.js' : 'js/ng-cordova.js',
    ngCordovaModuleName: mock ? 'ngCordovaMocks' : 'ngCordova',
    debug: '<script>Error && Error.stackTraceLimit && (Error.stackTraceLimit=50);</script>',
    csp: "default-src 'self' 'unsafe-inline' http://*:35729 ws://*:35729 http://*:8100 gap: https://ssl.gstatic.com;",
    gaUserId: 'TODO'
});
