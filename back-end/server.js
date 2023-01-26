const path = require('path');
const express = require('express');
const app = express();
const PORT = 3088;
const cors = require('cors')
const cookieParser = require('cookie-parser')

const userController = require('./controllers/UserController');


app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())
app.use(cors())

// app.use((req, res, next) => {         //Put in for development REMOVE.
//   res.append('Access-Control-Allow-Origin', ['*']);
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.append('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });
//Serve static files 
// app.use(express.static(path.resolve(__dirname, '../build')));
app.get('/getAccessToken', userController.getAccessToken, (req, res) => {
  res.setHeader('Set-Cookie', [`accessToken=${res.locals.token}; Http-Only; Max-Age:28800`]);
  res.status(200).json(res.locals.token);
});

app.post('/create-user', userController.createUser, (req, res) => {
  return res.json({success: res.locals.success});
})

app.post('/login', userController.validateUser, (req, res) => {
  return res.json({loggedIn: res.locals.loggedIn});
})

app.post('/getdata', userController.getProject, (req, res) => {
  return res.status(200).json(res.locals.data);
})

app.post('/getprojects', userController.getProjectsList, (req, res) => {
  return res.json({projects: res.locals.projects})
})

app.post('/addproject', userController.addProject, (req, res) => {
  return res.json({success: true});
})

//OAuth implementation

//callback for return token from github after success login
app.get('/github/callback', userController.getAccessToken, userController.getGitHubUser, userController.storeUser, (req, res) => {
  res.cookie('session', res.locals.user)
  res.status(200).redirect('http://localhost:3000/')
})

//redirects user to Github sign in page
app.get('/github', (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GH_ID}&redirect_uri=http://localhost:3088/github/callback`
  res.redirect(url)
})

//validate cookie
app.post('/cookie/login', userController.getUser, (req, res) => {
  res.status(200).json(res.locals.username)
})

//Global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
  });
  
  module.exports = app;