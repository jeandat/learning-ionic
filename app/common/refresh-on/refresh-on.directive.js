(function () {
    'use strict';

    angular
        .module('app')
        .directive('refreshOn', factory);

    function factory() {

        var directive = {
            restrict: 'A',
            controller: Controller,
            controllerAs: 'refreshCtrl',
            bindToController: {
                // Comma separated list of event names
                events: '<refreshOn',
                // Expression to be executed in order to refresh
                callback: '&refreshCallback'
            }
        };

        return directive;
    }

    //////////

    Controller.$inject = ['$scope', '$log', '$rootScope'];
    function Controller($scope, $log, $rootScope){

        var vm = this;
        vm.$onInit = $onInit;
        vm.$onChanges = $onChanges;
        vm.$onDestroy = $onDestroy;

        // Events we will listen to…
        var unlistenCallbacks = [];
        var unlisten = null;

        ///////////////

        function $onInit(){
            listenTo(vm.events, vm.callback);
        }

        function $onChanges(changes){
            listenTo(changes.events.currentValue, changes.callback.currentValue);
        }

        // Parse list of `events` (comma separated list) and register one refresh action per event name.
        function listenTo(events, callback){
            var eventList = _.split(events, ',');
            removeEventListeners();
            _.forEach(eventList, function(event){
                event = _.trim(event);
                $log.debug('Will listen to $rootScope event', event);
                unlistenCallbacks.push($rootScope.$on(event, _.wrap(callback, registerRefreshRequest)));
            });
        }

        // Next time the view is active, a refresh will be made.
        function registerRefreshRequest(callback){
            // If several events are triggered in the same cycle, one refresh is enough.
            if(unlisten) return;
            $log.info('Registering a refresh callback for', $scope.title);
            unlisten = $scope.$on('$ionicView.beforeEnter', function(){
                unlisten();
                unlisten = null;
                callback();
                $log.info('Refresh action executed for', $scope.title);
            });
        }

        // Stop listening to `$rootScope` events.
        function removeEventListeners(){
            _.forEach(unlistenCallbacks, function(unlisten){
                unlisten();
            });
            unlistenCallbacks = [];
        }

        // Clean when we are done.
        function $onDestroy(){
            removeEventListeners();
        }

    }

})();

