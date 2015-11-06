'use strict';

/**
 * @ngdoc function
 * @name kickerleagueClientApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the kickerleagueClientApp
 */
angular.module('kickerleagueClientApp')
        .controller('UsersCtrl', function ($scope, $http, ENV, ModalService) {
           
            $http.get(ENV.apiEndpoint + '/user').then(function (userListResponse) {
                $scope.users = userListResponse.data.data;
            });

            $scope.openUserModal = function (id) {
                ModalService.showModal({
                    templateUrl: 'views/newUserModal.html',
                    controller: 'NewUserController',
                    inputs: {
                        id: id
                    }
                }).then(function (modal) {
                    //it's a bootstrap element, use 'modal' to show it
                    modal.element.modal();

                });
            };



        });
