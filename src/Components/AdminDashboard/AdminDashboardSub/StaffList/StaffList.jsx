import React from 'react';
import './StaffList.css';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const StaffList = () => {
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    const getStaffList = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const role = localStorage.getItem('role');
        if (role === 'admin') {
          const response = await fetch('http://localhost:5000/api/users/getAllStaff', {
            method: 'GET',
            headers: {
              'Authorization': token
            }
          });

          const data = await response.json();

          if (response.ok) {
            setStaffData(data);
          }
          else {
            console.error(data.message || 'Error fetching staff data')
          }
        } else {
          console.error('User is not an admin');
        }
      } catch (err) {
        console.error(`'Something went wrong!',${err.message}`);
      }
    }
    getStaffList();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('access_token')
      const response = await fetch(`http://localhost:5000/api/users/deleteStaff/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token
        }
      });

      const data = await response.json();

      if (response.ok) {
        //client side handling
        const newStaffList = staffData.filter((staff) => { return staff._id !== id });
        setStaffData(newStaffList);

        alert(`Staff with id ${id} is deleted`);
      }
      else {
        console.error(data.message || 'Failed to delete staff');

      }


    } catch (err) {
      console.error(`'Something went wrong!',${err.message}`);
    }
  }

  return (
    // <div className='staff-list'>
    //   {staffData.map((staff, ind) => {
    //     return <div key={ind} className="staff-card">
    //       <p className="delete-icon"><i class="fa-solid fa-trash" onClick={() => { handleDelete(staff._id) }}></i></p>
    //       <p><strong>Name : </strong>{staff.fullName}</p>
    //       <p><strong>Business Name : </strong>{staff.businessName}</p>
    //       <p><strong>Email ID : </strong>{staff.email}</p>
    //       <p><strong>Phone : </strong>{staff.phone}</p>
    //       <p><strong>Business ID : </strong>{staff.businessId}</p>
    //       <p><strong>Role : </strong>{staff.role}</p>
    //     </div>
    //   })}
    //   <button className="staff-button"><Link to="/admin-dashboard/register-staff">Add a New Staff</Link></button>
    // </div>

    <div className='table-container'>
        <h2>Staff List</h2>
        <div className="table-scroll-wrapper">
        <table className="staff-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Business Name</th>
              <th>Email ID</th>
              <th>Phone No.</th>
              <th>Business ID</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((staff,ind)=>{
              return <tr key={ind}>
              <td>{staff.fullName}</td>
              <td>{staff.businessName}</td>
              <td>{staff.email}</td>
              <td>{staff.phone}</td>
              <td>{staff.businessId}</td>
              <td>{staff.role}</td>
              <td><i class="fa-solid fa-trash" onClick={()=>{handleDelete(staff._id)}}></i></td>
            </tr>
            })}
          </tbody>
        </table>
        <div className="button"><button className="staff-button"><Link to="/admin-dashboard/register-staff">Add a New Staff</Link></button></div>
        </div>

      </div>
  );
}

export default StaffList;
