(function () {
    'use strict';

    angular
        .module('app')
        .controller('ComicDetailController', ComicDetailController);

    function ComicDetailController($log, $stateParams, $scope, utils) {

        var vm = this;
        vm.title = 'ComicDetailController';
        vm.comic = $stateParams.comic;
        vm.openDetailPage = openDetailPage;
        vm.remove = remove;
        vm.toggleContent = toggleContent;
        vm.showViewer = showViewer;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
        }

        function openDetailPage() {
            var open = _.get(window, 'cordova.InAppBrowser.open') || window.open;
            open(vm.comic.detailUrl, '_system');
        }

        function remove(){
            // Little subtlety.
            // For simplicity sake, the modal load a template which define its own controller in the template (this one).
            // As ionicModal create a scope automatically if not provided, it is automatically the parent of the one created for this controller.
            // You should know too that ionicModal will register the created instance as a property of the scope.
            // Thus our parent scope possessing a reference to our modal instance.
            $scope.$parent.modal.remove();
        }

        function toggleContent(){
            vm.hideContent = !vm.hideContent;
        }

        // Show a native viewer with zoom capability.
        function showViewer() {
            // Unfortunately, this plugin doesn't handle cdvfile: url.
            // So I'm converting it to a normal file system url to avoid to download again that image.
            // Plus the plugin doesn't have any error callback, so using the cached file avoid us issues with network.
            utils.cacheFile(vm.comic.thumbnailUrl)
                .then(utils.convertLocalFileSystemURL)
                .then(showNativeViewer)
                .catch(showNativeViewer);
            //////////
            function showNativeViewer(url) {
                PhotoViewer.show(url, vm.comic.title);
            }
        }

    }

})();

