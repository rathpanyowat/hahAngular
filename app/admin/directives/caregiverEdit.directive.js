(function(){
  'use strict';

  angular
    .module('app.admin')
    .directive('caregiverEdit', caregiverEdit);

  function caregiverEdit(){
    return {
      restrict: 'EA',
      templateUrl: 'app/admin/views/caregiverEdit.directive.html',
      scope: {
        title: '@',
        caregiver: '=',
        submit: '&',
      }
    };
  }

})();