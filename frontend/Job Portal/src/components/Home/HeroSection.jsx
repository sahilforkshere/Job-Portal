import React from 'react'
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";


function HeroSection() {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <div className='heroSection'>
      <div className="container">
        <div className="title">
          <h1>Find a job that suits</h1>
          <h2>Your interest and skills</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora iure minus aliquid vero inventore numquam quos eum. Fugit accusantium asperiores aut quasi vero molestiae repudiandae modi deleniti consequatur, exercitationem eius assumenda, excepturi corrupti nobis dolorem officia rem minima quam iusto vel at commodi similique. Eum, quidem. Amet cumque eum maxime.</p>
        </div>
        <div className="image">
          <img src="jobImg.jpg" alt="pic" />
        </div>

      </div>
      <div className="details">
        {
          details.map(e => {
            return (
              <div className="card" key={e.id}>
                <div className="icon" >{e.icon}</div>
                <div className="content">
                  <p>{e.title}</p>
                  <p>{e.subTitle}</p>

                </div>

              </div>

            )
          })
        }
      </div>
    </div>
  )
}

export default HeroSection
