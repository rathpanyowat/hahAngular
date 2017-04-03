(function () {
  'use strict';

  angular
    .module('app.admin')
    .factory('bookingAdminDataService', bookingAdminDataService);

  bookingAdminDataService.$inject = ['$http', '$q', '$timeout', 'bookingAdminService'];

  function bookingAdminDataService($http, $q, $timeout, bookingAdminService) {
    var service = {
      getBookingList: getBookingList,
      getBookingItem: getBookingItem,
      getBookingItemForDisplay: getBookingItemForDisplay,
      getBookingMatchedList: getBookingMatchedList,
      changeBookingStatus: changeBookingStatus,
      editFormSubmit: editFormSubmit,
      changeCaregiverStatus: changeCaregiverStatus,
      resendSMS: resendSMS
    };

    return service;

    /////////////////

    // For booking list page
    function getBookingList() {
      return $http.get('data/bookingData.json',{
        transformResponse: transformBookingList
      })
      .then(sendResponseData)
      .catch(sendGetBookingError);
    }

    // For individual booking detail page
    // Because some displayed data is different from the editing page
    function getBookingItemForDisplay(id) {
      var url = 'data/bookingDetailData-' + id + '.json';
      return $http.get(url, {
        transformResponse: transformBookingItemForDisplay
      })
      .then(sendResponseData)
      .catch(sendGetBookingError);
    }

    // For individual booking detail edit page
    function getBookingItem(id) {
      var url = 'data/bookingDetailData-' + id + '.json';
      return $http.get(url, {
        transformResponse: transformBookingItem
      })
      .then(sendResponseData)
      .catch(sendGetBookingError);
    }

    // For matching result page
    function getBookingMatchedList(id) {
      var url = 'data/bookingMatchedData-'  + id + '.json';
      return $http.get(url, {
        transformResponse: transformMatchedList
      })
      .then(sendResponseData)
      .catch(sendGetBookingError);
    }

    // These for sending data and error handling
    function sendResponseData(response) {
      return $q.resolve(response.data);
    }

    function sendGetBookingError(response) {
      return $q.reject('Error retrieving booking list. (HTTP status: ' + response.status + ')');
    }


    // Transform function for booking list page
    function transformBookingList(data) {
      var transformed = angular.fromJson(data);
      return transformed.map(function(booking){
        return bookingAdminService.bookingDic(booking);
      });
    }

    // Transform function for individual booking detail page
    function transformBookingItemForDisplay(data) {
      var booking = angular.fromJson(data);
      booking = bookingAdminService.bookingDic(booking);
      return booking;
    }

    // Transform function for edit booking page
    function transformBookingItem(data) {
      var booking = angular.fromJson(data);
      booking = bookingAdminService.convertStatus(booking);
      booking = bookingAdminService.convertDate(booking, 'created');
      booking = bookingAdminService.convertCareDates(booking);
      return booking;
    }

    // Transform function for matching result page
    function transformMatchedList(data) {
      var list = angular.fromJson(data);
      list = bookingAdminService.matchedDic(list);
      return list;
    }


    // For changing booking status
    function changeBookingStatus(booking){
      console.log('Booking status of ' + booking.id + ' changed to: ' + booking.status);
    }

    // For submit in booking detail edit page
    function editFormSubmit(bookItem) {
      console.log(bookItem);

      var deferred = $q.defer();
      $timeout(function(){
        deferred.resolve('success');
      }, 500);

      return deferred.promise;
    }

    // For changing caregiver status (call from matching result page)
    function changeCaregiverStatus(caregiver) {
      console.log('Caregiver staus of ' + caregiver.id + ' changed to: ' + caregiver.status);
    }

    // For sending SMS
    function resendSMS(caregiver) {
      caregiver.SMS = new Date();
      console.log('Resended SMS to ' + caregiver.phone + ' at ' + caregiver.SMS.toTimeString());
      return caregiver;
    }

  }
})();
