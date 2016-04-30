'use strict';

const appEvents = require('./app/events.js');
const authEvents = require('./auth/events.js');
const appApi = require('./app/api.js');
const appUi = require('./app/ui.js');
const logic = require('./app/logic.js');

// On document ready
$(() => {
  appEvents.addHandlers();
  authEvents.addHandlers();
  appApi.getBars(appUi.getBarsSuccess, appUi.failure);
  $('#day-of-week').text(logic.today);
});
