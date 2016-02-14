(function () {
    'use strict';

    angular
        .module('app')
        .controller('ComicDetailController', ComicDetailController);

    function ComicDetailController($log, $stateParams, $scope, $ionicTabsDelegate) {

        var vm = this;
        vm.title = 'ComicDetailController';
        vm.comic = $stateParams.comic;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
            $scope.$on('$ionicView.beforeEnter', hideTabs);
            $scope.$on('$ionicView.beforeLeave', showTabs);
        }

        function showTabs() {
            $ionicTabsDelegate.showBar(true);
        }

        function hideTabs() {
            $ionicTabsDelegate.showBar(false);
        }

    }

})();

