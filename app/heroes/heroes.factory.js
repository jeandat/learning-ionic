(function () {
    'use strict';

    angular
        .module('app')
        .factory('heroesService', factory);

    function factory(Restangular) {
        return Restangular.service('characters');
    }

})();

