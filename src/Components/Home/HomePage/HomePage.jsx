import React from 'react';
import './HomePage.css';
import Hero from '../Hero/Hero.jsx'
import Features from '../Features/Features.jsx'
import HowItWorks from '../HowItWorks/HowItWorks.jsx'
import Testimonials from '../Testimonials/Testimonials.jsx'
import Contact from '../Contact/Contact.jsx'

const HomePage = () => {
  return (
    <div className="main">
      <div className="hero"><Hero/></div>
      <div className="features"><Features/></div>
      <div className="howitworks"><HowItWorks/></div>
      <div className="testimonials"><Testimonials/></div>
      <div className="contact"><Contact/></div>
    </div>
  );
}

export default HomePage;
