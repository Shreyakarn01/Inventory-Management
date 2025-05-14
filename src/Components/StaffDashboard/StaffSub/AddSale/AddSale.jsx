import React from 'react';
import './AddSale.css'
import { useState,useEffect } from 'react';

const AddSale = () => {
  const [formData,setFormData] = useState({
      productName : "",
      quantitySold : "",
    });

  const [names,setNames] = useState([]);
  
  useEffect(() => {
    const getProducts = async()=>{
      try{
        const token = localStorage.getItem('access_token');
        const role = localStorage.getItem('role');
        if(role==='staff'){
          const response = await fetch('http://localhost:5000/api/products/getAllBusinessProductStaff',{
            method : 'GET',
            headers : {
              'Authorization' : token
            }
          });
  
          const data = await response.json();
  
          if(response.ok){
            setNames(data);
          }else{
           alert('Failed to fetch product Names');
           console.error(data.message || 'Failed to fetch product Names');
          }
  
        }else{
          console.error('User is not a staff');
          alert('User is not a staff');
        }
  
      }catch(err){
        console.error(`'Something went wrong!',${err.message}`)
      }
    }
    getProducts();
  }, []);
  
  
    const handleChange = async (e)=>{
      setFormData({...formData,[e.target.name] : e.target.value});
    }
  
    const handleSubmit=async(e)=>{
      try{
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        const role = localStorage.getItem('role');
        if(role==='staff'){
          const response = await fetch('http://localhost:5000/api/sales/createSale',{
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json',
              'Authorization' : token
            },
            body : JSON.stringify({productName: formData.productName,quantitySold: parseInt(formData.quantitySold)})
          });
  
          const data = await response.json();
          // console.log(data);
  
          if(response.ok){
            alert('Sale is created successfully!');
            setFormData({productName : "",quantitySold:""});
          }
          else{
            alert(data.error || 'Sale can\'t be created');
            console.error(data.message || 'Sale can\'t be created');
          }
  
        }else{
          alert('User is not a staff');
          console.error('User is not a staff');
        }
  
      }catch(err){
        console.error(`'Something went wrong!',${err.message}`);
      }
    }
  
    return (
      <div className="add-sale">
      
            <div className="add-sale-form-box">
              <h2>Create New Sale</h2>
              <div className="add-sale-form-fields">
                <div className='add-sale-productName'>
                  <label htmlFor="productName"><b>Name<i className="fa-solid fa-asterisk fa-2xs" style={{ color: "#c90d0d" }}></i> : </b></label>
                  {/* <input type="text" id="productName" name="productName" required placeholder="Product name" value={formData.productName} onChange={handleChange} /> */}
                  <select id="productName" name="productName" required value={formData.productName} onChange={handleChange}>
                    <option value="">Select a product</option>
                    {names.map((product,ind)=>{
                      return <option key={ind} value={product.name}>{product.name}</option>
                    })}
                  </select>
                </div>
                <div className="add-sale-quantitySold">
                  <label htmlFor="quantitySold"><b>Quantity Sold<i className="fa-solid fa-asterisk fa-2xs" style={{ color: "#c90d0d" }}></i> : </b></label>
                  <input type="text" id="quantitySold" name="quantitySold" required placeholder="Product quantity sold" value={formData.quantitySold} onChange={handleChange} />
                </div>
              </div>
      
      
              <div className="add-product-form-buttons">
                <button type="submit" onClick={handleSubmit}>Create Sale</button>
              </div>
            </div>
      
          </div>
    );
}

export default AddSale;
