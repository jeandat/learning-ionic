(function () {
    'use strict';

    angular
        .module('app')
        .controller('ChatsController', ChatsController);


    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    function ChatsController(chatsService) {

        var vm = this;
        vm.chats = chatsService.all();
        vm.remove = remove;

        ////////////////

        function remove(chat) {
            chatsService.remove(chat);
        }

    }

})();

