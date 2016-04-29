(function () {
    'use strict';

    angular
        .module('app')
        .factory('comicService', factory);

    function factory(Restangular, Err) {

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
                noVariants: true
            });
            prefix && (criteria.titleStartsWith = prefix);
            return comics.getList(criteria);
        }

        // Search comics which name starts with `name`.
        function findByCharacterId(id, options) {
            if (!id) throw new Err(1004, {missing: 'id'});
            var criteria = _.defaults(options, {
                format: 'comic',
                formatType: 'comic',
                noVariants: true
            });
            criteria.characters = '' + id;
            return comics.getList(criteria);
        }
    }

})();

