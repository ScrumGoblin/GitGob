import '../App.css';
import React, { Component, useState, useEffect, useRef, createRef } from 'react';
import { Outlet, Link } from 'react-router-dom';

function AddProject () {

    const [project, setProject] = useState({
        name: '',
    });

    function updateName(name){
        let newState = Object.assign({}, project);
        newState.name = name;
        setProject(newState)
    }

    function submitProject(name){
        const body = {
            name: name,
        }
        console.log(body) //placeholder for fetch/post
    }

    return (
    <div className='pageContainer'>
        <div className='addProjectContainer'>
            <div className='addProjectLabelContainer'>
                <label>Project name : </label>
                <label>Pull request time limit: </label>
            </div>
            <div className="addProjectInputContainer">
                <input type="text" placeholder='Repository Name' onChange={(e) => updateName(e.target.value)}/>
                <input type="text" placeholder='Number of days'/>
                <button className="addProjectButton" onClick={()=>submitProject(project.name)}>Add Project</button>
            </div>
            
        </div>
    </div>
    )
}

export default AddProject