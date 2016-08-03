(function () {
    'use strict';

    angular
        .module('app')
        .run(addNewMethodsToComics);

    ///////////////

    // Extend the Comic model object from Restangular with new functions.
    function addNewMethodsToComics(Restangular, favouriteService) {
        Restangular.extendModel('comics', function (model) {
            model.thumbnailUrl = getThumbnailUrl();
            model.thumbnailUrlInPortraitUncanny = getThumbnailUrlInPortraitUncanny();
            model.detailUrl = getDetailUrl();
            model.printPrice = getPrintPrice();
            model.favourite = getFavourite();
            return model;

            /////////////

            // Create and cache a usable value for the thumbnail image avoiding concatenating the value every time. 
            function getThumbnailUrl() {
                var tnl = model.thumbnail;
                if (_.isEmpty(tnl) || _.endsWith(tnl.path, 'image_not_available')) return '';
                return tnl.path + '.' + tnl.extension;
            }
            // Create and cache a usable value for a thumbnail image (format 'portrait_uncanny') avoiding concatenating the value every time.
            function getThumbnailUrlInPortraitUncanny(){
                var tnl = model.thumbnail;
                if (_.isEmpty(tnl) || _.endsWith(tnl.path, 'image_not_available')) return '';
                return tnl.path + '/portrait_uncanny.' + tnl.extension;
            }
            // Create and cache a usable value for the detail url avoiding concatenating the value every time.
            function getDetailUrl(){
                return _.get(_.find(model.urls, {type:'detail'}), 'url');
            }
            // Create and cache a usable value for the print price avoiding concatenating the value every time.
            function getPrintPrice(){
                return _.get(_.find(model.prices, {type: 'printPrice'}), 'price');
            }
            // Return the favourite associated to this model in Firebase.
            function getFavourite(){
                return favouriteService.getFaveByModelId(model.id);
            }
        });
    }

})();
