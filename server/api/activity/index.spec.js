'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var ActivityCtrlStub = {
  index: 'ActivityCtrl.index',
  show: 'ActivityCtrl.show',
  create: 'ActivityCtrl.create',
  upsert: 'ActivityCtrl.upsert',
  patch: 'ActivityCtrl.patch',
  destroy: 'ActivityCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var ActivityIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './activity.controller': ActivityCtrlStub
});

describe('Activity API Router:', function() {
  it('should return an express router instance', function() {
    expect(ActivityIndex).to.equal(routerStub);
  });

  describe('GET /api/activities', function() {
    it('should route to activity.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'ActivityCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/activities/:id', function() {
    it('should route to activity.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'ActivityCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/activities', function() {
    it('should route to activity.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'ActivityCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/activities/:id', function() {
    it('should route to activity.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'ActivityCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/activities/:id', function() {
    it('should route to Activity.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'ActivityCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/activities/:id', function() {
    it('should route to activity.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'ActivityCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
