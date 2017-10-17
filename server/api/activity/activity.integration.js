'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newActivity;

describe('Activity API:', function() {
  describe('GET /api/activities', function() {
    var Activitys;

    beforeEach(function(done) {
      request(app)
        .get('/api/activities')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          Activitys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(Activitys).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/activities', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/activities')
        .send({
          name: 'New Activity',
          info: 'This is the brand new Activity!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newActivity = res.body;
          done();
        });
    });

    it('should respond with the newly created Activity', function() {
      expect(newActivity.name).to.equal('New Activity');
      expect(newActivity.info).to.equal('This is the brand new Activity!!!');
    });
  });

  describe('GET /api/activities/:id', function() {
    var Activity;

    beforeEach(function(done) {
      request(app)
        .get(`/api/activities/${newActivity._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          Activity = res.body;
          done();
        });
    });

    afterEach(function() {
      Activity = {};
    });

    it('should respond with the requested Activity', function() {
      expect(Activity.name).to.equal('New Activity');
      expect(Activity.info).to.equal('This is the brand new Activity!!!');
    });
  });

  describe('PUT /api/activities/:id', function() {
    var updatedActivity;

    beforeEach(function(done) {
      request(app)
        .put(`/api/activities/${newActivity._id}`)
        .send({
          name: 'Updated Activity',
          info: 'This is the updated Activity!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedActivity = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedActivity = {};
    });

    it('should respond with the updated Activity', function() {
      expect(updatedActivity.name).to.equal('Updated Activity');
      expect(updatedActivity.info).to.equal('This is the updated Activity!!!');
    });

    it('should respond with the updated Activity on a subsequent GET', function(done) {
      request(app)
        .get(`/api/activities/${newActivity._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let Activity = res.body;

          expect(Activity.name).to.equal('Updated Activity');
          expect(Activity.info).to.equal('This is the updated Activity!!!');

          done();
        });
    });
  });

  describe('PATCH /api/activities/:id', function() {
    var patchedActivity;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/activities/${newActivity._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Activity' },
          { op: 'replace', path: '/info', value: 'This is the patched Activity!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedActivity = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedActivity = {};
    });

    it('should respond with the patched Activity', function() {
      expect(patchedActivity.name).to.equal('Patched Activity');
      expect(patchedActivity.info).to.equal('This is the patched Activity!!!');
    });
  });

  describe('DELETE /api/activities/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/activities/${newActivity._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Activity does not exist', function(done) {
      request(app)
        .delete(`/api/activities/${newActivity._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
