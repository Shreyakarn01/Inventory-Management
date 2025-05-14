import React, { useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import './Login.css';
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
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
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (check && captcha) {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:5000/api/users/loginUser',{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify({
            email : formData.email,
            password : formData.password
          })
        });

        const data = await response.json();

        if(response.ok){
          localStorage.setItem('access_token',data.access_token);
          localStorage.setItem('refresh_token',data.refresh_token);
          localStorage.setItem('role',data.role);
          if(data.role==='admin'){
            navigate('/admin-dashboard');
          }
          else{
            navigate('/staff-dashboard');
          }
          alert('Logged In successfully!');
        }
        else{
          alert(data.message || 'Login failed');
        }
      } catch (err) {
        console.error(`Something went wrong!,${err.message}`);
      }
    }
  }



  return (
    <div className="login">

      <div className="login-left">
        <div className="login-fl">
          <div className="login-icon"><i className="fa-solid fa-cubes"></i></div>
          <h1>Welcome back!</h1>
        </div>
        <h2>Log in to your NexInvent account</h2>
        <h3>Track your inventory, view reports, and manage stock effortlessly.</h3>
      </div>

      <div className="login-form-box">
        <h2>Sign In & Access Your Dashboard</h2>
        <div className="login-form-fields">
          <div className='login-email'>
            <label htmlFor="email"><b>Email<i className="fa-solid fa-asterisk fa-2xs" style={{ color: "#c90d0d" }}></i> : </b></label>
            <input type="email" id="email" name="email" required placeholder="Your email id" value={formData.email} onChange={handleChange} />
          </div>
          <div className="login-password">
            <label htmlFor="password"><b>Password<i className="fa-solid fa-asterisk fa-2xs" style={{ color: "#c90d0d" }}></i> : </b></label>
            <input type="password" id="password" name="password" required placeholder="Your password" value={formData.password} onChange={handleChange} />
          </div>
          <div className="login-captcha">
            <div className="login-captcha-gen"><LoadCanvasTemplate /></div>
            <div className="login-captcha-gen"><input type="text" required placeholder="Enter above captcha" name="captcha" onChange={handleonchange} /></div>
          </div>
          <div className="login-checkbox">
            <label><input type="checkbox" onChange={handlecheck} />&nbsp;I agree to the terms and conditions</label>
          </div>
        </div>

        <div className="login-form-buttons">
          <button type="submit" disabled={!(captcha && check)} className={captcha && check ? "button-abl" : "button-dis"} onClick={handleLogin}>Login</button>
        </div>

        <div className="login-form-reset">
          <p><Link to="" target="_blank">Forgot Password?</Link>&nbsp;/&nbsp;<a href="/signup" target="_blank">New Admin Register</a></p>
        </div>
      </div>

    </div>
  );
}

export default Login;
