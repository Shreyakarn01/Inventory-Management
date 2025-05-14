import React from 'react';
import './Reports.css';
import {useState,useEffect} from 'react';
import Chart from 'chart.js/auto';
import { defaults } from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

const Reports = () => {

  const [employeeData, setEmployeeData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [revenueData, setRevenueData] = useState([]);
    
  
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const role = localStorage.getItem('role');
        const currentMonth = new Date().toISOString().slice(0, 7);
        if (role === 'admin') {
          const employeeRes = await fetch('http://localhost:5000/api/reports/employeeAnalysis', {
            method: 'GET',
            headers: {
              'Authorization': token
            }
          })
  
          const productRes = await fetch('http://localhost:5000/api/reports/productAnalysis', {
            method: 'GET',
            headers: {
              'Authorization': token
            }
          })
  
          const revenueRes = await fetch('http://localhost:5000/api/reports/revenueAnalysis', {
            method: 'GET',
            headers: {
              'Authorization': token
            }
          })
  
          const empData = await employeeRes.json();
          const prodData = await productRes.json();
          const revData = await revenueRes.json();

          const empMonthData = empData.find((item)=>{return item.month===currentMonth});
          const prodMonthData = prodData.find((item)=>{return item.month===currentMonth});

          setEmployeeData(empMonthData);
          setProductData(prodMonthData);

  
          // Sort revenue by month descending, then slice last 6 months
          const sortedRevenue = revData
            .sort((a, b) => new Date(b.month) - new Date(a.month))
            .slice(0, 6)
            .reverse(); // reverse to get chronological order

  
          setRevenueData(sortedRevenue);
        } else {
          alert('User is not an admin');
          console.error('User is not an admin');
        }
  
      } catch (err) {
        console.error(`Something went wrong , ${err.message}`);
      }
    }

    useEffect(() => {
      fetchData();
    }, []);

    const getFormattedMonth = () => {
      const date = new Date();
      return date.toLocaleString('default', { month: 'long', year: 'numeric' }); // e.g., "July 2024"
    };
    
  return (
    <div className="dashboard-graphs-charts">
      <h3>Real-Time Business Analytics</h3>
      <div className="dashboard-line-chart">
        <Line
          data={{
            labels: revenueData.map((revenue) => { return revenue.month }),
            datasets: [
              {
                label: 'Revenue',
                data: revenueData.map((revenue) => { return revenue.revenue }),
                backgroundColor: "cyan"
              }
            ]
          }}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Revenue Analysis"
              }
            }
          }}
        />
      </div>

      <p><strong><i>Showing Data for {getFormattedMonth()}</i></strong></p>
      <div className="dashboard-lower-charts">
        <div className="dashboard-piechart">
          <Bar
            data={{
              labels: productData?.products?.map((product) => product.productName),
              datasets: [
                {
                  label: "Sales Amount",
                  data: productData?.products?.map((product) => product.totalRevenue),
                  backgroundColor: 'rgba(8, 8, 8, 1)',
                  borderRadius: 5
                },
                {
                  label: "Quantity Sold",
                  data: productData?.products?.map((product) => product.quantitySold),
                  backgroundColor: 'rgb(57, 43, 43)',
                  borderRadius: 5
                }

              ]
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: `Product Sales Analysis - ${getFormattedMonth()}`
                }
              }
            }}
          />
        </div>
        <div className="dashboard-barchart">
          <Bar
            data={{
              labels: employeeData?.employees?.map((employee) => { return employee.employeeName }),
              datasets: [
                {
                  label: "Sales Count",
                  data: employeeData?.employees?.map((employee) => { return employee.totalPrice }),
                  backgroundColor: 'rgb(31, 5, 54)',
                  borderRadius: 5
                }
              ]
            }}
            options={{
              plugins: {
                title: {
                  text: `Employee Sales Analysis - ${getFormattedMonth()}`
                }
              }
            }}
          />
        </div>
        </div>
        </div>
      );
}

export default Reports;
