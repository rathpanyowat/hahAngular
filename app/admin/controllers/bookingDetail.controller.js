(function(){
  'use strict';

  angular.module('app.admin')
    .controller('AdminBookingDetailController', AdminBookingDetailController);

  AdminBookingDetailController.$inject = ['$stateParams', 'bookingAdminDataService', 'bookingAdminService'];

  function AdminBookingDetailController($stateParams, bookingAdminDataService, bookingAdminService) {
    var bookItem = this;

    bookItem.changeStatus = changeStatus;

    getBookingItem();

    // Get individual booking detail
    function getBookingItem(){
      bookingAdminDataService.getBookingItemForDisplay($stateParams.id)
        .then(getBookingItemSuccess, null)
        .catch(errorCallback);
    }

    function getBookingItemSuccess(item) {
      bookItem.detail = item;
      console.log(bookItem.detail);
    }

    function errorCallback(errorMsg) {
      console.log('Error Message: ' + errorMsg);
    }

    // change booking status
    function changeStatus(book, choice){
      bookItem.detail.status = choice;
      bookingAdminService.convertStatus(book);
      bookingAdminDataService.changeBookingStatus(book);
    }

  }

})();
