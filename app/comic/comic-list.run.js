(function () {
    'use strict';

    angular
        .module('app')
        .run(addNewMethodsToComics);

    ///////////////

    function addNewMethodsToComics(Restangular) {
        Restangular.extendModel('comics', function (model) {
            model.thumbnailUrl = getThumbnailUrl();
            return model;

            /////////////

            function getThumbnailUrl() {
                var tnl = model.thumbnail;
                if(_.isEmpty(tnl) || _.endsWith(tnl.path, 'image_not_available')) return '';
                return tnl.path + '.' + tnl.extension;
            }
        });
    }

})();
