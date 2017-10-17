'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var diaryCtrlStub = {
  index: 'diaryCtrl.index',
  show: 'diaryCtrl.show',
  create: 'diaryCtrl.create',
  upsert: 'diaryCtrl.upsert',
  patch: 'diaryCtrl.patch',
  destroy: 'diaryCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var diaryIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './diary.controller': diaryCtrlStub
});

describe('Diary API Router:', function() {
  it('should return an express router instance', function() {
    expect(diaryIndex).to.equal(routerStub);
  });

  describe('GET /api/diaries', function() {
    it('should route to diary.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'diaryCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/diaries/:id', function() {
    it('should route to diary.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'diaryCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/diaries', function() {
    it('should route to diary.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'diaryCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/diaries/:id', function() {
    it('should route to diary.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'diaryCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/diaries/:id', function() {
    it('should route to diary.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'diaryCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/diaries/:id', function() {
    it('should route to diary.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'diaryCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
