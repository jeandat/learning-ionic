(function () {
    'use strict';

    angular
        .module('app')
        .factory('angularCacheStorage', angularCacheStorage);

    // This is a thin wrapper around local storage.
    // Angular cache is able to use localStorage as persistent storage but default behavior is to
    // use a GET url as key.
    // Problem is that when loading the app from a file: url, Marvel backend thinks we are a server.
    // And so they ask for more parameters like ts which is a timestamp preventing caching.
    // This implementation will remove that parameter when dealing with localStorage.
    function angularCacheStorage($rootScope) {

        var service = {
            getItem: getItem,
            setItem: setItem,
            removeItem: removeItem
        };
        return service;

        ////////////////

        function getItem(key) {
            return localStorage.getItem.call(localStorage, removeServerParameters(key));
        }

        function setItem(key, value) {
            return localStorage.setItem.call(localStorage, removeServerParameters(key), value);
        }

        function removeItem(key) {
            return localStorage.removeItem.call(localStorage, removeServerParameters(key));
        }

        function removeServerParameters(key){
            if($rootScope.isCordova && $rootScope.isFileUrl){
                key = key.replace(/ts=\d+&/, '');
                key = key.replace(/&ts=\d+/, '');
                key = key.replace(/hash=[^&]+&/, '');
                key = key.replace(/&hash=[^&]+/, '');
            }
            return key;
        }
    }

})();

