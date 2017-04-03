(function(){
  'use strict';

  angular
    .module('app.layout')
    .directive('hahSidebar', hahSidebar);

  hahSidebar.$inject = ['$window'];

  function hahSidebar($window) {
    return {
      restrict: 'E',
      templateUrl: 'app/layout/sidebar.html',
      replace: true,
      link: link
    };

    function link(scope, elem, attrs) {

      // The main purpose of this function is to control sidebar show and hide based on sidebar items clicked

      var sidebarNavItems = angular.element(document.getElementsByClassName('sidebar-item'));
      var wrapper = angular.element(document.getElementById('wrapper'));
      var overlay = angular.element(document.querySelector('.overlay'));

      function createSidebarCollapse() {
        if ($window.innerWidth <= 768) {
          sidebarNavItems.on('click', function (e) {
            sidebarHide();
            showOverlay();
          });
        }
      }

      createSidebarCollapse();

      function sidebarHide() {
        wrapper.toggleClass('sidebar-pin');
      }

      function showOverlay() {
        overlay.toggleClass('show-overlay');
      }


      // Delay function for prevent windows resize fire too often
      var delay = (function(){
        var timer = 0;
        return function(callback, ms){
          clearTimeout (timer);
          timer = setTimeout(callback, ms);
        };
      })();

      // This function is for reset the sidebar show/hide when resizing browser window
      angular.element($window).bind('resize', function(){
        delay(function(){
          sidebarNavItems.off('click');
          createSidebarCollapse();
          scope.$digest();
          if ($window.innerWidth <= 768) {
            wrapper.removeClass('sidebar-pin');
            overlay.removeClass('show-overlay');
          }
        }, 300);

      });

    }
  }


})();