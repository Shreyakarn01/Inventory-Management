import React from 'react';
import './SalesHistory.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const SalesHistory = () => {

  const [sales, setSales] = useState([]);

  useEffect(() => {
    const getSalesData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const role = localStorage.getItem('role');
        if (role === 'staff') {
          const response = await fetch('http://localhost:5000/api/sales/getSpecificStaffSale', {
            method: 'GET',
            headers: {
              'Authorization': token
            }
          })

          const data = await response.json();

          if (response.ok) {
            setSales(data);
          } else {
            alert('Failed to fetch sales record');
            console.error(data.message || 'Failed to fetch sales record');
          }
        } else {
          console.error('User is not an staff');
          alert('User is not an staff');
        }

      } catch (err) {
        console.error(`'Something went wrong!',${err.message}`);
      }
    }
    getSalesData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('role');
      if (role === 'staff') {
        const response = await fetch(`http://localhost:5000/api/sales/deleteSaleByStaff/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': token
          }
        })

        const data = await response.json();

        if (response.ok) {
          const newSalesList = sales.filter((sale) => { return sale._id !== id });
          setSales(newSalesList);
          alert(`Sale with id ${id} is deleted`);
        }
        else {
          console.error(data.message || 'Failed to delete product');
        }

      } else {
        console.error('User is not an admin');
        alert('You are not allowed to perform this action');
      }

    } catch (err) {
      console.error(`'Something went wrong!',${err.message}`);
    }
  }


  const [formData,setFormData] = useState({
    unitPrice : "",
    quantitySold : "",
    totalPrice : ""
  })

  const handleChange=async(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const [currentId,setCurrentId] = useState('');
  const [isModalOpen,setIsModalOpen] = useState(false);

  const openModal=(id)=>{
    const entry = sales.find((sale)=>{return sale._id===id})
    if(entry){
      setFormData({unitPrice: entry.unitPrice,quantitySold: entry.quantitySold});
      setCurrentId(id);
      setIsModalOpen(true);
    }else{
      alert('Entry not found');
    }
  }
  const refClose = useRef(null);
  const handleUpdate = async (id) => {
    try{
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('role');
      if(role==='staff'){
        const response = await fetch(`http://localhost:5000/api/sales/updateSaleByStaff/${id}`,{
          method : 'PATCH',
          headers : {
            'Authorization' : token,
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({unitPrice: parseInt(formData.unitPrice),quantitySold: parseInt(formData.quantitySold)})
        })

        const data = await response.json();

        if(response.ok){
          const updatedEntry = sales.map((sale)=>{
            if(sale._id===id){
              return{
                ...sale,
                unitPrice : formData.unitPrice,
                quantitySold : formData.quantitySold,
                totalPrice : formData.unitPrice*formData.quantitySold
              };
            }
            return sale; 
          });
          setSales(updatedEntry);
          refClose.current.click();
          alert('Entry updated successfully!');
        }else{
          alert('Failed to update entry');
          console.error(data.message || data.error || 'Failed to update entry');
        }

      }else{
        alert('User is not a staff');
        console.error('User is not a staff');
      }

    }catch(err){
      console.error(`Something went wrong, ${err.message}`);
    }
  }


  return (

    <div className='table-container'>
      <h2>Sales Record</h2>
      <div className="table-scroll-wrapper">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Unit Price</th>
              <th>Quantity Sold</th>
              <th>Total Price</th>
              <th>Sold By</th>
              <th>Sales Dates</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, ind) => {
              return <tr key={ind}>
                <td>{sale.product.name}</td>
                <td>{sale.unitPrice}</td>
                <td>{sale.quantitySold}</td>
                <td>{sale.totalPrice}</td>
                <td>{sale.soldBy.fullName}</td>
                <td>{new Date(sale.saleDate).toLocaleString('en-GB')}</td>
                <td><i class="fa-solid fa-trash" onClick={() => { handleDelete(sale._id) }}></i>&nbsp;&nbsp;<i class="fa-solid fa-pen-to-square" onClick={() => { openModal(sale._id) }}></i></td>
              </tr>
            })}
          </tbody>
        </table>
        <div className="button"><button className="sales-button"><Link to="/staff-dashboard/add-sale">Add a New Sale</Link></button></div>
      </div>


      {isModalOpen && (
  <div className="custom-modal-backdrop">
    <div className="custom-modal">
      <div className="custom-modal-header">
        <h5>Edit Sale Entry</h5>
        <button type="button" className="close" onClick={() => setIsModalOpen(false)}>&times;</button>
      </div>
      <div className="custom-modal-body">
        <div className="form-group">
          <label htmlFor="unitPrice">Unit Price : </label>
          <input type="text" id="unitPrice" name="unitPrice" className="form-control" value={formData.unitPrice} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="quantitySold">Quantity Sold : </label>
          <input type="text" id="quantitySold" name="quantitySold" className="form-control" value={formData.quantitySold} onChange={handleChange}/>
        </div>
      </div>
      <div className="custom-modal-footer">
        <button className="btn btn-secondary" ref={refClose} onClick={() => setIsModalOpen(false)}>Close</button>
        <button className="btn btn-primary" onClick={() => handleUpdate(currentId)}>Save Changes</button>
      </div>
    </div>
  </div>
)}


    </div>
  );
}

export default SalesHistory;
