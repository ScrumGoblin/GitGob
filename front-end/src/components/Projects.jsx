import '../App.css';
import React, { Component, useState, useEffect, useRef, createRef } from 'react';
import ProjectEntry from './ProjectEntry';
import { useNavigate } from 'react-router-dom';
import { responseParser, fakeData } from '../utils/parseResponse';

function Projects (props) {

    //fetch users project info from the database/github
    const [projects, SetProjects] = useState()

    

    let navigate = useNavigate();
    const routeChange = () =>{ 
        let path = `/add-project`; 
        navigate(path);
      }
    const dataParsed = responseParser(fakeData);
    

    

    
    return (
        <div className="pageContainer">
            <ProjectEntry data={dataParsed}/>
            <button className='addProjectButton' onClick={()=>routeChange()}>Add Project</button>
        </div>
    )
}

export default Projects