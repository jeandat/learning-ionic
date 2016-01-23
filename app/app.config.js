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
        $compileProvider.debugInfoEnabled('@@env' === 'dev');
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

            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'dash/tab-dash.jade',
                        controller: 'DashController',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'chats/tab-chats.jade',
                        controller: 'ChatsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'chats/chat-detail.jade',
                        controller: 'ChatDetailController',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'account/tab-account.jade',
                        controller: 'AccountController',
                        controllerAs: 'vm'
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
        // Enable native scrolling on browsers capable of handling it correctly.
        // $ionicConfigProvider.scrolling.jsScrolling(ionic.Platform.isIOS() ? true : false);

        // Default spinner
        $ionicConfigProvider.spinner.icon('dots');
    }

    // ! NOT USED FOR THE MOMENT !
    function httpInterceptors() {
        // $httpProvider.interceptors.push('throwExceptionOnHttpError');
    }

})();

