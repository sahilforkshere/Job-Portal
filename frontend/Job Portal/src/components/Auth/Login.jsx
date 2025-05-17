import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../../main';
import { CgProfile } from "react-icons/cg";
import { Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
  const [credentials, setCredentials] = useState({

    email: "",
    password: "",
    role: "",

  });

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);


  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password, role } = credentials;

    try {
      if (!email || !password || !role) {
        toast.error("Please fill in all required fields");
        return;
      }

      const { data } = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message);
      setCredentials({ email: "", password: "", role: "" });
      setIsAuthorized(true);
      setUser(data.user); // You might want to save the user too
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  if (isAuthorized) {
    return <Navigate to={"/"} />
  }



  return (

    <>

      <StyledWrapper>

        <form className="form" >
          <img src="hirenest2.png" alt="logo" />
          <p className="title">Login </p>
          <p className="message">Signup now and get full access to our app. </p>

          <label>
            <input className="input" type="email" placeholder required value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />

            <span>Email  </span>

          </label>

          <label>
            <input className="input" type="password" placeholder required value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            <span>Password</span>
          </label>
          <label>
            <select
              className="input"
              required
              value={credentials.role}
              onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
            >
              <option value="" disabled hidden>
                Select Role
              </option>
              <option value="Employer">Employer</option>
              <option value="User">User</option>
            </select>
            <span>Role</span>
          </label>
          <button className="submit" onClick={handleLogin}>Login</button>
          <p className="signin">Dont't Have and Account ? <Link to="/register">SignUp</Link> </p>
        </form>
      </StyledWrapper>

    </>

  );
}

const StyledWrapper = styled.div`
    display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 100vh; /* Full viewport height */
  background-color: #121212; /* Optional: Add a background color */

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    background-color: #1a1a1a;
    color: #fff;
    border: 1px solid #333;
  }

  .title {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    color: #00bfff;
  }

  .title::before {
    width: 18px;
    height: 18px;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .title::before,
  .title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: #00bfff;
  }

  .message, 
  .signin {
    font-size: 14.5px;
    color: rgba(255, 255, 255, 0.7);
  }

  .signin {
    text-align: center;
  }

  .signin a:hover {
    text-decoration: underline royalblue;
  }

  .signin a {
    color: #00bfff;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    background-color: #333;
    color: #fff;
    width: 100%;
    padding: 20px 05px 05px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 10px;
    top: 0px;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 12.5px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    color: #00bfff;
    top: 0px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .input {
    font-size: medium;
  }

  .submit {
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: .3s ease;
    background-color: #00bfff;
  }

  .submit:hover {
    background-color: #00bfff96;
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }`;

export default Login;
