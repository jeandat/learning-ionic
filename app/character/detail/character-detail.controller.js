(function () {
    'use strict';

    angular
        .module('app')
        .controller('CharacterDetailController', CharacterDetailController);

    function CharacterDetailController($log, $stateParams, comicService, throwErr) {

        var vm = this;
        vm.title = 'CharacterDetailController';
        vm.character = $stateParams.character;
        vm.comics = [];
        vm.hasMoreComics = true;
        vm.isLoadingComics = false;
        vm.noComics = false;
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
            return comicService
                .findByCharacterId(vm.character.id, {limit: 10})
                .then(updateLayout)
                .catch(processErr);

            ////////////

            function updateLayout(response){
                vm.comics = response;
                if(response.length === 0) vm.noComics = true;
                var meta = response.meta;
                vm.hasMoreComics = meta.count < meta.total;
                vm.isLoadingComics = false;
                $log.debug('Comics for `%s`: %o', vm.character.name, vm.comics);
            }
            function processErr(err){
                vm.noComics = true;
                throwErr(err);
            }
        }

        function showComics($event) {
            if (!vm.hasMoreComics) {
                $event.preventDefault();
                return;
            }
        }

    }

})();

