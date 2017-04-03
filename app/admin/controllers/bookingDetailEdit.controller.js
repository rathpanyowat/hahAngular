(function(){
  'use strict';

  angular.module('app.admin')
    .controller('AdminBookingDetailEditController', AdminBookingDetailEditController);

  AdminBookingDetailEditController.$inject = ['$state','$stateParams', 'bookingAdminDataService', 'bookingAdminService'];

  function AdminBookingDetailEditController($state, $stateParams, bookingAdminDataService, bookingAdminService) {
    var bookItem = this;

    bookItem.editFormSubmit = editFormSubmit;

    // Multiple datepicker's things
    bookItem.activeDate = null;
    bookItem.careDates = [];

    bookItem.clearSelectedDate = function(){
      bookItem.careDates = [];
    };

    getBookingItem();

    // Get individual booking detail
    function getBookingItem(){
      bookingAdminDataService.getBookingItem($stateParams.id)
        .then(getBookingItemSuccess)
        .catch(errorCallback);
    }

    function getBookingItemSuccess(item) {
      bookItem.id = item.id;
      bookItem.status = item.status;
      bookItem.statusClass = item.statusClass;
      bookItem.careTaker = item.careTaker;
      bookItem.careTakerAge = item.careTakerAge;
      bookItem.careTakerGender = item.careTakerGender;
      bookItem.diagnosis = item.diagnosis;
      bookItem.diagnosisOther = item.diagnosisOther;
      bookItem.underlyingDisease = item.underlyingDisease;
      bookItem.caregiverGender = item.caregiverGender;
      bookItem.skills = item.skills;
      bookItem.careDuration = item.careDuration;
      bookItem.careDateFirst = new Date(item.careDates[0]);
      bookItem.careTime = item.careTime;
      bookItem.note = item.note;
      bookItem.address = item.address;
      bookItem.bookingBy = item.bookingBy;
      bookItem.phoneNo = item.phoneNo;
      bookItem.email = item.email;
      bookItem.lineID = item.lineID;
    }

    function errorCallback(errorMsg) {
      console.log('Error Message: ' + errorMsg);
    }

    // Submit form
    function editFormSubmit() {

      // Preparing daya
      var book = {
        "id": bookItem.id,
        "bookingBy": bookItem.bookingBy,
        "phoneNo": bookItem.phoneNo,
        "lineID" : bookItem.lineID,
        "email" : bookItem.email,
        "careTaker": bookItem.careTaker,
        "careTakerAge": bookItem.careTakerAge,
        "careTakerGender" : bookItem.careTakerGender,
        "diagnosis": bookItem.diagnosis,
        "diagnosisOther": bookItem.diagnosisOther,
        "underlyingDisease": bookItem.underlyingDisease,
        "caregiverGender" : bookItem.caregiverGender,
        "skills": bookItem.skills,
        "careDuration" : bookItem.careDuration,
        "careDates" : bookItem.careDates,
        "careTime": bookItem.careTime,
        "address": bookItem.address,
        "note": bookItem.note
      };

      // The real submit
      bookingAdminDataService.editFormSubmit(bookItem)
        .then(function(){
          $state.go('admin.booking.detail', {id: bookItem.id});
        })
        .catch(function(){
          console.log('Please try again.');
        });
    }

  }

})();
