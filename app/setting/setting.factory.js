(function () {
    'use strict';

    angular
        .module('app')
        .factory('settingService', factory);

    function factory($log, localStorageService, defaultCacheName, CacheFactory, ImgCache, $q, $ionicConfig, $window, trackerId) {

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
        }

        function processEnableAnimations(){
            service.settings.enableAnimations ? enableAnimations() : disableAnimations();
        }

        function processEnableTracker(){
            service.settings.enableTracker ? enableTracker() : disableTracker();
        }

        function enableTracker(){
            $window['ga-disable-' + trackerId] = false;
        }

        function disableTracker(){
            $window['ga-disable-' + trackerId] = true;
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

