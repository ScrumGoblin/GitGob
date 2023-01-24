const User = require('../models/UserModel');
const client_id = '80b2e3ee86c7eb7b1145';
const client_secret = 'ce3830641f6f3a352a28108ac94b620269a433e0';
const redirectURI = 'http://localhost:3000/';
//lines 2-4 are REQUIRED variables for our oauth request to github.
//ensure that you set your redirectURI on your organization's github oauth app to localhost:3000 just like we did.
const userController = {
  createUser(req, res, next) {
    const { username, password } = req.body;
    const projectName = req.body.repo.name;

    const newUser = new User({ username, password, projectName });

    newUser.save((err, user) => {
      if (err) return next('Error in createUser middleware');
      res.locals.newUser = user;
      return next();
    });
  },
};

//.createUser is near the bottom of the page. sorry about that. remember that createUser is specifically for creating a new user in our db. so shouldn't necessarily do this every time a user has to reauthenticate with github, because the token expires after 8 hours but the user may already exist in db. so ya may want to play around with all that logic

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
    console.log('this is res locals token ' + parsedToken.access_token);
    res.cookie('accessToken', parsedToken.access_token, {
      httpOnly: true,
      maxAge: 7 * 60 * 60 * 1000,
    });
    //defining second cookie to know if http only cookie exists, which tells us user has logged in already
    res.cookie('accessCheck', 'dont delete', {
      maxAge: 7 * 60 * 60 * 1000,
    });
    return next();
  } catch (e) {
    return next({
      log: 'Error in getAccessToken',
      message: { err: e },
    });
  }
};

userController.getProject = (req, res, next) => {
  const { username, repo } = req.body;
  fetch(`https://api.github.com/repos/${username}/${repo}/pulls?state=all`, {
    headers: {
      Authorization: `token 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`,
    },
  })
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      res.locals.data = data;
      return next();
    })
    .catch((err) => console.log(err));
};

userController.getProjectsList = (req, res, next) => {
  const { username } = req.body;
  User.findOne({ username: username }) //can get two not sure why
    .then((data) => {
      res.locals.projects = data.projects;
      console.log(res.locals.projects);
      next();
    })
    .catch((err) => console.log(err));
};

userController.addProject = (req, res, next) => {
  console.log('got here');
  const { username, repo } = req.body;
  User.updateOne({ username: username }, { $addToSet: { projects: repo } })
    .then((data) => next())
    .catch((err) => console.log(err));
};

userController.getUsername = async (req, res, next) => {
  try {
    console.log(req.cookies.accessToken);
    const userInfo = await fetch('https://api.github.com/user', {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${req.cookies.accessToken}`,
      },
    });

    const parsedInfo = await userInfo.json();
    res.locals.username = parsedInfo.login;
    console.log(
      'this is the username in userController getUsername' +
        res.locals.username,
    );
    return next();
  } catch (e) {
    return next({ message: { err: 'Error getting username' } });
  }
};

userController.createUser = (req, res, next) => {
  const { username } = req.body;
  User.create({ username: res.locals.username })
    .then((data) => {
      res.locals.success = true;
      return next();
    })
    .catch((err) => {
      next(err);
    });
};

userController.validateUser = (req, res, next) => {
  const { username } = req.body;
  User.find({ username: username })
    .then((data) => {
      if (data.length === 1) res.locals.loggedIn = true;
      return next();
    })
    .catch((err) => next(err));
};

module.exports = userController;
