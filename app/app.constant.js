(function () {
    'use strict';

    angular
        .module('app')
        // App version from package.json
        .constant('_', _)
        .constant('version', '@@version')
        .constant('stringify', stringify)
		.constant('gaUserId', '@@gaUserId')
		.constant('env', '@@env')
		.constant('apiEndpoint', '@@apiEndpoint')
		.constant('apiKey', '@@apiKey')
        // Oups, I did it again
		.constant('privateApiKey', '@@privateApiKey');

    // Same as `JSON.stringify` but with indentation.
    function stringify(value) {
        return JSON.stringify(value, null, '    ');
    }

})();