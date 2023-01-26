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
    const [username, setUsername] = useState('')
    const [isLoading, setLoading] = useState(true)
  
    useEffect(() => {
      // Check for the existence of the session cookie
      const cookie = document.cookie.split(';').find(c => c.startsWith('session='));
      if (cookie) {
        setSessionCookie(cookie.split('=')[1])
        validateCookie().then(data => { 
            if (data.name === "failed") {
                document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                setSessionCookie(null)
            }
            else {
                setUsername(data.name) 
            }
        })
            .then(() => { setLoading(false) })
      }
      else {
        setLoading(false)
      }
    }, [sessionCookie, isLoading]);

    const validateCookie = async () => {
        let response = await fetch('/cookie/login', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            credentials: 'include'  
        })
        let data = await response.json()
        return data
    }

    return (
        <>
            {isLoading ? <div>Loading...</div> :
            <Routes>
                <Route element = {<PrivateRoutes cookie = {sessionCookie}/>}>
                    <Route index element={<Projects  username={username}/>} />
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

 