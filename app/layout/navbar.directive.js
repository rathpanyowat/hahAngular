(function(){
  'use strict';

  angular
    .module('app.layout')
    .directive('hahNavbar', hahNavbar);

  function hahNavbar() {
    return {
      restrict: 'E',
      templateUrl: 'app/layout/navbar.html',
      replace: true,
      scope: {
        navbarType: '@'
      },
      controller: navbarController,
      controllerAs: 'navbar',
      bindToController: true,
      link: link
    };

    function link(scope, elem, attrs) {

      // The main purpose of this function is to control sidebar show and hide based on nav-icon clicked

      var wrapper = angular.element(document.getElementById('wrapper'));
      var overlay = angular.element(document.querySelector('.overlay'));

      angular.element(document.querySelectorAll('[data-toggle="menubar"]')).on('click', function (e) {
        sidebarHide();
        showOverlay();
      });

      function sidebarHide() {
        wrapper.toggleClass('sidebar-pin');
      }

      function showOverlay() {
        overlay.toggleClass('show-overlay');
      }

    }

    // Directive's controller
    navbarController.$inject = ['$window', '$scope', '$state', 'authService'];

    function navbarController($window, $scope, $state, authService){
      var navbar = this;
      navbar.isAdminPage = (navbar.navbarType === 'admin');
      navbar.windowWidth = $window.innerWidth;
      navbar.isCollapsed = checkCollapse(navbar.windowWidth);

      navbar.logout = logout;

      function logout() {
        authService.logout()
          .then(function(){
            $state.go('landing');
          })
          .catch(function(error){
            console.log(error);
          });
      }

      function checkCollapse(width) {
        if (width <= 768) return true;
        return false;
      }

      // Delay function for prevent windows resize fire too often
      var delay = (function(){
        var timer = 0;
        return function(callback, ms){
          clearTimeout (timer);
          timer = setTimeout(callback, ms);
        };
      })();

      angular.element($window).bind('resize', function(){
        delay(function(){
          navbar.windowWidth = $window.innerWidth;
          navbar.isCollapsed = checkCollapse(navbar.windowWidth);
          $scope.$digest();
        }, 300);
      });

    }


  }


})();