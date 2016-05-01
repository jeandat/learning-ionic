(function () {
    'use strict';

    angular
        .module('app')
        .config(appConfig)
        .config(routeConfig)
        .config(animationConfig)
        .config(localStorageConfig)
        .config(ionicConfig)
        .config(httpInterceptors)
        .config(imgCache);

    function appConfig($compileProvider) {

        console.info('Angular bootstrapped');

        // Remove angular debug info in DOM when compiling for production
        $compileProvider.debugInfoEnabled(false);

        // You may enable them manually by executing in your console: `angular.reloadWithDebugInfo()`

        // If you want a permanent change, modify the above line:
        // ```
        // $compileProvider.debugInfoEnabled(env === 'dev');
        // ```
        // Don't forget to inject the env constant.

        // Empty the hash before the router is started in order to guaranty we will execute the boot process before any controller.
        window.location.hash = '';
    }

    function routeConfig($stateProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router

        $stateProvider

        // setup an abstract state for the apps directive
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'common/layout/layout.jade'
            })

            /////////////////////////////////////////////////////////////////

            .state('app.characterList', {
                url: '/characters',
                views: {
                    'app-characters': {
                        templateUrl: 'character/list/character-list.jade',
                        controller: 'CharacterListController as vm'
                    }
                }
            })
            // Open a modal (see #routeConfig app.run.js)
            .state('app.characterDetailInModal', {
                url: '/characters',
                params: {
                    character: {}
                }
            })
            .state('app.characterComicListInModal', {
                url: '/characters',
                params: {
                    comics: [],
                    character: {}
                }
            })

            /////////////////////////////////////////////////////////////////

            .state('app.comics', {
                url: '/comics',
                views: {
                    'app-comics': {
                        templateUrl: 'comic/list/comic-list.jade',
                        controller: 'ComicListController as vm'
                    }
                }
            })
            .state('app.comicDetailInModal', {
                url: '/comics',
                params: {
                    comic: {}
                }
            })

            /////////////////////////////////////////////////////////////////

            .state('app.favourites', {
                url: '/favourites',
                views: {
                    'app-favourites': {
                        templateUrl: 'favourite/favourite-list.jade',
                        controller: 'FavouriteListController as vm'
                    }
                }
            })

            /////////////////////////////////////////////////////////////////

            .state('app.settings', {
                url: '/settings',
                views: {
                    'app-settings': {
                        templateUrl: 'setting/setting-list.jade',
                        controller: 'SettingListController as vm'
                    }
                }
            });

        console.debug('States defined');

    }

    function animationConfig($animateProvider){
        // By default, the $animate service will check for animation styling
        // on every structural change. This requires a lot of animateFrame-based
        // DOM-inspection. However, we can tell $animate to only check for
        // animations on elements that have a specific class name RegExp pattern
        // present. In this case, we are requiring the "animated" class.
        // https://docs.angularjs.org/guide/animations
        // http://www.bennadel.com/blog/2935-enable-animations-explicitly-for-a-performance-boost-in-angularjs.htm
        $animateProvider.classNameFilter( /\banimated\b/ );
    }

    // All keys in local storage will have the prefix 'lrnion'.
    function localStorageConfig(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('app');
    }

    // Ionic defaults
    function ionicConfig($ionicConfigProvider) {
        $ionicConfigProvider.spinner.icon('dots');
        $ionicConfigProvider.backButton.previousTitleText(false);
        $ionicConfigProvider.tabs.position('top');
        $ionicConfigProvider.views.maxCache(3);
    }

    function httpInterceptors($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    }

    function imgCache(ImgCacheProvider) {
        ImgCacheProvider.setOptions({
            debug: true,
            chromeQuota: 50 * 1024 * 1024,
            skipURIencoding: false,
            usePersistentCache: false
        });
        ImgCacheProvider.manualInit = true;
    }

})();

