import '../App.css';
import React, {
  Component,
  useState,
  useEffect,
  useRef,
  createRef,
} from 'react';
import { Outlet, Link } from 'react-router-dom';
import { getType } from '@reduxjs/toolkit';

function Login() {
  return (
    <div className='pageContainer'>
      <div className='loginContainer'>
        <h4>Login</h4>
        <div>
          <label className='loginLabel'>Username </label>
          <input type='text' />
        </div>
        <div>
          <label className='loginLabel'>Passowrd </label>
          <input type='text' />
        </div>
        <button>Submit</button>
        <h4>Signup</h4>
        <div>
          <label className='loginLabel'>Username </label>
          <input type='text' />
        </div>
        <div>
          <label className='loginLabel'>Passowrd </label>
          <input type='text' />
        </div>
        <button
          onClick={() => {
            fetch('/api/').then((res) => res.json());
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Login;
