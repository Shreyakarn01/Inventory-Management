import React from 'react';
import './AdminDropDown.css';
import Img from './Images/image.png'
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

const AdminDropDown = () => {
  const [name, setName] = useState('');
  useEffect(() => {
    const getInfo = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const role = localStorage.getItem('role');
        if (role === 'admin') {
          const response = await fetch('http://localhost:5000/api/users/getAdmin', {
            method: 'GET',
            headers: {
              'Authorization': token
            }
          });

          const data = await response.json();

          if (response.ok) {
            setName(data.fullName);
          }
          else {
            console.error(data.message || 'Failed to fetch admin info');
          }
        }
        else if(role==='staff'){
          const response = await fetch('http://localhost:5000/api/users/getStaff', {
            method: 'GET',
            headers: {
              'Authorization': token
            }
          });

          const data = await response.json();

          if (response.ok) {
            setName(data.fullName);
          }
          else {
            console.error(data.message || 'Failed to fetch admin info');
          }
        }

      } catch (err) {
        console.error('Error fetching admin info : ', err);
      }
    }
    getInfo();
  }, []);

  const navigate = useNavigate();
  const handleLogout = async()=>{
    try{
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('role');
      alert('Logged out successfully!');
      navigate('/login');
    }catch(err){
      console.error(`'Something went wrong',${err.message}`);
    }

  }

  return (
    <div className="admin-drop-down">
      <div className="admin-upper">
        <div className="admin-pic"><img src={Img} /></div>&nbsp;&nbsp;{name || 'Admin Name'}
      </div>
      <hr />
      <div className="admin-lower">
        <div className="admin-lower-list"><a href="#">Edit profile</a><i class="fa-solid fa-chevron-right"></i></div>
        <div className="admin-lower-list"><a href="#">Settings & Privacy</a><i class="fa-solid fa-chevron-right"></i></div>
        <div className="admin-lower-list"><a href="#">Help & Support</a><i class="fa-solid fa-chevron-right"></i></div>
        <div className="admin-lower-list"><button onClick={handleLogout}>Logout</button></div>
      </div>
    </div>
  );
}

export default AdminDropDown;
