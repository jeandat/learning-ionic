(function () {
    'use strict';
    angular.module('app', [
        'ionic',
        'templates',
        '@@ngCordovaModuleName',
        'LocalStorageModule',
        'angular-cache',
        'restangular',
        'ImgCache',
        'firebase'
    ]);
})();
