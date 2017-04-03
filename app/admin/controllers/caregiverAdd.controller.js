(function(){
  'use strict';

  angular.module('app.admin')
    .controller('AdminCaregiverAddController', AdminCaregiverAddController);

  AdminCaregiverAddController.$inject = ['$state','$stateParams', '$rootScope', 'caregiversAdminDataService', 'caregiverAdminService', 'thaiLocationService'];

  function AdminCaregiverAddController($state, $stateParams, $rootScope, caregiversAdminDataService, caregiverAdminService, thaiLocationService) {
    var caregiver = this;

    caregiver.addCaregiver = addCaregiver;

    // Multiple datepicker's things
    caregiver.activeDate = null;
    caregiver.availables = [];

    caregiver.clearSelectedDate = function(){
      caregiver.availables = [];
    };

    // Get provinces list for typeahead
    caregiver.provinces = thaiLocationService.getProvinces();


    // Because edit caregiver page can access from two page, dynamically change the back button to previous state.
    // the add and edit caregiver use the same directive, so I need to have this code in this controller too.
    if ($rootScope.previousState_name === 'admin.booking.matched') {
      caregiver.backTarget = 'Matched Caregiver Page';
    } else {
      caregiver.backTarget = 'Caregiver Page';
    }

    // Function for submitting
    function addCaregiver(){

      // Preparing data
      var caregiverItem = {
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
      caregiversAdminDataService.addCaregiver(caregiverItem)
        .then(function(){
            $rootScope.goBack();
        })
        .catch(function(){
            console.log('Please try again.');
        });
    }

  }

})();
