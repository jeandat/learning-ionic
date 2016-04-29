(function () {
    'use strict';

    angular
        .module('app')
        .controller('ComicDetailController', ComicDetailController);

    function ComicDetailController($log, $stateParams) {

        var vm = this;
        vm.title = 'ComicDetailController';
        vm.comic = $stateParams.comic;
        vm.openDetailPage = openDetailPage;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
        }

        function openDetailPage() {
            var open = _.get(window, 'cordova.InAppBrowser.open') || window.open;
            open(vm.comic.detailUrl, '_system');
        }

    }

})();

