(function () {
    'use strict';

    angular
        .module('app')
        .config(appConfig)
        .config(routeConfig)
        .config(localStorageConfig)
        .config(ionicConfig)
        .config(httpInterceptors)
        .config(inAppBrowserConfig);

    function appConfig($compileProvider) {
        // Remove angular debug info in DOM when compiling for production
        $compileProvider.debugInfoEnabled('@@env' === 'dev');
    }

    function routeConfig($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js

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

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/dash');

        console.debug('States defined');

    }

    // All keys in local storage will have prefix 'myald'.
    function localStorageConfig(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('li'); // learning-ionic
    }

    // Ionic defaults
    function ionicConfig($ionicConfigProvider) {
        // Enable native scrolling on browsers capable of handling it correctly.
        $ionicConfigProvider.scrolling.jsScrolling(ionic.Platform.isIOS() ? true : false);

        // Default spinner
        $ionicConfigProvider.spinner.icon('dots');
    }

    // ! NOT USED FOR THE MOMENT !
    function httpInterceptors() {
        // $httpProvider.interceptors.push('throwExceptionOnHttpError');
    }

    function inAppBrowserConfig($injector) {
        // $cordovaInAppBrowserProvider may not exist in web mode because there is no mock for this component in ngCordovaMocks.
        // NO time to create a proper mock for $cordovaInAppBrowser in web mode.
        // TODO fork ngCordovaMocks : add a proper mock.
        var $cordovaInAppBrowserProvider;
        try {
            $cordovaInAppBrowserProvider = $injector.get('$cordovaInAppBrowserProvider');
        }
        catch (err) {
            console.warn('$cordovaInAppBrowserProvider not configured because we are in web mode');
        }
        $cordovaInAppBrowserProvider && $cordovaInAppBrowserProvider.setDefaultOptions({
            'location': 'yes',
            'toolbar': 'yes'
        });

    }

})();

