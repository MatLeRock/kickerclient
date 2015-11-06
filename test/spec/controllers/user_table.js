'use strict';

describe('Controller: UserTableCtrl', function () {

  // load the controller's module
  beforeEach(module('kickerleagueClientApp'));

  var UserTableCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserTableCtrl = $controller('UserTableCtrl', {
      $scope: scope
    });
  }));

//  it('should attach a list of awesomeThings to the scope', function () {
//    expect(scope.awesomeThings.length).toBe(3);
//  });
});
