angular.module('app').controller('appJoinCtrl', function ($scope, $location, appIdentity, appAuth, appNotifier) {
  'use strict';

  $scope.signup = function() {
    var newUserData = {
      email: $scope.email,
      password: $scope.password
    };

    appAuth.createUser(newUserData).then(function() {
      $location.path('/search');
    }, function(reason) {
      appNotifier.error(reason, $scope);
    });
  };
});
