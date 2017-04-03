(function(){
  'use strict';

  angular.module('app.admin')
    .controller('AdminCaregiversController', AdminCaregiversController);

  AdminCaregiversController.$inject = ['caregiversAdminDataService'];

  function AdminCaregiversController(caregiversAdminDataService) {
    var caregivers = this;

    caregivers.nameSearch = null;
    caregivers.searchByName = searchByName;
    caregivers.resetSearch = resetSearch;

    getCaregiverList();

    function getCaregiverList(){
      caregiversAdminDataService.getCaregiversList()
        .then(getCaregiverListSuccess, null)
        .catch(errorCallback);
    }

    function getCaregiverListSuccess(list) {
      caregivers.list = list;
    }

    function errorCallback(errorMsg) {
      console.log('Error Message: ' + errorMsg);
    }

    function searchByName(name){
      if (name) {
        caregiversAdminDataService.searchByName(name)
          .then(function(data){
            console.log('Search success');
          })
          .catch(function(errMsg){
            console.log(errMsg);
          });
      }
    }

    function resetSearch(){
      console.log('Reseted list');
      getCaregiverList();
    }

  }

})();
