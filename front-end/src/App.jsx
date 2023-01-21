import './App.css'
import React, { Component, useState, useEffect, useRef, createRef } from 'react'
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom"
import Login from './components/Login.jsx'
import Projects from './components/Projects.jsx'
import AddProject from './components/AddProject.jsx'

export default function App() {
    return (
      
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/add-project" element={<AddProject/>}/>
        </Routes>
      
    )
  }

 