import '../App.css';
import React, { Component, useState, useEffect, useRef, createRef } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';


function AddProject () {

    const [project, setProject] = useState({
        name: '',
    });

    const location = useLocation();

    let navigate = useNavigate();

    const routeChange = () =>{ 
        let path = `/`; 
        navigate(path, {state: {username: location.state.username}});
      }

    function updateName(name){
        let newState = Object.assign({}, project);
        newState.name = name;
        setProject(newState)
    }

    function submitProject(name){
        fetch('http://localhost:3088/addproject', {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: location.state.username, repo: project.name })
        })
        .then((data) => data.json())
        .then((data) => {
            console.log(data)
            if (data.success === true){
                routeChange();
            }
        })
        .catch((err) => console.log(err))
    }

    return (
    <div className='pageContainer'>
        <div className='addProjectContainer'>
            <div class="addProjectRow">
                <label>Project name : </label>
                <input className="addProjectInput" type="text" placeholder='Repository Name' onChange={(e) => updateName(e.target.value)}/>
                <button className="addProjectButton" onClick={()=>submitProject(project.name)}>Add Project</button>
            </div>
        </div>
    </div>
    )
}

export default AddProject