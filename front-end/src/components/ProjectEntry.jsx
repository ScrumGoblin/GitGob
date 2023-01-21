import '../App.css';
import React, { Component, useState, useEffect, useRef, createRef } from 'react';
import PullReq from './Pullreq';

function ProjectEntry (/*PROPS GOES HERE*/) {
    const fakeProps = {
        isOpen: true,
        openedAt: 8,
        today: 9,
        comment: 'This is a fake comment'
    }
    const fakeReqData = []
    fakeReqData.push(fakeProps)

    const reqs = [];
    

    for (let i=0; i<fakeReqData.length; i++){
        console.log(fakeReqData[i])
        if (fakeReqData[i].isOpen === true){
            reqs.push(<PullReq data={fakeReqData[i]}/>)
        }
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