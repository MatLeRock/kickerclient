'use strict';

describe('Controller: NewGameCtrl', function () {

  // load the controller's module
  beforeEach(module('kickerleagueClientApp'));

  var NewGameCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewGameCtrl = $controller('NewGameCtrl', {
      $scope: scope
    });
  }));

//  it('should attach a list of awesomeThings to the scope', function () {
//    expect(scope.awesomeThings.length).toBe(3);
//  });
});
