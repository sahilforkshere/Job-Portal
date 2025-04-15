import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import styled from "styled-components";
import logo from "../../assets/hirenestlogo.png"; // adjust path if needed

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  console.log(user);

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      setIsAuthorized(true);
    }
  };

  return (
    <StyledNav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        {user && <p style={{ color: 'white' }}>Hello : {user.name}</p>}

        <ul className={`menu ${show ? "show-menu" : ""}`}>
          <li>
            <NavLink to="/" onClick={() => setShow(false)}>
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/job/getallJobs" onClick={() => setShow(false)}>
              ALL JOBS
            </NavLink>
          </li>
          <li>
            <NavLink to="/myapplications" onClick={() => setShow(false)}>
              {user && user.role === "Employer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"}
            </NavLink>
          </li>
          {user && user.role === "Employer" && (
            <>
              <li>
                <NavLink to="/job/postJob" onClick={() => setShow(false)}>
                  POST NEW JOB
                </NavLink>
              </li>
              <li>
                <NavLink to="/job/me" onClick={() => setShow(false)}>
                  VIEW YOUR JOBS
                </NavLink>
              </li>
            </>
          )}
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              LOGOUT
            </button>
          </li>
        </ul>

        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </StyledNav>
  );
};



// ==============================
// Styled Component (CSS-in-JS)
// ==============================
const StyledNav = styled.nav`
  background: #101010;
  padding: 1rem 2rem;
  color: #fff;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo img {
    width: 140px;
  }

  .menu {
    display: flex;
    gap: 1.5rem;
    list-style: none;
    align-items: center;
  }

  .menu li {
    font-size: 15px;
  }

  .menu a {
    text-decoration: none;
    color: white;
    font-weight: 500;
  }

  .menu a.active-link {
    color: #00bfff;
    font-weight: bold;
  }

  .logout-btn {
    background: #ff4d4d;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }

  .logout-btn:hover {
    background: #ff1a1a;
  }

  .hamburger {
    display: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  // Mobile responsive
  @media (max-width: 768px) {
    .menu {
      display: none;
      flex-direction: column;
      gap: 1rem;
      position: absolute;
      top: 70px;
      left: 0;
      background: #181818;
      width: 100%;
      padding: 1rem 0;
      text-align: center;
      z-index: 1000;
    }

    .show-menu {
      display: flex;
    }

    .hamburger {
      display: block;
    }
  }
`;
export default Navbar;