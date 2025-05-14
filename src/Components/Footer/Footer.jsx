import React from 'react';
import {useLocation,Link} from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  return (
    <div className="footer">
      <div className="footer-links">
        <div className="company-info">
          <ul className="footer-list">
            <li className='footer-company'><i class="fa-solid fa-cubes" style={{color: "#ffffff"}}></i>&nbsp;NexInvent</li>
            <li>SmartStock helps businesses track, manage, and grow with smarter inventory tools.</li>
            <li></li>
            <li><i class="fa-solid fa-location-dot"></i>&nbsp;BHEL Cyber Colony, Osman Nagar, Tellapur<br/>
            Hyderabad, Telangana - 502032</li>
          </ul>
        </div>
        <div className="quick-links">
          <ul className="footer-list">
            <li>QUICK LINKS</li>
            <li><a href={location.pathname==='/'?"#heroId":'/'}>Home</a></li>
            <li><a href={location.pathname==='/'?"#featuresId":'/'}>Features</a></li>
            <li><a href={location.pathname==='/'?"#hitwId":'/'}>How It works</a></li>
            <li><a href={location.pathname==='/'?"#contactId":'/'}>Contact</a></li>
          </ul>
        </div>
        <div className="support">
          <ul className="footer-list">
            <li>SUPPORT</li>
            <li><Link to="" target='_blank'>FAQs</Link></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
        <div className="newsletter-social">
          <div className="newsletter">
            <p>Subscribe to our email newsletter</p>
            <input type="email" name="newsletter-email" placeholder="Your email" required></input>
            <button type="submit">Subscribe</button>
          </div>
          <div className='social'>
            <p>Follow Us</p>
            <a href="#"><i class="fa-brands fa-facebook" style={{color: "#f2f2f2"}}></i></a>&nbsp;&nbsp;&nbsp;<a href="#"><i class="fa-brands fa-twitter" style={{color: "#f2f2f2"}}></i></a>&nbsp;&nbsp;&nbsp;<a href="#"><i class="fa-brands fa-linkedin" style={{color: "#f2f2f2"}}></i></a>
          </div>
        </div>
      </div>
      <hr/>
      <div className="footer-copyright">
        <ul className="footer-end">
          <li>© 2024 NexInvent. All rights reserved.</li>
          <li><a href="https://www.google.com/maps/place/BHEL+CYBER+COLONY,+Hyderabad,+Telangana+502300/@17.448592,78.270916,12z/data=!4m6!3m5!1s0x3bcbecc26fd6cfd1:0xe8d1590f13133b37!8m2!3d17.4459685!4d78.2718187!16s%2Fg%2F11lsngs8c8?hl=en&entry=ttu&g_ep=EgoyMDI1MDQwMi4xIKXMDSoASAFQAw%3D%3D" target="_blank">Map</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><select>
              <option val="">English</option>
              <option>Hindi</option>
            </select></li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
