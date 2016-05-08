(function () {
    'use strict';

    angular
        .module('app')
        .directive('jdIcBg', jdIcBg);

    function jdIcBg($log, utils) {

        var directive = {
            link: link,
            restrict: 'A'
        };

        return directive;

        /////////////////

        function link(scope, element, attrs) {
            attrs.$observe('jdIcBg', tryToCacheUrl);
            ///////////
            function tryToCacheUrl(srcUrl) {
                utils.cacheFile(srcUrl)
                    .then(setBackgroundUrl)
                    .catch(setBackgroundUrl);
                //////////
                function setBackgroundUrl(url) {
                    element.css({'background-image': 'url(' + url + ')'});
                }
            }
        }
    }

})();

