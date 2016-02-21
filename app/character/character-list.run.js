(function () {
    'use strict';

    angular
        .module('app')
        .run(addNewMethodsToCharacters);

    ///////////////

    function addNewMethodsToCharacters(Restangular) {
        Restangular.extendModel('characters', function (model) {
            model.getThumbnailUrl = getThumbnailUrl;
            model.getDetailUrl = getDetailUrl;
            return model;

            /////////////

            function getThumbnailUrl() {
                if(_.isEmpty(model.thumbnail)) return;
                return model.thumbnail.path + '.' + model.thumbnail.extension;
            }
            function getDetailUrl(){
                return _.get(_.find(model.urls, {type:'detail'}), 'url');
            }
        });
    }

})();
