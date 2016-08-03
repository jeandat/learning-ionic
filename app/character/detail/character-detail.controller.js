(function () {
    'use strict';

    angular
        .module('app')
        .controller('CharacterDetailController', CharacterDetailController);

    function CharacterDetailController($log, $stateParams, comicService, throwErr, $scope, utils, $timeout) {

        var vm = this;
        vm.title = 'CharacterDetailController';
        vm.character = $stateParams.character;
        vm.comics = [];
        vm.hasMoreComics = true;
        vm.isLoadingComics = true;
        vm.noComics = false;
        vm.swiper = {
            options: {
                effect: 'fade'
            },
            instance: null
        };
        vm.openDetailPage = openDetailPage;
        vm.showComics = showComics;
        vm.remove = remove;
        vm.toggleContent = toggleContent;
        vm.showViewer = showViewer;

        var unlisten;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
            unlisten = $scope.$parent.$on('modal.shown', loadComics);
        }

        function openDetailPage() {
            var open = _.get(window, 'cordova.InAppBrowser.open') || window.open;
            open(vm.character.detailUrl, '_system');
        }

        // Request the first five comics for this character. 
        function loadComics() {
            unlisten();
            $timeout(waitAnimationEnd, 500);
            ///////////
            function waitAnimationEnd(){
                vm.isLoadingComics = true;
                return comicService
                    .findByCharacterId(vm.character.id, {limit: 5})
                    .then(updateLayout)
                    .catch(processErr);
            }
            function updateLayout(response) {
                vm.comics = response;
                if (response.length === 0) vm.noComics = true;
                var meta = response.meta;
                vm.hasMoreComics = meta.count > 0;
                vm.isLoadingComics = false;
                $log.debug('Comics for `%s`: %o', vm.character.name, vm.comics);
            }
            function processErr(err) {
                vm.noComics = true;
                vm.isLoadingComics = false;
                throwErr(err);
            }
        }

        function showComics($event) {
            if (!vm.hasMoreComics) {
                $event.preventDefault();
                return;
            }
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

        // Show a native viewer with zoom capability.
        function showViewer() {
            // Unfortunately, this plugin doesn't handle cdvfile: url.
            // So I'm converting it to a normal file system url to avoid to download again that image.
            // Plus the plugin doesn't have any error callback, so using the cached file avoid us issues with network.
            utils.cacheFile(vm.character.thumbnailUrl)
                .then(utils.convertLocalFileSystemURL)
                .then(showNativeViewer)
                .catch(showNativeViewer);
            //////////
            function showNativeViewer(url) {
                PhotoViewer.show(url, vm.character.name);
            }
        }

    }

})();

