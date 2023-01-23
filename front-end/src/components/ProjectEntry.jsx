import '../App.css';
import React, { Component, useState, useEffect, useRef, createRef } from 'react';
import { responseParser } from '../utils/parseResponse';
import PullReq from './Pullreq.jsx'

function ProjectEntry (props) {

    

    const [userData, setData] = useState({data: []});

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
    .then((data) => responseParser(data))
    .then((data) => {
        console.log(data)
        let newData = Object.assign({}, userData)
        newData.data = data
        setData(newData)
    })
        }, []);

    const reqs = [];

    for (let i=0; i<userData.data.length; i++){
        reqs.push(<PullReq data={userData.data[i]}/>)
    }
    return (
        <div className="projectEntry">
            <h2>{props.repo}</h2>
            <h1>CHART CHART CHART</h1>
            {reqs}
            
        </div>
    )
}

export default ProjectEntry