'use strict';

/**
 * @ngdoc service
 * @name kickerleagueClientApp.Games
 * @description
 * # Games
 * Factory in the kickerleagueClientApp.
 */
angular.module('kickerleagueClientApp')
        .factory('GameService', function () {

            var gameO = null;
            return { 
                reset: function(){
                   gameO = null;
                },
                setGame: function (game) {
                    gameO = game;
                },
                getGame: function () {
                    return gameO;
                }               
            };
        });
