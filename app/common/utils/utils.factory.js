(function () {
    'use strict';

    angular
        .module('app')
        .factory('utils', utils);

    function utils($log, $q) {

        var service = {
            cacheFile: cacheFile,
            convertLocalFileSystemURL: convertLocalFileSystemURL,
            cacheThumbnails: cacheThumbnails
        };
        return service;

        ////////////////

        function cacheFile(srcUrl) {
            return $q(function (resolve, reject) {
                if(!srcUrl) {
                    reject(srcUrl);
                    return;
                }
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

        function cacheThumbnails(items, properties){
            $log.debug('Caching thumbnails');
            if(_.isEmpty(items)) return items;
            // Avoid configuring everyone for these very common properties.
            if(_.isEmpty(properties)) properties = ['thumbnailUrl', 'thumbnailUrlInPortraitUncanny'];
            var promises = [];
            _.forEach(items, cacheThumbnail);
            return $q.all(promises).then(function(){
                return items;
            });
            /////////
            function cacheThumbnail(item) {
                _.forEach(properties, cacheProperty);
                /////////
                function cacheProperty(property){
                    _.has(item, property) && promises.push(cacheFile(item[property]).then(updateModel).catch(bypass));
                    //////////
                    function updateModel(cachedUrl) {
                        item[property + 'InCache'] = cachedUrl;
                    }
                    function bypass(){
                        return $q.resolve();
                    }
                }
            }
        }
    }

})();

