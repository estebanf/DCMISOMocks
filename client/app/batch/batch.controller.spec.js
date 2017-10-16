'use strict';

describe('Controller: BatchCtrl', function() {
  // load the controller's module
  beforeEach(module('dcmisomocksApp.batch'));

  var BatchCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    BatchCtrl = $controller('BatchCtrl', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
