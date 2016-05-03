'use strict';

const app = require('../app-data.js');
const appApi = require('./api.js');
const appUi = require('./ui.js');
const logic = require('./logic.js');

const addHandlers = () => {
  // Closes the sidebar menu
  $('#menu-close').click(function(e) {
      e.preventDefault();
      $('#menu-toggle').show();
      $('#sidebar-wrapper').toggleClass('active');
  });

  // Opens the sidebar menu
  $('#menu-toggle').click(function(e) {
      e.preventDefault();
      $('#menu-toggle').hide();
      $('#sidebar-wrapper').toggleClass('active');
  });

  $('.icon-option').click(function() {
    $('.icon-option').addClass('clear');
    $(this).removeClass('clear');
    $(this).addClass('clicked');
    console.log('icon clicked');
    app.profile.newIcon = $(this).children(":first").attr("class");
  });

  $('#btn-new-icon').on('click', function(e) {
    e.preventDefault();
    console.log('new icon submit button clicked');
    app.profile.pic = app.profile.newIcon;
    let data = '{ "profile": { "pic": "' + app.profile.pic + '" } }';
    appApi.updateProfile(appUi.updateProfileSuccess, appUi.failure, data);
  });

  $('#edit-profile').on('click', function(e) {
    e.preventDefault();
    $('.update-profile-links').css("visibility", "visible");
    $(this).hide();
    $('#done-edit-profile').show();
  });

  $('#done-edit-profile').on('click', function(e) {
    e.preventDefault();
    $('.update-profile-links').css("visibility", "hidden");
    $(this).hide();
    $('#edit-profile').show();
  });

  $('.alt-day').on('click', function(e) {
    e.preventDefault();
    let altDay = $(this).text();
    $('#day-of-week').text(altDay);
    logic.selectAltDay(altDay);
    logic.reloadBarCarousel();
  });

};

module.exports = {
  addHandlers
};
