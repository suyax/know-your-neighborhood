angular.module('Myapp.services', [])

.factory('Auth', function($http, $location, $window) {
  var signout = function() {
    $location.path('/signin');
  };

  return {
    signout : signout
  };
});
