(function () {
  'use strict';

  angular
    .module('app', [
      'ui.router',
      'ngAnimate',
      'ui.bootstrap',
      'gm.datepickerMultiSelect',
      'ngTouch',
      'app.core',
      'app.layout',
      'app.auth',
      'app.admin',
      'app.booking',
      'app.landing'
    ]);

})();
