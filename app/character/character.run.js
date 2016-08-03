(function () {
    'use strict';

    angular
        .module('app')
        .run(addNewMethodsToCharacters);

    ///////////////

    // Extend the Character model object from Restangular with new functions.
    function addNewMethodsToCharacters(Restangular, favouriteService) {
        Restangular.extendModel('characters', function (model) {
            model.thumbnailUrl = getThumbnailUrl();
            model.detailUrl = getDetailUrl();
            model.favourite = getFavourite();
            return model;

            /////////////

            // Create and cache a usable value for the thumbnail image avoiding concatenating the value every time. 
            function getThumbnailUrl() {
                var tnl = model.thumbnail;
                if(_.isEmpty(tnl) || _.endsWith(tnl.path, 'image_not_available')) return '';
                return tnl.path + '.' + tnl.extension;
            }
            // Create and cache a usable value for the detail url avoiding concatenating the value every time.
            function getDetailUrl(){
                return _.get(_.find(model.urls, {type:'detail'}), 'url');
            }
            // Return the favourite associated to this model in Firebase.
            function getFavourite(){
                return favouriteService.getFaveByModelId(model.id);
            }
        });
    }

})();
