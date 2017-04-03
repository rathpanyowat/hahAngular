(function(){
  'use strict';

  angular.module('app.auth')
    .factory('authService', authService);

  authService.$service = ['$q', '$timeout'];

  function authService($q, $timeout){

    var service = {
      register: register,
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn
    };

    return service;

    //////////

    function register(user){
      console.log('Registered');
      var deferred = $q.defer();

      $timeout(function(){
        deferred.resolve('success');
      },200);

      return deferred.promise;
    }

    function login(user) {
      console.log('Logged in');
      var deferred = $q.defer();

      $timeout(function(){
        deferred.resolve('success');
      },200);

      return deferred.promise;
    }

    function logout() {
      console.log('Logged out');
      var deferred = $q.defer();

      $timeout(function(){
        deferred.resolve('success');
      },200);

      return deferred.promise;
    }

    function isLoggedIn() {
      return null;
    }

  }

})();