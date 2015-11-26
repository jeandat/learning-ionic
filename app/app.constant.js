(function () {
    'use strict';

    angular
        .module('app')
        // App version from package.json
        .constant('version', '@@version')
        .constant('stringify', stringify);

    // Same as `JSON.stringify` but with indentation.
    function stringify(value) {
        return JSON.stringify(value, null, '    ');
    }

})();