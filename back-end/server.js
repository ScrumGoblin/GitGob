const path = require('path');
const express = require('express');
const app = express();
const PORT = 8080;
const userController = require('/Users/kbud93/projects/Goblin/back-end/controllers/UserController.js');
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const client_id = '80b2e3ee86c7eb7b1145';
const client_secret = 'ce3830641f6f3a352a28108ac94b620269a433e0';
const redirectURI = 'http://localhost:8080/oauth-callback/code?';

app.get('/getAccessToken', async (req, res) => {
  console.log(
    req.query.code + 'THIS IS THE REQ QUERY CODE IN GET ACCESS TOKEN',
  );
  const params =
    '?client_id=' +
    client_id +
    'client_secret=' +
    client_secret +
    '&code=' +
    req.query.code;

  const token = await fetch(
    'https://github.com/login/oauth/access_token' + params,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
  );
  console.log(token);
  res.status(200).json(token);
});

app.get('/getUserData', async (req, res) => {
  req.get('Authorization');
  const userData = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: req.get('Authorization'),
    },
  });
  console.log(userData);
  res.json(userData);
});
//Serve static files
// app.use(express.static(path.resolve(__dirname, '../build')));
// app.get('/?:code', userController.checkCode, (req, res) => {
//   console.log('hi mom');
//   res.redirect('projects');
// });
// get login page
// app.get('/', (req, res) => {
//   return res.sendStatus(200);
// });

// get sign up page
app.get('/signup', (req, res) => {
  return res.sendStatus(200);
});

// post sign up info
app.post('/signup', (req, res) => {
  return res.sendStatus(200);
});

// login
app.post('/', (req, res) => {
  return res.sendStatus(200);
});

// get main page
app.get('/repos', (req, res) => {
  return res.sendStatus(200);
});

// get add repo page
app.get('/repos/add', (req, res) => {
  return res.sendStatus(200);
});

// post new repo info
app.post('/repos/add', (req, res) => {
  return res.sendStatus(200);
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
