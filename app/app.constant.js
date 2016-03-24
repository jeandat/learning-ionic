(function () {
    'use strict';

    angular
        .module('app')
        // App version from package.json
        .constant('_', _)
        .constant('version', '@@version')
        .constant('stringify', stringify)
		.constant('trackerId', '@@trackerId')
		.constant('env', '@@env')
		.constant('apiEndpoint', '@@apiEndpoint')
		.constant('apiKey', '@@apiKey')
        // Oups, I did it again
		.constant('privateApiKey', '@@privateApiKey')
        // Marvel default offset when requesting a list of results (number of items)
        .constant('defaultOffset', 20)
        .constant('defaultCacheName', 'defaultCache');

    // Same as `JSON.stringify` but with indentation.
    function stringify(value) {
        return JSON.stringify(value, null, '    ');
    }

})();
