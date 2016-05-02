'use strict';

// const getFormFields = require('../../../lib/get-form-fields');

const authApi = require('./api.js');
const authUi = require('./ui.js');

const addHandlers = () => {
  $('#sign-up').on('submit', function (event) {
    let data = getFormFields(this);
    event.preventDefault();
    authApi.signUp(authUi.registerSuccess, authUi.regFail, data);
    $("#sign-up-modal").modal('hide');
    $(".modal-backdrop").hide();
  });
  $('#sign-in').on('submit', function(event) {
    let data = getFormFields(this);
    event.preventDefault();
    authApi.signIn(authUi.signInSuccess, authUi.signInFail, data);
    $("#log-in-modal").modal('hide');
    $(".modal-backdrop").hide();
  });
  $('#sign-out').on('submit', function(event) {
    event.preventDefault();
    authApi.signOut(authUi.signOutSuccess, authUi.failure);
    $("#sign-out-modal").modal('hide');
    $(".modal-backdrop").hide();
  });
  $('#change-pw').on('submit', function(event) {
    event.preventDefault();
    let data = getFormFields(this);
    console.log("change password clicked");
    authApi.changePW(authUi.changePWSuccess, authUi.changePWFail, data);
  });
};

module.exports = {
  addHandlers
};
