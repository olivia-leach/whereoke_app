'use strict';

const app = require('../app-data.js');
const logic = require('./logic.js');
const google = require('./google_map_add.js');
const appApi = require('./api.js');

const actionsOnLogOut = () => {
  // appApi.getBars(getBarsSuccess, failure);
  $('#log-in-menu-button').show();
  $('#sign-up-menu-button').show();
  $('#change-pw-menu-button').hide();
  $('.logged-out-link').show();
  $('#user-profile').hide();
  $('#bar-profile').hide();
  $('#sign-out-menu-button').hide();
  $('#user-profile-menu-button').hide();
  $('.logged-in-option').hide();
  $('html, body').animate({
    scrollTop: $("#")
  }, 1000);
  $('.map').animate({
        height: '+=20%'
    }, 1000);
  $('.carousel-content').animate({
        'height': '+=20%'
    }, 1000);
  $('.flag').animate({
    top: '-=35%'
  }, 1000);
};

const actionsOnLogIn = () => {
  $('#log-in-menu-button').hide();
  $('#sign-up-menu-button').hide();
  $('.logged-out-link').hide();
  $('#change-pw-menu-button').show();
  $('#user-profile').show();
  $('#bar-profile').show();
  $('#sign-out-menu-button').show();
  $('#user-profile-menu-button').show();
  $('.logged-in-option').show();
  $('.map').animate({
        height: '-=20%'
    }, 1000);
  $('.carousel-content').animate({
        height: '-=20%'
    }, 1000);
  $('.flag').animate({
    top: '+=35%'
  }, 1000);
};

const createProfileSuccess = (data) => {
  console.log(data);
  console.log('profile created');
  app.profile = data.profile;
};

const getProfileSuccess = (data) => {
  console.log('in getProfileSuccess');
  console.log(data);
  app.profile = data.profile;
  logic.calcYourRating();
  console.log(data);
  console.log('profile accessed');
  console.log(app.profile);
  logic.userProfile();
  logic.loadFavorites();
  logic.filterBarsOnDay();
  logic.loadBarCarousel();
  logic.addBarFavorite();
  $('#carousel-inner').children().first().toggleClass('active');
  $('#carousel-indicators').children().first().toggleClass('active');
  $("#sidebar-title").text(app.user.email);
};

const updateProfileSuccess = (data) => {
  console.log(data);
  console.log('profile updated');
  logic.userProfile();
};

const getBarsSuccess = (data) => {
  console.log(data);
  console.log('bars accessed');
  app.bars = data.bars;

  logic.calcAvgRating();

  console.log(app.bars);

  logic.filterBarsOnDay();
  logic.loadBarCarousel();
  logic.addBarFavorite();
  $('#carousel-inner').children().first().toggleClass('active');
  $('#carousel-indicators').children().first().toggleClass('active');
};

const success = (data) => {
  console.log(data);
  console.log('success');
};

const failure = (error) => {
  console.error(error);
};

module.exports = {
  failure,
  success,
  createProfileSuccess,
  getProfileSuccess,
  getBarsSuccess,
  updateProfileSuccess,
  actionsOnLogOut,
  actionsOnLogIn
};
