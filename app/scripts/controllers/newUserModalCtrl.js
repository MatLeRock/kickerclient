'use strict';

/**
 * @ngdoc function
 * @name kickerleagueClientApp.controller:NewGameCtrl
 * @description
 * # NewGameCtrl
 * Controller of the kickerleagueClientApp
 */
angular.module('kickerleagueClientApp')
        .controller('NewUserController',
                ['$scope', '$element', 'close', '$http', '$route', 'ENV', 'id', 'ModalService', 'CredentialService',
                    function ($scope, $element, close, $http, $route, ENV, id, ModalService, CredentialService) {

                        $scope.user2Edit = null;
                        /*
                         * Initial Code
                         */
                        if (id !== null) {
                            var params = {'id': id};
                            $http.get(ENV.apiEndpoint + '/user', {'params': params}).then(function (userResponse) {
                                $scope.user2Edit = userResponse.data.data;
                                $scope.user = angular.copy($scope.user2Edit);
                            });
                        }

                        $scope.updateUser = function (user) {
                            var res = $http.put(ENV.apiEndpoint + '/user/' + user.id, user);
                            res.success(function (data) {
                                $scope.message = data;
                                $element.on('hidden.bs.modal', function () {
                                    $route.reload();
                                });
                                $element.modal('hide');
                            });
                            // if we get a 401 we take the headers/CredentialService to make an authenticated reqeust
                            res.error(function (data, status, headers) {
                                window.console.info(status);
                                if (status === 401) {
                                    if (!CredentialService.isSet()) {
                                        $scope.openLoginModal();
                                    } else {
                                        var header = CredentialService.generateDigestHeader(headers, '/user/'+ user.id, 'PUT');

                                        if (header === null) {
                                            $scope.message = 'Some Error happened';
                                            return;
                                        }

                                        $http({
                                            url: ENV.apiEndpoint + '/user/' + user.id,
                                            method: 'PUT',
                                            data: user,
                                            headers: header
                                        }).error(function () {
                                            $scope.openLoginModal();
                                        }).success(function () {
                                            $scope.message = data;
                                            $element.on('hidden.bs.modal', function () {
                                                $route.reload();
                                            });
                                            $element.modal('hide');
                                        });
                                    }
                                }
                            });
                        };
                        $scope.saveUser = function (user) {
                            // we expect the following to fail (401) because its a protected resource
                            var res = $http.post(ENV.apiEndpoint + '/user', user);
                            res.success(function (data) {
                                $scope.message = data;
                                $element.on('hidden.bs.modal', function () {
                                    window.console.info('save');
                                    $route.reload();
                                });
                                $element.modal('hide');
                            });

                            // if we get a 401 we take the headers/CredentialService to make an authenticated reqeust
                            res.error(function (data, status, headers) {
                                window.console.info(status);
                                if (status === 401) {
                                    if (!CredentialService.isSet()) {
                                        $scope.openLoginModal();
                                    } else {
                                        var header = CredentialService.generateDigestHeader(headers, '/user', 'POST');

                                        if (header === null) {
                                            $scope.message = 'Some Error happened';
                                            return;
                                        }

                                        $http({
                                            url: ENV.apiEndpoint + '/user',
                                            method: 'POST',
                                            data: user,
                                            headers: header
                                        }).error(function () {
                                            $scope.openLoginModal();
                                        }).success(function () {
                                            $scope.message = data;
                                            $element.on('hidden.bs.modal', function () {
                                                $route.reload();
                                            });
                                            $element.modal('hide');
                                        });
                                    }
                                }
                            });
                        };

                        $scope.deleteUser = function (id) {
                            var params = {'id': id};
                            var res = $http.delete(ENV.apiEndpoint + '/user', {'params': params});
                            res.success(function (data) {
                                $scope.message = data;
                                $element.on('hidden.bs.modal', function () {
                                    $route.reload();
                                });
                                $element.modal('hide');
                            });
                            // if we get a 401 we take the headers/CredentialService to make an authenticated reqeust
                            res.error(function (data, status, headers) {
                                window.console.info(status);
                                if (status === 401) {
                                    if (!CredentialService.isSet()) {
                                        $scope.openLoginModal();
                                    } else {
                                        var header = CredentialService.generateDigestHeader(headers, '/user', 'DELETE');

                                        if (header === null) {
                                            $scope.message = 'Some Error happened';
                                            return;
                                        }

                                        $http({
                                            url: ENV.apiEndpoint + '/user',
                                            method: 'DELETE',
                                            params: {'id': id},
                                            headers: header
                                        }).error(function () {
                                            $scope.openLoginModal();
                                        }).success(function () {
                                            $scope.message = data;
                                            $element.on('hidden.bs.modal', function () {
                                                $route.reload();
                                            });
                                            $element.modal('hide');
                                        });
                                    }
                                }
                            });
                        };

                        $scope.reset = function () {
                            $scope.user = null;
                            $scope.user2Edit = null;
                        };



                        $scope.openLoginModal = function () {
                            ModalService.showModal({
                                templateUrl: 'views/loginModal.html',
                                controller: 'LoginController',
                                inputs: {
                                    kagge: 'ja'
                                }

                            }).then(function (modal) {
                                window.console.info('wa?');
                                //it's a bootstrap element, use 'modal' to show it
                                modal.element.modal();
                            });
                        };

                    }]);
