(function(){
  'use strict';

  angular.module('app.booking')
  .controller('BookingMatchedController', BookingMatchedController);

  BookingMatchedController.$inject = ['$stateParams', 'bookingAdminDataService', 'bookingAdminService'];

  function BookingMatchedController($stateParams, bookingAdminDataService, bookingAdminService) {
    var matched = this;

    bookingAdminDataService.getBookingMatchedList($stateParams.id)
      .then(getMatchedListSuccess, null)
      .catch(errorCallback);

    function getMatchedListSuccess(list) {
      matched.list = list;
      console.log(list);
    }

    function errorCallback(errorMsg) {
      console.log('Error Message: ' + errorMsg);
    }

  }

})();