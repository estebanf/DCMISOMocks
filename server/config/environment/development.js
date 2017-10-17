'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/dcmisomocks'
  },

  api: {
    uri: 'http://localhost:3005/'
  },

  bpm: {
    uri: 'http://localhost:8080/everteam/'
  },
  // Seed database on startup
  seedDB: true

};
