import '../App.css';
import React, { Component, useState, useEffect, useRef, createRef } from 'react';
import ProjectEntry from './ProjectEntry';

function Projects () {

    //fetch users project info from the database/github

    

    return (
        <div className="pageContainer">
            <ProjectEntry/>
        </div>
    )
}

export default Projects