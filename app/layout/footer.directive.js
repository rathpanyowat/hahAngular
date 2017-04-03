(function(){
  'use strict';

  angular
    .module('app.layout')
    .directive('hahFooter', hahFooter);

  function hahFooter() {
    return {
      restrict: 'E',
      templateUrl: 'app/layout/footer.html',
      replace: true,
    };

  }

})();