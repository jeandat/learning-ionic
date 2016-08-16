(function () {
    'use strict';

    angular
        .module('app')
        .factory('settingService', factory);

    function factory($log, localStorageService, defaultCacheName, CacheFactory, ImgCache, $q, $ionicConfig, $window, trackerId, 
                     $ionicBody, $rootScope) {

        var defaults = {
            enableAnimations: true,
            enableTracker: true
        };

        var service = {
            settings: _.defaults(localStorageService.get('settings'), defaults),
            applyDiffAndPersist: applyDiffAndPersist,
            apply: apply,
            persist: persist,
            clearCache: clearCache
        };

        return service;

        ////////////

        // Execute a diff between previous and new options and process the ones that have changed.
        function applyDiffAndPersist(newSettings, oldSettings){
            // enableAnimations property
            newSettings.enableAnimations !== oldSettings.enableAnimations && processEnableAnimations();
            newSettings.enableTracker !== oldSettings.enableTracker && processEnableTracker();
            persist();
        }

        function persist(){
            // Persist in local storage
            localStorageService.set('settings', service.settings);
            $log.info('Settings persisted');
        }

        function apply(){
            processEnableAnimations();
            processEnableTracker();
        }

        // Enable or disable animations
        function processEnableAnimations(){
            var enable = service.settings.enableAnimations;
            $ionicBody.enableClass(!enable, 'no-animation');
            enable ? enableAnimations() : disableAnimations();
        }

        // Enable or disable Google Analytics
        function processEnableTracker(){
            service.settings.enableTracker ? enableTracker() : disableTracker();
        }

        function enableTracker(){
            $window['ga-disable-' + trackerId] = false;
        }

        function disableTracker(){
            $window['ga-disable-' + trackerId] = true;
        }

        // Clear two caches:
        // - Images cached on disk (file system)
        // - HTTP responses cached on disk (local storage)
        function clearCache() {
            return $q(function (resolve, reject) {

                CacheFactory.get(defaultCacheName).removeAll();
                $log.info('HTTP cache is now empty');
                ImgCache.clearCache(ok, reject);

                /////////////

                function ok() {
                    $log.info('Image cache is now empty');
                    $rootScope.$emit('cache:cleared');
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

