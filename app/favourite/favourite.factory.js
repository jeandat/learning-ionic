(function () {
    'use strict';

    angular
        .module('app')
        .factory('favouriteService', favouriteService);

    function favouriteService(Firebase, $firebaseArray, firebaseUrl, $rootScope, $log, localStorageService, $q, $timeout) {

        var query = new Firebase(firebaseUrl + '/favourites');
        var faves = $firebaseArray(query);

        var unsyncedCreatedFaves = localStorageService.get('faves.created') || [];
        var unsyncedDeletedFaves = localStorageService.get('faves.deleted') || [];

        var service = {
            init: init,
            faves: faves,
            getFaveByModelId: getFaveByModelId,
            addFave: addFave,
            removeFave: removeFave
        };

        return service;

        ////////////

        function init() {
            return $q(function (resolve) {
                // If no response from firebase after 5s, we will use the local backup.
                var timer = $timeout(fallback, 5000);
                // Normal firebase boot.
                faves.$loaded()
                    .then(stopTimer)
                    .then(syncItems)
                    .then(watch)
                    .then(notify);
                ///////////
                function fallback() {
                    $log.warn('Firebase UNAVAILABLE');
                    timer = null;
                    resolve();
                }
                function stopTimer(){
                    timer && $timeout.cancel(timer);
                }
                function notify() {
                    $log.info('FIREBASE READY');
                    $log.info('%i items in favourite list', faves.length);
                    $rootScope.firebaseReady = true;
                    $rootScope.$emit('firebase:ready');
                    resolve();
                }
            });
        }

        function getFaveByModelId(id){
            return _.find(faves, {id: id}) || null;
        }

        function addFave(fave){
            if(!_.includes(unsyncedCreatedFaves, fave)) registerFaveForCreation(fave);
            faves.$add(fave).then(clean);
            ///////////
            function clean(){
                removeFaveForCreation(fave);
            }
        }

        function removeFave(fave){
            if(!_.includes(unsyncedDeletedFaves, fave)) registerFaveForDeletion(fave);
            // Using the index syntax because when faves come from the local storage, Firebase will not recognize them as valid objects.
            faves.$remove(_.findIndex(faves, {id: fave.id})).then(clean);
            ///////////
            function clean(){
                removeFaveForDeletion(fave);
            }
        }

        function registerFaveForCreation(fave){
            unsyncedCreatedFaves.push(fave);
            localStorageService.set('faves.created', unsyncedCreatedFaves);
        }
        function removeFaveForCreation(fave){
            _.pull(unsyncedCreatedFaves, fave);
            localStorageService.set('faves.created', unsyncedCreatedFaves);
        }
        function registerFaveForDeletion(fave){
            unsyncedDeletedFaves.push(fave);
            localStorageService.set('faves.deleted', unsyncedDeletedFaves);
        }
        function removeFaveForDeletion(fave){
            _.pull(unsyncedDeletedFaves, fave);
            localStorageService.set('faves.deleted', unsyncedDeletedFaves);
        }

        function syncItems(){
            _.forEach(unsyncedCreatedFaves, addFave);
            _.forEach(unsyncedDeletedFaves, removeFave);
        }

        // Emit an event on $rootScope for components willing to be notified when a fave is added or removed.
        function watch() {
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

    }

})();

