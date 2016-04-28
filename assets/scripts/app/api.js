'use strict';

const app = require('./app-data.js');

const index = (success, failure) => {
  console.log("Get games request queued");
  $.ajax({
    method : 'GET',
    url : app.api + '/games',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  }).done(success).fail(failure);
};

const create = (success, failure) => {
  console.log("Create new game request queued");
  $.ajax({
    method : 'POST',
    url : app.api + '/games',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  }).done(success).fail(failure);
};

const update = (success, failure, data) => {
  console.log("Update game request queued");
  $.ajax({
    method : 'PATCH',
    url : app.api + '/games/' + app.game.id,
    processData : false,
    data,
    headers : {
      Authorization : "Token token=" + app.user.token,
      "content-type": "application/json",
    },
  }).done(success).fail(failure);
};

module.exports = {
  index,
  create,
  update
};
