(function () {
    'use strict';

    angular
        .module('app')
        .controller('SettingsController', SettingsController);

    function SettingsController($log, $scope, $cordovaToast, defaultCacheName, CacheFactory, $ionicPopup, throwErr) {

        var vm = this;
        vm.settings = {
            enableCache: true
        };
        vm.clearCache = clearCache;

        activate();

        /////////////

        function activate() {
            $scope.$watch('vm.settings.enableCache', function (newValue, oldValue) {
                if (newValue === oldValue) return;
                $cordovaToast.showShortBottom('Not implemented yet…');
            });
        }

        function clearCache(){

            var options = {
                title: 'Are you sure you want to clear all data cached ?',
                cancelText: 'Cancel',
                okText: 'Clear'
            };
            $ionicPopup.confirm(options).then(clear).catch(throwErr);

            /////////////

            function clear(){
                CacheFactory.get(defaultCacheName).removeAll();
                $log.info('Default cache is now empty');
            }

        }

    }

})();

