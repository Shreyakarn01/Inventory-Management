import React from 'react';
import './StaffDashboardHome.css';
import Chart from 'chart.js/auto';
import { defaults } from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';



defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = 'black';

const DashboardHome = () => {
  const [product, setProduct] = useState(0);
  const [sale7Days, setSale7Days] = useState(0);

  const getProductCount = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('role');
      if (role === 'staff') {
        const response = await fetch('http://localhost:5000/api/products/getAllBusinessProductStaff', {
          method: 'GET',
          headers: {
            'Authorization': token
          }
        })
        
        const data = await response.json();

        if (response.ok) {
          const productCount = data.reduce((total, current) => { return total + current.quantity }, 0); //,0 is the initial value of total, without it the total takes the value of first data in array which is an object so the output will be like [object Object]316
          setProduct(productCount);
        }
        else{
          alert('Failed to fetch total product count');
          console.error(data.message || data.error || 'Failed to fetch total product count');
        }
      } else {
        alert('User is not a staff');
        console.error('User is not a staff');
      }
    } catch (err) {
      console.error(`Something went wrong,${err.message}`);
    }
  }


  const getSalesCount = async () => {
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
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

          const recentSales = data.filter((sale) => { return new Date(sale.saleDate >= sevenDaysAgo) });
          const totalSaleAmount = recentSales.reduce((total, current) => { return total + current.totalPrice }, 0);
          const roundedSales = Math.round(totalSaleAmount / 1000) + 'K';
          setSale7Days(roundedSales);
        }
        else {
          alert('Failed to fetch last 7 days sale count');
          console.error(data.message || data.error || 'Failed to fetch last 7 days sale count');
        }
      }
      else{
        alert('User is not a staff');
        console.error('User is not a staff');
      }
    } catch (err) {
      console.error(`Something went wrong,${err.message}`);
    }
  }

  useEffect(() => {
    getProductCount();
    getSalesCount();

  }, []);

  return (
    <div className="staff-dashboard-home">
      <div className="staff-dashboard-overview-cards">
        <div className="staff-overview-card">
          <h2>{product}</h2>
          <p>Total Products</p>
          <p className="staff-card-post">Available Products in Inventory</p>
        </div>
        <div className="staff-overview-card">
          <h2>Rs.{sale7Days}</h2>
          <p>Recent Sales By You</p>
          <p className="staff-card-post">Sales in Last 7 Days</p>
        </div>
      </div>

      {/* <div className="staff-dashboard-graphs-charts">
        <h3>Real-Time Business Analytics</h3>
        <div className="staff-dashboard-line-chart">
          <Line
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [
                {
                  label: 'Revenue',
                  data: [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600],
                  backgroundColor: "cyan"
                },
                {
                  label: 'Cost',
                  data: [600, 550, 500, 450, 400, 350, 300, 250, 200, 150, 100, 50],
                  backgroundColor: "red"
                }
              ]
            }}
            options={{
              plugins: {
                title: {
                  text: "Revenue Sources"
                }
              }
            }}
          />
        </div>

        <div className="staff-dashboard-lower-charts">
          <div className="staff-dashboard-piechart">
            <Doughnut
              data={{
                labels: ["A", "B", "C"],
                datasets: [
                  {
                    label: "Revenue",
                    data: [200, 300, 400],
                    backgroundColor: 'rgba(176, 13, 159, 1)',
                    borderColor: 'rgba(8, 8, 8, 1)'
                  },
                  {
                    label: "Loss",
                    data: [90, 80, 70]
                  }
                ]
              }}
              options={{
                plugins: {
                  title: {
                    text: "Revenue Sources"
                  }
                }
              }}
            />
          </div>
          <div className="staff-dashboard-barchart">
            <Bar
              data={{
                labels: ["A", "B", "C"],
                datasets: [
                  {
                    label: "Revenue",
                    data: [200, 300, 400],
                    backgroundColor: 'rgba(1,2,3,4,0.1)',
                    borderRadius: 5
                  },
                  {
                    label: "Loss",
                    data: [90, 80, 70]
                  }
                ]
              }}
              options={{
                plugins: {
                  title: {
                    text: "Revenue Sources"
                  }
                }
              }}
            />
          </div>
        </div>
      </div> */}

      <div className="staff-dashboard-quick-links">
        <h3>Quick Actions</h3>&nbsp; <i class="fa-solid fa-right-long"></i>&nbsp;
        <button type='submit'><Link to="/staff-dashboard/add-sale">Record a Sale</Link></button>&nbsp;&nbsp;
        <button type='submit'><Link to="/staff-dashboard/staff-products">View Product List</Link></button>
      </div>
    </div>
  );
}

export default DashboardHome;
