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

const updateBarsSuccess = (data) => {
  console.log(data);
  console.log('bars updated');
  app.bars = data.bars;
  calcAvgRating();
  filterBarsOnDay();
  loadBarCarousel();
  $('#carousel-inner').children().first().toggleClass('active');
  $('#carousel-indicators').children().first().toggleClass('active');
}

const updateBarFailure = (data) => {
  console.error(error);
  console.log('Error updating bars');
};

const newReviewSuccess = (data) => {
  console.log(data);
  console.log('New review added');
  appApi.getBars(updateBarsSuccess, updateBarFailure);
};

const newReviewFailure = (data) => {
  console.error(error);
  console.log('Error submitting review');
};

const removeFavSuccess = () => {
  console.log('Favorite removed');
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
  calcAvgRating
};
