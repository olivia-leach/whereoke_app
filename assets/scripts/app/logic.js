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

  $('#user-image-holder').empty();
  $('#user-image-holder').prepend('<span class="' + app.profile.pic + ' user-image" aria-hidden="true"></span>');
  $('#user-name').text(app.profile.username);

}

module.exports = {
  userProfile
};
