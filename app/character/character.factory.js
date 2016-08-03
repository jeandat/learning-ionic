(function () {
    'use strict';

    angular
        .module('app')
        .factory('characterService', factory);

    // Service to request characters from the Marvel API.
    function factory(Restangular, utils, defaultPageSize) {
        var characters = Restangular.all('characters');

        var service = {
            findByName: findByName
        };

        return service;

        ///////////////

        // Search characters which name starts with `prefix`.
        // Accept a single option `offset` which is the position of the first result. 
        function findByName(prefix, offset) {
            var criteria = {limit: defaultPageSize};
            prefix && (criteria.nameStartsWith = prefix);
            offset && (criteria.offset = offset);
            return characters.getList(criteria).then(utils.cacheThumbnails);
        }

    }

})();

