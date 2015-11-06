'use strict';

/**
 * @ngdoc function
 * @name kickerleagueClientApp.controller:GamesCtrl
 * @description
 * # GamesCtrl
 * Controller of the kickerleagueClientApp
 */
angular.module('kickerleagueClientApp')
        .controller('GamesCtrl',
                ['$scope', '$http', 'GameService', 'UsersService', 'ModalService', 'ENV', 
                    function ($scope, $http, GameService, UsersService, ModalService, ENV) {
                        $scope.loading = true;
                        $scope.gameService = GameService;
                        $scope.usersService = UsersService;
                        $scope.pagerIndex = 1;
                        $scope.pagerSizeInput = 10;

                        window.console.info(ENV);

                        $scope.openModal = function () {
                            ModalService.showModal({
                                templateUrl: 'views/newGameModal.html',
                                controller: 'NewGameController'
                            }).then(function (modal) {
                                //it's a bootstrap element, use 'modal' to show it
                                modal.element.modal();
                            });
                        };

                        $scope.filterMember = function (member) {
                            if (member.id === null) {
                                member.firstname = 'Deleted Player';
                                member.lastname = 'Deleted Player';
                                member.nickname = 'Deleted Player';
                            }
                            return member.firstname;
                        };

                        $scope.doPaging = function (page, pageSize) {
                            if (!pageSize || pageSize <= 0) {
                                return;
                            }
                            var params = {};
                            if (page > 0) {
                                params.index = page - 1;
                            } else {
                                params.index = page;
                            }
                            params.size = pageSize;
                            var resp = $http.get(ENV.apiEndpoint + '/game', {'params': params});

                            resp.then(function (gamesListResponse) {
                                $scope.loading = false;
                                $scope.games = gamesListResponse.data.data.games;
                                $scope.total = gamesListResponse.data.data.total;

                                //set pager Values
                                $scope.page = page;
                                $scope.pageSize = pageSize;
                            });
                        };

                        $scope.doPaging(1, $scope.pagerSizeInput);

                        $scope.editGame = function (id) {
                            var params = {'id': id};
                            $http.get(ENV.apiEndpoint + '/game', {'params': params}).then(function (gameResponse) {
                                $scope.gameService.setGame(gameResponse.data.data);
                                $scope.openModal();
                            });
                        };

                    }]);
