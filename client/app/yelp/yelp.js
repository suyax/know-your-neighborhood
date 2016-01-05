angular.module('Myapp.staticSelect', [])

  .controller('yelpCaController', function ($scope) {
    $scope.data = {
      Hotels: "Hotels",
      Food: "Food",
      Shopping: "Shopping",
      Buses: "Buses"
    };
    console.log($scope.data.singleSelect);
  })
