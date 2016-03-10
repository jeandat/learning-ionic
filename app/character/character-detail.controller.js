(function () {
    'use strict';

    angular
        .module('app')
        .controller('CharacterDetailController', CharacterDetailController);

    function CharacterDetailController($log, $stateParams, comicService) {

        var vm = this;
        vm.title = 'CharacterDetailController';
        vm.character = $stateParams.character;
        vm.comics = [];
        vm.hasMoreComics = true;
        vm.swiper = {
            options:{
                //pagination: '',
                //spaceBetween: 10,
                //slidesPerView: 2,
                //resistance: false
                //centeredSlides: true,
                effect: 'fade',
                fade:{
                    crossFade: true
                }
            },
            instance: null
        };
        vm.openDetailPage = openDetailPage;
        vm.showComics = showComics;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
            loadComics();
        }

        function openDetailPage(){
            var open = _.get(window, 'cordova.InAppBrowser.open') || window.open;
            open(vm.character.detailUrl, '_system');
        }

        function loadComics(){
            return comicService.findByCharacterId(vm.character.id, {limit:10}).then(function(response){
                vm.comics = response;
                var meta = response.meta;
                vm.hasMoreComics = meta.count < meta.total;
                $log.debug('Comics for `%s`: %o', vm.character.name, vm.comics);
            });
        }

        function showComics($event){
            if(!vm.hasMoreComics) {
                $event.preventDefault();
                return;
            }
            // else ui-sref will do its job (see template).
        }

    }

})();

