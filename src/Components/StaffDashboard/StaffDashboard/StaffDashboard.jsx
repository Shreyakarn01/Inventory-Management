import React from 'react';
import {useState,useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import StaffLeftList from '../StaffLeftList/StaffLeftList';
import Img from './Images/Passport image.jpg';
import AdminDropDown from '../../AdminDashboard/AdminDashboardMain/AdminDropDown/AdminDropDown';
import './StaffDashboard.css';

const StaffDashboard = () => {
    const [open, setOpen] = useState(false);
    
      const handleClick=()=>{
        if(open===true) setOpen(false);
        else setOpen(true);
      }

      const [name,setName] = useState('');

      useEffect(() => {
        const getStaffInfo = async()=>{
          try{
            const token = localStorage.getItem('access_token');
            const response = await fetch('http://localhost:5000/api/users/getStaff',{
              method : 'GET',
              headers : {
                'Authorization' : token
              }
            });

            const data = await response.json();

            if(response.ok){
              setName(data.fullName);
            }else{
              console.error(data.message || 'Failed to fetch staff info')
            }

          }catch(err){
            console.error(`'Something went wrong!',${err.message}`);
          }
        }
        getStaffInfo();
      }, []);
  return (
    <div className="staff">
      <div className='staff-leftBar'>
          <div className="staff-logo">
          <i className="fa-solid fa-cubes"></i>&nbsp;&nbsp;NexInvent
          </div>
          <hr/>
          <div className="staff-leftlist">
            <StaffLeftList/>
          </div>
      </div>

      <div className='staff-right'>
         <div className="staff-topbar">
            <div className="staff-welcome"><b>Welcome {name || 'Staff'}!</b></div>
            <div className="staff-noti"><i class="fa-solid fa-bell"></i></div>
            <div className="staff-profile">
              <div className="staff-profile-img">
                <div className="staff-pic"><img src={Img}/></div><i className="fa-solid fa-caret-down" id="drop" onClick={handleClick}></i>
                {open && <AdminDropDown/>}
              </div>
            </div>
         </div>
         <div className='staff-content'>
            <Outlet/>
         </div>
      </div>
    </div>
  );
}

export default StaffDashboard;
