import '../App.css';
import React, {
  Component,
  useState,
  useEffect,
  useRef,
  createRef,
} from 'react';
import {
  Outlet,
  Link,
  useNavigate,
  createRoutesFromChildren,
} from 'react-router-dom';

//https://github.com/login/oauth/authorize?client_id=80b2e3ee86c7eb7b1145&response_type=code&client_secret=ce3830641f6f3a352a28108ac94b620269a433e0

function Login() {
  let navigate = useNavigate();

  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const [render, setRender] = useState(false);

  function updateUsername(username) {
    let newState = Object.assign({}, state);
    newState.username = username;
    setState(newState);
  }

  function goToProjectsPage() {
    let path = '/projects';
    navigate(path);
  }

  function githubLogin() {
    console.log('hey');
    window.location.assign(
      'https://github.com/login/oauth/authorize?client_id=80b2e3ee86c7eb7b1145',
    );
  }
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParams = urlParams.get('code');
    console.log(codeParams);
    console.log('this is the code param');
    try {
      if (codeParams && localStorage.getItem('accessToken') === null) {
        console.log('conditional hits');
        async function getAccessToken() {
          console.log('inGetAccess');
          console.log(
            'http://localhost:8080/getAccessToken?code=' + codeParams,
          );
          const token = await fetch(
            'http://localhost:8080/getAccessToken?code=' + codeParams,
          );
          console.log(token);
          console.log('after token');
          const data = await token.json();
          console.log(data);
          if (data.access_token) {
            localStorage.setItem('accessToken', data.access_token);
            setRender(!render);
          }
          res.json(data);
        }
        getAccessToken();
      }
    } catch (e) {
      return next(e);
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
            goToProjectsPage();
          }}
        >
          Submit
        </button>
        <h4>Signup</h4>
        <div>
          <label className='loginLabel'>Username </label>
          <input type='text' />
        </div>
        <div>
          <label className='loginLabel'>Password </label>
          <input type='text' />
        </div>
        <button onClick={githubLogin}>Login with GitHub</button>
      </div>
    </div>
  );
}

export default Login;
