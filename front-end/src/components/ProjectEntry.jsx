import '../App.css';
import React, { Component, useState, useEffect, useRef, createRef } from 'react';
import PullReq from './Pullreq';

function ProjectEntry (props) {

    const reqs = [];
    const [userData, setData] = useState();
    useEffect(() => {
		fetch('http://localhost:3001/getData', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: props.username })
    })
    .then(()=>{
        
    })
        }, []);

    for (let i=0; i<props.data.length; i++){
        reqs.push(<PullReq data={props.data[i]}/>)
    }
    return (
        <div className="projectEntry">
            <h3>Project Name Placeholder</h3>
            <h1>CHART CHART CHART</h1>
            {reqs}
            
        </div>
    )
}

export default ProjectEntry