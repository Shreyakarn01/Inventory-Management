import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import test1 from './Images/test1.jpg';
import test2 from './Images/test2.jpg';
import test3 from './Images/test3.jpg';
import test5 from './Images/test5.png';
import { Carousel } from 'react-responsive-carousel';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <div className="tesml">
      <h1><u>Trusted by Businesses Like Yours</u></h1>
      <div className="tesml-carousal">
        <Carousel centerMode centerSlidePercentage={60} autoFocus autoPlay interval={4000} infiniteLoop stopOnHover={false} showThumbs={false} showStatus={false} showIndicators={false}>
          <div className="tesml-outer">
            <div className="tesml-img"><img src={test1}/></div>
          <div className="tesml-card">
            <div className="tesml-text">
              <p>"This tool has transformed how we track our stock! Real-time updates and automated alerts have saved us hours every week."</p>
            </div>
            <div className="tesml-post">
              <p>-Sarah Johnson, Operations Manager, FreshMart</p>
            </div>
          </div>
          </div>

          <div className="tesml-outer">
          <div className="tesml-img"><img src={test2}/></div>
          <div className="tesml-card">
            <div className="tesml-text">
              <p>"Managing our inventory used to be a nightmare. With this system, we now have complete visibility and control over our stock."</p>
            </div>
            <div className="tesml-post">
              <p>-Mark Williams, Store Owner, TechGear Supplies</p>
            </div>
          </div>
          </div>

          <div className="tesml-outer">
          <div className="tesml-img"><img src={test3}/></div>
          <div className="tesml-card">
            <div className="tesml-text">
              <p> "The role-based access feature makes it so easy for my staff to update stock while I focus on growing the business!"</p>
            </div>
            <div className="tesml-post">
              <p>-Amit Patel, Founder, Home Essentials</p>
            </div>
          </div>
          </div>

          <div className="tesml-outer">
          <div className="tesml-img"><img src={test2}/></div>
          <div className="tesml-card">
            <div className="tesml-text">
              <p>"Smart reporting & analytics helped us make better purchasing decisions. Sales have gone up, and wastage is down!"</p>
            </div>
            <div className="tesml-post">
              <p>-Emily Chen, Inventory Lead, Trendy Apparel Co.</p>
            </div>
          </div>
          </div>

          <div className="tesml-outer">
          <div className="tesml-img"><img src={test5}/></div>
          <div className="tesml-card">
            <div className="tesml-text">
              <p>"The automated low-stock alerts are a game-changer! We never run out of essential items, and restocking has become so much easier."</p>
            </div>
            <div className="tesml-post">
              <p>-David Robinson, Warehouse Supervisor, QuickShip Logistics</p>
            </div>
          </div>
          </div>

          <div className="tesml-outer">
          <div className="tesml-img"><img src={test1}/></div>
          <div className="tesml-card">
            <div className="tesml-text">
              <p>"This inventory system seamlessly integrates with our workflow. The UI is intuitive, and our staff learned to use it in no time!"</p>
            </div>
            <div className="tesml-post">
              <p>-Jessica Lee, Retail Manager, Urban Trends</p>
            </div>
          </div>
          </div>

          <div className="tesml-outer">
          <div className="tesml-img"><img src={test2}/></div>
          <div className="tesml-card">
            <div className="tesml-text">
              <p>"The ability to track stock in real time has helped us cut down on over-ordering and reduce waste. Highly recommend this tool!"</p>
            </div>
            <div className="tesml-post">
              <p>-Michael Gomez, Owner, GreenGrocers</p>
            </div>
          </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default Testimonials;
