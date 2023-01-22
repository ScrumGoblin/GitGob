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

    return (
        <div className='pageContainer'>
            <div className='loginContainer'>
                <h4>Login</h4>
                <div>
                    <label className='loginLabel'>Username  </label>
                    <input type='text' onChange={(e) => updateUsername(e.target.value)}/>
                </div>
                <div>
                    <label className='loginLabel'>Password  </label>
                    <input type='text'/>
                </div>
                <button onClick={()=>{goToProjectsPage(state.username)}}>Submit</button>
                <h4>Signup</h4>
                <div>
                    <label className='loginLabel'>Username  </label>
                    <input type='text' onChange={(e) => updateUsername(e.target.value)}/>
                </div>
                <div>
                <label className='loginLabel'>Password  </label>
                <input type='text'/>
                </div>
                <button onClick={()=>{createNewUser(state.username)}}>Submit</button>
            </div>
        </div>
    )
}

export default Login