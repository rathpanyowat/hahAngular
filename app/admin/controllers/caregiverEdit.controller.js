(function(){
  'use strict';

  angular.module('app.admin')
    .controller('AdminCaregiverEditController', AdminCaregiverEditController);

  AdminCaregiverEditController.$inject = ['$state','$stateParams', '$rootScope', 'caregiversAdminDataService', 'caregiverAdminService', 'thaiLocationService'];

  function AdminCaregiverEditController($state, $stateParams, $rootScope, caregiversAdminDataService, caregiverAdminService, thaiLocationService) {
    var caregiver = this;

    caregiver.editCaregiver = editCaregiver;

    // Multiple datepicker's things
    caregiver.activeDate = null;
    caregiver.availables = [new Date().setHours(0, 0, 0, 0)];

    caregiver.clearSelectedDate = function(){
      caregiver.availables = [];
    };

    // Get provinces list for typeahead
    caregiver.provinces = thaiLocationService.getProvinces();

    // Because edit caregiver page can access from two page, dynamically change the back button to previous state.
    if ($rootScope.previousState_name === 'admin.booking.matched') {
      caregiver.backTarget = 'Matched Caregiver Page';
    } else {
      caregiver.backTarget = 'Caregiver Page';
    }

    getCaregiver();

    // Get individual caregiver for edit
    function getCaregiver() {
      caregiversAdminDataService.getCaregiverItem($stateParams.id)
        .then(getCaregiverSuccess)
        .catch(errorCallback);
    }

    function getCaregiverSuccess(caregiverData){

      caregiver.id = caregiverData.id;
      caregiver.created = caregiverData.created;
      caregiver.firstName = caregiverData.firstName;
      caregiver.lastName = caregiverData.lastName;
      caregiver.nickName = caregiverData.nickName;
      caregiver.age = caregiverData.age;
      caregiver.gender = caregiverData.gender;
      caregiver.phone = caregiverData.phone;
      caregiver.lineID = caregiverData.lineID;
      caregiver.email = caregiverData.email;
      caregiver.address = caregiverData.address;
      caregiver.homeTown = caregiverData.homeTown;
      caregiver.DOB = new Date(caregiverData.DOB);
      caregiver.imageUrl = caregiverData.imageUrl;
      caregiver.desc = caregiverData.desc;
      caregiver.years = caregiverData.years;
      caregiver.education = caregiverData.education;
      caregiver.wantedCare = caregiverData.wantedCare;
      caregiver.skills = caregiverData.skills;
      caregiver.experience = caregiverData.experience;
      caregiver.availables = caregiverData.availables;
      caregiver.pricing = caregiverData.pricing;

    }

    function errorCallback(errorMsg) {
      console.log('Error Message: ' + errorMsg);
    }

    // Function for submitting
    function editCaregiver(){

      // Preparing data
      var caregiverItem = {
        'id' : caregiver.id,
        'firstName' : caregiver.firstName,
        'lastName' : caregiver.lastName,
        'nickName' : caregiver.nickName,
        'age' : caregiver.age,
        'gender' : caregiver.gender,
        'phone' : caregiver.phone,
        'lineID': caregiver.lineID,
        'email': caregiver.email,
        'address' : caregiver.address,
        'homeTown' : caregiver.homeTown,
        'DOB' : caregiver.DOB,
        'imageUrl' : caregiver.imageUrl,
        'desc' : caregiver.desc,
        'years' : caregiver.years,
        'education' : caregiver.education,
        'wantedCare' : caregiver.wantedCare,
        'skills' : caregiver.skills,
        'experience' : caregiver.experience,
        'availables' : caregiver.availables,
        'pricing' : caregiver.pricing
      };

      // The real submit
      caregiversAdminDataService.editCaregiver(caregiverItem)
        .then(function(){
            $rootScope.goBack();
        })
        .catch(function(){
            console.log('Please try again.');
        });
    }

  }

})();
