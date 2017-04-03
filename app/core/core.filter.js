(function(){
  'use strict';

  angular.module('app.core')
    .filter('textPlaceholder', textPlaceholder)
    .filter('textCapitalize', textCapitalize);

  // If text field is empty, show '-' sign
  function textPlaceholder() {
    return function (text, placeholder) {
      if (!text) return placeholder;
    };
  }

  // Capitallize the first letter
  function textCapitalize() {
    return function(text) {
      return (text) ? text.charAt(0).toUpperCase() + text.substr(1) : '';
    };
  }

})();
