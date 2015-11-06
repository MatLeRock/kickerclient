'use strict';

/**
 * @ngdoc overview
 * @name kickerleagueClientApp
 * @description
 * # kickerleagueClientApp
 *
 * Main module of the application.
 */
angular.module('kickerleagueClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'brantwills.paging',
    'angularModalService',
    'LocalStorageModule',
    'angular-md5',
    'config' // ENV
]);

/**
 * Configure routes
 * @param {type} $routeProvider
 * @returns {undefined}
 */
angular.module('kickerleagueClientApp')
        .config(function ($routeProvider) {
            $routeProvider
                    .when('/', {
                        templateUrl: 'views/home.html'
                    })
                    .when('/users', {
                        templateUrl: 'views/users.html'
                    })
                    .when('/games', {
                        templateUrl: 'views/games.html'
                    })
                    .when('/login', {
                        templateUrl: 'views/login.html'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
        });

angular.module('kickerleagueClientApp').config(
        function (localStorageServiceProvider) {
            localStorageServiceProvider.setPrefix('kickerleagueClientApp'); // TODO: save credentials here
        });

//angular.module('kickerleagueClientApp').value('apiBasePath', 'https://kickerbackend.herokuapp.com');

angular.module('kickerleagueClientApp').run();