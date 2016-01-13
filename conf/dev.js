var pkg = require('../package.json');
var extend = require('node.extend');
var grunt = require('grunt');

var proxy = grunt.option('proxy');
grunt.verbose.writeln('Proxy:', proxy);

var mock = grunt.option('mock');
grunt.verbose.writeln('Mock:', mock);

module.exports = extend(true, {}, pkg, {
    env: 'dev',
    apiEndpoint: proxy ? '/api' : 'TODO',
    ngCordovaScript: mock ? 'js/ng-cordova-mocks.js' : 'js/ng-cordova.js',
    ngCordovaModuleName: mock ? 'ngCordovaMocks' : 'ngCordova',
    debug: '<script>Error && Error.stackTraceLimit && (Error.stackTraceLimit=50);</script>',
    csp: "default-src 'self' http://m-accept.aldautomotive.com:8200/ALDOLIGHT/ https://*.api.here.com/ 'unsafe-eval' http://*:35729 ws://*:35729 http://*:8100 'unsafe-inline' data: blob: gap: https://ssl.gstatic.com; style-src 'self' 'unsafe-inline'; media-src *; frame-src *"
});
