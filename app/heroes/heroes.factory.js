(function () {
    'use strict';

    angular
        .module('app')
        .factory('Heroes', factory);

    function factory(Restangular) {
        return Restangular.service('characters');
    }

})();

