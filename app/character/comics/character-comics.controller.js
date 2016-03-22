(function () {
    'use strict';

    angular
        .module('app')
        .controller('CharacterComicsController', CharacterComicsController);

    function CharacterComicsController($log, $stateParams, comicService, $scope, throwErr) {

        var vm = this;
        vm.title = 'CharacterComicsController';
        vm.comics = $stateParams.comics;
        vm.character = $stateParams.character;
        vm.hasMore = true;
        vm.showMore = showMore;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
        }

        function showMore(){
            $log.debug('Infinite scroll boundary reached');
            comicService
                .findByCharacterId(vm.character.id, {offset:vm.comics.length})
                .then(updateList)
                .catch(throwErr);

            /////////////

            function updateList(results){
                var meta = _.get(results, 'meta');
                $log.info('Loaded', (meta.count + meta.offset), '/', meta.total, 'comics');
                // Update list of characters
                vm.comics = _.concat(vm.comics, results);
                // Update meta
                vm.comics.meta = meta;
                // Update boolean to know instantly if there is more
                vm.hasMore = meta && (meta.count + meta.offset) < meta.total;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        }
    }

})();

