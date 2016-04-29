'use strict';

const app = require('../app-data.js');

const createProfileSuccess = (data) => {
  console.log(data);
  console.log('profile created')
};

const getProfileSuccess = (data) => {
  console.log(data);
  console.log('profile accessed');
  app.profile = data.profile;
  console.log(app.profile)
};

const success = (data) => {
  console.log(data);
  console.log('profile created');
};

const failure = (error) => {
  console.error(error);
};

module.exports = {
  failure,
  success,
  createProfileSuccess,
  getProfileSuccess
};
