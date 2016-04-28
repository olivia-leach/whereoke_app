'use strict';

const appEvents = require('./app/events.js');
// const authEvents = require('./auth/events.js');

// On document ready
$(() => {
  appEvents.addHandlers();
  // authEvents.addHandlers();
  // $("#signOutButton").hide();
  // $("#welcome").hide();
  // $("#log-in-modal").modal('show');
});
