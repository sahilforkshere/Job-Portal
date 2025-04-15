import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import NavBar from "./components/Layout/NavBar"
import Home from "./components/Home/Home"
import Footer from "./components/Layout/Footer"
import JobDetails from "./components/Job/JobDetails"
import MyJobs from "./components/Job/MyJobs"
import Jobs from "./components/Job/Jobs"
import Application from "./components/Application/Application"
import MyApplications from "./components/Application/MyApplications"
import PostJob from "./components/Job/PostJob"
import ErrorPage from "./components/NotFound/ErrorPage"

import App from './App.jsx'

export const Context= createContext({isAuthorized:false})

const AppWrapper=()=>{
  const [isAuthorized,setIsAuthorized]=useState(false);
  const [user,setUser]=useState({});
  return (
    <Context.Provider value={{isAuthorized,setIsAuthorized,user,setUser}}>
    <App/>
  </Context.Provider>
  )
}
  
  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
