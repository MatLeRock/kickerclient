'use strict';

/**
 * @ngdoc function
 * @name kickerleagueClientApp.controller:UserTableCtrl
 * @description
 * # UserTableCtrl
 * Controller of the kickerleagueClientApp
 */
angular.module('kickerleagueClientApp')
  .controller('UserTableCtrl', function($scope, $http, ENV) {
    $scope.loading = true;
    $scope.$on('ngRepeatFinished', function() {
        $('.name').popover({
            html: true,
            trigger: 'hover',
            content: '<img src="images/zf2-logo.png" />'
        });
    });

    $http.get(ENV.apiEndpoint + '/users-table').then(function(usersTableResponse) {
        $scope.loading = false;
        $scope.usersTable = usersTableResponse.data.data;

    });
});
