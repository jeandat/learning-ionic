(function () {
    'use strict';

    angular
        .module('app')
        .controller('CharacterDetailController', CharacterDetailController);

    function CharacterDetailController($log, $ionicTabsDelegate, $scope, $stateParams) {

        var vm = this;
        vm.title = 'CharacterDetailController';
        vm.character = $stateParams.character;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
            //$scope.$on('$ionicView.beforeEnter', hideTabs);
            //$scope.$on('$ionicView.beforeLeave', showTabs);
        }

        //function hideTabs(){
        //    $ionicTabsDelegate.showBar(false);
        //}
        //
        //function showTabs(){
        //    $ionicTabsDelegate.showBar(true);
        //}
    }

})();

