'use strict';

describe('Controller: UserPickerCtrl', function () {

  // load the controller's module
  beforeEach(module('kickerleagueClientApp'));

  var UserPickerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserPickerCtrl = $controller('UserPickerCtrl', {
      $scope: scope
    });
  }));

//  it('should attach a list of awesomeThings to the scope', function () {
//    expect(scope.awesomeThings.length).toBe(3);
//  });
});
