(function () {
    'use strict';

    angular
        .module('app')
        .controller('SettingListController', SettingListController);

    function SettingListController($log, $scope, defaultCacheName, CacheFactory,
                                $ionicPopup, throwErr, ImgCache, $timeout, $ionicConfig) {

        var vm = this;
        vm.settings = {
            enableAnimations: true
        };
        vm.clearing = false;
        vm.clearCache = clearCache;

        activate();

        /////////////

        function activate() {
            $scope.$watch('vm.settings.enableAnimations', function (newValue, oldValue) {
                if (newValue === oldValue) return;
                newValue === true ? enableAnimations() : disableAnimations();
            });
        }

        function enableAnimations(){
            $ionicConfig.views.transition('platform');
        }

        function disableAnimations(){
            $ionicConfig.views.transition('none');
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

