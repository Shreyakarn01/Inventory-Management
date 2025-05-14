import React from 'react';
import './StaffProducts.css'
import { useState, useEffect } from 'react';

const Products = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const role = localStorage.getItem('role');
        if (role === 'staff') {
          const response = await fetch('http://localhost:5000/api/products/getAllBusinessProductStaff', {
            method: 'GET',
            headers: {
              'Authorization': token
            }
          });

          const data = await response.json();

          if (response.ok) {
            setProductList(data);
          }
          else {
            console.error(data.message || 'Failed to fetch product list');
          }

        }
        else {
          alert('User is not a staff');
          console.error('User is not a staff');
        }
      } catch (err) {
        console.error(`'Something went wrong!',${err.message}`);
      }
    }
    getProduct();
  }, []);



  return (
    // <div className='product-list'>
    // {productList.map((product,ind)=>{
    //   return <div key={ind} className="product-card">
    //   <p><strong>Name : </strong>{product.name}</p>
    //   <p><strong>Category : </strong>{product.category}</p>
    //   <p><strong>Quantity : </strong>{product.quantity}</p>
    //   <p><strong>Unit Price : </strong>{product.unitPrice}</p>
    //   <p><strong>Low Stock Threshold : </strong>{product.lowStockThreshold}</p>
    //   </div>
    // })}
    //  </div>

    <div className='table-container'>
      <h2>Product List</h2>
      <div className="table-scroll-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Low Stock Threshold</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product, ind) => {
              return <tr key={ind}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>{product.unitPrice}</td>
                <td>{product.lowStockThreshold}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
