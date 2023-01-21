import '../App.css';
import React, { Component, useState, useEffect, useRef, createRef } from 'react';
import { Outlet, Link } from 'react-router-dom';

function AddProject () {
    return (
    <div className='pageContainer'>
        <div className='addProjectContainer'>
            <div className='addProjectLabelContainer'>
                <label>Project name : </label>
                <label>Pull request time limit: </label>
            </div>
            <div className="addProjectInputContainer">
                <input type="text" placeholder='Repository Name'/>
                <input type="text" placeholder='Number of days'/>
                <button className="addProjectButton">Add Project</button>
            </div>
            
        </div>
    </div>
    )
}

export default AddProject