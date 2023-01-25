import './App.css'
import React, { Component, useState, useEffect, useRef, createRef } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, Navigate, Outlet } from "react-router-dom"
import Login from './components/Login.jsx'
import Projects from './components/Projects.jsx'
import AddProject from './components/AddProject.jsx'

const PrivateRoutes = (props) => {
    let sessionCookie = props.cookie;
    return (
        sessionCookie ? <Outlet/> : <Navigate to = '/login'/>
    )
}

export default function App() {

    const [sessionCookie, setSessionCookie] = useState(null);
    const [isLoading, setLoading] = useState(true)
  
    useEffect(() => {
      // Check for the existence of the session cookie
      const cookie = document.cookie.split(';').find(c => c.startsWith('session='));
      if (cookie) {
        setSessionCookie(cookie.split('=')[1]);
      }
      setLoading(false)

      
    }, [sessionCookie, isLoading]);

    return (
        <>
            {isLoading ? <div>Loading...</div> :
            <Routes>
                <Route element = {<PrivateRoutes cookie = {sessionCookie}/>}>
                    <Route index element={<Projects  />} />
                    <Route path="/add-project" element={<AddProject />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
            }
        </>
    );

    // return (
    //     <Routes>
    //         <Route path="/" element={<Login/>} />
    //         <Route path="/projects" element={<Projects/>}/>
    //         <Route path="/add-project" element={<AddProject/>}/>
    //     </Routes>
    // )
}

 