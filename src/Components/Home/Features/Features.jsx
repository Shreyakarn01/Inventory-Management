import React from 'react';
import Img1 from './Images/RealTimeTracking.webp';
import Img2 from './Images/EasyStockManagement.jpg';
import Img3 from './Images/LowStockAlert.png';
import Img4 from './Images/RoleBasedAccessControl.png';
import Img5 from './Images/SmartReportingAnalytics.jpg';
import './Features.css';

const Features = () => {
  return (
    <div className="features-main" id="featuresId">
      <h1><u>Everything You Need for Efficient Inventory Management</u></h1>
      <div className="outer">
        <div className="image">
          <img src={Img1} alt=""/>
        </div>
        <div className="text">
          <h3>Real Time Tracking</h3>
          <p>Stay updated with real-time tracking, ensuring accurate inventory levels and instant stock movement visibility for better decision-making.</p>
        </div>
      </div>

      <div className="outer alternate">
        <div className="image-rev">
        <img src={Img2} alt=""/>
        </div>
        <div className="text">
          <h3>Easy Stock Management</h3>
          <p>Effortlessly manage your stock with intuitive tools that streamline tracking, restocking, and organization for optimal inventory control.</p>
        </div>
      </div>

      <div className="outer">
        <div className="image">
        <img src={Img3} alt=""/>
        </div>
        <div className="text">
          <h3>Low Stock Alert</h3>
          <p>Get instant low stock alerts to prevent shortages and ensure timely restocking, keeping your inventory always ready for demand.</p>
        </div>
      </div>

      <div className="outer alternate">
        <div className="image-rev">
        <img src={Img4} alt=""/>
        </div>
        <div className="text">
          <h3>Role-Based Access control</h3>
          <p>Enhance security and efficiency with role-based access control, ensuring users have the right permissions for seamless inventory management.</p>
        </div>
      </div>

      <div className="outer">
        <div className="image">
        <img src={Img5} alt=""/>
        </div>
        <div className="text">
          <h3>Smart Reporting and Analytics</h3>
          <p>Gain valuable insights with smart reporting and analytics, helping you track trends, optimize stock levels, and make data-driven decisions.</p>
        </div>
      </div>
    </div>
  );
}

export default Features;
