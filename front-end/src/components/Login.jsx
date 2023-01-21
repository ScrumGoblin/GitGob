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

    function goToProjectsPage() {
    
        let path = '/projects';
        navigate(path);
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
                <button onClick={()=>{goToProjectsPage()}}>Submit</button>
                <h4>Signup</h4>
                <div>
                    <label className='loginLabel'>Username  </label>
                    <input type='text'/>
                </div>
                <div>
                <label className='loginLabel'>Password  </label>
                <input type='text'/>
                </div>
                <button>Submit</button>
            </div>
        </div>
    )
}

export default Login