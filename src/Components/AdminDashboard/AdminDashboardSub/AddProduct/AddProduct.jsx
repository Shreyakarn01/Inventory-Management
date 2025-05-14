import React from 'react';
import {useState} from 'react';
import './AddProduct.css';

const AddProduct = () => {
  const [formData,setFormData] = useState({
    name : "",
    category : "",
    quantity : "",
    unitPrice : "",
    lowStockThreshold : ""
  });

  const handleChange = async (e)=>{
    setFormData({...formData,[e.target.name] : e.target.value});
  }

  const handleSubmit=async(e)=>{
    try{
      e.preventDefault();
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('role');
      if(role==='admin'){
        const response = await fetch('http://localhost:5000/api/products/createproduct',{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json',
            'Authorization' : token
          },
          body : JSON.stringify({
            name: formData.name,
            category:formData.category,
            quantity:parseInt(formData.quantity),
            unitPrice:parseFloat(formData.unitPrice),
            lowStockThreshold:formData.lowStockThreshold===''?undefined:parseInt(formData.lowStockThreshold)
          })
        });

        const data = await response.json();
        console.log(data);

        if(response.ok){
          alert('Product is created successfully!');
          setFormData({name : "",category: "",quantity: "",unitPrice: "",lowStockThreshold:""});
        }
        else{
          alert(data.error || 'Product can\'t be created');
          console.error(data.message || 'Product can\'t be created');
        }

      }else{
        alert('User is not an admin');
        console.error('User is not an admin');
      }

    }catch(err){
      console.error(`'Something went wrong!',${err.message}`);
    }
  }

  return (
    <div className="add-product">
    
          <div className="add-product-form-box">
            <h2>Create New Product</h2>
            <div className="add-product-form-fields">
              <div className='add-product-name'>
                <label htmlFor="name"><b>Name<i className="fa-solid fa-asterisk fa-2xs" style={{ color: "#c90d0d" }}></i> : </b></label>
                <input type="text" id="name" name="name" required placeholder="Product name" value={formData.name} onChange={handleChange} />
              </div>
              <div className='add-product-category'>
                <label htmlFor="category"><b>Category<i className="fa-solid fa-asterisk fa-2xs" style={{ color: "#c90d0d" }}></i> : </b></label>
                <input type="text" id="category" name="category" required placeholder="Product category" value={formData.category} onChange={handleChange} />
              </div>
              <div className="add-product-quantity">
                <label htmlFor="quantity"><b>Quantity<i className="fa-solid fa-asterisk fa-2xs" style={{ color: "#c90d0d" }}></i> : </b></label>
                <input type="text" id="quantity" name="quantity" required placeholder="Product quantity" value={formData.quantity} onChange={handleChange} />
              </div>
              <div className="add-product-unitPrice">
                <label htmlFor="unitPrice"><b>Unit Price<i className="fa-solid fa-asterisk fa-2xs" style={{ color: "#c90d0d" }}></i> : </b></label>
                <input type="text" id="unitPrice" name="unitPrice" required placeholder="Product unit price" value={formData.unitPrice} onChange={handleChange} />
              </div>
              <div className="add-product-lowStockThreshold">
                <label htmlFor="lowStockThreshold"><b>Low Stock Threshold<i className="fa-solid fa-asterisk fa-2xs" style={{ color: "#c90d0d" }}></i> : </b></label>
                <input type="text" id="lowStockThreshold" name="lowStockThreshold" required placeholder="Product threshold quantity" value={formData.lowStockThreshold} onChange={handleChange} />
              </div>
            </div>
    
    
            <div className="add-product-form-buttons">
              <button type="submit" onClick={handleSubmit}>Add Product</button>
            </div>
          </div>
    
        </div>
  );
}

export default AddProduct;
