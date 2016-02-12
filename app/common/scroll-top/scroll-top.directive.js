(function () {
    'use strict';

    angular
        .module('app')
        .directive('scrollTop', scrollTopDirective);

    function scrollTopDirective($ionicScrollDelegate) {

        var directive = {
            link: link,
            restrict: 'E',
            scope: {}
        };
        return directive;

        ////////////

        function link(scope) {
            $('ion-nav-bar').on('click', '.title', function(){
                scope.$apply(scrollTop);
            });
        }

        function scrollTop(){
            var offset = $ionicScrollDelegate.getScrollPosition();
            $ionicScrollDelegate.scrollTop(offset.top > 3000 ? false : true);
        }

    }

})();

