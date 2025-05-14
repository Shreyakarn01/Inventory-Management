import React from 'react';
import Img1 from './Images/Register&Setup.jpg'
import Img2 from './Images/Add&UpdateStock.jpg'
import Img3 from './Images/TrackInventoryInRealTime.jpg'
import Img4 from './Images/ProcessSales&Transactions.avif'
import Img5 from './Images/GetInsights&Reports.jpg'
import './HowItWorks.css';


const HowItWorks = () => {
  return (
    <div className="hitw" id="hitwId">
      <h1><u>Streamline your inventory management with ease</u></h1>
      <div className="hitw-carousal">
          <div className="card">
            <div className="hitw-heading">
              <h3>Register & Set Up</h3>
              <div className="hitw-img"><img src={Img1}/></div>
            </div>
            <div className="hitw-text">
              <p>Admins create an account and configure the inventory system.</p>
              <p>Staff members are added with role-based access permissions.</p>
              <p>Business settings, locations, and categories are customized.</p>
            </div>
          </div>
          <div className="card">
            <div className="hitw-heading">
              <h3>Add & Update Stock</h3>
              <div className="hitw-img"><img src={Img2}/></div>
            </div>
            <div className="hitw-text">
              <p>Easily add new products with details like name, SKU, price, and quantity.</p>
              <p>Categorize inventory for better organization.</p>
              <p>Staff members update stock levels when new items arrive.</p>
            </div>
          </div>
          <div className="card">
            <div className="hitw-heading">
              <h3>Track Inventory in Real-Time</h3>
              <div className="hitw-img"><img src={Img3}/></div>
            </div>
            <div className="hitw-text">
              <p>Get an overview of stock availability anytime.</p>
              <p>Monitor stock levels, low-stock alerts, and movement history.</p>
              <p>Ensure products are always in supply.</p>
            </div>
          </div>
          <div className="card">
            <div className="hitw-heading">
              <h3>Process Sales & Transactions</h3>
              <div className="hitw-img"><img src={Img4}/></div>
            </div>
            <div className="hitw-text">
              <p>Record sales and purchase transactions seamlessly.</p>
              <p>Generate invoices and update stock automatically.</p>
              <p>Track revenue and expenses in one place.</p>
            </div>
          </div>
          <div className="card">
            <div className="hitw-heading">
              <h3>Get Insights & Reports</h3>
              <div className="hitw-img"><img src={Img5}/></div>
            </div>
            <div className="hitw-text">
              <p>Access smart analytics with sales trends and stock performance.</p>
              <p>Export reports for business decisions.</p>
              <p>Optimize inventory levels based on real data.</p>
            </div>
          </div>
      </div>
    </div>
  );
}

export default HowItWorks;
