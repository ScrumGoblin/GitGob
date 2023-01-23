import '../App.css';
import React, { Component, useState, useEffect, useRef, createRef } from 'react';
import ProjectEntry from './ProjectEntry';
import { useNavigate, useLocation } from 'react-router-dom';
import { responseParser, fakeData } from '../utils/parseResponse';

function Projects (props) {

    //fetch users project info from the database/github
    const [projects, setProjects] = useState({projects: []})

    const location = useLocation();
    
    useEffect(() => {
		fetch('http://localhost:3088/getprojects', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: location.state.username })
    })
    .then((data)=> data.json())
    .then((data) => {
        console.log(data)
        let newProjects = Object.assign({}, projects)
        newProjects.projects = data.projects
        setProjects(newProjects)
    })
        }, []);
    

    let navigate = useNavigate();
    const routeChange = () =>{ 
        let path = `/add-project`; 
        navigate(path, {state: {username: location.state.username}});
      }
    const dataParsed = responseParser(fakeData);
    
    const projectsList = []
    
    if (projects.projects.length !== 0){
        for (let i=0; i<projects.projects.length; i++){
            projectsList.push(<ProjectEntry repo={projects.projects[i]} username={location.state.username}/>)
        }
    }
    
    return (
        <div className="pageContainer">
            {projectsList}
            <button className='addProjectButton' onClick={()=>routeChange()}>Add Project</button>
        </div>
    )
}

export default Projects