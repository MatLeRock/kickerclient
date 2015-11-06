'use strict';

/**
 * @ngdoc service
 * @name kickerleagueClientApp.Games
 * @description
 * # Games
 * Factory in the kickerleagueClientApp.
 */
angular.module('kickerleagueClientApp')
        .factory('UsersService', function () {

            var users = [];
            return { 
                reset: function(){
                   users = [];
                },
                setUsers: function (usersArray) {
                    users = usersArray;
                },
                getUsers: function () {
                    return users;
                }               
            };
        });
