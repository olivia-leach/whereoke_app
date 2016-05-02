'use strict';

const app = require('../app-data.js');
const google = require('./google_map_add.js');
const appApi = require('./api.js');
const appUi = require('./ui.js');

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = daysOfWeek[(new Date()).getDay()];

const filterBarsOnDay = () => {
  let allBars = app.bars;
  let barsToday = [];
  for (let i = 0; i < allBars.length; i++) {
    if (allBars[i].nights.includes(today) ) {
      barsToday.push(allBars[i]);
    }
  }
  app.barsByDay = barsToday;
  console.log(app.barsByDay);
  google.mapGeocoder();
};

const userProfile = () => {

  if(app.profile.username === null) {
    app.profile.username = app.user.email;
  }

  if(app.profile.pic === null) {
    app.profile.pic = 'glyphicon glyphicon-user';
  }

  $('#user-icon').empty().prepend('<span class="' + app.profile.pic + ' user-image" aria-hidden="true"></span>');
  $('#user-name').text(app.profile.username);

};

const loadFavorites = () => {
  console.log('loading favorites...');
  let data = app.profile.fav_bars;
  console.log(data);
  let listingTemplate = require('../templates/listing.handlebars');
  $('.favorites-content').children().remove();
  $('.favorites-content').append(listingTemplate({
    data
  }));
};

const loadBarCarousel = () => {
  console.log('loading bar carousel...');
  let data = app.barsByDay;
  console.log(data);
  let listingTemplate = require('../templates/bar-carousel.handlebars');
  $('.carousel-content').children().remove();
  $('.carousel-content').append(listingTemplate({
    data
  }));
};

const newFavSuccess = (data) => {
  console.log(data);
  console.log('New favorite added');
  app.profile.fav_bars.unshift(app.bars[data.favorite.bar_id - 1]);
  loadFavorites();
};

const failure = (error) => {
  console.error("This bar is already in your favorites.");
};

const addBarFavorite = () => {
  $('.add-favorite').on('submit', function (event) {
    event.preventDefault();
    let data = getFormFields(this);
    let dataJSON = '{ "favorite": { "bar_id": ' + data.favorite.bar_id + ', "profile_id":' + app.profile.id + ' } }';
    appApi.newFavorite(newFavSuccess, failure, dataJSON);
    $(".add-favorites-modal").modal('hide');
    $(".modal-backdrop").hide();
  });
};

module.exports = {
  userProfile,
  loadFavorites,
  filterBarsOnDay,
  today,
  loadBarCarousel,
  addBarFavorite
};
