(function () {
    'use strict';

    angular
        .module('app')
        .factory('favouriteService', favouriteService);

    function favouriteService(Firebase, $firebaseArray, firebaseUrl, $rootScope, $log) {

        var query = new Firebase(firebaseUrl + '/favourites');
        var faves = $firebaseArray(query.orderByChild('id'));

        var service = {
            init: init,
            faves: faves
        };

        return service;

        ////////////

        function init() {
            return faves.$loaded().then(watch);
        }

        // Emit an event on $rootScope for components willing to be notified when a fave is added or removed.
        function watch() {
            $log.info(faves.length + ' items in favourite list');
            // WARNING: when adding, I'm using angularfire because it handles a strange conceptual choice in Firebase which I don't like.
            // When listening to 'child_added' you are called once per item in the db corresponding to your ref. 
            // It is not just new events ; but also existing ones. You don't get to write boilerplate code to overcome this with angularfire.
            faves.$watch(function (data) {
                $log.debug('Firebase event:', data);
                if (data.event === 'child_added')
                // Listeners will receive an actual record with $id and $priority keys. 
                // If you just send raw values, you will lose the ability to remove it.
                    $rootScope.$emit('fave:added', faves.$getRecord(data.key));
            });
            // WARNING: when deleting, I'm using firebase directly because angularfire just give you the deleted key but not the actual
            // record. And you can't get it yourself because by the time you get notified, the local is already deleted.
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

