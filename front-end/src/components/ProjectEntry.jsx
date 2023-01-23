import '../App.css';
import React, { Component, useState, useEffect, useRef, createRef } from 'react';
import { responseParser, dateParser } from '../utils/parseResponse';
import PullReq from './Pullreq.jsx';
import { Chart } from 'react-google-charts';

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

    const columns = [
        { type: "string", id: "Name of PR" },
        { type: "date", id: "Start" },
        { type: "date", id: "End" }
      ];
    const fakedata = [["Washington", new Date(1789, 3, 30), new Date(1797, 2, 4)],
    ["Adams", new Date(1797, 2, 4), new Date(1801, 2, 4)],
        ["Jefferson", new Date(1801, 2, 4), new Date(1809, 2, 4)]];
    
    let chartData = [];
    for (let i = 0; i < userData.data.length; i++){
        // let openDate = userData.data[i].created_at.slice(0, 10);
        let closeDate;
        if (userData.data[i].state==="closed") closeDate = userData.data[i].closed_at;
        else closeDate = new Date();
        let arrayToAdd = [userData.data[i].title, new Date(userData.data[i].created_at), new Date(closeDate)];
        chartData.push(arrayToAdd)
    }
    console.log(chartData);
    return (
        <div className="projectEntry">
            <h1>{props.repo}</h1>
            <Chart chartType="Timeline" data={[columns,...chartData]} />
            <h2>{pullsinLast7} PRs in the last week</h2>
            {reqs}
            
        </div>
    )
}

export default ProjectEntry