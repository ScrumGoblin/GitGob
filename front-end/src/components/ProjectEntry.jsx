import '../App.css';
import React, { Component, useState, useEffect, useRef, createRef } from 'react';
import { responseParser, dateParser } from '../utils/parseResponse';
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
    
    let pullsinLast7 = 'fetching';

    for (let i=0; i<userData.data.length; i++){
        if (dateParser(userData.data[i].created_at) <= 7){
            if (pullsinLast7 === 'fetching') pullsinLast7 = 1;
            else pullsinLast7 += 1;
        }
    }

    for (let i=userData.data.length-1; i>-1; i--){
        reqs.push(<PullReq data={userData.data[i]}/>)
    }
    return (
        <div className="projectEntry">
            <h1>{props.repo}</h1>
            <h2>{pullsinLast7} pulls in the last week</h2>
            {reqs}
            
        </div>
    )
}

export default ProjectEntry