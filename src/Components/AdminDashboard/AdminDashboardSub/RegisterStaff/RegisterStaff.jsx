import React, { useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import './RegisterStaff.css';

const RegisterStaff = () => {
  const [captcha, setCaptcha] = useState(false);
  const [check, setCheck] = useState(false);

  const handleonchange = (e) => {
    let user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value, false) === true) setCaptcha(true);
    else setCaptcha(false);
  }

  const handlecheck = (e) => {
    let user_check_value = e.target.checked;
    // console.log(user_check_value);
    if (user_check_value) setCheck(true);
    else setCheck(false);
  }

  useEffect(() => {
    loadCaptchaEnginge(4);
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "staff"
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    if (check && captcha) {
      e.preventDefault();
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('role');
      if (role === 'admin') {
        try {
          const response = await fetch('http://localhost:5000/api/users/createStaff', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify({
              fullName: formData.fullName,
              email: formData.email,
              password: formData.password,
              phone: formData.phone,
              role: formData.role
            })
          })

          const data = await response.json();

          if (response.ok) {
            alert('Staff registered successfully and email sent!');
          } else {
            console.error(data.message || 'Not allowed to register staff');
          }

          setFormData({
            fullName: "",
            email: "",
            password: "",
            phone: "",
            role: ""
          })

        } catch (err) {
          console.error(`'Something went wrong!',${err.message}`)
        }
      }
    }
  }
  return (
    <div className="register">

      <div className="register-form-box">
        <h2>Register Staff</h2>
        <div className="register-form-fields">
          <div className='register-fullName'>
            <label htmlFor="fullName"><b>Full Name<i className="fa-solid fa-asterisk fa-2xs" style={{ color: "#c90d0d" }}></i> : </b></label>
            <input type="text" id="fullName" name="fullName" required placeholder="Your full name" value={formData.fullName} onChange={handleChange} />
          </div>
          <div className='register-email'>
            <label htmlFor="email"><b>Email<i className="fa-solid fa-asterisk fa-2xs" style={{ color: "#c90d0d" }}></i> : </b></label>
            <input type="email" id="email" name="email" required placeholder="Your email id" value={formData.email} onChange={handleChange} />
          </div>
          <div className="register-password">
            <label htmlFor="password"><b>Password<i className="fa-solid fa-asterisk fa-2xs" style={{ color: "#c90d0d" }}></i> : </b></label>
            <input type="password" id="password" name="password" required placeholder="Your password" value={formData.password} onChange={handleChange} />
          </div>
          <div className="register-phone">
            <label htmlFor="phone"><b>Phone No<i className="fa-solid fa-asterisk fa-2xs" style={{ color: "#c90d0d" }}></i> : </b></label>
            <input type="tel" id="phone" name="phone" required placeholder="Your phone number" pattern="[0-9]{10}" maxLength={10} value={formData.phone} onChange={handleChange} />
          </div>
          <div className="register-role">
            <label htmlFor="role"><b>Role<i className="fa-solid fa-asterisk fa-2xs" style={{ color: "#c90d0d" }}></i> : </b></label>
            <select>
              <option value="">Staff</option>
            </select>
          </div>
          <div className="register-captcha">
            <div className="register-captcha-gen"><LoadCanvasTemplate /></div>
            <div className="register-captcha-gen"><input type="text" required placeholder="Enter above captcha" name="captcha" onChange={handleonchange} /></div>
          </div>
          <div className="register-checkbox">
            <label><input type="checkbox" onChange={handlecheck} />&nbsp;I agree to the terms and conditions</label>
          </div>
        </div>


        <div className="register-form-buttons">
          <button type="submit" disabled={!(captcha && check)} className={captcha && check ? "button-abl" : "button-dis"} onClick={handleSubmit}>Register Staff</button>
        </div>
      </div>

    </div>
  );
}

export default RegisterStaff;
