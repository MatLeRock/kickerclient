'use strict';

/**
 * @ngdoc function
 * @name kickerleagueClientApp.controller:NewGameCtrl
 * @description
 * # NewGameCtrl
 * Controller of the kickerleagueClientApp
 */
angular.module('kickerleagueClientApp')
        .controller('NewGameController',
                ['$scope', '$http', '$route', 'Team1', 'Team2', 'ENV', 'GameService', 'UsersService', '$element', 'ModalService', 'CredentialService',
                    function($scope, $http, $route, Team1, Team2, ENV, GameService, UsersService, $element, ModalService, CredentialService) {
                        $scope.team1 = Team1;
                        $scope.team2 = Team2;
                        $scope.gameService = GameService;
//                        $scope.game = {};
//                        $scope.game.team1Result = 0;
//                        $scope.game.team2Result = 0;
                        $scope.usersService = UsersService;

                        $element.on('show.bs.modal', function() {
                            $http.get(ENV.apiEndpoint + '/user').then(function(userListResponse) {
                                $scope.loading = false;
                                var users = userListResponse.data.data;
                                for (var i = 0; i < users.length; i++) {
                                    var user = users[i];
                                    var displayName = user.nickname || user.firstname || user.lastname || 'User';
                                    users[i].displayName = displayName;
                                }
                                $scope.usersService.setUsers(users);
                            });
                            var game = $scope.gameService.getGame();
                            if (game !== null) {
                                $scope.game = game;
                                $scope.team1.setTeam(game.team1);
                                $scope.team2.setTeam(game.team2);
                            }
                        });

                        $scope.filterUsers = function(usersArray) {
                            var result = [];
                            var ids1 = $scope.team1.getIds();
                            var ids2 = $scope.team2.getIds();
                            angular.forEach(usersArray, function(user) {
                                if (ids1.indexOf(user.id) === -1 && ids2.indexOf(user.id) === -1) {
                                    result.push(user);
                                }
                            });

                            return result;
                        };

                        $element.on('hide.bs.modal', function() {
                            $scope.gameService.reset();
                            $scope.team1.reset();
                            $scope.team2.reset();
                        });

                        /**
                         * Save or update a game
                         * @param {type} game
                         * @returns {undefined}
                         * 
                         * TODO: this could get refactorized, maybe with deleteGame()
                         */
                        $scope.saveGame = function(game) {
                            if (typeof game === 'undefined') {
                                $scope.message = 'Result missing!';
                                return;
                            }
                            game.team1 = Team1.getTeam();
                            game.team2 = Team2.getTeam();
                            if (game.team1.length <= 0 || game.team1.length <= 0) {
                                $scope.message = 'Some members missing!';
                                return;
                            }

                            var result;
                            /* 
                             * save new game if we dont have a game.id
                             * otherwise update a game                             * 
                             */
                            if (!game.id) {
                                // request the secured resource and wait for the 'unauthorized'-Error (This is part of the http-Digest-workflow)
                                result = $http.post(ENV.apiEndpoint + '/game', game);

                                // this will never be triggered if the resource is secure
                                result.success(function() {
                                    $element.trigger('click.dismiss.modal');
                                    $element.one('hidden.bs.modal', function() {
                                        $route.reload();
                                    });
//            
                                    $scope.message = 'Spitze!';
                                    $scope.game = {};
                                    $scope.team1.reset();
                                    $scope.team2.reset();

                                });

                                // throwing the 401/Unauthorized error
                                result.error(function(data, status, headers) {
                                    if (status === 401) {
                                        // open the login modal if credentials arent set yet
                                        if (!CredentialService.isSet()) {
                                            $scope.openLoginModal();
                                        } else {
                                            // get the digest header for authorization
                                            var header = CredentialService.generateDigestHeader(headers, '/game', 'POST');

                                            if (header === null) {
                                                $scope.message = 'Some Error happened';
                                                return;
                                            }

                                            // request the resource again this time with the digest header
                                            $http({
                                                url: ENV.apiEndpoint + '/game',
                                                method: 'POST',
                                                data: game,
                                                headers: header
                                            }).error(function() {
                                                // open the LoginMOdal again if credentials arent correct (or another error happened; maybe we should check http status again)
                                                $scope.openLoginModal();
                                            }).success(function() {
                                                $scope.message = data;
                                                $element.on('hidden.bs.modal', function() {
                                                    $route.reload();
                                                });
                                                $element.modal('hide');
                                            });
                                            $scope.team1.reset();
                                            $scope.team2.reset();
                                        }
                                    }
                                });
                            }
                            // update game if we have an id
                            else {
                                result = $http.put(ENV.apiEndpoint + '/game/' + game.id, game);
                                result.success(function() {
                                    $element.trigger('click.dismiss.modal');
                                    $element.one('hidden.bs.modal', function() {
                                        $route.reload();
                                    });
//            
                                    $scope.message = 'Spitze!';
                                    $scope.game = {};
                                    $scope.team1.reset();
                                    $scope.team2.reset();

                                });
                                // throwing the 401/Unauthorized error
                                result.error(function(data, status, headers) {
                                    if (status === 401) {
                                        // open the login modal if credentials arent set yet
                                        if (!CredentialService.isSet()) {
                                            $scope.openLoginModal();
                                        } else {
                                            // get the digest header for authorization
                                            var header = CredentialService.generateDigestHeader(headers, '/game/' + game.id, 'PUT');

                                            if (header === null) {
                                                $scope.message = 'Some Error happened';
                                                return;
                                            }

                                            // request the resource again this time with the digest header
                                            $http({
                                                url: ENV.apiEndpoint + '/game/' + game.id,
                                                method: 'PUT',
                                                data: game,
                                                headers: header
                                            }).error(function() {
                                                window.console.info('kagge');
                                                // open the LoginMOdal again if credentials arent correct (or another error happened; maybe we should check http status again)
                                                $scope.openLoginModal();
                                            }).success(function() {
                                                window.console.info('juhuuuu!');
                                                $scope.message = data;
                                                $element.on('hidden.bs.modal', function() {
                                                    $route.reload();
                                                });
                                                $element.modal('hide');
                                            });
                                            $scope.team1.reset();
                                            $scope.team2.reset();
                                        }
                                    }
                                });

                            }
                        };

                        $scope.deleteGame = function() {
                            var game = $scope.gameService.getGame();
                            var params = {'id': game.id};

                            var result = $http.delete(ENV.apiEndpoint + '/game', {'params': params});
                            result.success(function(data) {
                                $scope.message = data;
                                $element.one('hidden.bs.modal', function() {
                                    $route.reload();
                                });
                                $element.modal('hide');
                            });

                            // throwing the 401/Unauthorized error
                            result.error(function(data, status, headers) {
                                if (status === 401) {
                                    // open the login modal if credentials arent set yet
                                    if (!CredentialService.isSet()) {
                                        $scope.openLoginModal();
                                    } else {
                                        // get the digest header for authorization
                                        var header = CredentialService.generateDigestHeader(headers, '/game?id=' + game.id, 'DELETE');

                                        if (header === null) {
                                            $scope.message = 'Some Error happened';
                                            return;
                                        }

                                        // request the resource again this time with the digest header
                                        $http({
                                            url: ENV.apiEndpoint + '/game?id=' + game.id,
                                            method: 'DELETE',
                                            headers: header
                                        }).error(function() {
                                            // open the LoginMOdal again if credentials arent correct (or another error happened; maybe we should check http status again)
                                            $scope.openLoginModal();
                                        }).success(function() {
                                            $scope.message = data;
                                            $element.on('hidden.bs.modal', function() {
                                                $route.reload();
                                            });
                                            $element.modal('hide');
                                        });
                                        $scope.team1.reset();
                                        $scope.team2.reset();
                                    }
                                }
                            });
                        };


                        $scope.reset = function() {
                            $scope.gameService.reset();
                            $scope.team1.reset();
                            $scope.team2.reset();
                        };

                        $scope.gameIsValid = function() {
                            $scope.message = '';
                            var valid = true;
                            if ($scope.game === null || typeof $scope.game === 'undefined' ||
                                    $scope.game.team1_result === null || typeof $scope.game.team1_result === 'undefined' ||
                                    $scope.game.team2_result === null || typeof $scope.game.team2_result === 'undefined') {
                                valid = false;
                                $scope.message = 'Please Set Game';
                            } else {
                                var res1 = $scope.game.team1_result;
                                var res2 = $scope.game.team2_result;
//                                window.console.info(res1 > res2);
//                                window.console.info((res1 - res2));
                                if (res1 > res2) {

                                    if (res1 < 5) {
                                        valid = false;
                                        $scope.message = 'Winner (team1) needs to have at least 5 goals';
                                    }

                                    if ((res1 - res2) < 2 && res1 !== 10) {
                                        valid = false;
                                        $scope.message = 'Winner (team1) needs to have at least 2 more goals than the other team';
                                    }

                                    if ((res1 - res2) > 2 && res1 > 5) {
                                        valid = false;
                                        $scope.message = 'Something wrong!';
                                    }

                                }

                                if (res2 > res1) {
                                    if (res2 < 5) {
                                        valid = false;
                                        $scope.message = 'Winner (team2) needs to have at least 5 goals';
                                    }

                                    if ((res2 - res1) < 2 && res2 !== 10) {
                                        valid = false;
                                        $scope.message = 'Winner (team2) needs to have at least 2 more goals than the other team';
                                    }

                                    if ((res2 - res1) > 2 && res2 > 5) {
                                        valid = false;
                                        $scope.message = 'Something wrong2!';
                                    }
                                }

                                if (res2 === res1) {
                                    valid = false;
                                    $scope.message = 'We need a winner!';
                                }
                            }


                            if (!$scope.team1.isValid() || !$scope.team1.isValid()) {
                                valid = false;
                            }

                            if (!$scope.team2.isValid() || !$scope.team2.isValid()) {
                                valid = false;
                            }
                            return valid;


                        };

                        $scope.openLoginModal = function() {
                            ModalService.showModal({
                                templateUrl: 'views/loginModal.html',
                                controller: 'LoginController',
                                inputs: {
                                    kagge: 'ja'
                                }

                            }).then(function(modal) {
                                window.console.info('wa?');
                                //it's a bootstrap element, use 'modal' to show it
                                modal.element.modal();
                            });
                        };

                    }]);
