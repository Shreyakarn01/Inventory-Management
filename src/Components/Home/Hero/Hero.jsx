import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Img10 from './Images/Img10.webp';
import Img4 from './Images/Img4.jpg';
import Img3 from './Images/Img3.jpg';
import invent from './Images/invent.jpg';
import Img8 from './Images/Img8.png';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-main" id="heroId">
      <Carousel autoFocus autoPlay interval={3000} infiniteLoop stopOnHover={false} showThumbs={false} showStatus={false}>
        <div>
          <img src={Img10} />
        </div>
        <div>
          <img src={Img8} />
        </div>
        <div>
          <img src={Img3} />
        </div>
        <div>
          <img src={invent} />
        </div>
        <div>
          <img src={Img4} />
        </div>
      </Carousel>
    </div>
  );
}

export default Hero;
