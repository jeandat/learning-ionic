(function () {
    'use strict';

    angular
        .module('app')
        .run(addNewMethodsToComics);

    ///////////////

    function addNewMethodsToComics(Restangular) {
        Restangular.extendModel('comics', function (model) {
            model.getThumbnailUrl = getThumbnailUrl;
            return model;

            /////////////

            function getThumbnailUrl() {
                if(_.isEmpty(model.thumbnail)) return '';
                return model.thumbnail.path + '.' + model.thumbnail.extension;
            }
        });
    }

})();
