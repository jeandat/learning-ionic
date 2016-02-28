(function () {
    'use strict';

    angular
        .module('app')
        .run(configureCordovaPlugins)
        .run(setCustomLogs)
        .run(addGlobals)
        .run(setHttpDefaultCache)
        .run(setRestConfig)
        .run(handleAdjustPanKeyboardMode)
        .run(applySettings)
        .run(boot);

    //////////////////////

    function configureCordovaPlugins($cordovaStatusbar) {

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(false);
        }

        // Style status bar
        var style = _.get($cordovaStatusbar, 'style');
        style && style(1);
    }

    function setCustomLogs($rootScope, $log, stringify) {
        $rootScope.$on('$stateChangeStart', logViewName);

        function logViewName(event, toState, toParams) {
            $log.debug('Entering state ' + toState.name + ' with parameters: ' + stringify(toParams));
        }
    }

    function setHttpDefaultCache($log, $http, CacheFactory, defaultCacheName,
                                 angularCacheStorage) {

        // In unit tests, we will run this for each spec.
        if (CacheFactory.get(defaultCacheName)) return;

        var options = {
            maxAge: 7 * 24 * 60 * 60 * 1000, // Items added to this cache expire after 1 week
            deleteOnExpire: 'passive', // Cache will do nothing when an item expires.
            // Expired items will remain in the cache until requested, at which point they are removed, and undefined is returned.
            storageMode: 'localStorage', // This cache will use `localStorage`.
            storageImpl: angularCacheStorage // Custom wrapper around localStorage to circumvent a problem
            // when all urls have a timestamp as one of their parameter
        };

        $log.debug('Created a default cache for HTTP requests with properties:', options);

        $http.defaults.cache = new CacheFactory('defaultCache', options);
    }

    // Restangular configuration
    function setRestConfig(Restangular, apiEndpoint, apiKey, privateApiKey, $q, $window) {

        // Temporary hack: Restangular is not compatible with Lodash v4.
        _.contains = _.includes;

        // All xhr requests url will have this prefix
        Restangular.setBaseUrl(apiEndpoint);

        // All xhr requests will contain the apikey parameter
        Restangular.setDefaultRequestParams({apikey: apiKey});

        // Define which property in JSON responses contains the self link
        Restangular.setRestangularFields({
            selfLink: 'resourceURI'
        });

        // Marvel thinks a cordova app which load the index page from a file:// url
        // is a server app and so it requires more query parameters. That's too bad because one of them
        // is the private key !!! So here I am adding it with courage forgetting about what I just did.
        if ($window.location.origin === 'file://') {
            Restangular.addFullRequestInterceptor(function (element, operation, model, url,
                                                            headers, query) {
                query.ts = Date.now();
                query.hash = md5(query.ts + privateApiKey + apiKey);
            });
        }

        // What we need to do everytime we request marvel API
        Restangular.addResponseInterceptor(function (data, operation) {
            var extractedData;
            // For getList operations
            if (operation === 'getList') {
                // Success
                if (data.data) {
                    extractedData = data.data.results;
                    extractedData.meta = _.pickBy(data.data, keepMetadata);
                    return extractedData;
                }
                return $q.reject(data);
            }
        });

        ////////////

        function keepMetadata(key, value) {
            return value !== 'results';
        }

    }

    function addGlobals($rootScope, $window) {
        $rootScope.isCordova = ionic.Platform.isWebView();
        $rootScope.isFileUrl = _.startsWith($window.location.origin, 'file:');
    }

    // Will add a simple div which height is the keyboard height in the scroll area
    // in order to reveal what is behind. Makes sense only if the native keyboard behavior
    // is to appears on top and do not resize webview; i.e only for android with
    // `windowSoftInputMode="adjustPan"`.
    function handleAdjustPanKeyboardMode($ionicScrollDelegate) {
        if (!ionic.Platform.isAndroid()) return;

        var $artificialItem;

        window.addEventListener('native.keyboardshow', revealContentBehindKeyboard);
        window.addEventListener('native.keyboardhide', removeArtificialItem);

        ///////////////

        function revealContentBehindKeyboard(e) {
            var $scrollContent = $($ionicScrollDelegate.getScrollView().__content);
            if ($artificialItem == null) {
                $artificialItem = $('<div></div>').height(e.keyboardHeight);
            }
            $scrollContent.append($artificialItem);
        }

        function removeArtificialItem() {
            $artificialItem.detach();
        }
    }

    function applySettings(settingService, $ionicConfig){
        !settingService.settings.enableAnimations && $ionicConfig.views.transition('none');
    }

    function boot($state, $cordovaSplashscreen, $timeout, ImgCache, $rootScope, $log) {
        initImgCache().then(goHome).then(hideSplash);

        /////////////

        function initImgCache() {
            ImgCache.$init();
            return ImgCache.$promise;
        }

        function goHome() {
            $log.info('APP READY');
            $rootScope.ready = true;
            return $state.go('app.characters');
        }

        function hideSplash() {
            return $timeout($cordovaSplashscreen.hide, 1000);
        }
    }


})();
