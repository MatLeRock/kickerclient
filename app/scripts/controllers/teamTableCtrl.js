'use strict';

/**
 * @ngdoc function
 * @name kickerleagueClientApp.controller:TeamTableCtrl
 * @description
 * # TeamTableCtrl
 * Controller of the kickerleagueClientApp
 */
angular.module('kickerleagueClientApp')
        .controller('TeamTableCtrl', ['$scope', '$http', 'ENV', function ($scope, $http, ENV) {
                $scope.loading = true;
                $scope.teamsTable = null;
                $scope.$on('ngRepeatFinished', function () {
                    $('.name').popover({
                        html: true,
                        trigger: 'hover',
                        content: function () {
                            return $(this).find('#memberPopover').html();
                        }
                    });
                });

                $scope.filterMember = function (member) {
                    if (member.id === null) {
                        member.firstname = 'Deleted Player';
                        member.lastname = 'Deleted Player';
                        member.nickname = 'Deleted Player';
                    }
                    return member.firstname;
                };

                $http.get(ENV.apiEndpoint + '/games-table')
                        .success(function (data) {
                            $scope.loading = false;
                            $scope.teamsTable = data.data.data;
                        })
//                        .error(function (data, status, headers, config) {
//                            if(status === 401){
//                                window.console.info(config);
//                                window.console.info(data);
//                                window.console.info(headers());
//                            }
//                            window.console.info(status);
//                        });
                        .then(function (teamTableResponse) {
                            $scope.loading = false;
                            $scope.teamsTable = teamTableResponse.data.data;

                        });
            }]);
