'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newDiary;

describe('Diary API:', function() {
  describe('GET /api/diaries', function() {
    var diarys;

    beforeEach(function(done) {
      request(app)
        .get('/api/diaries')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          diarys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(diarys).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/diaries', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/diaries')
        .send({
          name: 'New Diary',
          info: 'This is the brand new diary!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newDiary = res.body;
          done();
        });
    });

    it('should respond with the newly created diary', function() {
      expect(newDiary.name).to.equal('New Diary');
      expect(newDiary.info).to.equal('This is the brand new diary!!!');
    });
  });

  describe('GET /api/diaries/:id', function() {
    var diary;

    beforeEach(function(done) {
      request(app)
        .get(`/api/diaries/${newDiary._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          diary = res.body;
          done();
        });
    });

    afterEach(function() {
      diary = {};
    });

    it('should respond with the requested diary', function() {
      expect(diary.name).to.equal('New Diary');
      expect(diary.info).to.equal('This is the brand new diary!!!');
    });
  });

  describe('PUT /api/diaries/:id', function() {
    var updatedDiary;

    beforeEach(function(done) {
      request(app)
        .put(`/api/diaries/${newDiary._id}`)
        .send({
          name: 'Updated Diary',
          info: 'This is the updated diary!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedDiary = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDiary = {};
    });

    it('should respond with the updated diary', function() {
      expect(updatedDiary.name).to.equal('Updated Diary');
      expect(updatedDiary.info).to.equal('This is the updated diary!!!');
    });

    it('should respond with the updated diary on a subsequent GET', function(done) {
      request(app)
        .get(`/api/diaries/${newDiary._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let diary = res.body;

          expect(diary.name).to.equal('Updated Diary');
          expect(diary.info).to.equal('This is the updated diary!!!');

          done();
        });
    });
  });

  describe('PATCH /api/diaries/:id', function() {
    var patchedDiary;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/diaries/${newDiary._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Diary' },
          { op: 'replace', path: '/info', value: 'This is the patched diary!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedDiary = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedDiary = {};
    });

    it('should respond with the patched diary', function() {
      expect(patchedDiary.name).to.equal('Patched Diary');
      expect(patchedDiary.info).to.equal('This is the patched diary!!!');
    });
  });

  describe('DELETE /api/diaries/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/diaries/${newDiary._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when diary does not exist', function(done) {
      request(app)
        .delete(`/api/diaries/${newDiary._id}`)
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
