'use strict';

const app = require('./app-data.js');
const gameApi = require('./gameApi');
const gameUi = require('./game-ui');

const signOutSuccess = (data) => {
  app.user = data;
  console.log("logged out");
  console.log(app);
  $("#log-in-modal").modal('show');
  $("#log-in-here").show();
  $("#new-game").hide();
  $("#signInButton").show();
  $("#registerButton").show();
  $("#signOutButton").hide();
  $("#welcome").hide();
  $('.square > img').remove();
  $("#gameOver").fadeOut();
  $("#xWins").fadeOut();
  $("#oWins").fadeOut();
  $("#catWins").fadeOut();
  $('#x-score-num > img').remove();
  $('#o-score-num > img').remove();
  $('#cat-score-num > img').remove();
  $("#x-score-num").append('<img src="assets/images/zero.png" class="score-num"/>');
  $("#o-score-num").append('<img src="assets/images/zero.png" class="score-num"/>');
  $("#cat-score-num").append('<img src="assets/images/zero.png" class="score-num"/>');
  $('#clear-score').css('pointer-events', 'none');
  $('#game-history').css('pointer-events', 'none');
  $('#new-game > img').remove();
  $("#new-game").prepend('<img class="new-game-img" src="assets/images/newGame.png" />');
  $("#gamesPlayed").text("-");
  $("#gamesWon").text("-");
  $("#percent").text("-");
};

const signInSuccess = (data) => {
  app.user = data.user;
  app.xWins = 0;
  app.oWins = 0;
  app.catWins = 0;
  console.log(app.user);
  console.log(data.user.email + " logged in");
  $("#signInButton").hide();
  $("#new-game").fadeIn();
  $("#registerButton").hide();
  $("#log-in-here").hide();
  $("#signOutButton").show();
  $("#welcome").show();
  $("#user-name").text(app.user.email);
  $('#clear-score').css('pointer-events', 'all');
  $('#game-history').css('pointer-events', 'all');
  gameApi.index(gameUi.indexGameSuccess, gameUi.failure);
};

const changePWSuccess = () => {
  console.log("password successfully changed");
  $("#change-pw-modal").modal('hide');
  $(".modal-backdrop").hide();
  $("#success-pw-modal").modal('show');
};

const registerSuccess = () => {
  console.log("registration successful");
  $("#sign-up-modal").modal('hide');
  $("#success-reg-modal").modal('show');
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
  changePWSuccess,
  registerSuccess,
  signInFail,
  regFail
};
