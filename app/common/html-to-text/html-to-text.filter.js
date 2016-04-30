(function () {
    'use strict';

    angular
        .module('app')
        .filter('html2text', html2text);

    function html2text() {
        return filter;

        ////////////////

        function filter(text) {
            return  text ? String(text).replace(/<[^>]+>/gm, '').trim() : '';
        }
    }

})();

