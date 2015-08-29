'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'rideshare-secret',

  FACEBOOK_ID:      '119590025043593',
  FACEBOOK_SECRET:  '755d2ee40c8675e50d8d8984d8556e77',

  TWITTER_ID:       'app-id',
  TWITTER_SECRET:   'secret',

  GOOGLE_ID:        '9260197397-rkjfm7op9hividvjc66rurtsiepbn332.apps.googleusercontent.com',
  GOOGLE_SECRET:    'HG0l4ubad9j7CyliYiVI-i5g',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
