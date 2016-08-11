(function () {
    'use strict';

    angular
        .module('app')
        // Lodash for dependency injection
        .constant('_', _)
        // App version from package.json
        .constant('version', '@@version')
        .constant('stringify', stringify)
        // Google Analytics account ID
		.constant('trackerId', '@@trackerId')
		// Current environment (dev or dist)
        .constant('env', '@@env')
        // Backend endpoint (local pc in livereload mode - proxy - or Marvel servers)
		.constant('apiEndpoint', '@@apiEndpoint')
        // Marvel API key
		.constant('apiKey', '@@apiKey')
        // Marvel private API key (yeah I know, but Marvel forced my hand)
		.constant('privateApiKey', '@@privateApiKey')
        // Marvel default offset when requesting a list of results (number of items)
        .constant('defaultPageSize', 10)
        // HTTP cache name
        .constant('defaultCacheName', 'defaultCache')
        // Firebase configuration
        .constant('firebaseApiKey', 'AIzaSyCiOPVylkHxiZ7At1EdOUdtua7uCfJQC_I')
        .constant('firebaseAuthDomain', 'learning-ionic-872b8.firebaseapp.com')
        .constant('firebaseDatabaseUrl', 'https://learning-ionic-872b8.firebaseio.com')
        .constant('firebaseStorageBucket', 'learning-ionic-872b8.appspot.com');

    // Same as `JSON.stringify` but with indentation.
    function stringify(value) {
        return JSON.stringify(value, null, '    ');
    }

})();
