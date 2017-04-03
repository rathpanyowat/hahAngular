(function(){
  'use strict';

  angular.module('app.booking')
  .controller('BookingController', BookingController);

  BookingController.$inject = ['$state', 'thaiLocationService', 'bookingService'];

  function BookingController($state, thaiLocationService, bookingService) {
    var booking = this;

    booking.bookingBy = null;
    booking.phoneNo = null;
    booking.lineID = null;
    booking.email = null;
    booking.careTaker = null;
    booking.careTakerAge = null;
    booking.careTakerGender = null;
    booking.diagnosis = null;
    booking.diagnosisOther = null;
    booking.underlyingDisease = null;
    booking.caregiverGender = null;
    booking.skills = null;
    booking.careDateFirst = null;
    booking.careDates =[];
    booking.careTime = null;
    booking.address = null;
    booking.note = null;

    // Get provinces list for typeahead
    booking.provinces = thaiLocationService.getProvinces();

    // Submit the form
    booking.bookingFormSubmit = function() {

      // Preparing data
      var book = {
        "bookingBy": booking.bookingBy,
        "phoneNo": booking.phoneNo,
        "lineID" : booking.lineID,
        "email" : booking.email,
        "careTaker": booking.careTaker,
        "careTakerAge": booking.careTakerAge,
        "careTakerGender" : booking.careTakerGender,
        "diagnosis": booking.diagnosis,
        "diagnosisOther": booking.diagnosisOther,
        "underlyingDisease": booking.underlyingDisease,
        "caregiverGender" : booking.caregiverGender,
        "skills": booking.skills,
        "careDates" : booking.careDates,
        "careTime": booking.careTime,
        "address": booking.address,
        "note": booking.note
      };

      // The real submit
      bookingService.bookingFormSubmit(book)
        .then(function(){
          $state.go('success');
        })
        .catch(function(){
          console.log('Please try again.');
        });
    };
  }

})();