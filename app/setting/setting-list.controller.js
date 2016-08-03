(function () {
    'use strict';

    angular
        .module('app')
        .controller('SettingListController', SettingListController);

    function SettingListController($scope, $ionicPopup, throwErr, $timeout, settingService) {

        var vm = this;
        vm.settings = settingService.settings;
        vm.clearing = false;
        vm.clearCache = clearCache;

        activate();

        /////////////

        function activate() {
            $scope.$watchCollection('vm.settings', settingService.applyDiffAndPersist);
        }

        // Clear some caches.
        // See settingService#clearCache.
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
                return settingService.clearCache().finally(updateStatus);

                ////////////

                function updateStatus(){
                    return $timeout(function(){
                        vm.clearing = false;
                    }, 500);
                }
            }

        }

    }

})();

