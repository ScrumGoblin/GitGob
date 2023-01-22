import '../App.css';
import React, {
  Component,
  useState,
  useEffect,
  useRef,
  createRef,
} from 'react';
import ProjectEntry from './ProjectEntry';
import { useNavigate } from 'react-router-dom';

function Projects() {
  //   fetch('localhost:300/code').then((data) => data.json());
  //fetch users project info from the database/github
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/add-project`;
    navigate(path);
  };

  return (
    <div className='pageContainer'>
      <ProjectEntry />
      <button className='addProjectButton' onClick={() => routeChange()}>
        Add Project
      </button>
    </div>
  );
}

export default Projects;
