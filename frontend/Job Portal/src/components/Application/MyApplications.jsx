import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../main';
import Resume from './Resume'; // You should have a modal component here
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyApplications() {
  const { isAuthorized, user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState('');
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) return navigateTo('/login');

    const fetchApplications = async () => {
      try {
        const url =
          user && user.role === 'Employer'
            ? 'http://localhost:3000/api/v1/application/employerGetApplications'
            : 'http://localhost:3000/api/v1/application/userGetApplications';

        const response = await axios.get(url, { withCredentials: true });
        setApplications(response.data.applications);
      } catch (e) {
        toast.error(e.response?.data?.message || 'Something went wrong');
      }
    };

    fetchApplications();
  }, [isAuthorized, user, navigateTo]);

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/application/deleteApplication/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setApplications(applications.filter((application) => application._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      <div className="container">
        <h1>
          {user?.role === 'Employer'
            ? 'Applications From Users (Job Seekers)'
            : 'My Applications'}
        </h1>

        {applications.length === 0 ? (
          <h4>No Applications Found</h4>
        ) : (
          applications.map((application) =>
            user?.role === 'Employer' ? (
              <EmployerCard
                key={application._id}
                element={application}
                openModal={openModal}
              />
            ) : (
              <UserCard
                key={application._id}
                element={application}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            )
          )
        )}
      </div>

      {modalOpen && <Resume imageUrl={resumeImageUrl} onClose={closeModal} />}
    </section>
  );
}

export default MyApplications;

// =========================
// User Card
// =========================
const UserCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p><span>Name:</span> {element.name}</p>
        <p><span>Email:</span> {element.email}</p>
        <p><span>Phone:</span> {element.phone}</p>
        <p><span>Address:</span> {element.address}</p>
        <p><span>Cover Letter:</span> {element.coverLetter}</p>
      </div>
      <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="btn_area">
        <button onClick={() => deleteApplication(element._id)}>
          Delete Application
        </button>
      </div>
    </div>
  );
};

// =========================
// Employer Card
// =========================
const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p><span>Name:</span> {element.name}</p>
        <p><span>Email:</span> {element.email}</p>
        <p><span>Phone:</span> {element.phone}</p>
        <p><span>Address:</span> {element.address}</p>
        <p><span>Cover Letter:</span> {element.coverLetter}</p>
      </div>
      <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
    </div>
  );
};
