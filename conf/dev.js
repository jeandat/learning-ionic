var pkg = require('../package.json');
var extend = require('node.extend');
var grunt = require('grunt');

var platform = grunt.option('platform');
grunt.verbose.writeln('Platform:', platform);

var proxy = grunt.option('proxy');
grunt.verbose.writeln('Proxy:', proxy);

var mock = grunt.option('mock');
grunt.verbose.writeln('Mock:', mock);

module.exports = extend(true, {}, pkg, {
    env: 'dev',
    apiEndpoint: proxy ? '/api' : 'http://gateway.marvel.com:80/v1/public',
    apiKey: 'efee5499983b06ed4211c1304fc645b5',
    // You did not see that, this is not a private key
    privateApiKey: '193551ea5724d2e0ac10c6d37b0448920ec63d9c',
    ngCordovaScript: mock ? 'js/ng-cordova-mocks.js' : 'js/ng-cordova.js',
    ngCordovaModuleName: mock ? 'ngCordovaMocks' : 'ngCordova',
    debug: '<script>Error && Error.stackTraceLimit && (Error.stackTraceLimit=50);</script>',
    csp: "default-src 'self' 'unsafe-inline' http://*:35729 ws://*:35729 http://*:8100 gap: https://ssl.gstatic.com;",
    gaUserId: 'TODO'
});
