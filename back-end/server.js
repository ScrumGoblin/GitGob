const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());

//Serve static files 
// app.use(express.static(path.resolve(__dirname, '../build')));

// get login page
app.get('/', (req, res) => {
  return res.sendStatus(200);
})

// get sign up page
app.get('/signup', (req, res) => {
  return res.sendStatus(200);
})

// post sign up info
app.post('/signup', (req, res) => {
  return res.sendStatus(200);
})

// login
app.post('/', (req, res) => {
  return res.sendStatus(200);
})

// get main page
app.get('/repos', (req, res) => {
  return res.sendStatus(200);
})

// get add repo page
app.get('/repos/add', (req, res) => {
  return res.sendStatus(200);
})

// post new repo info
app.post('/repos/add', (req, res) => {
  return res.sendStatus(200);
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