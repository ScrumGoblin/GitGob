import '../App.css';
import React, {
  Component,
  useState,
  useEffect,
  useRef,
  createRef,
} from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

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
    console.log('one');
    const queryString = window.location.search; //gets us everything after and including '?' in the url (search will look for href property in particular object it's called on...can select an anchor tag for example and use search on it and it will get us the value of its href)
    const urlParams = new URLSearchParams(queryString); //allows us to use 'get' method to select particular param from our query string
    const codeParams = urlParams.get('code');
    console.log(codeParams);
    if (document.cookie.includes('veryImportant')) return;
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

// const [render, setRender] = useState(false);

//   function updateUsername(username) {
//     let newState = Object.assign({}, state);
//     newState.username = username;
//     setState(newState);
//   }

//   function goToProjectsPage() {
//     let path = '/projects';
//     navigate(path);
//   }

//   //directs user to sign in with Github and get us the code for our access token.
//   function githubLogin() {
//     window.location.href =
//       'https://github.com/login/oauth/authorize?client_id=80b2e3ee86c7eb7b1145';
//   }
//   useEffect(() => {
//     const queryString = window.location.search; //gets us everything after and including '?' in the url (search will look for href property in particular object it's called on...can select an anchor tag for example and use search on it and it will get us the value of its href)
//     const urlParams = new URLSearchParams(queryString); //allows us to use 'get' method to select particular param from our query string
//     const codeParams = urlParams.get('code');

//     try {
//       if (codeParams && localStorage.getItem('accessToken') === null) {
//         async function getAccessToken() {
//           //LOCAL HOST USES HTTP, NOT HTTPS
//           //if chrome still gives you issues (because it requires https these days), go to https://stackoverflow.com/questions/52677872/localhost-sent-an-invalid-response-for-my-angular-app
//           //and follow the instructions with 25 upvotes by Gerrie Pretorious
//           const tokenRequest = await fetch(
//             'http://localhost:8080/getAccessToken?code=' + codeParams,
//           );

//           const tokenBody = await tokenRequest.json();

//           if (tokenBody.access_token) {
//             localStorage.setItem('accessToken', tokenBody.access_token);
//             setRender(!render);
//           }
//           res.json(data);
//         }
//         getAccessToken();
//       }
//     } catch (e) {
//       return 'Error logging in with GitHub ' + e;
//     }
//   }, []);
