(function () {
    'use strict';

    angular
        .module('app')
        .factory('authService', authService);

    function authService($log, $firebaseAuth, $rootScope, firebaseApiKey, firebaseAuthDomain, firebaseDatabaseUrl, firebaseStorageBucket,
                         $q) {

        var service = {
            authenticate: authenticate
        };
        return service;

        ////////////////

        // Initiate an anonymous sign in if needed using the Firebase backend.
        function authenticate() {

            // Firebase configuration
            var config = {
                apiKey: firebaseApiKey,               // Your Firebase API key
                authDomain: firebaseAuthDomain,       // Your Firebase Auth domain ("*.firebaseapp.com")
                databaseURL: firebaseDatabaseUrl,     // Your Firebase Database URL ("https://*.firebaseio.com")
                storageBucket: firebaseStorageBucket  // Your Firebase Storage bucket ("*.appspot.com")
            };

            // Checking number of apps for unit tests (avoid initializing multiple times).
            if (_.isEmpty(firebase.apps)) firebase.initializeApp(config);

            return $q(function (resolve, reject) {
                var auth = $firebaseAuth();
                var unlisten = auth.$onAuthStateChanged(function (user) {
                    if (user) {
                        $log.info('User known. Reloading user info…');
                        // user.reload()
                        //     .then(_.wrap(user, createUserRef))
                        //     .catch(reject);
                        createUserRef(user);
                    } else {
                        $log.info('No known user. Signing in…');
                        auth.$signInAnonymously()
                            .then(createUserRef)
                            .catch(reject);
                    }
                });

                //////////

                function createUserRef(user) {
                    unlisten();
                    $log.info('Logged in as %s (%s) with provider %s', user.email, user.uid, user.providerId);
                    $log.debug('Provider data:', user.providerData);
                    $rootScope.user = user;
                    var userRef = firebase.database().ref().child('users').child(user.uid);
                    if (!userRef.child('provider').toString()) userRef.set({provider: user.providerId});
                    $rootScope.userRef = userRef;
                    resolve(userRef);
                }
            });
        }
    }

})();

