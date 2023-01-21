const db = require('../models/userModels');

const userController = {};

userController.github = (req, res, next) => {
  res.redirect('https://github.com/');
  // next()
  return next();
};

module.exports = userController;
