(function () {
    'use strict';

    angular
        .module('app')
        .run(addNewMethodsToComics);

    ///////////////

    function addNewMethodsToComics(Restangular) {
        Restangular.extendModel('comics', function (model) {

            model.thumbnailUrl = getThumbnailUrl();
            model.thumbnailUrlInPortraitUncanny = getThumbnailUrlInPortraitUncanny();
            model.detailUrl = getDetailUrl();
            model.printPrice = getPrintPrice();
            return model;

            /////////////

            function getThumbnailUrl() {
                var tnl = model.thumbnail;
                if (_.isEmpty(tnl) || _.endsWith(tnl.path, 'image_not_available')) return '';
                return tnl.path + '.' + tnl.extension;
            }
            function getThumbnailUrlInPortraitUncanny(){
                var tnl = model.thumbnail;
                if (_.isEmpty(tnl) || _.endsWith(tnl.path, 'image_not_available')) return '';
                return tnl.path + '/portrait_uncanny.' + tnl.extension;
            }
            function getDetailUrl(){
                return _.get(_.find(model.urls, {type:'detail'}), 'url');
            }
            function getPrintPrice(){
                return _.get(_.find(model.prices, {type: 'printPrice'}), 'price');
            }
        });
    }

})();
