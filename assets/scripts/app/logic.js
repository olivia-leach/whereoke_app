'use strict';

const app = require('../app-data.js');
// const gameApi = require('./gameApi.js');

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

module.exports = {
  userProfile,
  loadFavorites
};
