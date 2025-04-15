import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",

  });


  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, phone, role } = credentials;

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        { name, email, password, phone, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        }

      );
      toast.success(data.message);
      setCredentials({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "",
      });
      setIsAuthorized(true);
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
        <form className="form">
          <img src="hirenest2.png" alt="logo" />
          <p className="title">Register </p>
          <p className="message">Signup now and get full access to our app. </p>

          <label>
            <input className="input" type="text" placeholder required value={credentials.name}
              onChange={(e) => setCredentials({ ...credentials, name: e.target.value })} />
            <span >Name</span>
          </label>
          {/* <label>
            <input className="input" type="text" placeholder required />
            <span>Lastname</span>
          </label> */}

          <label>
            <input className="input" type="email" placeholder required value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
            <span >Email</span>
          </label>
          <label>
            <input className="input" type="password" placeholder required
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            <span

            >Password</span>
          </label>
          <label>
            <input className="input" type="tel" placeholder required
              value={credentials.phone}
              onChange={(e) => setCredentials({ ...credentials, phone: e.target.value })} />
            <span>Phone</span>
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
          <button className="submit" onClick={handleRegister}>Submit</button>
          <p className="signin">Already have an acount ? <Link to="/">Signin</Link> </p>
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
    transform: 0.3s ease;
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
  }
`;

export default Register;
