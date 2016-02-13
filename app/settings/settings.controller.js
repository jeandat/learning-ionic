(function () {
    'use strict';

    angular
        .module('app')
        .controller('SettingsController', SettingsController);

    function SettingsController($log, $scope, $cordovaToast, defaultCacheName, CacheFactory,
                                $ionicPopup, throwErr, ImgCache, $timeout) {

        var vm = this;
        vm.settings = {
            enableCache: true
        };
        vm.clearing = false;
        vm.clearCache = clearCache;

        activate();

        /////////////

        function activate() {
            $scope.$watch('vm.settings.enableCache', function (newValue, oldValue) {
                if (newValue === oldValue) return;
                $cordovaToast.showShortBottom('Not implemented yet…');
            });
        }

        function clearCache() {

            var options = {
                title: 'Are you sure you want to clear all data cached ?',
                cancelText: 'Cancel',
                okText: 'Clear'
            };
            $ionicPopup.confirm(options).then(clear).catch(throwErr);

            /////////////

            function clear() {
                vm.clearing = true;
                CacheFactory.get(defaultCacheName).removeAll();
                $log.info('HTTP cache is now empty');
                ImgCache.clearCache(ok, throwErr);

                /////////////

                function ok() {
                    $scope.$apply(function () {
                        $log.info('Image cache is now empty');
                        // So we could read something at least
                        $timeout(function () {
                            vm.clearing = false;
                        }, 500);
                    });
                }
            }

        }

    }

})();

