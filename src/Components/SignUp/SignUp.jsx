import React,{useEffect,useState} from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import './SignUp.css';
import {useNavigate} from 'react-router-dom';

const Signup = () => {
  const [captcha,setCaptcha] = useState(false);
    const [check,setCheck] = useState(false);
  
    const handleonchange=(e)=>{
       let user_captcha_value = e.target.value;
       if(validateCaptcha(user_captcha_value,false)===true) setCaptcha(true);
       else setCaptcha(false);
    }
  
    const handlecheck=(e)=>{
      let user_check_value = e.target.checked;
      // console.log(user_check_value);
      if(user_check_value) setCheck(true);
      else setCheck(false);
    }
  
    useEffect(() => {
      loadCaptchaEnginge(4);
    }, []);


    const[formData,setFormData] = useState({
      fullName : "",
      businessName : "",
      email : "",
      password : "",
      confirmPassword : "",
      phone : "",
      businessId : "",
      role : "admin"
    })

    const handleChange = (e)=>{
       setFormData({...formData,[e.target.name] : e.target.value})
    }

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
      if(captcha && check){
       e.preventDefault();
       if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      try {
        const response = await fetch('http://localhost:5000/api/users/createAdmin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            businessName: formData.businessName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            businessId: formData.businessId,
            role: formData.role,
          }),
        });
    
        const data = await response.json();
        // console.log(data);
    
        if (response.ok) {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          localStorage.setItem('role',data.role);
          alert('Account created successfully!');
          // redirect to dashboard or login
          navigate('/admin-dashboard');
        } else {
          alert(data.message || 'Registration failed!');
        }

      } catch (err) {
        console.error(err);
        alert(`Something went wrong! ${err.message}`);
      }
    }
    }


  return (
    
    <div className="signup">
    
          <div className="signup-left">
              <div className="signup-fl">
              <div className="signup-icon"><i className="fa-solid fa-cubes"></i></div>
              <h1>NexInvent</h1>
              </div>
              <h2>Create Your Admin Account</h2>
              <h3>Create your secure admin account to begin managing your business efficiently.</h3>
          </div>
    
          <div className="signup-form-box">
            <h2>Sign Up & Create Your Admin Account</h2>
              <div className="signup-form-fields">
                <div className='signup-fullName'>
                  <label htmlFor="fullName"><b>Full Name<i className="fa-solid fa-asterisk fa-2xs" style={{color: "#c90d0d"}}></i> : </b></label>
                  <input type="text" id="fullName" name="fullName" required placeholder="Your full name" value={formData.fullName} onChange={handleChange}/>
                </div>
                <div className='signup-business'>
                  <label htmlFor="businessName"><b>Business Name<i className="fa-solid fa-asterisk fa-2xs" style={{color: "#c90d0d"}}></i> : </b></label>
                  <input type="text" id="businessName" name="businessName" required placeholder="Your business name" value={formData.businessName} onChange={handleChange}/>
                </div>
                <div className='signup-email'>
                  <label htmlFor="email"><b>Email<i className="fa-solid fa-asterisk fa-2xs" style={{color: "#c90d0d"}}></i> : </b></label>
                  <input type="email" id="email" name="email" required placeholder="Your email id" value={formData.email} onChange={handleChange}/>
                </div>
                <div className="signup-password">
                  <label htmlFor="password"><b>Password<i className="fa-solid fa-asterisk fa-2xs" style={{color: "#c90d0d"}}></i> : </b></label>
                  <input type="password" id="password" name="password" required placeholder="Your password" value={formData.password} onChange={handleChange}/>
                </div>
                <div className="signup-cpassword">
                  <label htmlFor="confirmPassword"><b>Confirm Password<i className="fa-solid fa-asterisk fa-2xs" style={{color: "#c90d0d"}}></i> : </b></label>
                  <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange}/>
                </div>
                <div className="signup-phone">
                  <label htmlFor="phone"><b>Phone No<i className="fa-solid fa-asterisk fa-2xs" style={{color: "#c90d0d"}}></i> : </b></label>
                  <input type="tel" id="phone" name="phone" required placeholder="Your phone number" pattern="[0-9]{10}" maxLength={10} value={formData.phone} onChange={handleChange}/>
                </div>
                <div className="signup-bId">
                  <label htmlFor="businessId"><b>Business Registration ID/Company ID<i className="fa-solid fa-asterisk fa-2xs" style={{color: "#c90d0d"}}></i> : </b></label>
                  <input type="text" id="businessId" name="businessId" required placeholder="Your business ID" value={formData.businessId} onChange={handleChange}/>
                </div>
                <div className="signup-role">
                  <label htmlFor="role"><b>Role<i className="fa-solid fa-asterisk fa-2xs" style={{color: "#c90d0d"}}></i> : </b></label>
                  <select>
                    <option value="">Admin</option>
                  </select>
                </div>
                <div className="signup-captcha">
                  <div className="signup-captcha-gen"><LoadCanvasTemplate /></div>
                  <div className="signup-captcha-gen"><input type="text" required placeholder="Enter above captcha" name="captcha" onChange={handleonchange}/></div>
                </div>
                <div className="signup-checkbox">
                  <label><input type="checkbox" onChange={handlecheck}/>&nbsp;I agree to the terms and conditions</label>
                </div>
              </div>
              
    
              <div className="signup-form-buttons">
                <button type="submit" disabled={!(captcha && check)} className={captcha && check?"button-abl":"button-dis"} onClick={handleSubmit}>Create Admin Account</button>
              </div>
    
              <div className="signup-form-reset">
                <p>Already have an account?&nbsp;<a href="/login" target="_blank">Login</a></p>
              </div>
          </div>
    
        </div>
  );
}

export default Signup;
