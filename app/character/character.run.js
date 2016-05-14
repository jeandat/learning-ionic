(function () {
    'use strict';

    angular
        .module('app')
        .run(addNewMethodsToCharacters);

    ///////////////

    function addNewMethodsToCharacters(Restangular, favouriteService) {
        Restangular.extendModel('characters', function (model) {
            model.thumbnailUrl = getThumbnailUrl();
            model.detailUrl = getDetailUrl();
            model.favourite = getFavourite();
            return model;

            /////////////

            function getThumbnailUrl() {
                var tnl = model.thumbnail;
                if(_.isEmpty(tnl) || _.endsWith(tnl.path, 'image_not_available')) return '';
                return tnl.path + '.' + tnl.extension;
            }
            function getDetailUrl(){
                return _.get(_.find(model.urls, {type:'detail'}), 'url');
            }
            function getFavourite(){
                return favouriteService.getFaveByModelId(model.id);
            }
        });
    }

})();
