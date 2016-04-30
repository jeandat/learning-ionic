(function () {
    'use strict';

    angular
        .module('app')
        .directive('backButton', factory);

    function factory() {

        var directive = {
            templateUrl: 'common/back-button/back-button.jade',
            bindToController: true,
            controller: BackButtonController,
            controllerAs: 'bb',
            restrict: 'E'
        };

        return directive;
    }

    BackButtonController.$inject = ['$log'];
    function BackButtonController($log) {

        var vm = this;
        vm.title = 'BackButtonController';
        vm.isIOS = ionic.Platform.isIOS;
        vm.isAndroid = ionic.Platform.isAndroid;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
        }
    }

})();

