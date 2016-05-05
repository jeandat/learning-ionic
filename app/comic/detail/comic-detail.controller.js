(function () {
    'use strict';

    angular
        .module('app')
        .controller('ComicDetailController', ComicDetailController);

    function ComicDetailController($log, $stateParams, $scope) {

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

        function showViewer(){
            PhotoViewer.show(vm.comic.thumbnailUrl, vm.comic.title);
        }

    }

})();

