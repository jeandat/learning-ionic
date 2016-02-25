(function () {
    'use strict';

    angular
        .module('app')
        .config(appConfig)
        .config(routeConfig)
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

            // Each app has its own nav history stack:

            .state('app.characters', {
                url: '/characters',
                views: {
                    'app-characters': {
                        templateUrl: 'character/character-list.jade',
                        controller: 'CharacterListController as vm'
                    }
                }
            })
            .state('app.character-detail', {
                url: '/characters',
                params: {
                    character: {}
                },
                views: {
                    'app-characters': {
                        templateUrl: 'character/character-detail.jade',
                        controller: 'CharacterDetailController as vm'
                    }
                }
            })

            .state('app.comics', {
                url: '/comics',
                views: {
                    'app-comics': {
                        templateUrl: 'comic/comic-list.jade',
                        controller: 'ComicListController as vm'
                    }
                }
            })
            .state('app.comic-detail', {
                url: '/comics',
                params: {
                    comic: {}
                },
                views: {
                    'app-comics': {
                        templateUrl: 'comic/comic-detail.jade',
                        controller: 'ComicDetailController as vm'
                    }
                }
            })

            .state('app.favourites', {
                url: '/favourites',
                views: {
                    'app-favourites': {
                        templateUrl: 'favourite/favourite-list.jade',
                        controller: 'FavouriteListController as vm'
                    }
                }
            })

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

    // All keys in local storage will have the prefix 'lrnion'.
    function localStorageConfig(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('lrnion'); // learning-ionic
    }

    // Ionic defaults
    function ionicConfig($ionicConfigProvider) {
        $ionicConfigProvider.spinner.icon('dots');
        $ionicConfigProvider.backButton.previousTitleText(false);
        $ionicConfigProvider.tabs.position('top');
        $ionicConfigProvider.views.maxCache(3);
        //$ionicConfigProvider.views.transition('none');
    }

    // ! NOT USED FOR THE MOMENT !
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

