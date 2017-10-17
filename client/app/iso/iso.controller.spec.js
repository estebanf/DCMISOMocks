'use strict';

describe('Controller: IsoCtrl', function() {
  // load the controller's module
  beforeEach(module('dcmisomocksApp.iso'));

  var IsoCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    IsoCtrl = $controller('IsoCtrl', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
