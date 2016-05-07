(function () {
    'use strict';

    angular
        .module('app')
        .run(configureCordovaPlugins)
        .run(setRouteConfig)
        .run(setCustomLogs)
        .run(addGlobals)
        .run(setHttpDefaultCache)
        .run(setRestConfig)
        .run(handleAdjustPanKeyboardMode)
        .run(applySettings)
        .run(setTracker)
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

    // It is not possible with the current version of ui-router to cancel a navigation in the onEnter function of a state definition.
    // Thus, if you open a modal in that function, you will always navigate somewhere. We don't want that.
    // We want to prevent navigation and open a modal instead. So why create a state in the first place ?
    // Because I want to centralize navigation entries and their params. Some times we will navigate normally and some times we will
    // open a modal instead. Next version of ui-router might be smarter.
    function setRouteConfig($ionicModal, $rootScope, $log, $stateParams) {

        $rootScope.$on('$stateChangeStart', route);

        ///////////

        function route(event, toState, toParams) {

            var stateName = toState.name;

            if (_.includes(stateName, 'Modal')) {
                // Prevent state navigation: taking control from here
                event.preventDefault();
                // Copy params given to state in $stateParams in order to retrieve them in modals.
                // As we are cancelling navigation, the ui router will not set $stateParams. That's too bad because I like that pattern.
                _.assign($stateParams, toParams);
            }

            var modalOptions = {
                animation: 'slide-in-right'
            };

            switch (stateName) {
                case 'app.characterDetailInModal':
                    return $ionicModal.fromTemplateUrl('character/detail/character-detail.jade', modalOptions).then(show);
                case 'app.characterComicListInModal':
                    return $ionicModal.fromTemplateUrl('character/comic-list/character-comic-list.jade', modalOptions).then(show);
                case 'app.comicDetailInModal':
                    return $ionicModal.fromTemplateUrl('comic/detail/comic-detail.jade', modalOptions).then(show);
            }

            /////////

            function show(modal) {
                modal.show();
            }
        }
    }

    function setCustomLogs($rootScope, $log) {
        $rootScope.$on('$stateChangeStart', logViewName);

        function logViewName(event, toState, toParams) {
            $log.debug('Entering state', toState.name, 'with parameters:', toParams);
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
            var $scrollContent = angular.element($ionicScrollDelegate.getScrollView().__content);
            if ($artificialItem == null) {
                $artificialItem = angular.element('<div></div>').height(e.keyboardHeight);
            }
            $scrollContent.append($artificialItem);
        }

        function removeArtificialItem() {
            $artificialItem.detach();
        }
    }

    function applySettings(settingService) {
        settingService.apply();
    }

    function setTracker($log, trackerId, $rootScope, $cordovaGoogleAnalytics) {

        $cordovaGoogleAnalytics.startTrackerWithId(trackerId);
        '@@env' === 'dev' && $cordovaGoogleAnalytics.debugMode();

        // Now we can start tracking pages
        $rootScope.$on('$stateChangeSuccess', trackView);

        ////////////////

        function trackView(event, toState) {
            var url = toState.name;
            $cordovaGoogleAnalytics.trackView(url).then(beaconSent).catch(beaconCrashed);

            ////////////////

            function beaconSent() {
                $log.debug('GA beacon sent for url `' + url + '`');
            }

            function beaconCrashed(err) {
                $log.error('GA beacon crashed for url `' + url + '` with error:', err);
            }
        }
    }

    function boot($state, $cordovaSplashscreen, $timeout, ImgCache, $rootScope, $log, $ionicPopup, favouriteService, Err, showErr) {
        initImgCache()
            .catch(explain)
            .then(favouriteService.init)
            .catch(noFave)
            .then(goHome)
            .finally(hideSplash);

        /////////////

        function initImgCache() {
            ImgCache.$init();
            return ImgCache.$promise;
        }

        function explain() {
            var options = {
                title: 'Invalid state',
                template: 'Please allow access to the filesystem if you want to use this app.',
                cssClass: 'alert-popup',
                okType: 'button-assertive'
            };
            $ionicPopup.alert(options).then(ionic.Platform.exitApp);
        }

        function goHome() {
            $log.info('APP READY');
            $rootScope.ready = true;
            return $state.go('app.characterList');
        }

        function hideSplash() {
            return $timeout($cordovaSplashscreen.hide, 1000);
        }

        function noFave(exception) {
            var err = new Err(2000, {source: exception, ui: true});
            showErr(err);
        }

    }


})();
