'use strict';

/**
 * @ngdoc service
 * @name kickerleagueClientApp.Team1
 * @description
 * # Team1
 * Factory in the kickerleagueClientApp.
 */
angular.module('kickerleagueClientApp')
        .factory('Team1', function () {
            var team1 = [];
            var ids = [];
            return {
                getTeam: function () {
                    return team1;
                },
                getIds: function () {
                    return ids;
                },
                addMember: function (member) {
                    team1.push(member);
                    ids.push(member.id);

                },
                removeMember: function (index) {
                    if (index > -1) {
                        team1.splice(index, 1);
                        ids.splice(index, 1);
                    }
                },
                reset: function () {
                    team1 = [];
                    ids = [];
                },
                setTeam: function (teamArray) {
                    var self = this;
                    angular.forEach(teamArray, function(member){
                        self.addMember(member);
                    });
                },
                isValid: function(){
                    if(team1.length && team1.length === 2){
                        return true;
                    }
                    return false;
                }
            };
        });