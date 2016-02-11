(function () {
    'use strict';

    angular
        .module('app')
        .directive('jdSrc', jdSrc);

    function jdSrc($timeout) {

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
                $timeout(function(){
                    element.attr('src', src);
                }, 0);
            }
        }
    }

})();

