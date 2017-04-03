(function () {
  'use strict';

  angular
    .module('app.admin')
    .factory('caregiversAdminDataService', caregiversAdminDataService);

  caregiversAdminDataService.$inject = ['$http', '$q', '$timeout', 'caregiverAdminService'];

  function caregiversAdminDataService($http, $q, $timeout, caregiverAdminService) {
    var service = {
      getCaregiversList: getCaregiversList,
      searchByName: searchByName,
      getCaregiverItem: getCaregiverItem,
      addCaregiver: addCaregiver,
      editCaregiver: editCaregiver
    };

    return service;

    /////////////////

    // For caregivers list page
    function getCaregiversList() {
      return $http.get('data/caregiversData.json',{
        transformResponse: transformCaregiversList
      })
      .then(sendResponseData)
      .catch(sendGetCaregiversError);
    }

    function transformCaregiversList(data) {
      var transformed = angular.fromJson(data);
      return transformed.map(function(caregiver){
        return caregiverAdminService.caregiverDicForList(caregiver);
      });
    }

    // For individual caregiver page
    function getCaregiverItem(id) {
      var url = 'data/caregiverDetailData-' + id + '.json';
      return $http.get(url, {
        transformResponse: transformCaregiverItem
      })
      .then(sendResponseData)
      .catch(sendGetCaregiversError);
    }

    function transformCaregiverItem(data) {
      var caregiver = angular.fromJson(data);
      caregiver = caregiverAdminService.caregiverDic(caregiver);
      return caregiver;
    }

    // Sending data back and error handling
    function sendResponseData(response) {
      return $q.resolve(response.data);
    }

    function sendGetCaregiversError(response) {
      return $q.reject('Error retrieving booking list. (HTTP status: ' + response.status + ')');
    }

    // In caregivers list page, there's a search function
    function searchByName(name) {
      console.log('Searching for...' + name);

      var deferred = $q.defer();
      $timeout(function(){
        deferred.resolve('success');
      }, 500);

      return deferred.promise;
    }

    // In add caregiver page
    function addCaregiver(caregiver){
      console.log('Added');
      console.log(caregiver);

      var deferred = $q.defer();
      $timeout(function(){
        deferred.resolve('success');
      }, 500);

      return deferred.promise;
    }

    // In edit caregiver page
    function editCaregiver(caregiver) {
      console.log('Edited');
      console.log(caregiver);

      var deferred = $q.defer();
      $timeout(function(){
        deferred.resolve('success');
      }, 500);

      return deferred.promise;
    }

  }
})();
