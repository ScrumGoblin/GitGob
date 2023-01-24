const path = require('path');
const express = require('express');
const app = express();
const PORT = 3088;
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userController = require('./controllers/UserController');

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors());
//SAME COMMENT CAN BE FOUND IN LOGIN FILE ON FRONTEND
//Hello, and welcome to the logic for the OAuth section. Unfortunately, we weren't able to migrate this logic into our final presentation, but here is a layout of everything we've implemented, the overall purpose of this branch, and the idea we had for merging all this logic:
//So first, please not that this branch has minor updates to the webpack. You will need THIS version's webpack. As stated, it's very minor, but you will indeed need the proxy set up on the webpack (we didn't do this previously) in order to be able to set cookies from a different domain (3080 server setting cookies onto frontend 3000). Otherwise...CORS. That's all we changed here, so it shouldn't break anything and it should be updated.
//We also have a few packages on the backend that aren't on the version from our presentation, including cookie parser. You will need these as well. So make sure to get all the stuff from the pkg json in the backend file.
//The only files we touched that will be different from our presentation branch (now it's dev - wasn't at the time of presentation) are this server file, the webpack here in front end, the UserController file on the backend, pkg jsons  on backend, and the login file on the frontend.
//What we've done is implemented GitHub OAuth. When we get to this login page , click the BOTTOM login button. This will send you to github to authorize our app to make API requests on your account (the user who authorizes us)
//The purpose of this is to be able to access private repos and make this app actually real world usable. Currently, we presented with just being able to access public repos from one account.
// With our oAuth logic, you login w/ github, grant our app permissions, and then get redirected back to login page. In this whole process, we store the access token (meant to be a secret) on an http only cookie which is unreadable by javascript on the front end. //Also during this process, we make a fetch request to github to get your user data (associated with your unique token that you got when you authorized our app) ... and store it in the Mongo DB. Rn we're just grabbing your username
//Because we can't read http only cookies w/ javascript from the front end to identify if it's there/exists, we created a NON http cookie at the same time. We check to see if the NON http only cookie exists from the front end. If it exists, we know the http only cookie with the access token exists. So we know that we should be able to access this token from the backend to make future API calls.

//So the idea was that if this token exists, redirect the user to the next page (projects page). If not, make them sign in with github.
//Because we've stored your username already, we should be able to store the specific project info you want to track in the database and load it based on your username.
//There is a bug with our conditional logic after you login with github....If you delete the cookies , leave the page (not refesh) and come back, your access token cookie will be undefined. Have fun with that.
//*Note that the access token granted by github expires after 8 hours. So we set our NON http cookie to expire after 7 hours. Current logic states that if the non http cookie doesn't exist, user has to once again authorize/sign in with github.

//Have fun! Lots of stuff has been tee'd up and we're very excited to see how you run with it!

// app.use((req, res, next) => {         //Put in for development REMOVE.
//   res.append('Access-Control-Allow-Origin', ['*']);
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.append('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });
//Serve static files
// app.use(express.static(path.resolve(__dirname, '../build')));

//Most of the commented out **code** is stuff we aren't using . At least in our specific oAuth logic here.
//  So just pay attention to getAccessToken and readCookie (which gets the username after we have the access token and creates a user in our db...this is all functioning properly as of now...in theory)

app.get('/getAccessToken', userController.getAccessToken, (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.status(200).json('Successfully logged in with Github');
});
//I know, I know, we're using cors() above.  For some reason we still had to set these headers. Idk.

app.get(
  '/readCookie',
  userController.getUsername,
  userController.createUser,
  (req, res) => {
    res.status(200).json({ success: res.locals.success });
  },
);

// app.post('/create-user', userController.createUser, (req, res) => {
//   return res.json({ success: res.locals.success });
// });

app.post('/login', userController.validateUser, (req, res) => {
  return res.json({ loggedIn: res.locals.loggedIn });
});

app.post('/getdata', userController.getProject, (req, res) => {
  return res.status(200).json(res.locals.data);
});

app.post('/getprojects', userController.getProjectsList, (req, res) => {
  return res.json({ projects: res.locals.projects });
});

app.post('/addproject', userController.addProject, (req, res) => {
  return res.json({ success: true });
});

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
