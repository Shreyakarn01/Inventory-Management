import React from 'react';
import './LowStockAlert.css';
import { useEffect, useState } from 'react';

const LowStockAlert = () => {
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    const getLowStock = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const role = localStorage.getItem('role');
        if (role === 'admin') {
          const response = await fetch('http://localhost:5000/api/products/getLowStockProducts', {
            method: 'GET',
            headers: {
              'Authorization': token
            }
          });

          const data = await response.json();

          if (response.ok) {
            setLowStock(data);
          }
          else {
            console.error(data.message || 'Failed to fetch Low Stock items');
          }

        } else {
          alert('User is not an admin');
          console.error('User is not an admin');
        }

      } catch (err) {
        console.error(`'Something went wrong!',${err.message}`);
      }

    }
    getLowStock();
  }, []);


  const handleDownloadPDF = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('role');

      if (role === 'admin') {
        const response = await fetch('http://localhost:5000/api/reports/exportLowStockItems', {
          method: 'GET',
          headers: {
            'Authorization': token
          }
        });

        // const data = await response.json(); //its wrong as PDF is not a json file

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'PDF cannot be downloaded');
        }

        const blob = await response.blob(); //blob stands for Binary Large Object — it stores file data like PDFs, images, excel etc.
        const url = window.URL.createObjectURL(blob);//createObjectURL() turns the blob into a downloadable link (URL)
        const a = document.createElement('a'); //Creates a hidden anchor (<a>) tag.
        a.href = url; //a.href = url sets the blob link.
        a.download = 'low_stock_items.pdf'; //a.download = 'low_stock_items.pdf' sets the default filename.
        a.click(); //programmatically "clicks" the link, triggering download.
        window.URL.revokeObjectURL(url); //Frees up memory by revoking the temporary blob URL after download

        // alert('PDF downloaded successfully!');
      } else {
        alert('User is not an admin');
      }



    } catch (err) {
      console.error(`Something went wrong ${err.message}`);
    }
  }

  const handleDownloadExcel = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('role');

      if (role === 'admin') {
        const response = await fetch('http://localhost:5000/api/reports/exportLowStockItemsExcel', {
          method: 'GET',
          headers: {
            'Authorization': token
          }
        });

        if (!response.ok) {
          throw new Error('Failed to download Excel file');
        }

        // Convert the response to a Blob
        const blob = await response.blob();
        // console.log(blob);

        // Create a link and click it programmatically
        const url = window.URL.createObjectURL(blob);
        // console.log(url);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'low_stock_items.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      }

    } catch (err) {
      console.error(`Something went wrong ${err.message}`);
    }
  }


  return (
    // <div className='lowStock-list'>
    //   {lowStock.map((item, ind) => {
    //     return <div key={ind} className="lowStock-card">
    //       <p><strong>Name : </strong>{item.name}</p>
    //       <p><strong>Category : </strong>{item.category}</p>
    //       <p><strong>Quantity : </strong>{item.quantity}</p>
    //       <p><strong>Unit Price : </strong>{item.unitPrice}</p>
    //       <p><strong>Low Stock Threshold : </strong>{item.lowStockThreshold}</p>
    //     </div>
    //   })}
    //   <button className="lowStock-button" onClick={handleDownloadPDF}>Download PDF file&nbsp;&nbsp;<i class="fa-solid fa-download"></i></button>
    //   <button className="lowStock-button" onClick={handleDownloadExcel}>Download Excel file&nbsp;&nbsp;<i class="fa-solid fa-download"></i></button>
    // </div>

    <div className='table-container'>
            <h2>Low Stock Items</h2>
            <div className="table-scroll-wrapper">
            <table className="low-stock-table">
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
                {lowStock.map((item,ind)=>{
                  return <tr key={ind}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.lowStockThreshold}</td>
                </tr>
                })}
              </tbody>
            </table>
            <div className="button">
              <button className="lowStock-button" onClick={handleDownloadPDF}>Download PDF file&nbsp;&nbsp;<i class="fa-solid fa-download"></i></button>&nbsp;&nbsp;
              <button className="lowStock-button" onClick={handleDownloadExcel}>Download Excel file&nbsp;&nbsp;<i class="fa-solid fa-download"></i></button>
            </div>
            </div>
          </div>
  );
}

export default LowStockAlert;
