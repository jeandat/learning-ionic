(function () {
    'use strict';

    angular
        .module('app')
        .factory('utils', utils);

    // As expected, helper functions.
    function utils($log, $q) {

        var service = {
            cacheFile: cacheFile,
            convertLocalFileSystemURL: convertLocalFileSystemURL,
            cacheThumbnails: cacheThumbnails,
            showPhotoViewer: showPhotoViewer
        };
        return service;

        ////////////////

        // Cache an image on disk from a source url.
        // Returns a promise. The resolve callback receive a cached url.
        // The reject callback receive the source url.
        function cacheFile(srcUrl) {
            return $q(function (resolve, reject) {
                if (!srcUrl) {
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

        // Convert a cordova url (`cdvfile://`) into a standard file system url.
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

        // Cache thumbnail urls in each item and add one new property for each given property corresponding to the cached url.
        // The created property uses the actual name suffixed with 'InCache'.
        // `properties` Array<String> Accepted values are : `thumbnailUrl`, `thumbnailUrlInPortraitUncanny`
        // `ìtems` Array of comics or characters
        function cacheThumbnails(items, properties) {
            $log.info('Caching thumbnails');
            if (_.isEmpty(items)) return items;
            // Avoid configuring everyone for these very common properties.
            if (_.isEmpty(properties)) properties = ['thumbnailUrl', 'thumbnailUrlInPortraitUncanny'];
            var promises = [];
            _.forEach(items, cacheThumbnail);
            return $q.all(promises).then(function () {
                return items;
            });
            /////////
            function cacheThumbnail(item) {
                _.forEach(properties, cacheProperty);
                /////////
                function cacheProperty(property) {
                    _.has(item, property) && promises.push(cacheFile(item[property]).then(updateModel).catch(bypass));
                    //////////
                    function updateModel(cachedUrl) {
                        item[property + 'InCache'] = cachedUrl;
                    }

                    function bypass() {
                        return $q.resolve();
                    }
                }
            }
        }

        // Will cache the remote image at `url` if not already in cache and use a local url instead of the remote one.
        // Avoid to download it again.
        function showPhotoViewer(url, title) {
            cacheFile(url)
            // Unfortunately, this plugin doesn't handle cdvfile: url.
            // So I'm converting it to a normal file system url.
                .then(convertLocalFileSystemURL)
                .then(showNativeViewer)
                // In case we can't cache the file, the remote url will be used.
                .catch(showNativeViewer);
            //////////
            function showNativeViewer(url) {
                PhotoViewer.show(url, title);
            }
        }
    }

})();


