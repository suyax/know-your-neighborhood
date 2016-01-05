angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  // Your code here

  $scope.data = {};

  var initializeLinks = function () {
    Links.getAll()
      .then(function (links) {
        $scope.data.links = links;
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  initializeLinks();
  });
