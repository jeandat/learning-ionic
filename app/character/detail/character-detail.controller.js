(function () {
    'use strict';

    angular
        .module('app')
        .controller('CharacterDetailController', CharacterDetailController);

    function CharacterDetailController($log, $stateParams, comicService, $ionicModal, $scope) {

        var vm = this;
        vm.title = 'CharacterDetailController';
        vm.character = $stateParams.character;
        vm.comics = [];
        vm.hasMoreComics = true;
        vm.isLoadingComics = false;
        vm.swiper = {
            options: {
                effect: 'fade'
            },
            instance: null
        };
        vm.modal = null;
        vm.openDetailPage = openDetailPage;
        vm.showComics = showComics;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
            loadComics();
        }

        function openDetailPage() {
            var open = _.get(window, 'cordova.InAppBrowser.open') || window.open;
            open(vm.character.detailUrl, '_system');
        }

        function loadComics() {
            vm.isLoadingComics = true;
            return comicService.findByCharacterId(vm.character.id, {limit: 10}).then(function (response) {
                vm.comics = response;
                var meta = response.meta;
                vm.hasMoreComics = meta.count < meta.total;
                vm.isLoadingComics = false;
                $log.debug('Comics for `%s`: %o', vm.character.name, vm.comics);
            });
        }

        function showComics($event) {
            if (!vm.hasMoreComics) {
                $event.preventDefault();
                return;
            }

            //Cleanup the modal when we're done with it!
            $scope.$on('$destroy', destroyModal);

            // Show it if already existing
            if(vm.modal) {
                vm.modal.show();
                return;
            }

            $ionicModal
                .fromTemplateUrl('character/detail/comics/character-comics.jade', {scope: $scope})
                .then(saveReference);

            ////////////

            function saveReference(modal) {
                vm.modal = modal;
                vm.modal.show();
            }

            function destroyModal() {
                vm.modal.remove();
            }
        }

    }

})();

