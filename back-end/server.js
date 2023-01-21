const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const client_id = '80b2e3ee86c7eb7b1145';
const client_secret = 'ce3830641f6f3a352a28108ac94b620269a433e0';
const redirectURI = 'http://localhost:8080/oauth-callback/code?';

//redirects to the github authorization site with the client id, redirect_uri, and scope in the parameters
//scope is currently set to repo, allowing for read/write access to the user's public and private repo's
// app.get('/api/', (req, res) => {
//   res.redirect(
//     `https://github.com/login/oauth/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}&scope=repo&client_secret=`,
//   );
// });

app.get('/api/', (req, res) => {
  res.redirect(`https://github.com`);
});

//Stretch Goals: (1)access token should be stored in a database, (2)utilize redirect_uri and scope for security check
//access token is initialized as null until we receieve the response from Github
let accessToken = null;

app.get('/api/oauth-callback/:code', (req, res) => {
  const body = {
    client_id,
    client_secret,
    code: req.query.code,
  };
  fetch(`https://github.com/login/oauth/access_token`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  })
    .then((res) => res.data['access_token'])
    .then((token) => {
      accessToken = token;
      res.json({ ok: 1 });
    })
    .catch((err) => res.status(500).json({ message: err }));
});

//access_token=gho_16C7e42F292c6912E7710c838347Ae178B4a&scope=repo%2Cgist&token_type=bearer

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
