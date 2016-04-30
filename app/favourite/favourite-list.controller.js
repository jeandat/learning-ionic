(function () {
    'use strict';

    angular
        .module('app')
        .controller('FavouriteListController', FavouriteListController);

    function FavouriteListController($log, favouriteService, $state) {

        var vm = this;
        vm.title = 'FavouriteListController';
        vm.faves = favouriteService.faves;
        vm.deleteFave = deleteFave;
        vm.navigate = navigate;

        activate();

        ////////////////

        function activate() {
            $log.debug(vm.title + ' instantiated');
        }

        function deleteFave(){

        }

        function navigate(fave){
            if(fave.type === 'character'){
                $state.go('app.characterDetailInModal', {character:fave});
            } else {
                $state.go('app.comicDetailInModal', {comic:fave});
            }
        }
    }

})();
