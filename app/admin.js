angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function ($routeProvider, $locationProvider) {
  'use strict';

  var routeRoleChecks = {
    admin: {
      auth: ['appAuth', function (appAuth) {
        return appAuth.authorizeCurrentUserForRoute('admin');
      }]
    }
  };

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/admin/users', {templateUrl: '/partials/admin/users',
      controller: 'appAdminUsersCtrl', resolve: routeRoleChecks.admin})
    .when('/admin/errors', {templateUrl: '/partials/admin/errors',
      controller: 'appAdminErrorsCtrl', resolve: routeRoleChecks.admin})
    .when('/admin/buzzrs', {templateUrl: '/partials/admin/buzzrs',
      controller: 'appAdminBuzzrsCtrl', resolve: routeRoleChecks.admin});
});

angular.module('app').run(function ($rootScope, $location) {
  'use strict';

  $rootScope.$on('$routeChangeError', function (event, current, previous, rejectionReason) {
    if (rejectionReason === 'not authorized') {
      $location.path('/');
    }
  });
});
