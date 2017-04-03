(function(){
  'use strict';

  angular
    .module('app.admin')
    .factory('caregiverAdminService', caregiverAdminService);

  caregiverAdminService.$inject = [];

  function caregiverAdminService() {

    var service = {
      caregiverDicForList: caregiverDicForList,
      caregiverDic: caregiverDic,
      convertDate: convertDate
    };

    return service;

    /////////////////

    // For transform data before sending to caregivers list page
    function caregiverDicForList(caregiver) {
      var caregiverModified = caregiver;

      convertDate(caregiverModified);
      convertGender(caregiverModified);
      convertAvailables(caregiverModified);

      return caregiverModified;
    }

    // For transform data before sending to individual caregiver page
    function caregiverDic(caregiver) {

      var caregiverModified = caregiver;

      convertDate(caregiverModified);
      convertAvailables(caregiverModified);

      return caregiverModified;
    }

    // These are function for convert each type of data
    function convertDate(caregiver) {
      caregiver.created = new Date(caregiver.created).getTime();
      caregiver.DOB = new Date(caregiver.DOB).getTime();
      return caregiver;
    }

    function convertGender(caregiver) {
      var genderDic = ['หญิง', 'ชาย'];
      caregiver.gender = genderDic[caregiver.gender - 1];
      return caregiver;
    }

    function convertAvailables(caregiver) {
      caregiver.availables = caregiver.availables.map(function(date){
        return new Date(date).getTime();
      });
      return caregiver;
    }

  }

})();
