'use strict';

describe('Controller: TeamTableCtrl', function () {

  // load the controller's module
  beforeEach(module('kickerleagueClientApp'));

  var TeamTableCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TeamTableCtrl = $controller('TeamTableCtrl', {
      $scope: scope
    });
  }));

  it('teamsTableTest', function () {
//    expect(scope.teamsTable).not.toBe(null);
  });
});
