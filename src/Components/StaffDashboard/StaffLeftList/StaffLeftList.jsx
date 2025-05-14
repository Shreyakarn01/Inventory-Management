import React from 'react';
import {Link,useNavigate} from 'react-router-dom';
import './StaffLeftList.css'

const StaffLeftList = () => {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    try{
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('role');
      navigate('/login');
      alert('Logged out successfully!');
    }catch(err){
      console.error(`'Something went wrong!',${err.message}`);
    }
  }
  return (
    <div className="staff-left-list">
                <div className="staff-left-list-items"><i class="fa-solid fa-house"></i>&nbsp;<Link to="/staff-dashboard">Dashboard</Link></div>
                <div className="staff-left-list-items"><i class="fa-solid fa-boxes-stacked"></i>&nbsp;<Link to="/staff-dashboard/staff-products">Products/Inventory</Link></div>
                <div className="staff-left-list-items"><i class="fa-solid fa-book"></i>&nbsp;<Link to="/staff-dashboard/add-sale">Add Sale/Rec Transaction</Link></div>
                <div className="staff-left-list-items"><i class="fa-solid fa-boxes-stacked"></i>&nbsp;<Link to="/staff-dashboard/sales-history">Sales History</Link></div>
                <div className="staff-left-list-items"><i class="fa-regular fa-file"></i>&nbsp;<Link to="/staff-dashboard/staff-audit">Audit Logs</Link></div>
                <div className="staff-left-list-items"><button onClick={handleLogout}>Logout</button></div>
        </div>
  );
}

export default StaffLeftList;
