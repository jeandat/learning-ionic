(function () {
    'use strict';

    angular
        .module('app')
        .directive('jdIcBg', jdIcBg);

    function jdIcBg($log) {

        var directive = {
            link: link,
            restrict: 'A'
        };

        return directive;

        /////////////////

        function link(scope, element, attrs) {
            attrs.$observe('jdIcBg', tryToCacheUrl);
            ///////////
            function tryToCacheUrl(srcUrl){
                ImgCache.getCachedFileURL(srcUrl, fileAlreadyInCache, cacheFile);
                /////////////
                function fileAlreadyInCache(providedUrl, cachedUrl){
                    $log.debug('%s already in cache: %s', providedUrl, cachedUrl);
                    setBackgroundUrl(cachedUrl);
                }
                function cacheFile(providedUrl){
                    ImgCache.cacheFile(providedUrl, fileInCacheNow, fallbackToOnlineUrl);
                }
                function fileInCacheNow(cachedUrl){
                    $log.debug('%s just cached: %s', srcUrl, cachedUrl);
                    setBackgroundUrl(cachedUrl);
                }
                function fallbackToOnlineUrl(){
                    $log.warn('Failed to cache %s', srcUrl);
                    setBackgroundUrl(srcUrl);
                }
                function setBackgroundUrl(srcUrl){
                    element.css({'background-image': 'url(' + srcUrl + ')' });
                }
            }
        }
    }

})();

