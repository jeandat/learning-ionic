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
        .constant('defaultCacheName', 'defaultCache')
        .constant('firebaseApiKey', 'AIzaSyCgo-Ta3byIK8w9I9g0o3Hrgop70-Ajm-8')
        .constant('firebaseAuthDomain', 'learning-ionic.firebaseapp.com')
        .constant('firebaseDatabaseUrl', 'https://learning-ionic.firebaseio.com')
        .constant('firebaseStorageBucket', 'learning-ionic.appspot.com');

    // Same as `JSON.stringify` but with indentation.
    function stringify(value) {
        return JSON.stringify(value, null, '    ');
    }

})();
