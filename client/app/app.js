angular.module('Myapp', [
  'Myapp.services',
  'Myapp.auth',
  'ngRounte'
])

.config(function ($rounterProvider, $localtionProvider) {
  $rounterProvider
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .otherwise({
      redirectTo: "/"
    });
});
