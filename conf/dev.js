var pkg = require('../package.json');
var extend = require('node.extend');
module.exports = extend(true, {}, pkg, {
    env: 'dev',
    debug: '<script>Error && Error.stackTraceLimit && (Error.stackTraceLimit=50);</script>'
});