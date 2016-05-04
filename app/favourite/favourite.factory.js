(function () {
    'use strict';

    angular
        .module('app')
        .factory('favouriteService', favouriteService);

    function favouriteService(Firebase, $firebaseArray, $firebaseObject, firebaseUrl, $rootScope, $log, localStorageService, $q, $timeout) {

        var query = new Firebase(firebaseUrl + '/favourites');
        var faves = $firebaseArray(query);

        // Local data saved in local storage used for booting only in order to have something to show even if Firebase is unavailable.
        var backup = localStorageService.get('faves');

        var service = {
            init: init,
            faves: faves,
            createRef: createRef
        };

        return service;

        ////////////

        function init() {
            return $q(function (resolve) {
                startWithLocalFaves();
                // If no response from firebase after 5s, we still have the local backup.
                var timer = $timeout(fallback, 5000);
                // Normal firebase boot.
                faves.$loaded().then(saveUnsyncItems).then(watch).then(clean);
                ///////////
                function fallback() {
                    $log.warn('Firebase UNAVAILABLE');
                    $log.info('Using local backup:', faves);
                    timer = null;
                    resolve();
                }

                function clean() {
                    timer && $timeout.cancel(timer);
                    resolve();
                }
            });
        }

        function startWithLocalFaves(){
            backup && backup.forEach(function (fave) {
                faves.push(fave);
            });
        }

        function saveUnsyncItems(){
            if(!faves) return;
            for(var i=0, lg=faves.length; i<lg; i++){
                faves.$save(i);
            }
        }

        // Emit an event on $rootScope for components willing to be notified when a fave is added or removed.
        function watch() {
            $log.info('FIREBASE READY');
            $log.info('%i items in favourite list', faves.length);
            $rootScope.firebaseReady = true;
            faves.$watch(function (data) {
                $log.debug('Firebase event:', data);
                saveOfflineBackup();
            });
        }

        // Unfortunately firebase doesn't handle true offline yet, only temporary disconnection. For instance, if you start in offline mode,
        // ref#$loaded() will never resolve until the network come back. This backup will be used as a starting point when calling #init()
        // if firebase is unavailable whatever the reason (offline, service down, …).
        function saveOfflineBackup() {
            localStorageService.set('faves', faves);
        }

        function createRef(id){
            var query = new Firebase(firebaseUrl + '/favourites/' + id);
            return $firebaseObject(query);
        }
    }

})();

