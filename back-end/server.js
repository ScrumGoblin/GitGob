const path = require('path');
const express = require('express');
const app = express();
const PORT = 3088;

const userController = require('./controllers/UserController');


app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {         //Put in for development REMOVE.
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
//Serve static files 
// app.use(express.static(path.resolve(__dirname, '../build')));

app.post('/create-user', userController.createUser, (req, res) => {
  return res.json({success: res.locals.success});
})

app.post('/login', userController.validateUser, (req, res) => {
  console.log({isLoggedin: res.locals.loggedIn})
  return res.json({loggedIn: res.locals.loggedIn});
})

app.post('/getdata', userController.getProject, (req, res) => {
  return res.send('It worked').json(res.locals.data);
})

app.post('/getprojects', userController.getProjectsList, (req, res) => {
  return res.json({projects: res.locals.projects})
})

app.post('/addproject', (req, res) => {
  return res.send('It worked');
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