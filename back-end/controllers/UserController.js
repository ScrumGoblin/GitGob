const db = require('../models/UserModel');
const client_id = '80b2e3ee86c7eb7b1145';
const userController = {};

userController.checkCode = async (req, res, next) => {
  try {
    console.log('checkCode fired');
    const { code } = req.query;
    const response = await fetch(
      'https://github.com/login/oauth/access_token/grant_type=code&client_id=80b2e3ee86c7eb7b1145',
      { method: 'POST', body: code },
    );
    console.log('response', response);
    const { access_token } = response;
    res.locals.token = access_token;
    console.log('access token', access_token);
    return next();
  } catch {
    return next(err);
  }
};

module.exports = userController;
