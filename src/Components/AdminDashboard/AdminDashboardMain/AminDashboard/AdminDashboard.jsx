import React,{useState,useEffect} from 'react';
import './AdminDashboard.css';
import {Outlet} from 'react-router-dom';
import AdminLeftList from '../AdminLeftList/AdminLeftList';
import Img from './Images/Passport image.jpg'
import AdminDropDown from '../AdminDropDown/AdminDropDown'

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);

  const handleClick=()=>{
    if(open===true) setOpen(false);
    else setOpen(true);
  }

  const [name,setName] = useState('');
  useEffect(() => {
    const fetchAdminInfo = async ()=>{
      try{
        const token = localStorage.getItem('access_token');
        const response = await fetch('http://localhost:5000/api/users/getAdmin',{
          method : 'GET',
          headers : {
            'Authorization' : token
          }
        });

        const data = await response.json();

        if(response.ok){
          setName(data.fullName);
        }else{
          console.error(data.message || 'Failed to fetch admin info');
        }

      }catch(err){
        console.error('Error fetching admin info:', err);
      }
    };
    fetchAdminInfo();
  }, []);
  return (
    <div className="admin">
      <div className='admin-leftBar'>
          <div className="admin-logo">
          <i className="fa-solid fa-cubes"></i>&nbsp;&nbsp;NexInvent
          </div>
          <hr/>
          <div className="admin-leftlist">
            <AdminLeftList/>
          </div>
      </div>

      <div className='admin-right'>
         <div className="admin-topbar">
            <div className="admin-welcome"><b>Welcome {name || 'Admin'}!</b></div>
            <div className="admin-noti"><i class="fa-solid fa-bell"></i></div>
            <div className="admin-profile">
              <div className="admin-profile-img">
                <div className="admin-pic"><img src={Img}/></div><i className="fa-solid fa-caret-down" id="drop" onClick={handleClick}></i>
                {open && <AdminDropDown/>}
              </div>
            </div>
         </div>
         <div className='admin-content'>
            <Outlet/>
         </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
