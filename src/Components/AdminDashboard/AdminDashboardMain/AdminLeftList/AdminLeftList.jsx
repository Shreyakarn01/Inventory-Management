import React from 'react';
import {Link} from 'react-router-dom';
import './AdminLeftList.css';
import {useNavigate} from 'react-router-dom';

const AdminLeftList = () => {
    const navigate = useNavigate();

    const handleLogout =async ()=>{
        try{
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('role');
            await navigate('/login');
            alert('Logged out successfully!')
        }catch(err){
            console.error(`'Something went wrong!',${err.message}`);
        }
    }

    return (
        <div className="admin-left-list">
                <div className="admin-left-list-items"><i class="fa-solid fa-house"></i>&nbsp;<Link to="/admin-dashboard">Dashboard</Link></div>
                <div className="admin-left-list-items"><i class="fa-solid fa-book"></i>&nbsp;<Link to="/admin-dashboard/register-staff">Register Staff</Link></div>
                <div className="admin-left-list-items"><i class="fa-solid fa-rectangle-list"></i>&nbsp;<Link to="/admin-dashboard/staff-list">Staff List</Link></div>
                <div className="admin-left-list-items"><i class="fa-solid fa-boxes-stacked"></i>&nbsp;<Link to="/admin-dashboard/products">Products/Inventory</Link></div>
                <div className="admin-left-list-items"><i class="fa-solid fa-plus"></i>&nbsp;<Link to="/admin-dashboard/add-product">Add Product</Link></div>
                <div className="admin-left-list-items"><i class="fa-solid fa-exclamation"></i>&nbsp;<Link to="/admin-dashboard/low-stock-alert">Low Stock Alert</Link></div>
                <div className="admin-left-list-items"><i class="fa-solid fa-wallet"></i>&nbsp;<Link to="/admin-dashboard/sales">Sales/Transactions</Link></div>
                <div className="admin-left-list-items"><i class="fa-solid fa-chart-line"></i>&nbsp;<Link to="/admin-dashboard/reports">Reports & Analytics</Link></div>
                <div className="admin-left-list-items"><i class="fa-regular fa-file"></i>&nbsp;<Link to="/admin-dashboard/audit-logs">Audit Logs</Link></div>
                <div className="admin-left-list-items"><button onClick={handleLogout}>Logout</button></div>
        </div>
    );
}

export default AdminLeftList;
