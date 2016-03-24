var extend = require('node.extend');
module.exports = extend(true, {}, require('./dev'), {
    env: 'dist',
    debug: '',
    trackerId: 'UA-75478648-3'
});
