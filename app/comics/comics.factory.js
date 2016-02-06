(function () {
    'use strict';

    angular
        .module('app')
        .factory('comicsService', comicsService);

    // Some fake testing data
    var comics = fakeData();

    function comicsService() {

        var service = {
            all: all,
            remove: remove,
            get: get
        };

        return service;

        ////////////////

        function all(){
            return comics;
        }

        function remove(comic) {
            comics.splice(comics.indexOf(comic), 1);
        }

        function get(comicId) {
            for (var i = 0; i < comics.length; i++) {
                if (comics[i].id === parseInt(comicId)) {
                    return comics[i];
                }
            }
            return null;
        }

    }

    function fakeData(){
        return [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
        }];
    }

})();

