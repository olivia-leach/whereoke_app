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
  // google.mapGeocoder();
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

  for (let i = 0; i < data.length; i++) {
    let bar = data[i];
    bar.yourRatingHearts = '';
    bar.yourRating = app.bars[app.profile.fav_bars[i].id - 1].yourRating;
    for (let i = 0; i < bar.yourRating; i++) {
      bar.yourRatingHearts += "<span class='glyphicon glyphicon-heart'></span>";
    }
    for (let i = 0; i < 5 - bar.yourRating; i++) {
      bar.yourRatingHearts += "<span class='grey-heart'><span class='glyphicon glyphicon-heart'></span></span>";
    }
  }

  console.log(data);

  let listingTemplate = require('../templates/listing.handlebars');
  $('.favorites-content').children().remove();
  $('.favorites-content').append(listingTemplate({
    data
  }));
  $('#edit-favorites').on('click', function(event) {
    event.preventDefault();
    $('.btn-delete-bar').show();
    $(this).hide();
    $('#done-edit-favorites').show();
  });
  $('#done-edit-favorites').on('click', function(event) {
    event.preventDefault();
    $('.btn-delete-bar').hide();
    $(this).hide();
    $('#edit-favorites').show();
  });
  removeBarFavorite();
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
  if (app.user) {
    $('.logged-in-option').show();
  }
  $('.add-review').on('submit', function (event) {
    event.preventDefault();
    let data = getFormFields(this);
    console.log(data);
    let dataJSON =
    '{ "review": { "bar_id": ' + data.review.bar_id + ', "profile_id":' + app.profile.id + ' , "comment": "' + data.review.comment + '", "rating": ' + parseInt(data.review.rating) + '} }';
    console.log(dataJSON);
    appApi.newReview(newReviewSuccess, newReviewFailure, dataJSON);
    $(".write-review-modal").modal('hide');
    $(".modal-backdrop").hide();
  });
};

const getProfileSuccess = (data) => {
  app.profile = data.profile;
  calcYourRating();
  calcAvgRating();
  console.log(data);
  console.log('profile accessed');
  console.log(app.profile);
  userProfile();
  loadFavorites();
  filterBarsOnDay();
  loadBarCarousel();
  $('#carousel-inner').children().first().toggleClass('active');
  $('#carousel-indicators').children().first().toggleClass('active');
  $("#sidebar-title").text(app.user.email);
};

const updateBarsSuccess = (data) => {
  console.log(data);
  app.bars = data.bars;
  appApi.getProfile(getProfileSuccess, getProfilefailure);
  console.log('bars updated');
};

const updateBarFailure = (data) => {
  console.error(data);
  console.log('Error updating bars');
};

const getProfilefailure = (data) => {
  console.error(data);
  console.log('Error getting profile');
};

const newReviewSuccess = (data) => {
  console.log(data);
  console.log('New review added');
  appApi.getBars(updateBarsSuccess, updateBarFailure);
};

const newReviewFailure = (data) => {
  console.error(data);
  console.log('Error submitting review');
};

const removeFavSuccess = () => {
  console.log('favorite removed');
  // appApi.getProfile(getProfileSuccess, getProfilefailure);
  for (let i = 0; i < app.profile.fav_bars.length; i++) {
    if (app.profile.fav_bars[i].id == app.removedBar) {
      app.profile.fav_bars.splice(i, 1);
    }
  }
  console.log('reloading favorites...');
  let data = app.profile.fav_bars;
  let listingTemplate = require('../templates/just-favs.handlebars');
  $('.list-of-favs').children().remove();
  $('.list-of-favs').append(listingTemplate({
    data
  }));
};

const removeFavfailure = (error) => {
  console.error(error);
};

const newFavSuccess = (data) => {
  console.log(data);
  console.log('New favorite added');
  app.profile.favorites.unshift(data.favorite);
  console.log(app.profile.favorites);
  app.profile.fav_bars.unshift(app.bars[data.favorite.bar_id - 1]);
  loadFavorites();
};

const newFavfailure = (error) => {
  console.error("This bar is already in your favorites.");
  $("#fav-fail-modal").modal('show');
};

const addBarFavorite = () => {
  $('.add-favorite').on('submit', function (event) {
    event.preventDefault();
    let data = getFormFields(this);
    let dataJSON = '{ "favorite": { "bar_id": ' + data.favorite.bar_id + ', "profile_id":' + app.profile.id + ' } }';
    appApi.newFavorite(newFavSuccess, newFavfailure, dataJSON);
    $(".add-favorites-modal").modal('hide');
    $(".modal-backdrop").hide();
  });
};

const removeBarFavorite = () => {
  $('.remove-favorite').on('submit', function (event) {
    event.preventDefault();
    let data = getFormFields(this);
    app.removedBar = data.favorite.bar_id;
    let fav_id;
    for (let i = 0; i < app.profile.favorites.length; i++) {
      if (app.profile.favorites[i].bar_id == data.favorite.bar_id) {
        fav_id = app.profile.favorites[i].id;
      }
    }
    appApi.removeFavorite(removeFavSuccess, removeFavfailure, fav_id);
    $(".remove-favorites-modal").modal('hide');
    $(".modal-backdrop").hide();
  });
};

const calcAvgRating = () => {
  for (let i = 0; i < app.bars.length; i++) {
    let bar = app.bars[i];
    let sum = 0;
    bar.avgRatingHearts = '';
    if (bar.reviews.length > 0) {
      for (let i = 0; i < bar.reviews.length; i++) {
        sum += bar.reviews[i].rating;
      }
      bar.avgRating = Math.round(sum / bar.reviews.length);
      for (let i = 0; i < bar.avgRating; i++) {
        bar.avgRatingHearts += "<span class='glyphicon glyphicon-heart'></span>";
      }
      for (let i = 0; i < 5 - bar.avgRating; i++) {
        bar.avgRatingHearts += "<span class='grey-heart'><span class='glyphicon glyphicon-heart'></span></span>";
      }
    }
  }
};

const calcYourRating = () => {
  for (let i = 0; i < app.bars.length; i++) {
    let bar = app.bars[i];
    bar.yourRatingHearts = '';
    if (bar.reviews.length > 0) {
      for (let i = 0; i < bar.reviews.length; i++) {
        if (bar.reviews[i].profile_id === app.profile.id) {
          bar.yourRating = bar.reviews[i].rating;
          for (let i = 0; i < bar.yourRating; i++) {
            bar.yourRatingHearts += "<span class='glyphicon glyphicon-heart'></span>";
          }
          for (let i = 0; i < 5 - bar.yourRating; i++) {
            bar.yourRatingHearts += "<span class='grey-heart'><span class='glyphicon glyphicon-heart'></span></span>";
          }
        }
      }
    }
  if (bar.fav_profiles.length > 0) {
    for (let i = 0; i < bar.fav_profiles.length; i++) {
      if (bar.fav_profiles[i].id === app.profile.id) {
        bar.favorite = true;
      }
    }
  }
  }
};

module.exports = {
  userProfile,
  loadFavorites,
  filterBarsOnDay,
  today,
  loadBarCarousel,
  addBarFavorite,
  removeBarFavorite,
  calcAvgRating,
  calcYourRating
};
