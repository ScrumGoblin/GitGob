import '../App.css';
import React, { Component, useState, useEffect, useRef, createRef } from 'react';
import { Outlet, Link } from 'react-router-dom';

function PullReq (props) {
    const { today, openedAt, comment, isOpen } = props.data
    return (
        <h5 className = {(today-openedAt > 2 && isOpen === true) ? 'pullReqRed' : 'pullReq'}>{`${comment} || opened ${today - openedAt} days ago`}</h5>
    )
}

export default PullReq