import '../App.css';
import React, { Component, useState, useEffect, useRef, createRef } from 'react';


function ProjectEntry (props) {

    const reqs = [];

    const [userData, setData] = useState([]);

    useEffect(() => {
		fetch('http://localhost:3088/getData', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: props.username , repo: props.repo })
    })
    .then((data)=> data.json())
    .then((data) => {
        console.log(data)
        // let newData = Object.assign({}, userData)
        // newData.projects = data.projects
        // setData(newData)
    })
        }, []);

    // for (let i=0; i<props.data.length; i++){
    //     reqs.push(<PullReq data={props.data[i]}/>)
    // }
    return (
        <div className="projectEntry">
            <h3>{props.repo}</h3>
            <h1>CHART CHART CHART</h1>
            {reqs}
            
        </div>
    )
}

export default ProjectEntry