import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact" id="contactId">
      <div className="contact-box">

        <div className="contact-message">
          <h2><u>Have Questions? Let’s Talk!</u></h2>
          <form className="form">
            <div className="form-field">
              <label htmlFor="name">Full Name<i className="fa-solid fa-asterisk fa-2xs" style={{color: "#c90d0d"}}></i> : </label>
              <input type="text" id="name" name="name" placeholder='Your full name' required />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email Address<i className="fa-solid fa-asterisk fa-2xs" style={{color: "#c90d0d"}}></i> : </label>
              <input type="email" id="email" name="email" placeholder='Your email id' required />
            </div>
            <div className="form-field">
              <label htmlFor="subject">Subject<i className="fa-solid fa-asterisk fa-2xs" style={{color: "#c90d0d"}}></i> : </label>
              <select className="form-select" id="subject" name="subject" required>
                <option value="">Select subject</option>
                <option>General Inquiry</option>
                <option>Support</option>
                <option>Partnership</option>
                <option>Feedback</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="message">Message<i className="fa-solid fa-asterisk fa-2xs" style={{color: "#c90d0d"}}></i> : </label>
              <textarea className="form-textarea" id="message" name="message" rows="5" required placeholder="Write your message here..."></textarea>
            </div>
            <div className="form-button">
              <button type="submit">Send Message</button>
            </div>
          </form>
        </div>

        <div className="contact-details">
          <h2><u>Get in Touch</u></h2>
          <div className="contact-info">
          <div className="call-us">
            <i class="fa-solid fa-phone"></i>&nbsp;<b>Call Us</b><br />
            +91-123-456-789<br />
            +91-507-263-211
          </div>
          <div className="find-us">
            <div className="address">
              <i class="fa-solid fa-location-dot"></i>&nbsp;<b>Find Us</b><br />
              <b>Infonotics Software Solutions</b><br />
              BHEL Cyber Colony, Osman Nagar, Tellapur<br />
              Hyderabad, Telangana - 502032
            </div>
            <div className="map"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30449.85218929856!2d78.2340070186944!3d17.448629342191992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbecc29908f369%3A0xf52279e44a456c3d!2sBHEL%20Cyber%20Colony%2C%20Osman%20Nagar%2C%20Hyderabad%2C%20Telangana%20502300!5e0!3m2!1sen!2sin!4v1743740244817!5m2!1sen!2sin" width="200" height="150" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div>
          </div>
          <div className="visit-us">
            <i class="fa-regular fa-clock"></i>&nbsp;<b>Visit Us</b><br />
            <b>Monday-Friday</b><br />
            <b>9AM-5PM</b>
          </div>
        </div>
        </div>

      </div>
    </div>
  );
}

export default Contact;

{/* <div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30449.85218929856!2d78.2340070186944!3d17.448629342191992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbecc29908f369%3A0xf52279e44a456c3d!2sBHEL%20Cyber%20Colony%2C%20Osman%20Nagar%2C%20Hyderabad%2C%20Telangana%20502300!5e0!3m2!1sen!2sin!4v1743740244817!5m2!1sen!2sin" width="600" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div> */}