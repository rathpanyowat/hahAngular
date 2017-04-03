(function(){
  'use strict';

  angular.module('app.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$state', 'authService'];

  function AuthController($state, authService){
    var auth = this;

    auth.error = null;
    auth.register = register;
    auth.login = login;

    function register(user){
      return authService.register(user)
        .then(function(){
          return auth.login(user);
        })
        .catch(function(error){
          auth.error = error;
        });
    }

    function login(user) {
      return authService.login(user)
        .then(function(user){
          $state.go('admin');
        })
        .catch(function(error){
          auth.error = error;
        });
    }

  }


})();