import React from 'react';
import './Navbar.css';
import { Link,useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  return (
    <div className="navbar">
      <div className="logo">
        <i className="fa-solid fa-cubes"></i>&nbsp;&nbsp;NexInvent
      </div>
      <div className="navOptions">
        <ul className="list">
          <li><a href="/">Home</a></li>
          <div className="new"><li><a href={location.pathname==="/"?'#featuresId':'/'}>{location.pathname==='/'?"Features":""}</a></li></div>
          <li><a href={location.pathname==='/'?'#hitwId':'/'}>{location.pathname==='/'?"How it works":""}</a></li>
          <li><a href={location.pathname==='/'?"#contactId":'/'}>Contact</a></li>
        </ul>
      </div>
      <div className="logReg">
        <ul className="side">
          <li><i class="fa-solid fa-user"></i>&nbsp;<Link to="/login" target="_blank">Login</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
