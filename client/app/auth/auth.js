angular.module('Myapp.auth', [])

.controller('AuthController', function ($scope, $http) {
  console.log("Auth", Auth);
  $scope.user = {
    username: 'username'
  };

  $scope.signin = function() {
    $location.path('/links');
  };

  $scope.signout = function() {
    Auth.signout();
  };
});
