(function () {
    'use strict';

    angular
        .module('app')
        .directive('hideContent', ddf);

    // Directive that will hide content from its container depending on the expression value.
    function ddf() {

        var directive = {
            link: link,
            restrict: 'A'
        };

        return directive;

        /////////////////

        function link(scope, element, attrs) {
            attrs.$observe('hideContent', hideOrRevealContent);
            ///////////
            function hideOrRevealContent(shouldHide){
                shouldHide = shouldHide === 'true' ? true : false;
                var el = element[0].querySelector('.scroll');
                var scrollHeight = shouldHide ? el.scrollHeight : 0;
                var translateValue = 'translate3d(0,-' + scrollHeight + 'px,0)';
                el.style.transform = translateValue;
            }
        }
    }

})();

