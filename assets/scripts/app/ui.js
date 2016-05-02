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
  console.log(data);
  console.log('profile accessed');
  app.profile = data.profile;
  console.log(app.profile);
  logic.userProfile();
  logic.loadFavorites();
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
  console.log(app.bars);
  logic.filterBarsOnDay();
  logic.loadBarCarousel();
  $('#carousel-inner').children().first().toggleClass('active');
  $('#carousel-indicators').children().first().toggleClass('active');
};

const success = (data) => {
  console.log(data);
  console.log('profile created');
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
