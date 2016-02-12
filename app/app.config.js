(function () {
    'use strict';

    angular
        .module('app')
        .config(appConfig)
        .config(routeConfig)
        .config(localStorageConfig)
        .config(ionicConfig)
        .config(httpInterceptors);

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
                templateUrl: 'common/layout/layout.jade'
            })

            // Each tab has its own nav history stack:

            .state('tab.characters', {
                url: '/characters',
                views: {
                    'tab-characters': {
                        templateUrl: 'characters/tab-characters.jade',
                        controller: 'CharactersController as vm'
                    }
                }
            })
            .state('tab.character-detail', {
                url: '/characters',
                params:{
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
                views: {
                    'tab-comics': {
                        templateUrl: 'comics/tab-comics.jade',
                        controller: 'ComicsController as vm'
                    }
                }
            })
            .state('tab.comic-detail', {
                url: '/comics/:comicId',
                views: {
                    'tab-comics': {
                        templateUrl: 'comics/comic-detail.jade',
                        controller: 'ComicDetailController as vm'
                    }
                }
            })

            .state('tab.favourites', {
                url: '/favourites',
                views: {
                    'tab-favourites': {
                        templateUrl: 'favourites/tab-favourites.jade',
                        controller: 'FavouritesController as vm'
                    }
                }
            })

            .state('tab.settings', {
                url: '/settings',
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
        // Default spinner
        $ionicConfigProvider.spinner.icon('dots');
    }

    // ! NOT USED FOR THE MOMENT !
    function httpInterceptors($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    }

})();

