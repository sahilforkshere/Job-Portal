import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../main';
import axios from 'axios';

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/job/getAJob/${id}`, {
          withCredentials: true,
        });
        setJob(response.data.job);
      } catch (e) {
        console.error("Failed to fetch job:", e.response?.data?.message || e.message);
      }
    };

    fetchJob();
  }, [id]);
  if (!isAuthorized) {
    navigateTo("/login")
  }
  const handleApply = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/application/userGetApplications", {
        withCredentials: true
      });

      const alreadyApplied = res.data.applications.some(
        (app) => app.employerId.user === job.postedBy && app.name === job.title
      );

      if (alreadyApplied) {
        alert("You have already applied to this job.");
      } else {
        navigateTo(`/applications/${job._id}`);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to check application status. Please try again.");
    }
  };


  if (job.fixedSalary === "paid") {
    return (
      <>
        <div className="jobDetail page">
          <div className="container">
            <h3>Job Details</h3>
            <div className="banner">
              <p>
                Title : <span>{job.title}</span>
              </p>
              <p>
                Category : <span>{job.category}</span>
              </p>
              <p>
                Description : <span>{job.description}</span>
              </p>
              <p>
                Country : <span>{job.country}</span>
              </p>
              <p>
                City : <span>{job.city}</span>
              </p>
              <p>
                Location: <span>{job.location}</span>
              </p>
              <p>
                Type: <span>{job.fixedSalary}</span>
              </p>
              <p>

                Salary Range: <span>₹{job.salaryFrom?.toLocaleString()} - ₹{job.salaryTo?.toLocaleString()}</span>
              </p>

              <p>
                {
                  user && user.role === 'Employer' ? <></> : <Link to={`/applications/${job._id}`} onClick={handleApply}>Apply Now</Link>
                }
              </p>






            </div>
          </div></div>
      </>
    )
  }

  else {
    return (
      <>
        <div className="jobDetail page">
          <div className="container">
            <h3>Job Details</h3>
            <div className="banner">
              <p>
                Title : <span>{job.title}</span>
              </p>
              <p>
                Category : <span>{job.category}</span>
              </p>
              <p>
                Description : <span>{job.description}</span>
              </p>
              <p>
                Country : <span>{job.city}</span>
              </p>
              <p>
                Location: <span>{job.location}</span>
              </p>
              <p>
                Type: <span>{job.fixedSalary}</span>
              </p>
              <p>
                {
                  user && user.role === 'Employer' ? <></> : <Link to={`/applications/${job._id}`}>Apply Now</Link>
                }
              </p>






            </div>
          </div></div>
      </>
    )
  }

}

export default JobDetails
