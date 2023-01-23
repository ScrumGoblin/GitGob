import '../App.css';
import React, { Component, useState, useEffect, useRef, createRef } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { dateParser } from '../utils/parseResponse.js'

function PullReq (props) {
    const { puller, created_at, closed_at, comment, title, state, url, made_by } = props.data

    let className;

    // if (state === 'closed') className = 'pullReqBlack';
    if (dateParser(created_at) > 2) className = 'pullReqRed';
    else className = 'pullReqBlack'

    return (
        <div className="pullReqContainer">
            <a href={url} className = {className}>{`${title} || opened ${dateParser(created_at)} days ago by ${made_by}`}</a>
        </div>
    )
}

export default PullReq