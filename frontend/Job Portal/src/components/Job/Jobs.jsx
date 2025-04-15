import React, { use, useContext, useEffect, useState } from 'react'
import { Context } from '../../main';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context)
  const navigateTo = useNavigate();
  useEffect(
    () => {
      try {
        axios.get("http://localhost:3000/api/v1/job/getAllJobs", { withCredentials: true })
          .then((res) => {
            setJobs(res.data);
          });

      } catch (e) {
        console.log(e);

      }
    }
  )

  if (!isAuthorized) {
    navigateTo("/login")
  }


  return (
    <>
 <section className="jobs page">
  <div className="container">
    <h1>All Available Jobs</h1>
    <div className='banner'>
{
  jobs.jobs && jobs.jobs.map((e)=>{
    return(
      <div className="card" key={e.id}>
           <p>{e.title}</p>
           <p>{e.category}</p>
           <p>{e.country}</p>
          <Link to={`/job/${e._id}`}>Job Details</Link>
      </div>
    )
  })
}
    </div>
  </div>
 </section>
    </>
  )
}

export default Jobs
