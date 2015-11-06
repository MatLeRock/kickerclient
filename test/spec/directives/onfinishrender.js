'use strict';

describe('Directive: onFinishRender', function () {

  // load the directive's module
  beforeEach(module('kickerleagueClientApp'));

//  var element;
  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

//  it('should make hidden element visible', inject(function ($compile) {
//    element = angular.element('<on-finish-render></on-finish-render>');
//    element = $compile(element)(scope);
//    expect(element.text()).toBe('this is the onFinishRender directive');
//  }));
});
