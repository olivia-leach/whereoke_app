'use strict';

const appApi = require('./api.js');
const appUi = require('./ui.js');

const addHandlers = () => {
  // Closes the sidebar menu
  $("#menu-close").click(function(e) {
      e.preventDefault();
      $("#sidebar-wrapper").toggleClass("active");
  });

  // Opens the sidebar menu
  $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#sidebar-wrapper").toggleClass("active");
  });

  // Get fav bars button clicked
  $('#get-bars').click(function(event) {
    event.preventDefault();
    appApi.getProfile(appUi.getProfileSuccess, appUi.fail);
  })
};

module.exports = {
  addHandlers
};
