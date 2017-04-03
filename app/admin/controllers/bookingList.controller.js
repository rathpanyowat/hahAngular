(function(){
  'use strict';

  angular.module('app.admin')
    .controller('AdminBookingController', AdminBookingController);

  AdminBookingController.$inject = ['bookingAdminDataService', 'bookingAdminService'];

  function AdminBookingController(bookingAdminDataService, bookingAdminService) {
    var bookList = this;

    bookList.filterType = "";
    bookList.filterOption = filterOption;
    bookList.changeStatus = changeStatus;

    getBookingList();

    // Get booking list
    function getBookingList(){
      bookingAdminDataService.getBookingList()
        .then(getBookingListSuccess, null)
        .catch(errorCallback);
    }

    function getBookingListSuccess(list) {
      bookList.list = list;
      console.log(bookList.list);
    }

    function errorCallback(errorMsg) {
      console.log('Error Message: ' + errorMsg);
    }

    // Set status to filter
    function filterOption(choice){
      bookList.filterType = { status: choice };
    }

    // Change booking status
    function changeStatus(booking, choice){
      booking.status = choice;
      bookingAdminService.convertStatus(booking);
      bookingAdminDataService.changeBookingStatus(booking);
    }

  }

})();
