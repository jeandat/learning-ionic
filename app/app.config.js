(function () {
    'use strict';

    angular
        .module('app')
        .config(appConfig)
        .config(routeConfig)
        .config(localStorageConfig)
        .config(ionicConfig)
        .config(ionicNativeTransitions)
        .config(httpInterceptors)
        .config(imgCache);

    function appConfig($compileProvider) {
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

        // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                nativeTransitions: {
                    'type': 'fade'
                },
                templateUrl: 'common/layout/layout.jade'
            })

            // Each tab has its own nav history stack:

            .state('tab.characters', {
                url: '/characters',
                nativeTransitions: {
                    'type': 'fade'
                },
                views: {
                    'tab-characters': {
                        templateUrl: 'characters/tab-characters.jade',
                        controller: 'CharactersController as vm'
                    }
                }
            })
            .state('tab.character-detail', {
                url: '/characters',
                nativeTransitions: {
                    'type': 'slide',
                    'direction': 'up'
                },
                params: {
                    character: {}
                },
                views: {
                    'tab-characters': {
                        templateUrl: 'characters/character-detail.jade',
                        controller: 'CharacterDetailController as vm'
                    }
                }
            })

            .state('tab.comics', {
                url: '/comics',
                nativeTransitions: {
                    'type': 'fade'
                },
                views: {
                    'tab-comics': {
                        templateUrl: 'comics/tab-comics.jade',
                        controller: 'ComicsController as vm'
                    }
                }
            })
            .state('tab.comic-detail', {
                url: '/comics/:comicId',
                nativeTransitions: {
                    'type': 'slide',
                    'direction': 'up'
                },
                views: {
                    'tab-comics': {
                        templateUrl: 'comics/comic-detail.jade',
                        controller: 'ComicDetailController as vm'
                    }
                }
            })

            .state('tab.favourites', {
                url: '/favourites',
                nativeTransitions: {
                    'type': 'fade'
                },
                views: {
                    'tab-favourites': {
                        templateUrl: 'favourites/tab-favourites.jade',
                        controller: 'FavouritesController as vm'
                    }
                }
            })

            .state('tab.settings', {
                url: '/settings',
                nativeTransitions: {
                    'type': 'fade'
                },
                views: {
                    'tab-settings': {
                        templateUrl: 'settings/tab-settings.jade',
                        controller: 'SettingsController as vm'
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
        //$ionicConfigProvider.views.transition('none');
    }

    function ionicNativeTransitions($ionicNativeTransitionsProvider){
        $ionicNativeTransitionsProvider.setDefaultOptions({
            backInOppositeDirection: true
        });
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

