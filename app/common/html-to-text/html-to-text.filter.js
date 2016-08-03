(function () {
    'use strict';

    angular
        .module('app')
        .filter('html2text', html2text);

    // Angular filter that can be used everywhere filter are allowed like in ng-repeat directives.
    // Will remove all html tags from a text. 
    function html2text() {
        return filter;

        ////////////////

        function filter(text) {
            return  text ? String(text).replace(/<[^>]+>/gm, '').trim() : '';
        }
    }

})();

