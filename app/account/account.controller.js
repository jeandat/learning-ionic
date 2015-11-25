(function () {
    'use strict';

    angular
        .module('app')
        .controller('AccountController', AccountController);

    function AccountController() {

        var vm = this;
        vm.settings = {enableFriends: true};

    }

})();

