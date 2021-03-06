'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'meanApp-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  keys:{
    access: process.env.access,
    secret: process.env.secret,
    bucket: process.env.bucket,
    region: process.env.region
  },

  facebook: {
    clientID:     process.env.FACEBOOK_ID || '265761403819395',
    clientSecret: process.env.FACEBOOK_SECRET || 'dc128cb274a8fb8b5150b82df23753cc',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },

  twitter: {
    clientID:     process.env.TWITTER_ID || 'LAZzEDu3FlTr94ioCMgHZsqJ3',
    clientSecret: process.env.TWITTER_SECRET || 'bM0MlIkP94sVQCEscopCkjvMKoOX3uF3W0ahAGNuj95BLkJBqd',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
  },

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
