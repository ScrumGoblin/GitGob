require('dotenv').config()
const User = require('../models/UserModel')
const client_id = '80b2e3ee86c7eb7b1145';
const client_secret = 'ce3830641f6f3a352a28108ac94b620269a433e0';
const redirectURI = 'http://localhost:3000/';

const userController = {
    createUser (req,res, next){
        const {username, password} = req.body;
        const projectName = req.body.repo.name; 

        const newUser = new User({username, password, projectName}); 
        
        newUser.save((err, user) => {
            if (err) return next('Error in createUser middleware');
            res.locals.newUser = user; 
            return next();
        })
    }
}; 
/*-----------------------------------------------------------------------------
-------------------------------------------------------------------------------*/
//OAuth
//get access token helper function
userController.getAccessToken = async (req, res, next) => {
  try {
    const { code } = req.query
    const body = {
      client_id: process.env.GH_ID,
      client_secret: process.env.SECRET,
      code
    }
    let response = await fetch('https://github.com/login/oauth/access_token', {
      method:'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    const data = await response.json()
    const params = new URLSearchParams(data)
    res.locals.token = params.get('access_token')
    return next();
  }
  catch (err) {
    return next({
      log: 'Error in getAccessToken',
      message: { err: err },
    });
  }
}

//grab github user
userController.getGitHubUser = async (req, res, next) => {
  try {
    const request = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `bearer ${res.locals.token}`
      }
    })
    const data = await request.json()
    res.locals.userData = data
    return next();
  }
  catch (err) {
    return next({
      log: 'Error in getGitHubUser',
      message: { err: err },
    });
  }
}

//stores user auth in database or update user token in database
userController.storeUser = (req, res, next) => {
  if(!res.locals.userData) return next({
    log: 'user does not exist with github',
    message: {err: 'error at app.get .github/callback'}
  })
  User.findOne({ username: res.locals.userData.login })
    .then(data => {
      if (!data.username) {
        User.create({ username: res.locals.userData.login, token: res.locals.token })
          .then(data => {
            res.locals.user = data._id
            return next();
          })
          .catch(error => {
            return next({
              log: 'storeUser - Create: Error with storing new user in database',
              message: {err: error}
            })
          })
      }
      else if (res.locals.token !== data.token) {
        User.findOneAndUpdate({ username: res.locals.userData.login }, { token: res.locals.token })
          .then(data => {
            res.locals.user = data._id
            return next();
          })
          .catch(error => {
            return next({
              log: 'storeUser - update: Error with updating token for user in database',
              message: {err: error}
            })
          })
      }
      else {
        res.locals.user = data._id
        return next();
      }
    })
    .catch(error => {
      return next({
        log: 'storeUser - Find: Error with finding user in database',
        message: {err: error}
      });
    })
}

//grabs user data from db based on cookie id
userController.getUser = (req, res, next) => {
  const { session } = req.cookies
  User.findOne({ _id: session })
    .then(data => {
      res.locals.username = { name: data.username }
      return next();
    })
    .catch(error => {
      return next({
        log: 'getUser - Find: Error with finding user in database',
        message: {err: error}
      });
    })
}

/*-----------------------------------------------------------------------------
-------------------------------------------------------------------------------*/

// userController.getAccessToken = async (req, res, next) => {
//   try {
//     const params =
//       '?client_id=' +
//       client_id +
//       '&client_secret=' +
//       client_secret +
//       '&code=' +
//       req.query.code +
//       '&redirect_uri=' +
//       redirectURI;

//     const token = await fetch(
//       'https://github.com/login/oauth/access_token' + params,
//       {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//         },
//       },
//     );

//     const parsedToken = await token.json();
//     res.locals.token = parsedToken;
//     return next();
//   } catch (e) {
//     return next({
//       log: 'Error in getAccessToken',
//       message: { err: e },
//     });
//   }
// };

userController.getProject = (req, res, next) => {
    const { username, repo } = req.body;
    fetch(`https://api.github.com/repos/${username}/${repo}/pulls?state=all`, {
        headers: {
            'Authorization': `token ${process.env.TOKEN}`
          }
    })
    .then(data => data.json())
    .then(data => {
        console.log(data)
        res.locals.data = data;
        return next();
    })
    .catch(err => console.log(err));

}

userController.getProjectsList = (req, res, next) => {
    const { username } = req.body;
    User.findOne({username: username}) //can get two not sure why
        .then((data) => {
            res.locals.projects = data.projects;
            console.log(res.locals.projects)
            next();
        })
        .catch(err => console.log(err));
};

userController.addProject = (req, res, next) => {
    console.log('got here')
    const { username, repo } = req.body;
    User.updateOne(
        { username: username },
        { $addToSet: { projects: repo}})
    .then((data) => next())
    .catch(err => console.log(err))
}

userController.createUser = (req,res,next) => {
    const {username} = req.body;
    User.create({username: username})
    .then((data) => {
        res.locals.success = true;
        return next();
    })
    .catch(err => {
        next(err)});
}

userController.validateUser = (req, res, next) => {
    const {username} = req.body;
    User.find({username: username})
        .then((data) => {
            console.log(data)
            if (data.length === 1) res.locals.loggedIn = true; //NEED TO EDIT THIS STATEMENT
            return next();
        })
        .catch(err => next(err));
}

module.exports = userController;

