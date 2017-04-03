(function(){
  'use strict';

  angular
    .module('app.core')
    .config(configFunction);

  configFunction.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configFunction($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: 'app/landing/landing.html',
        controller: 'LandingController',
        controllerAs: 'landing'
      })
      .state('booking', {
        url: '/booking',
        templateUrl: 'app/booking/booking.html',
        controller: 'BookingController',
        controllerAs: 'booking'
      })
      .state('success', {
        url: '/booking/success',
        templateUrl: 'app/booking/booking-success.html'
      })
      .state('matched', {
        url: '/matched/:id',
        templateUrl: 'app/booking/matched.html',
        controller: 'BookingMatchedController',
        controllerAs: 'matched'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/auth/login.html',
        controller: 'AuthController',
        controllerAs: 'auth'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/auth/register.html',
        controller: 'AuthController',
        controllerAs: 'auth'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/views/dashboard.html',
        redirectTo: 'admin.booking'
      })
      .state('admin.booking', {
        url: '/booking',
        templateUrl: 'app/admin/views/bookingList.html',
        controller: 'AdminBookingController',
        controllerAs: 'bookList'
      })
      .state('admin.booking.detail', {
        url: '/:id',
        views: {
          '@admin': {
            templateUrl: 'app/admin/views/bookingDetail.html',
            controller: 'AdminBookingDetailController',
            controllerAs: 'bookItem'
          }
        }
      })
      .state('admin.booking.edit', {
        url: '/:id/edit',
        views: {
          '@admin': {
          templateUrl: 'app/admin/views/bookingEdit.html',
          controller: 'AdminBookingDetailEditController',
          controllerAs: 'bookItem'
          }
        }
      })
      .state('admin.booking.matched', {
        url: '/:id/matched',
        views: {
          '@admin': {
          templateUrl: 'app/admin/views/bookingMatched.html',
          controller: 'AdminBookingMatchedController',
          controllerAs: 'matched'
          }
        }
      })
      .state('admin.caregivers', {
        url: '/caregivers',
        templateUrl: 'app/admin/views/caregiversList.html',
        controller: 'AdminCaregiversController',
        controllerAs: 'caregivers'
      })
      .state('admin.caregivers.add', {
        url: '/add',
        views: {
          '@admin': {
          templateUrl: 'app/admin/views/caregiversAdd.html',
          controller: 'AdminCaregiverAddController',
          controllerAs: 'caregiver'
          }
        }
      })
      .state('admin.caregivers.edit', {
        url: '/:id/edit',
        views: {
          '@admin': {
          templateUrl: 'app/admin/views/caregiversEdit.html',
          controller: 'AdminCaregiverEditController',
          controllerAs: 'caregiver'
          }
        }
      });

    $urlRouterProvider
      .otherwise('/');
  }

  // For redirection
  angular
    .module('app.core').run(['$rootScope', '$state', function($rootScope, $state) {

    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params);
      }
    });
  }]);

  // For go back button in case of different page transition to same state
  angular
    .module('app.core').run(function($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$on("$stateChangeSuccess",  function(event, toState, toParams, fromState, fromParams) {
        // to be used for back button //won't work when page is reloaded.
        $rootScope.previousState_name = fromState.name;
        $rootScope.previousState_params = fromParams;
      });
      //back button function called from back button's ng-click="back()"
      $rootScope.goBack = function() {
        if ($rootScope.previousState_name) {
          $state.go($rootScope.previousState_name, $rootScope.previousState_params);
        } else if ($rootScope.$state.current.name === 'admin.caregivers.add' || $rootScope.$state.current.name === 'admin.caregivers.edit') {
          $state.go('admin.caregivers');
        }
      };
  });

})();