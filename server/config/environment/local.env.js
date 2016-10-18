'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'https://bestdressed.herokuapp.com',
  SESSION_SECRET:   'meanApp-secret',

  FACEBOOK_ID:      '265761403819395',
  FACEBOOK_SECRET:  'dc128cb274a8fb8b5150b82df23753cc',

  TWITTER_ID:       '2339201730',
  TWITTER_SECRET:   'bM0MlIkP94sVQCEscopCkjvMKoOX3uF3W0ahAGNuj95BLkJBqd',

  keys:{
    access: 'AKIAINZITVNGQBZ7GPHA',
    secret: 'ACCESS_CODE',
    bucket: 'MY_AWS_BUCKET',
    region: 'us-west-1'
  },
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
