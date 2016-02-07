(function () {
    'use strict';

    angular
        .module('app')
        .directive('jdSrc', jdSrc);

    function jdSrc() {

        var directive = {
            link: link,
            restrict: 'A'
        };

        return directive;

        ///////////////

        function link(scope, element, attrs) {
            var src = attrs.jdSrc;
            var img = new Image();
            img.onload = updateSource();
            img.src = src;

            //////////////

            function updateSource(){
                element.attr('src', src);
            }
        }
    }

})();

