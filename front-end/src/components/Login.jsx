import '../App.css';
import React, {
  Component,
  useState,
  useEffect,
  useRef,
  createRef,
} from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

//Hello, and welcome to the logic for the OAuth section. Unfortunately, we weren't able to migrate this logic into our final presentation, but here is a layout of everything we've implemented, the overall purpose of this branch, and the idea we had for merging all this logic:
//So first, please not that this branch has minor updates to the webpack. You will need THIS version's webpack. As stated, it's very minor, but you will indeed need the proxy set up on the webpack (we didn't do this previously) in order to be able to set cookies from a different domain (3080 server setting cookies onto frontend 3000). Otherwise...CORS. That's all we changed here, so it shouldn't break anything and it should be updated.
//We also have a few packages on the backend that aren't on the version from our presentation, including cookie parser. You will need these as well. So make sure to get all the stuff from the pkg json in the backend file.
//The only files we touched that will be different from our presentation branch (now it's dev - wasn't at the time of presentation) are this login file, the webpack here in front end, the UserController file on the backend, pkg jsons  on backend, and the server folder on the backend.
//What we've done is implemented GitHub OAuth. When we get to this login page , click the BOTTOM login button. This will send you to github to authorize our app to make API requests on your account (the user who authorizes us)
//The purpose of this is to be able to access private repos and make this app actually real world usable. Currently, we presented with just being able to access public repos from one account.
// With our oAuth logic, you login w/ github, grant our app permissions, and then get redirected back to login page. In this whole process, we store the access token (meant to be a secret) on an http only cookie which is unreadable by javascript on the front end. //Also during this process, we make a fetch request to github to get your user data (associated with your unique token that you got when you authorized our app) ... and store it in the Mongo DB. Rn we're just grabbing your username
//Because we can't read http only cookies w/ javascript from the front end to identify if it's there/exists, we created a NON http cookie at the same time. We check to see if the NON http only cookie exists from the front end. If it exists, we know the http only cookie with the access token exists. So we know that we should be able to access this token from the backend to make future API calls.

//So the idea was that if this token exists, redirect the user to the next page (projects page). If not, make them sign in with github.
//Because we've stored your username already, we should be able to store the specific project info you want to track in the database and load it based on your username.
//There is a bug with our conditional logic after you login with github....If you delete the cookies , leave the page (not refesh) and come back, your access token cookie will be undefined. Have fun with that.
//*Note that the access token granted by github expires after 8 hours. So we set our NON http cookie to expire after 7 hours. Current logic states that if the non http cookie doesn't exist, user has to once again authorize/sign in with github.

//Have fun! Lots of stuff has been tee'd up and we're very excited to see how you run with it!

function Login() {
  let navigate = useNavigate();

  const [state, setState] = useState({
    username: '',
    password: '',
  });

  function updateUsername(username) {
    let newState = Object.assign({}, state);
    newState.username = username;
    setState(newState);
  }

  function goToProjectsPage(username) {
    fetch('http://localhost:3088/login', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.loggedIn === true) {
          let path = '/projects';
          navigate(path, { state: { username: state.username } });
        } else {
          alert("couldn't find user");
        }
      });
  }

  function createNewUser(username) {
    fetch('http://localhost:3088/create-user', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.success === true) {
          alert('successful creation, now log in');
        }
      });
  }

  function githubLogin() {
    window.location.href =
      'https://github.com/login/oauth/authorize?client_id=80b2e3ee86c7eb7b1145&scope=repo';
  }

  useEffect(() => {
    //need to make access check cookie check to see if logged in already

    const queryString = window.location.search; //gets us everything after and including '?' in the url (search will look for href property in particular object it's called on...can select an anchor tag for example and use search on it and it will get us the value of its href)
    const urlParams = new URLSearchParams(queryString); //allows us to use 'get' method to select particular param from our query string
    const codeParams = urlParams.get('code');
    if (document.cookie.includes('accessCheck')) {
      console.log('logged in already ');
      return;
    }
    try {
      {
        async function getAccessToken() {
          //LOCAL HOST USES HTTP, NOT HTTPS
          //if chrome still gives you issues (because it requires https these days), go to https://stackoverflow.com/questions/52677872/localhost-sent-an-invalid-response-for-my-angular-app
          //and follow the instructions with 25 upvotes by Gerrie Pretorious
          const tokenRequest = await fetch(
            'http://localhost:3088/getAccessToken?code=' + codeParams,
            {
              credentials: 'include',
            },
          );

          const tokenBody = await tokenRequest.json();
          console.log(
            'this is the tokenBody variable right before const cookies ' +
              tokenBody,
          );

          // const token = tokenBody.access_token;

          const cookies = await fetch('/readCookie');
          const parsedCookies = await cookies.json();

          console.log('this is parsedcookies ' + parsedCookies);
          // if (tokenBody.access_token) {
          //   localStorage.setItem('accessToken', tokenBody.access_token);
          //   // setRender(!render);
          // }
          // res.json(data);
        }
        getAccessToken();
      }
    } catch (e) {
      return 'Error logging in with GitHub ' + e;
    }
  }, []);

  return (
    <div className='pageContainer'>
      <div className='loginContainer'>
        <h4>Login</h4>
        <div>
          <label className='loginLabel'>Username </label>
          <input type='text' onChange={(e) => updateUsername(e.target.value)} />
        </div>
        <div>
          <label className='loginLabel'>Password </label>
          <input type='text' />
        </div>
        <button
          onClick={() => {
            goToProjectsPage(state.username);
          }}
        >
          Submit
        </button>
        <h4>Signup</h4>
        <div>
          <label className='loginLabel'>Username </label>
          <input type='text' onChange={(e) => updateUsername(e.target.value)} />
        </div>
        <div>
          <label className='loginLabel'>Password </label>
          <input type='text' />
        </div>
        <button onClick={githubLogin}>Submit</button>
      </div>
    </div>
  );
}

export default Login;
