(function(){
  'use strict';

  angular.module('app.auth')
    .directive('hahAuthForm', hahAuthForm);


  function hahAuthForm() {
    return {
      templateUrl: 'app/auth/authForm.html',
      restrict: 'E',
      controller: AuthFormController,
      controllerAs: 'auth',
      bindToController: true,
      scope: {
        error: '=',
        formTitle: '@',
        submitTitle: '@',
        submitAction: '&'
      }
    };
  }

  function AuthFormController(){
    var auth = this;

    auth.user = {
      email: '',
      password: ''
    };
  }

})();