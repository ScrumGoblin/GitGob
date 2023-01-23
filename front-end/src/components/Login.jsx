import '../App.css';
import React, { Component, useState, useEffect, useRef, createRef } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

function Login () {

    let navigate = useNavigate();

    const [state, setState] = useState({
        username: '',
        password: '',
    })
    
    function updateUsername (username) {
        let newState = Object.assign({}, state);
        newState.username = username;
        setState(newState);
    }

    function goToProjectsPage(username) {
        fetch('http://localhost:3088/login', {
            method: 'POST',
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": username })
          })
            .then((data)=>data.json())
            .then((data)=>{
                if (data.loggedIn === true){
                    let path = '/projects';
                    navigate(path, {state: {username: state.username}});
                }else{
                    alert("couldn't find user")
                }
            })
        
    }

    function createNewUser(username){
        fetch('http://localhost:3088/create-user', {
            method: 'POST',
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": username })
          })
            .then((data)=>data.json())
            .then((data)=>{
                if (data.success === true){
                    alert('successful creation, now log in');
                }
            })
    }

    function githubLogin() {
        window.location.href =
          'https://github.com/login/oauth/authorize?client_id=80b2e3ee86c7eb7b1145&scope=repo';
      }

    useEffect(() => {
        const queryString = window.location.search; //gets us everything after and including '?' in the url (search will look for href property in particular object it's called on...can select an anchor tag for example and use search on it and it will get us the value of its href)
        const urlParams = new URLSearchParams(queryString); //allows us to use 'get' method to select particular param from our query string
        const codeParams = urlParams.get('code');
    
        try {
          if (codeParams && localStorage.getItem('accessToken') === null) {
            async function getAccessToken() {
              //LOCAL HOST USES HTTP, NOT HTTPS
              //if chrome still gives you issues (because it requires https these days), go to https://stackoverflow.com/questions/52677872/localhost-sent-an-invalid-response-for-my-angular-app
              //and follow the instructions with 25 upvotes by Gerrie Pretorious
              const tokenRequest = await fetch(
                'http://localhost:3088/getAccessToken?code=' + codeParams,
              );
    
              const tokenBody = await tokenRequest.json();
    
              if (tokenBody.access_token) {
                localStorage.setItem('accessToken', tokenBody.access_token);
                // setRender(!render);
              }
              res.json(data);
            }
            getAccessToken();
          }
        } catch (e) {
          return 'Error logging in with GitHub ' + e;
        }
      }, []);

    return (
        <div className='pageContainer'>
              <div className='logo'><span>gitgob</span></div>
            <div className='loginContainer'>
                <div className='loginPageHeader'>
                  <h4>Login</h4>
                </div>
                <div>
                    <input className='inputField' type='text' placeholder="Username" onChange={(e) => updateUsername(e.target.value)}/>
                </div>
                <div>
                    <input className='inputField' placeholder="Password" type='text'/>
                </div>
                <button className='submitButton' onClick={()=>createNewUser(state.username)}>Submit</button>
                <div className='loginPageHeader'>
                  <h4>Signup</h4>
                </div>
                <div>
                    <input className='inputField' type='text' placeholder="Username" onChange={(e) => updateUsername(e.target.value)}/>
                </div>
                <div>
                    <input className='inputField' placeholder="Password" type='text'/>
                </div>
                <button className='submitButton' onClick={()=>createNewUser(state.username)}>Submit</button>
            </div>
        </div>
    )
}

export default Login

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