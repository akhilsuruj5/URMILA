import React from 'react'
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import WhyThisCourse from '../components/WhyThisCourse';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <div className="flex-1">
      <MainSection />
      <WhyThisCourse />
      <Testimonials />
      <Newsletter />
    </div>
  )
}

export default Home;