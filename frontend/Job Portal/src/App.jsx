import React from "react"
import { useEffect, useContext } from "react"
import { Context } from "./main"
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
import axios from "axios"
import { Toaster } from "react-hot-toast"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import './index.css'
import './App.css'



function App() {

  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/getAllUsers", { withCredentials: true });
        setUser(response.data.user);
        setIsAuthorized(true);

      } catch (error) {
        setIsAuthorized(false)
      }
    };
    fetchUser();
  }, [isAuthorized])





  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/job/getAllJobs" element={<Jobs />} />
          <Route path="/job/postJob" element={<PostJob />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/myapplications" element={<MyApplications />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  )
}

export default App
