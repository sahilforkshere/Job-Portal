import React, { useContext } from 'react'
import { Context } from '../../main'
import { Navigate } from 'react-router-dom';
import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import PopularCategories from './PopularCategories';
import BigCompanies from './BigCompanies';

function Home() {
  const { isAuthorized } = useContext(Context);

  if (!isAuthorized) {
    return <Navigate to={'/'} />
  }
  return (
    <>
      <section className='homePage page'>
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
        <BigCompanies />
      </section>

    </>
  )
}

export default Home
