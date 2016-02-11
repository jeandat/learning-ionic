(function () {
    'use strict';

    angular
        .module('app')
        .controller('SettingsController', SettingsController);

    function SettingsController($scope, $cordovaToast) {

        var vm = this;
        vm.settings = {
            enableCache: true
        };

        activate();

        /////////////

        function activate() {
            $scope.$watch('vm.settings.enableCache', function (newValue, oldValue) {
                if (newValue === oldValue) return;
                $cordovaToast.showShortBottom('Not implemented yet…');
            });
        }

    }

})();

