(function () {
    'use strict';

    angular
        .module('app')
        .factory('settingService', factory);

    function factory($log, localStorageService, defaultCacheName, CacheFactory, ImgCache, $q, $ionicConfig) {

        var defaults = {
            enableAnimations: true
        };

        var service = {
            settings: _.defaults(localStorageService.get('settings'), defaults),
            update: update,
            clearCache: clearCache
        };

        return service;

        ////////////

        function update(){
            var settings = service.settings;

            // enableAnimations property
            settings.enableAnimations ? enableAnimations() : disableAnimations();

            // Persist in local storage
            localStorageService.set('settings', settings);
            $log.info('Settings persisted');
        }

        function clearCache() {
            return $q(function (resolve, reject) {

                CacheFactory.get(defaultCacheName).removeAll();
                $log.info('HTTP cache is now empty');
                ImgCache.clearCache(ok, reject);

                /////////////

                function ok() {
                    $log.info('Image cache is now empty');
                    resolve();
                }
            });
        }

        function enableAnimations(){
            $ionicConfig.views.transition('platform');
        }

        function disableAnimations(){
            $ionicConfig.views.transition('none');
        }

    }

})();

