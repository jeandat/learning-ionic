(function () {
    'use strict';

    angular
        .module('app')
        .run(addNewMethodsToCharacters);

    ///////////////

    function addNewMethodsToCharacters(Restangular) {
        Restangular.extendModel('characters', function (model) {
            model.thumbnailUrl = getThumbnailUrl();
            model.detailUrl = getDetailUrl();
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
        });
    }

})();
