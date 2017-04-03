(function(){
  'use strict';

  angular
    .module('app.admin')
    .factory('bookingAdminService', bookingAdminService);

  bookingAdminService.$inject = [];

  function bookingAdminService() {

    var service = {
      bookingDic: bookingDic,
      matchedDic: matchedDic,
      convertDate: convertDate,
      convertCareDates: convertCareDates,
      convertStatus: convertStatus,
      convertCaregiverStatus: convertCaregiverStatus
    };

    return service;

    /////////////////

    // For booking list page
    function bookingDic(booking) {

      var bookingModified = booking;

      convertDate(bookingModified, 'created');
      convertDate(bookingModified, 'expired');
      convertCareTaker(bookingModified);
      convertStatus(bookingModified);
      convertCareTakerGender(bookingModified);
      convertCaregiverGender(bookingModified);
      convertSkills(bookingModified);
      convertCareDates(bookingModified);

      return bookingModified;
    }

    // For matching result page
    function matchedDic(list) {
      var listModified = list;

      listModified.booking = convertDate(listModified.booking, 'created');
      listModified.booking = convertDate(listModified.booking, 'expired');
      listModified.booking = convertStatus(listModified.booking);
      listModified.caregivers = listModified.caregivers.map(function(item){
        return convertDate(item, 'SMS');
      });
      listModified.caregivers = listModified.caregivers.map(function(item){
        return convertEducation(item);
      });
      listModified.caregivers = listModified.caregivers.map(function(item){
        return convertCaregiverStatus(item);
      });
      return listModified;
    }

    // These function for converting individual data
    function convertDate(booking, prop) {
      booking[prop] = new Date(booking[prop]).getTime();
      return booking;
    }

    function convertCareTaker(booking) {
      var careTakerDic = ['ตนเอง', 'บิดามารดา', 'ปู่ยาตายาย', 'ญาติ', 'เพื่อน'];
      booking.careTaker = careTakerDic[booking.careTaker];
      return booking;
    }

    function convertCareTakerGender(booking) {
      var careTakerGenderDic = ['ชาย', 'หญิง'];
      booking.careTakerGender = careTakerGenderDic[booking.careTakerGender - 1];
      return booking;
    }

    function convertCaregiverGender(booking){
      var caregiverGenderDic = ['ไม่ระบุ', 'หญิง', 'ชาย'];
      booking.caregiverGender = caregiverGenderDic[booking.caregiverGender];
      return booking;
    }

    function convertSkills(booking) {
      var text = "";
      if (booking.skills.ADL) text += 'ADL, ';
      if (booking.skills.bedRidden) text += 'Bed-Ridden, ';
      if (booking.skills.tracheostomy) text += 'Tracheostomy, ';
      if (booking.skills.tubeFeeding) text += 'Tube Feeding, ';
      if (booking.skills.CAPD) text += 'CAPD, ';
      if (booking.skills.pressureSore) text += 'Pressure Sore, ';

      booking.skills = text;
      return booking;
    }

    function convertCareDates(booking) {
      booking.careDates = booking.careDates.map(function(date){
        return new Date(date).getTime();
      });
      return booking;
    }

    function convertStatus(booking) {
      var statusClassDic = ['warning', 'info', 'success', 'danger'];
      var statusDic = ['New', 'Called', 'Sent List', 'Finished', 'Overtime', 'Canceled'];

      if (booking.status === 0) booking.statusClass = statusClassDic[0];
      if (booking.status === 1 || booking.status === 2) booking.statusClass = statusClassDic[1];
      if (booking.status === 3) booking.statusClass = statusClassDic[2];
      if (booking.status === 4 || booking.status === 5) booking.statusClass = statusClassDic[3];

      booking.status = statusDic[booking.status];
      return booking;
    }

    function convertEducation(caregiver) {
      var educationDic = ['พนักงานช่วยเหลือผู้ป่วย', 'ผู้ช่วยพยาบาล', 'พยาบาล'];
      if (caregiver.education === 'NA') caregiver.education = educationDic[0];
      if (caregiver.education === 'PN') caregiver.education = educationDic[1];
      if (caregiver.education === 'RN') caregiver.education = educationDic[2];
      return caregiver;
    }

    function convertCaregiverStatus(caregiver) {
      var statusClassDic = ['warning', 'info', 'success', 'danger'];
      var statusDic = ['Confirmed', 'Waiting', 'Rejected'];

      if (caregiver.status === 0) caregiver.statusClass = statusClassDic[2];
      if (caregiver.status === 1) caregiver.statusClass = statusClassDic[0];
      if (caregiver.status === 2) caregiver.statusClass = statusClassDic[3];

      caregiver.status = statusDic[caregiver.status];
      return caregiver;
    }

  }

})();
