import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

function PostJob() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isCityLoading, setIsCityLoading] = useState(false);
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

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
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
      navigate("/job/getAllJobs");
    } catch (error) {
      console.error("Job Post Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("https://countriesnow.space/api/v0.1/countries");
        setCountries(res.data.data.map(item => item.country));
      } catch (error) {
        toast.error("Failed to load countries");
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedCountry) return;
      try {
        setIsCityLoading(true);
        const res = await axios.post("https://countriesnow.space/api/v0.1/countries/cities", {
          country: selectedCountry
        });
        setCities(res.data.data);
      } catch (error) {
        toast.error("Failed to load cities");
      } finally {
        setIsCityLoading(false);
      }
    };
    fetchCities();
  }, [selectedCountry]);

  return (
    <StyledWrapper>
      <div className="wrapper">
        <form className="form" onSubmit={handleJobPost}>
          <span className="title">Post a Job</span>

          <div className="form-row">
            {/* Job Title */}
            <div className="input-container">
              <input className="input" type="text" placeholder="Job Title" value={details.title}
                onChange={(e) => setDetails({ ...details, title: e.target.value })} />
            </div>

            {/* Location Type */}
            <div className="input-container">
              <select
                className="input"
                value={details.location}
                onChange={(e) => {
                  const loc = e.target.value;
                  const isRemote = loc === "remote";
                  setDetails({
                    ...details,
                    location: loc,
                    country: isRemote ? "" : details.country,
                    city: isRemote ? "" : details.city,
                  });
                  if (isRemote) {
                    setSelectedCountry("");
                    setCities([]);
                  }
                }}
              >
                <option value="" disabled>Select Location Type</option>
                <option value="on-site">On-site</option>
                <option value="remote">Work from Home</option>
              </select>
            </div>

            {/* Country & City */}
            {details.location !== "remote" && (
              <>
                <div className="input-container">
                  <select
                    className="input"
                    value={details.country}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedCountry(value);
                      setDetails({ ...details, country: value, city: "" });
                    }}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country, idx) => (
                      <option key={idx} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div className="input-container">
                  <select
                    className="input"
                    value={details.city}
                    onChange={(e) => setDetails({ ...details, city: e.target.value })}
                    disabled={!cities.length}
                  >
                    <option value="">
                      {isCityLoading ? "Loading cities..." : "Select City"}
                    </option>
                    {cities.map((city, idx) => (
                      <option key={idx} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>

          {/* Category */}
          {/* Category */}
          <div className="form-row">
            <div className="input-container">
              <select
                className="input"
                value={details.category}
                onChange={(e) => setDetails({ ...details, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="Frontend Web Development">Frontend Web Development</option>
                <option value="MERN Stack Development">MERN STACK Development</option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">MEAN STACK Development</option>
                <option value="MEVN Stack Development">MEVN STACK Development</option>
                <option value="Data Entry Operator">Data Entry Operator</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="SEO Specialist">SEO Specialist</option>
                <option value="Content Writing">Content Writing</option>
                <option value="Copywriting">Copywriting</option>
                <option value="Video Animation">Video Animation</option>
                <option value="Photography & Editing">Photography & Editing</option>
                <option value="Finance & Accounting">Finance & Accounting</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Sales & Business Development">Sales & Business Development</option>
                <option value="Project Management">Project Management</option>
                <option value="Legal Services">Legal Services</option>
                <option value="Education & Tutoring">Education & Tutoring</option>
                <option value="Healthcare & Medical">Healthcare & Medical</option>
                <option value="Engineering">Engineering</option>
                <option value="Architecture">Architecture</option>
  <option value="Real Estate">Real Estate</option>
  <option value="Virtual Assistant">Virtual Assistant</option>
  <option value="Transcription">Transcription</option>
              </select>
            </div>
          </div>


          {/* Description */}
          <div className="input-container full-width">
            <textarea className="input" placeholder="Job Description" rows="3" value={details.description}
              onChange={(e) => setDetails({ ...details, description: e.target.value })} />
          </div>

          {/* Salary From & To */}
          <div className="form-row">
            <div className="input-container">
              <input className="input" type="number" placeholder="Salary From" value={details.salaryFrom}
                onChange={(e) => setDetails({ ...details, salaryFrom: e.target.value })} />
            </div>

            <div className="input-container">
              <input className="input" type="number" placeholder="Salary To" value={details.salaryTo}
                onChange={(e) => setDetails({ ...details, salaryTo: e.target.value })} />
            </div>
          </div>

          {/* Fixed Salary */}
          <div className="input-container">
            <select className="input" value={details.fixedSalary}
              onChange={(e) => setDetails({ ...details, fixedSalary: e.target.value })}>
              <option value="" disabled>Select Salary Type</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>

          {/* Submit */}
          <div className="login-button">
            <input className="input" type="submit" value="Submit Job" />
          </div>
        </form>
      </div>
    </StyledWrapper>
  );
}




const StyledWrapper = styled.div`

 .flag-icon {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: -10px;

    svg {
      width: 24px;
      height: 24px;
    }
  }

.input option {
  color: black;           /* Options in dropdown */
  background-color: white; /* Background for each option */
}
 

  .wrapper {

  .form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem; /* uniform spacing between inputs */
  width: 100%;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Adjust the gap to your preference */
  flex: 1;
  min-width: 250px;
  box-sizing: border-box;
}


.input-container.full-width {
  width: 100%;
}

.input {
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
  }
}

    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
    background: black;
    z-index: -2;
  }

  .form {
    padding: 2rem 3rem;
    display: grid;
    place-items: center;
    gap: 3rem;
    border: 1px solid transparent;
    -o-border-image: linear-gradient(transparent, #ffe0a6, transparent) 1;
    border-image: linear-gradient(transparent, #ffe0a6, transparent) 1;
    border-width: 0 2px 0px 2px;
    background: radial-gradient(
        100% 61.73% at 100% 50%,
        rgba(255, 224, 166, 0.05) 0%,
        transparent 100%
      ),
      radial-gradient(
        91.09% 56.23% at 0% 50%,
        rgba(255, 224, 166, 0.05) 0%,
        transparent 100%
      );
    position: relative;
  }
  .form::before,
  .form::after {
    content: "";
    position: absolute;
    border: 1px solid transparent;
    border: inherit;
    z-index: -1;
  }
  .form::before {
    inset: -1rem;
    opacity: 15%;
  }
  .form::after {
    inset: -2rem;
    opacity: 5%;
  }
  .form .title {
    color: white;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    letter-spacing: 1rem;
    text-transform: uppercase;
    background: linear-gradient(rgb(170, 170, 170), rgb(78, 78, 78));
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }
  .form .input-container {
    display: flex;
    align-items: center;
    background: radial-gradient(
      47.3% 73.08% at 50% 94.23%,
      rgba(255, 255, 255, 0.1) 5%,
      rgba(0, 0, 0, 0) 100%
    );
    border: 1px solid transparent;
    -o-border-image: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.445) 0%,
        rgba(0, 0, 0, 0) 100%
      )
      1;
    border-image: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.445) 0%,
        rgba(0, 0, 0, 0) 100%
      )
      1;
    border-width: 0 0 1px 0;
  }
  .form .input-container svg {
    stroke: grey;
  }
  .form .input-container svg g {
    transition: all 0.2s ease-in-out;
  }
  .form .input-container .input {
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    color: white;
  }
  .form .input-container .input:focus {
    outline: none;
    color: #ffe0a6;
  }
  .form .input-container:focus-within {
    background: radial-gradient(
      47.3% 73.08% at 50% 94.23%,
      rgba(255, 224, 166, 0.1) 5%,
      rgba(0, 0, 0, 0) 100%
    );
    -o-border-image: radial-gradient(circle, #ffe0a6 0%, transparent 100%) 1;
    border-image: radial-gradient(circle, #ffe0a6 0%, transparent 100%) 1;
  }
  .form .input-container:focus-within svg g {
    stroke: #ffe0a6;
  }
  .form .login-button {
    width: 100%;
    position: relative;
    transition: all 0.2s ease-in-out;
  }
  .form .login-button .input {
    cursor: pointer;
    padding: 1rem;
    width: 100%;
    background: radial-gradient(
        100% 45% at 100% 50%,
        rgba(255, 224, 166, 0.084) 0%,
        rgba(115, 115, 115, 0) 100%
      ),
      radial-gradient(
        100% 45% at 0% 50%,
        rgba(255, 224, 166, 0.084) 0%,
        rgba(115, 115, 115, 0) 100%
      );
    border: 1px solid transparent;
    -o-border-image: linear-gradient(transparent, #ffe0a6, transparent) 1;
    border-image: linear-gradient(transparent, #ffe0a6, transparent) 1;
    border-width: 0 1px 0 1px;
    text-align: center;
    color: #ffe0a6;
    font-size: 1rem;
  }
  .form .login-button::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.3764705882) 0.5px,
      transparent 0.5px
    );
    background-size: 0.1px 3px;
    mix-blend-mode: soft-light;
    -webkit-mask-image: radial-gradient(
        40% 45% at 100% 50%,
        white 0%,
        transparent 100%
      ),
      radial-gradient(40% 45% at 0% 50%, white 0%, transparent 100%);
    mask-image: radial-gradient(40% 45% at 100% 50%, white 0%, transparent 100%),
      radial-gradient(40% 45% at 0% 50%, white 0%, transparent 100%);
  }
  .form .login-button:hover {
    animation: flicker 0.5s infinite;
    width: 105%;
  }
  .form .login-button:active {
    width: 95%;
  }
  .form .texture {
    position: absolute;
    background-image: linear-gradient(0deg, #ffffff 1px, transparent 1px);
    background-size: 1px 5px;
    inset: 0;
    mix-blend-mode: soft-light;
    -webkit-mask-image: radial-gradient(
        30% 45% at 100% 50%,
        white 0%,
        transparent 100%
      ),
      radial-gradient(30% 45% at 0% 50%, white 0%, transparent 100%);
    mask-image: radial-gradient(30% 45% at 100% 50%, white 0%, transparent 100%),
      radial-gradient(30% 45% at 0% 50%, white 0%, transparent 100%);
    pointer-events: none;
    animation: movingLines 1s linear infinite;
  }

  @keyframes flicker {
    0% {
      filter: brightness(100%);
    }
    10% {
      filter: brightness(80%);
    }
    20% {
      filter: brightness(120%);
    }
    30% {
      filter: brightness(90%);
    }
    40% {
      filter: brightness(110%);
    }
    50% {
      filter: brightness(100%);
    }
    60% {
      filter: brightness(85%);
    }
    70% {
      filter: brightness(95%);
    }
    80% {
      filter: brightness(105%);
    }
    90% {
      filter: brightness(115%);
    }
    100% {
      filter: brightness(100%);
    }
  }
  @keyframes movingLines {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 0 5px;
    }
  } /*# sourceMappingURL=style.css.map */`;

export default PostJob
