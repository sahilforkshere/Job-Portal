import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import axios from 'axios';
import toast from 'react-hot-toast';
import styled from "styled-components";

function PostJob() {
  const [details, setDetails] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    country: "",
    salaryFrom: "",
    salaryTo: "",
    fixedSalary: "",
    city: ""
  });

  const {isAuthorized,user}= useContext(Context);
  const handleJobPost = async (e) => {
    e.preventDefault();
    const { title, description, category, location, country,salaryFrom,salaryTo,fixedSalary,city } = credentials;
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/job/postJob",
        { ...details },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message);

      // Optionally redirect after successful post
      navigateTo("/job/getAllJobs");

      // Reset the form
      setDetails({
        title: "",
        description: "",
        category: "",
        location: "",
        country: "",
        salaryFrom: "",
        salaryTo: "",
        fixedSalary: "",
        city: ""
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <StyledWrapper>
      <div className="login-box">
        <form>
          <div className="user-box">
            <input type="text" name required />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name required />
            <label>Password</label>
          </div><center>
            <a href="#">
              SEND
              <span />
            </a></center>
        </form>
      </div>
    </StyledWrapper>
    </>
  )
}

const StyledWrapper = styled.div`
  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    padding: 40px;
    transform: translate(-50%, -50%);
    background: rgba(24, 20, 20, 0.987);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0,0,0,.6);
    border-radius: 10px;
  }

  .login-box .user-box {
    position: relative;
  }

  .login-box .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
  }

  .login-box .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
  }

  .login-box .user-box input:focus ~ label,
  .login-box .user-box input:valid ~ label {
    top: -20px;
    left: 0;
    color: #bdb8b8;
    font-size: 12px;
  }

  .login-box form a {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #ffffff;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 4px
  }

  .login-box a:hover {
    background: #03f40f;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03f40f,
                0 0 25px #03f40f,
                0 0 50px #03f40f,
                0 0 100px #03f40f;
  }

  .login-box a span {
    position: absolute;
    display: block;
  }

  @keyframes btn-anim1 {
    0% {
      left: -100%;
    }

    50%,100% {
      left: 100%;
    }
  }

  .login-box a span:nth-child(1) {
    bottom: 2px;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #03f40f);
    animation: btn-anim1 2s linear infinite;
  }`;

export default PostJob
