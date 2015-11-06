'use strict';

/**
 * @ngdoc directive
 * @name kickerleagueClientApp.directive:loading
 * @description
 * # loading
 */
angular.module('kickerleagueClientApp')
        .directive('loading', function() {
            return {
                restrict: 'E',
                replace: true,
                template: '<div class="loading"><img width=100 height=100 src="images/loader.gif"/>LOADING...</div>',
                link: function(scope, element) {
                    scope.$watch('loading', function(val) {
                        if (val) {
                            $(element).show();
                        }
                        else {
                            $(element).hide();
                        }
                    });
                }
            };
        });
