import React from 'react'
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import WhyThisCourse from '../components/WhyThisCourse';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import {motion} from 'framer-motion'
const Home = () => {
  return (
    <motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
    <div className="flex-1 ">
      <MainSection />
      <WhyThisCourse />
      <Testimonials />
      <Newsletter />
    </div>
    </motion.div>
  )
}

export default Home;