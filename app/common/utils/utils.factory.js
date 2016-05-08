(function () {
    'use strict';

    angular
        .module('app')
        .factory('utils', utils);

    function utils($log, $q) {

        var service = {
            cacheFile: cacheFile,
            convertLocalFileSystemURL: convertLocalFileSystemURL
        };
        return service;

        ////////////////

        function cacheFile(srcUrl) {
            return $q(function (resolve, reject) {
                ImgCache.getCachedFileURL(srcUrl, fileAlreadyInCache, cacheFile);
                /////////////
                function fileAlreadyInCache(providedUrl, cachedUrl) {
                    $log.debug('%s already in cache: %s', providedUrl, cachedUrl);
                    resolve(cachedUrl);
                }

                function cacheFile(providedUrl) {
                    ImgCache.cacheFile(providedUrl, fileInCacheNow, fallbackToOnlineUrl);
                }

                function fileInCacheNow(cachedUrl) {
                    $log.debug('%s just cached: %s', srcUrl, cachedUrl);
                    resolve(cachedUrl);
                }

                function fallbackToOnlineUrl() {
                    $log.warn('Failed to cache %s', srcUrl);
                    reject(srcUrl);
                }
            });
        }

        function convertLocalFileSystemURL(url) {
            return $q(function (resolve, reject) {
                resolveLocalFileSystemURL(url, success, reject);
                //////////
                function success(entry) {
                    var nativeUrl = entry.toURL();
                    $log.debug('Converting from cordova url ` %s ` to native url : ` %s ` ', url, nativeUrl);
                    resolve(nativeUrl);
                }
            });
        }
    }

})();

