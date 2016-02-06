(function () {
    'use strict';

    angular
        .module('app')
        .controller('SettingsController', SettingsController);

    function SettingsController() {

        var vm = this;
        vm.settings = {enableFriends: true};

    }

})();

