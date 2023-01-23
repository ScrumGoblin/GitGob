const db = require('../models/UserModel');
const client_id = '80b2e3ee86c7eb7b1145';
const client_secret = 'ce3830641f6f3a352a28108ac94b620269a433e0';
const redirectURI = 'http://localhost:3000/';
const userController = {};

userController.getAccessToken = async (req, res, next) => {
  try {
    const params =
      '?client_id=' +
      client_id +
      '&client_secret=' +
      client_secret +
      '&code=' +
      req.query.code +
      '&redirect_uri=' +
      redirectURI;

    const token = await fetch(
      'https://github.com/login/oauth/access_token' + params,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      },
    );

    const parsedToken = await token.json();
    res.locals.token = parsedToken;
    return next();
  } catch (e) {
    return next({
      log: 'Error in getAccessToken',
      message: { err: e },
    });
  }
};

//Boilerplate for querying
userController.getUserData = async (req, res, next) => {
  try {
    req.get('Authorization');
    const userData = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        Authorization: req.get('Authorization'),
      },
    });
    res.locals.userData = userData;
    return next();
  } catch (e) {
    return next({
      log: 'Error in getUserData',
      message: { err: e },
    });
  }
};

module.exports = userController;
