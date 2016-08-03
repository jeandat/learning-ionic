(function () {
    'use strict';

    angular
        .module('app')
        .directive('jdIcBg', jdIcBg);

    // Directive that can cache an image on disk and add a background image to that element via css.
    // Avoid the usual web effect that makes the image appears line after line from top to bottom. 
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

