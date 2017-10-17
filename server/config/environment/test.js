'use strict';
/*eslint no-process-env:0*/

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://bpms.everteam.us/dcmisomocks-test'
  },

  bpm : {
    uri: 'http://bpms.everteam.us/everteam/'
  },

  api: {
    uri: 'http://bpms.everteam.us'
  },
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'test.sqlite',
      define: {
        timestamps: false
      }
    }
  }
};
