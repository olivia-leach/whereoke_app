'use strict';

const app = require('../app-data.js');
const logic = require('./logic.js');
const google = require('./google_map_add.js');

const createProfileSuccess = (data) => {
  console.log(data);
  console.log('profile created');
  app.profile = data.profile;
};

const getProfileSuccess = (data) => {
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
  updateProfileSuccess
};
