(function () {
    'use strict';

    angular
        .module('app')
        .directive('jdSrc', jdSrc);

    // Directive that preload an image in memory and then set the `src` attribute. 
    // The objective is normally to avoid the usual web effect with images which is a partial loading from top to bottom. 
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
                }, 0, false);
            }
        }
    }

})();

