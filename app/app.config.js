(function () {
    'use strict';

    angular
        .module('app')
        .config(appConfig)
        .config(routeConfig);

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
                templateUrl: 'tabs.jade'
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

    }

})();

