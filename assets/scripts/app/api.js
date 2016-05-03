'use strict';

const app = require('../app-data.js');

const getProfile = (success, failure) => {
  console.log("Show profile request queued");
  $.ajax({
    method : 'GET',
    url : app.api + '/profiles/' + app.user.profile.id,
    headers: {
      Authorization: 'Token token=' + app.user.token
    }
  }).done(success).fail(failure);
};

const createProfile = (success, failure, data) => {
  console.log("Create new profile request queued");
  $.ajax({
    method : 'POST',
    url : app.api + '/profiles',
    processData : false,
    data,
    headers: {
      "content-type": "application/json",
    },
  }).done(success).fail(failure);
};

const updateProfile = (success, failure, data) => {
  console.log("Update profile request queued");
  $.ajax({
    method : 'PATCH',
    url : app.api + '/profiles/' + app.profile.id,
    processData : false,
    data,
    headers: {
      "content-type": "application/json",
      Authorization: 'Token token=' + app.user.token
    },
  }).done(success).fail(failure);
};

const getBars = (success, failure) => {
  console.log("Get bars request queued");
  $.ajax({
    method : 'GET',
    url : app.api + '/bars/'
  }).done(success).fail(failure);
};

const newFavorite = (success, failure, data) => {
  console.log("Add new favorite request queued");
  $.ajax({
    method : 'POST',
    url : app.api + '/favorites',
    processData : false,
    data,
    headers : {
      "content-type": "application/json",
      Authorization: 'Token token=' + app.user.token
    },
  }).done(success).fail(failure);
};

const removeFavorite = (success, failure, favID) => {
  console.log("Delete favorite request queued");
  $.ajax({
    method : 'DELETE',
    url : app.api + '/favorites/' + favID,
    headers : {
      Authorization: 'Token token=' + app.user.token
    },
  }).done(success).fail(failure);
};

const newReview = (success, failure, data) => {
  console.log("Add new review request queued");
  $.ajax({
    method : 'POST',
    url : app.api + '/reviews',
    processData : false,
    data,
    headers : {
      "content-type": "application/json",
      Authorization: 'Token token=' + app.user.token
    },
  }).done(success).fail(failure);
};

module.exports = {
  getProfile,
  getBars,
  createProfile,
  updateProfile,
  newFavorite,
  removeFavorite,
  newReview
};
