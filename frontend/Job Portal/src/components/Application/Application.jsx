import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../../main'
import styled from 'styled-components'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import NProgress from 'nprogress';NProgress.configure({ showSpinner: true });

import 'nprogress/nprogress.css';



function Application() {
  const [details, setDetails] = useState({
    name: '',
    email: '',
    coverLetter: '',
    phone: '',
    resume: null,
  })

  const [showModal, setShowModal] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const { isAuthorized, user } = useContext(Context)
  const navigateTo = useNavigate()
  const { id } = useParams()

  const handleChange = (e) => {
    const { name, value } = e.target
    setDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhoneChange = (phone) => {
    setDetails((prev) => ({ ...prev, phone }))
  }

  const handleFileChange = (e) => {
    setDetails((prev) => ({ ...prev, resume: e.target.files[0] }))
  }

  const handleAppSubmit = async (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      toast.error('Please agree to the Terms and Conditions.');
      return;
    }
  
    NProgress.start(); // Start loading line
  
    const formData = new FormData();
    formData.append('name', details.name);
    formData.append('email', details.email);
    formData.append('coverLetter', details.coverLetter);
    formData.append('phone', details.phone);
    formData.append('resume', details.resume);
    formData.append('jobId', id);
  
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/v1/application/postApplication',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      setDetails({
        name: '',
        email: '',
        coverLetter: '',
        phone: '',
        resume: null,
      });
  
      toast.success('Application submitted successfully');
      navigateTo('/job/getAllJobs');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Submission failed');
    } finally {
      NProgress.done(); // End loading line
    }
  };

  useEffect(() => {
    const checkExistingApplication = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:3000/api/v1/application/userGetAllApplications',
          { withCredentials: true }
        )
        const alreadyApplied = data.applications.some(
          (app) =>
            app.jobId === id && app.applicantId.user === user._id
        )
        if (alreadyApplied) {
          toast.error("You've already applied to this job.")
          navigateTo('/job/getAllJobs')
        }
      } catch (err) {
        console.error(err)
      }
    }

    checkExistingApplication()
  }, [])

  if (!isAuthorized || (user && user.role === 'Employer')) {
    navigateTo('/')
  }

  return (
    <StyledWrapper>
      <form className="form_container" onSubmit={handleAppSubmit}>
        <div className="title_container">
          <p className="title">Application Form</p>
          <span className="subtitle">Please fill out the details below</span>
        </div>

        <div className="input_container">
          <label className="input_label">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={details.name}
            onChange={handleChange}
            className="input_field"
          />
        </div>

        <div className="input_container">
          <label className="input_label">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={details.email}
            onChange={handleChange}
            className="input_field"
          />
        </div>

        <div className="input_container">
          <label className="input_label">Phone</label>
          <PhoneInput
            international
            defaultCountry="US"
            value={details.phone}
            onChange={handlePhoneChange}
            className="phone_input"
          />
        </div>

        <div className="input_container">
          <label className="input_label">Cover Letter</label>
          <textarea
            name="coverLetter"
            placeholder="Write a brief cover letter..."
            value={details.coverLetter}
            onChange={handleChange}
            className="input_field"
            rows={4}
          />
        </div>

        <div className="input_container">
          <label className="input_label">Resume</label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="input_field"
          />
        </div>

        <div className="terms_container">
          <button
            type="button"
            className="terms_trigger"
            onClick={() => setShowModal(true)}
          >
            View Terms and Conditions
          </button>

          <label className="checkbox_label">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={() => setAgreedToTerms(!agreedToTerms)}
              className="checkbox_input"
            />
            I agree to the Terms and Conditions
          </label>
        </div>

        <button type="submit" className="sign-in_btn">
          Submit Application
        </button>
      </form>

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Terms and Conditions</h2>
            <div className="terms_scroll">
              <p><strong>Accuracy of Information:</strong> You confirm that all information provided is true, complete, and accurate to the best of your knowledge. Any false or misleading information may result in rejection or termination of employment.</p>

              <p><strong>Use of Personal Data:</strong> You consent to the collection, use, and storage of your personal data (e.g., name, contact details, resume) for the purpose of evaluating your job application.</p>

              <p><strong>Third-Party Services:</strong> You understand that resume files may be processed through third-party services (such as file upload and storage providers) in compliance with privacy regulations.</p>

              <p><strong>Non-Guarantee of Employment:</strong> Submission of this application does not guarantee a job offer or employment.</p>

              <p><strong>Communication:</strong> You agree to be contacted via the email or phone number provided regarding the status of your application or for further recruitment steps.</p>

              <p><strong>Data Retention:</strong> Your application details may be retained for future job opportunities unless otherwise requested.</p>

              <p><strong>Changes to Terms:</strong> These terms may be updated without prior notice. Continued use of the platform indicates acceptance of the updated terms.</p>
            </div>
            <button className="close_btn" onClick={() => setShowModal(false)}>
              Close
            </button>
          </ModalContent>
        </ModalOverlay>
      )}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  .form_container {
    max-width: 1000px;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-family: 'Inter', sans-serif;
  }

  .title_container {
    text-align: center;
    margin-bottom: 1rem;
  }

  .title {
    font-size: 1.8rem;
    font-weight: bold;
  }

  .subtitle {
    color: #666;
    font-size: 0.95rem;
  }

  .input_container {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .input_label {
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
  }

  .input_field,
  .PhoneInputInput {
    padding: 10px;
    font-size: 1rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  .sign-in_btn {
    background-color: #4a90e2;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .sign-in_btn:hover {
    background-color: #3b7bd1;
  }

  .PhoneInput {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 0 10px;
    background: #fff;
  }

  .PhoneInputInput {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    padding: 12px 8px;
  }

  .PhoneInputCountry {
    margin-right: 8px;
  }

  .terms_container {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .terms_trigger {
    background: none;
    border: none;
    color: #4a90e2;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    text-align: left;
    padding: 0;
  }

  .checkbox_label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
  }

  .checkbox_input {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);

  h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .terms_scroll {
    max-height: 50vh;
    overflow-y: auto;
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .close_btn {
    background: #4a90e2;
    color: white;
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    float: right;
  }

  .close_btn:hover {
    background: #3b7bd1;
  }
`

export default Application
