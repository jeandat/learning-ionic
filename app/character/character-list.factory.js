(function () {
    'use strict';

    angular
        .module('app')
        .factory('characterListService', factory);


    function factory(Restangular) {
        var characters = Restangular.all('characters');

        var service = {
            findByName: findByName
        };

        return service;

        ///////////////

        // Search characters which name starts with `name`.
        function findByName(prefix, offset){
            var criteria = {};
            prefix && (criteria.nameStartsWith = prefix);
            offset && (criteria.offset = offset);
            return characters.getList(criteria);
        }

    }

})();

