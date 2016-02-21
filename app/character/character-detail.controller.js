(function () {
    'use strict';

    angular
        .module('app')
        .controller('CharacterDetailController', CharacterDetailController);

    function CharacterDetailController($log, $stateParams, $scope, $ionicTabsDelegate) {

        var vm = this;
        vm.title = 'CharacterDetailController';
        vm.character = $stateParams.character;
        vm.openDetailPage = openDetailPage;

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

        function openDetailPage(){
            var open = _.get(window, 'cordova.InAppBrowser.open') || window.open;
            open(vm.character.getDetailUrl(), '_system');
        }

    }

})();

