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

        // Open comic page on marvel.com in default browser.
        function openDetailPage() {
            var open = _.get(window, 'cordova.InAppBrowser.open') || window.open;
            open(vm.comic.detailUrl, '_system');
        }

        function remove() {
            // Little subtlety.
            // For simplicity sake, the modal load a template which define its own controller in the template (this one).
            // As ionicModal create a scope automatically if not provided, it is automatically the parent of the one created for this controller.
            // You should know too that ionicModal will register the created instance as a property of the scope.
            // Thus our parent scope possessing a reference to our modal instance.
            $scope.$parent.modal.remove();
        }

        function toggleContent() {
            vm.hideContent = !vm.hideContent;
        }

        // Show a native viewer with zoom and sharing capabilities.
        function showViewer() {
            // We can't use blindly `thumbnailUrlInCache' cause the file might not be in cache anymore. For instance if we just cleared 
            // the cache after a search have been made. 
            utils.showPhotoViewer(vm.comic.thumbnailUrl, vm.comic.title);
        }

    }

})();

