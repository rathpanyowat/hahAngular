(function(){
  'use strict';

  angular.module('app.admin')
    .controller('AdminBookingMatchedController', AdminBookingMatchedController);

  AdminBookingMatchedController.$inject = ['$stateParams', 'bookingAdminDataService', 'bookingAdminService'];

  function AdminBookingMatchedController($stateParams, bookingAdminDataService, bookingAdminService) {
    var matched = this;

    matched.changeStatus = changeStatus;
    matched.changeCaregiverStatus = changeCaregiverStatus;
    matched.resendSMS = resendSMS;

    getMatchedList();

    // Get list of matched caregiver and related information
    function getMatchedList() {
      bookingAdminDataService.getBookingMatchedList($stateParams.id)
        .then(getMatchedListSuccess, null)
        .catch(errorCallback);
    }

    function getMatchedListSuccess(list) {
      matched.list = list;
      console.log(list);
    }

    function errorCallback(errorMsg) {
      console.log('Error Message: ' + errorMsg);
    }

    // Change status of the booking
    function changeStatus(booking, choice){
      booking.status = choice;
      bookingAdminService.convertStatus(booking);
      bookingAdminDataService.changeBookingStatus(booking);
    }

    // Change status of the caregiver
    function changeCaregiverStatus(caregiver, choice) {
      caregiver.status = choice;
      bookingAdminService.convertCaregiverStatus(caregiver);
      bookingAdminDataService.changeCaregiverStatus(caregiver);
    }

    // Resend SMS
    function resendSMS(caregiver) {
      bookingAdminDataService.resendSMS(caregiver);
    }

  }

})();
