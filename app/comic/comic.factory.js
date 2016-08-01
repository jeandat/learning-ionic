(function () {
    'use strict';

    angular
        .module('app')
        .factory('comicService', factory);

    function factory(Restangular, Err, utils, defaultPageSize) {

        var comics = Restangular.all('comics');

        var service = {
            findByName: findByName,
            findByCharacterId: findByCharacterId
        };

        return service;

        ///////////////

        // Search comics which name starts with `name`.
        function findByName(prefix, options) {
            var criteria = _.defaults(options, {
                format: 'comic',
                formatType: 'comic',
                noVariants: true,
                limit: defaultPageSize
            });
            prefix && (criteria.titleStartsWith = prefix);
            return comics.getList(criteria).then(utils.cacheThumbnails);
        }

        // Search comics which name starts with `name`.
        function findByCharacterId(id, options) {
            if (!id) throw new Err(1004, {missing: 'id'});
            var criteria = _.defaults(options, {
                format: 'comic',
                formatType: 'comic',
                noVariants: true,
                limit: defaultPageSize
            });
            criteria.characters = '' + id;
            return comics.getList(criteria).then(utils.cacheThumbnails);
        }
    }

})();

