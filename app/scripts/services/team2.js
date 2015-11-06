'use strict';

/**
 * @ngdoc service
 * @name kickerleagueClientApp.Team2
 * @description
 * # Team2
 * Factory in the kickerleagueClientApp.
 */
angular.module('kickerleagueClientApp')
        .factory('Team2', function () {
            var team2 = [];
            var ids = [];
            return {
                getTeam: function () {
                    return team2;
                },
                getIds: function () {
                    return ids;
                },
                addMember: function (member) {
                    team2.push(member);
                    ids.push(member.id);

                },
                removeMember: function (index) {
                    if (index > -1) {
                        team2.splice(index, 1);
                        ids.splice(index, 1);
                    }
                },
                reset: function () {
                    team2 = [];
                    ids = [];
                },
                setTeam: function (teamArray) {
                    var self = this;
                    angular.forEach(teamArray, function (member) {
                        self.addMember(member);
                    });
                },
                isValid: function(){
                    if(team2.length && team2.length === 2){
                        return true;
                    }
                    return false;
                }
            };
        });
