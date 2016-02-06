(function () {
    'use strict';

    angular
        .module('app')
        .controller('ComicsController', ComicsController);


    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    function ComicsController(comicsService) {

        var vm = this;
        vm.comics = comicsService.all();
        vm.remove = remove;

        ////////////////

        function remove(comic) {
            comicsService.remove(comic);
        }

    }

})();

