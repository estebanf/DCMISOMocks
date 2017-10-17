'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost/dcmisomocks'
  },

  api: {
    uri: process.env.API_URI || 'http://localhost:3005/'
  },

  bpm: {
    uri: process.env.BPM_URI || 'http://192.168.241.200:8080/everteam/'
  },
  // Seed database on startup
  seedDB: false

};
