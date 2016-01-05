angular.module('Myapp', [
  'Myapp.services',
  'Myapp.auth',
  'ngRoute'
])

.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/links/link.html',
      controller: 'linkCtrl'
    })
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .otherwise({
      redirectTo: '/'
    });

  // $localtionProvider.html5Mode(true);
});
