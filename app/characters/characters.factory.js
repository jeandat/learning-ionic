(function () {
    'use strict';

    angular
        .module('app')
        .factory('charactersService', factory);

    function factory(Restangular) {
        return Restangular.service('characters');
    }

})();

