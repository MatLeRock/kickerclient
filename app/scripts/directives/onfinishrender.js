'use strict';

/**
 * @ngdoc directive
 * @name kickerleagueClientApp.directive:onFinishRender
 * @description
 * # onFinishRender
 */
angular.module('kickerleagueClientApp')
  .directive('onFinishRender', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});
