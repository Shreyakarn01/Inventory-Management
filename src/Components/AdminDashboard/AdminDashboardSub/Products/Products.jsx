import React from 'react';
import './Products.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const role = localStorage.getItem('role');
        if (role === 'admin') {
          const response = await fetch('http://localhost:5000/api/products/getAdminSpecificProducts', {
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
          alert('User is not an admin');
          console.error('User is not an admin');
        }
      } catch (err) {
        console.error(`'Something went wrong!',${err.message}`);
      }
    }
    getProduct();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('role');
      if (role === 'admin') {
        const response = await fetch(`http://localhost:5000/api/products/deleteProduct/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': token
          }
        })

        const data = await response.json();

        if (response.ok) {
          const newProductList = productList.filter((product) => { return product._id !== id });
          setProductList(newProductList);
          alert(`Product with id ${id} is deleted`);
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
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unitPrice: "",
    lowStockThreshold: ""
  })

  const [currentId, setCurrentId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const refClose = useRef(null);

  const openModal = async (id) => {
    const entry = productList.find((product) => { return product._id === id });
    if (entry) {
      setFormData({ name: entry.name, category: entry.category, quantity: entry.quantity, unitPrice: entry.unitPrice, lowStockThreshold: entry.lowStockThreshold });
      setCurrentId(id);
      setIsModalOpen(true);
    } else {
      alert("Entry not found");
    }
  }

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('role');

      if (role === 'admin') {
        const response = await fetch(`http://localhost:5000/api/products/updateProduct/${id}`, {
          method: 'PATCH',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: formData.name, category: formData.category, quantity: parseInt(formData.quantity), unitPrice: parseInt(formData.unitPrice), lowStockThreshold: parseInt(formData.lowStockThreshold) })
        });

        const data = await response.json();

        if (response.ok) {
          const updatedEntry = productList.map((product) => {//.map() → Transforms every item in an array and returns a new array (perfect for updating a specific item in productList while keeping others unchanged). , .find() → Returns the first matching item, not an array.
            if (product._id === id) {
              return {
                ...product,
                name: formData.name,
                category: formData.category,
                quantity: formData.quantity,
                unitPrice: formData.unitPrice,
                lowStockThreshold: formData.lowStockThreshold
              };
            }
            return product;
          });
          setProductList(updatedEntry);
          refClose.current.click();
          alert('Entry updated successfully!');
        }
        else {
          alert('Failed to update entry');
          console.error(data.message || data.error || 'Failed to update entry');
        }

      } else {
        alert('User is not an admin');
        console.error('User is not an admin');
      }

    } catch (err) {
      console.error(`Something went wrong,${err.message}`);
    }

  }



  return (
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
                <td><i class="fa-solid fa-trash" onClick={() => { handleDelete(product._id) }}></i>&nbsp;&nbsp;<i class="fa-solid fa-pen-to-square" onClick={() => { openModal(product._id) }}></i></td>
              </tr>
            })}
          </tbody>
        </table>
        <div className="button"><button className="product-button"><Link to="/admin-dashboard/add-product">Add a New Product</Link></button></div>
      </div>


      {isModalOpen && (
        <div className="custom-modal-backdrop">
          <div className="custom-modal">
            <div className="custom-modal-header">
              <h5>Edit Product Entry</h5>
              <button type="button" className="close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <div className="custom-modal-body">
              <div className="form-group">
                <label htmlFor="name">Name : </label>
                <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category : </label>
                <input type="text" id="category" name="category" className="form-control" value={formData.category} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity : </label>
                <input type="text" id="quantity" name="quantity" className="form-control" value={formData.quantity} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="unitPrice">Unit Price : </label>
                <input type="text" id="unitPrice" name="unitPrice" className="form-control" value={formData.unitPrice} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="lowStockThreshold">Low Stock Threshold : </label>
                <input type="text" id="lowStockThreshold" name="lowStockThreshold" className="lowStockThreshold" value={formData.lowStockThreshold} onChange={handleChange} />
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

export default Products;
