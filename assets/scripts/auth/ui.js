'use strict';

const app = require('../app-data.js');
const appApi = require('../app/api.js')
const appUi = require('../app/ui.js')

const signOutSuccess = (data) => {
  app.user = data;
  console.log("logged out");
  console.log(app);
};

const signInSuccess = (data) => {
  console.log(data);
  app.user = data.user;
  console.log(app.user);
  console.log(data.user.email + " logged in");
  appApi.getProfile(appUi.getProfileSuccess, appUi.failure);
  appApi.getBars(appUi.getBarsSuccess, appUi.failure);
};

// const changePWSuccess = () => {
//   console.log("password successfully changed");
//   $("#change-pw-modal").modal('hide');
//   $(".modal-backdrop").hide();
//   $("#success-pw-modal").modal('show');
// };

const registerSuccess = (data) => {
  console.log("registration successful");
  $("#sign-up-modal").modal('hide');
  $("#success-reg-modal").modal('show');
  app.user = data.user;
  console.log(data.user);
  let newUserID = '{ "profile": { "user_id":' + app.user.id + ' } }';
  appApi.createProfile(appUi.createProfileSuccess, appUi.failure, newUserID);
};

const success = (data) => {
  console.log(data);
};

const signInFail = (error) => {
  console.error(error);
  $("#log-in-modal").modal('hide');
  $("#log-in-fail-modal").modal('show');
};

const regFail = (error) => {
  console.error(error);
  $("#sign-up-modal").modal('hide');
  $("#reg-fail-modal").modal('show');
};

const failure = (error) => {
  console.error(error);
};

module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  // changePWSuccess,
  registerSuccess,
  signInFail,
  regFail
};
