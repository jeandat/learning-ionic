(function () {
    'use strict';

    angular
        .module('app')
        .factory('characterService', factory);


    function factory(Restangular, utils, defaultOffset) {
        var characters = Restangular.all('characters');

        var service = {
            findByName: findByName
        };

        return service;

        ///////////////

        // Search characters which name starts with `name`.
        function findByName(prefix, offset) {
            var criteria = {limit: defaultOffset};
            prefix && (criteria.nameStartsWith = prefix);
            offset && (criteria.offset = offset);
            return characters.getList(criteria).then(utils.cacheThumbnails);
        }

    }

})();

