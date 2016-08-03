(function () {
    'use strict';

    angular
        .module('app')
        .directive('scrollTop', scrollTopDirective);

    // Allow to go to the top by clicking the page title. Put it once in your dom.
    // Scroll will be animated if inferior to a certain distance.
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
                    scope.$applyAsync(scrollTop);
            }
        }

        function scrollTop(){
            var offset = $ionicScrollDelegate.getScrollPosition();
            $ionicScrollDelegate.scrollTop(offset.top > 3000 ? false : true);
        }

    }

})();

