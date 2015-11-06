'use strict';

/**
 * @ngdoc function
 * @name kickerleagueClientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the kickerleagueClientApp
 */
angular.module('kickerleagueClientApp')
        .controller('LoginController',
                ['$scope', 'CredentialService', '$element', '$timeout', 'close',
                    function ($scope, CredentialService, $element, $timeout, close) {
                        $scope.loading = true;
                        $scope.login = function () {
                            window.console.info($scope.credentials.name);
                            CredentialService.setName($scope.credentials.name);
                            CredentialService.setPassword($scope.credentials.password);
                            
                            $element.modal('hide');
                            
                        };
                        
                        
                        $element.on('hidden.bs.modal', function () {
                            window.console.info('jojo');
                            $timeout(function () {
                                close();
                            });
                        });
                        
                    }
                ]);
