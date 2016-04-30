'use strict';

const appEvents = require('./app/events.js');
const authEvents = require('./auth/events.js');
const appApi = require('./app/api.js');
const appUi = require('./app/ui.js');

// On document ready
$(() => {
  appEvents.addHandlers();
  authEvents.addHandlers();
  appApi.getBars(appUi.getBarsSuccess, appUi.failure);
});
