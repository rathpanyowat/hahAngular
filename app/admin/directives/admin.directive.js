(function(){
  'use strict';

  angular
    .module('app.admin')
    .directive('pageResize', pageResize);

  function pageResize($window){
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, ele, attrs){

      // for changeing the height of browser window based on browser size
      var topOffset = 64;
      var height = $window.innerHeight - topOffset - 1;

      if (height < 1) height = 1;
      if (height > topOffset) {
        angular.element(document.getElementById('page-wrapper')).css('min-height', (height) + 'px');
      }
    }

  }

})();