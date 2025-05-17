import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Context } from '../../main';
import { useNavigate } from 'react-router-dom';

function MyJobs() {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/v1/job/getMyJobs", { withCredentials: true });

        // Normalize location values for UI display
        const normalizedJobs = data.myJobs.map(job => ({
          ...job,
          location:
            job.location === "remote"
              ? "Work From Home"
              : job.location === "on-site"
              ? "On-Site"
              : job.location,
        }));

        setMyJobs(normalizedJobs);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong.");
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleInput = (jobId, field, value) => {
    setMyJobs(prevJobs =>
      prevJobs.map(job =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = { ...myJobs.find(job => job._id === jobId) };

    // Normalize location field to backend-expected values before sending
    if (updatedJob.location === "Work from Home") {
      updatedJob.location = "remote";
    } else if (updatedJob.location === "On-Site") {
      updatedJob.location = "On-site";
    }

    try {
      const res = await axios.patch(`http://localhost:3000/api/v1/job/updateJob/${jobId}`, updatedJob, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update job.");
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/v1/job/deleteJob/${jobId}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setMyJobs(prev => prev.filter(job => job._id !== jobId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete job.");
    }
  };

  const categoryOptions = [
    "Graphics & Design", "Mobile App Development", "Frontend Web Development", "MERN Stack Development",
    "Account & Finance", "Artificial Intelligence", "Video Animation", "MEAN Stack Development",
    "MEVN Stack Development", "Data Entry Operator", "Digital Marketing", "SEO Specialist", "Content Writing",
    "Copywriting", "Photography & Editing", "Finance & Accounting", "Customer Support", "Human Resources",
    "Sales & Business Development", "Project Management", "Legal Services", "Education & Tutoring",
    "Healthcare & Medical", "Engineering", "Architecture", "Real Estate", "Virtual Assistant", "Transcription"
  ];

  return (
    <div className="myJobs page">
      <div className="container">
        <h3>Your Posted Jobs</h3>
        {
          myJobs.length > 0 ? (
            <div className="banner">
              {
                myJobs.map((e) => (
                  <div className="card" key={e._id}>
                    <div className="content">
                      <div className="short_fields">
                        <div>
                          <span>Title:</span>
                          <input type="text" disabled={editingMode !== e._id}
                            value={e.title} onChange={(event) => handleInput(e._id, "title", event.target.value)} />
                        </div>

                        <div>
                          <span>Country:</span>
                          <input type="text" disabled={editingMode !== e._id}
                            value={e.country} onChange={(event) => handleInput(e._id, "country", event.target.value)} />
                        </div>

                        <div>
                          <span>City:</span>
                          <input type="text" disabled={editingMode !== e._id}
                            value={e.city} onChange={(event) => handleInput(e._id, "city", event.target.value)} />
                        </div>

                        <div>
                          <span>Category:</span>
                          <select disabled={editingMode !== e._id}
                            value={e.category} onChange={(event) => handleInput(e._id, "category", event.target.value)}>
                            <option value="">Select Category</option>
                            {categoryOptions.map((category, idx) => (
                              <option key={idx} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <span>Salary From:</span>
                          <input type="number" disabled={editingMode !== e._id}
                            value={e.salaryFrom} onChange={(event) => handleInput(e._id, "salaryFrom", event.target.value)} />
                        </div>

                        <div>
                          <span>Salary To:</span>
                          <input type="number" disabled={editingMode !== e._id}
                            value={e.salaryTo} onChange={(event) => handleInput(e._id, "salaryTo", event.target.value)} />
                        </div>

                        <div>
                          <span>Expired:</span>
                          <select disabled={editingMode !== e._id}
                            value={e.expired} onChange={(event) => handleInput(e._id, "expired", event.target.value)}>
                            <option value="true">TRUE</option>
                            <option value="false">FALSE</option>
                          </select>
                        </div>
                      </div>

                      <div className="long_field">
                        <div>
                          <span>Description:</span>
                          <textarea rows={5} disabled={editingMode !== e._id}
                            value={e.description} onChange={(event) => handleInput(e._id, "description", event.target.value)}></textarea>
                        </div>

                        <div>
                          <span>Location:</span>
                          <select disabled={editingMode !== e._id}
                            value={e.location} onChange={(event) => handleInput(e._id, "location", event.target.value)}>
                            <option value="On-Site">On-Site</option>
                            <option value="Work From Home">Work from home</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="button_wrapper">
                      <div className="edit_btn_wrapper">
                        {
                          editingMode === e._id ? (
                            <>
                              <button onClick={() => handleUpdateJob(e._id)} className="update_btn">Update</button>
                              <button onClick={handleDisableEdit} className="cancel_btn">Cancel</button>
                            </>
                          ) : (
                            <button onClick={() => handleEnableEdit(e._id)} className="edit_btn">Edit</button>
                          )
                        }
                      </div>
                      <button onClick={() => handleDeleteJob(e._id)} className="delete_btn">Delete</button>
                    </div>
                  </div>
                ))
              }
            </div>
          ) : (
            <p>You have not posted any jobs.</p>
          )
        }
      </div>
    </div>
  );
}

export default MyJobs;
