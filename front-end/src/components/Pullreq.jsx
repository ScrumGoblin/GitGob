import '../App.css';
import React, { Component, useState, useEffect, useRef, createRef } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { dateParser } from '../utils/parseResponse.js'

function PullReq (props) {
    const { puller, created_at, closed_at, comment, title, state } = props.data
    return (
        <p className = {(dateParser(created_at) > 2 === true) ? 'pullReqRed' : 'pullReq'}>{`${title} || opened ${dateParser(created_at)} days ago`}</p>
    )
}

export default PullReq