(function () {
    'use strict';

    angular
        .module('app')
        .factory('favouriteService', favouriteService);

    function favouriteService(Firebase, $firebaseArray, firebaseUrl, $rootScope, $log, localStorageService, $q, $timeout) {

        var query = new Firebase(firebaseUrl + '/favourites');
        var faves = $firebaseArray(query);

        // Local data saved in local storage used for booting only in order to have something to show even if Firebase is unavailable.
        var backup = localStorageService.get('faves');

        var service = {
            init: init,
            faves: faves
        };

        return service;

        ////////////

        function init() {
            return $q(function (resolve) {
                loadLocalFaves();
                // If no response from firebase after 5s, we will use the local backup.
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

        function loadLocalFaves(){
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
            // WARNING: when adding, I'm using angularfire because it handles a strange conceptual choice in Firebase which I don't like.
            // When listening to 'child_added' you are called once per item in the db corresponding to your ref.
            // It is not just new events ; but also existing ones. You don't get to write boilerplate code to overcome this with angularfire.
            faves.$watch(function (data) {
                $log.debug('Firebase event:', data);
                if (data.event === 'child_added') {
                    // Listeners will receive an actual record with $id and $priority keys.
                    // If you just send raw values, you will lose the ability to remove it.
                    $rootScope.$emit('fave:added', faves.$getRecord(data.key));
                }
                saveOfflineBackup();
            });
            // WARNING: when deleting, I'm using firebase directly because angularfire just give you the deleted key but not the actual
            // record. And you can't get it yourself because by the time you get notified, the local one is already deleted.
            // So in order to get best of both world and do what I want to do the easy way, I'm mixing here angularfire and pure firebase
            // code.
            var ref = faves.$ref();
            ref.on('child_removed', function (snapshot) {
                var value = snapshot.val();
                $log.debug('Firebase event:', value);
                // Raw value
                $rootScope.$emit('fave:removed', value);
            });
        }

        // Unfortunately firebase doesn't handle true offline yet, only temporary disconnection. For instance, if you start in offline mode,
        // ref#$loaded() will never resolve until the network come back. This backup will be used as a starting point when calling #init()
        // if firebase is unavailable whatever the reason (offline, service down, …).
        function saveOfflineBackup() {
            localStorageService.set('faves', faves);
        }
    }

})();

