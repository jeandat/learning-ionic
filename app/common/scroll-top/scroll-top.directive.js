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
            var navBar = document.getElementsByTagName('ion-nav-bar')[0];
            navBar.addEventListener('click', onClick, true);
            //////////
            function onClick(event){
                if(event.target.classList.contains('title'))
                    scope.$apply(scrollTop);
            }
        }

        function scrollTop(){
            var offset = $ionicScrollDelegate.getScrollPosition();
            $ionicScrollDelegate.scrollTop(offset.top > 3000 ? false : true);
        }

    }

})();

