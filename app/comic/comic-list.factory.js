(function () {
    'use strict';

    angular
        .module('app')
        .factory('comicListService', factory);

    function factory(Restangular) {
        var comics = Restangular.all('comics');

        var service = {
            findByName: findByName
        };

        return service;

        ///////////////

        // Search comics which name starts with `name`.
        function findByName(prefix, offset){
            var criteria = {
                format: 'comic',
                formatType: 'comic',
                noVariants: true
            };
            prefix && (criteria.titleStartsWith = prefix);
            offset && (criteria.offset = offset);
            return comics.getList(criteria);
        }
    }

})();

