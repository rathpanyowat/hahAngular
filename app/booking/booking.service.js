(function(){
  'use strict';

  angular
    .module('app.booking')
    .factory('bookingService', bookingService);

  bookingService.$inject = ['$http', '$q', '$timeout'];

  function bookingService($http, $q, $timeout) {
    var service = {
      bookingFormSubmit: bookingFormSubmit
    };

    return service;

    //////////

    function bookingFormSubmit(book) {

      console.log('Submitted');
      console.log(book);
      var deferred = $q.defer();
      $timeout(function(){
        deferred.resolve('success');
      }, 500);

      return deferred.promise;
    }


  }

})();
