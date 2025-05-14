import React from 'react';
import './DashboardHome.css';
import Chart from 'chart.js/auto';
import { defaults } from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = 'black';

const DashboardHome = () => {
  const [product, setProduct] = useState(0);
  const [staff, setStaff] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [sales7Days, setSales7Days] = useState(0);

  const getProductCount = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('role');
      if (role === 'admin') {
        const response = await fetch('http://localhost:5000/api/products/getAdminSpecificProducts', {
          method: 'GET',
          headers: {
            'Authorization': token
          }
        })

        const data = await response.json();

        if (response.ok) {
          const productCount = data.reduce((total, current) => { return total + current.quantity }, 0); //,0 is the initial value of total, without it the total takes the value of first data in array which is an object so the output will be like [object Object]316

          setProduct(productCount);
        } else {
          alert('Failed to fetch total product count');
          console.error(data.message || data.error || 'Failed to fetch total product count');
        }

      } else {
        alert('User is not an admin');
        console.error('User is not an admin');
      }

    } catch (err) {
      console.log(`Something went wrong, ${err.message}`);
    }
  }


  const getStaffCount = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('role');
      if (role === 'admin') {
        const response = await fetch('http://localhost:5000/api/users/getAllStaff', {
          method: 'GET',
          headers: {
            'Authorization': token
          }
        })

        const data = await response.json();

        if (response.ok) {
          const staffCount = data.length;

          setStaff(staffCount);
        } else {
          alert('Failed to fetch total staff count');
          console.error(data.message || data.error || 'Failed to fetch total staff count');
        }

      } else {
        alert('User is not an admin');
        console.error('User is not an admin');
      }

    } catch (err) {
      console.log(`Something went wrong, ${err.message}`);
    }
  }


  const getLowStockCount = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('role');
      if (role === 'admin') {
        const response = await fetch('http://localhost:5000/api/products/getLowStockProducts', {
          method: 'GET',
          headers: {
            'Authorization': token
          }
        })

        const data = await response.json();

        if (response.ok) {
          const lowStockCount = data.length;

          setLowStock(lowStockCount);
        } else {
          alert('Failed to fetch low stock item count');
          console.error(data.message || data.error || 'Failed to fetch low stock item count');
        }

      } else {
        alert('User is not an admin');
        console.error('User is not an admin');
      }

    } catch (err) {
      console.log(`Something went wrong, ${err.message}`);
    }
  }


  const getSalesCount = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('role');
      if (role === 'admin') {
        const response = await fetch('http://localhost:5000/api/sales/getAllSaleOfBusiness', {
          method: 'GET',
          headers: {
            'Authorization': token
          }
        })

        const data = await response.json();

        if (response.ok) {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

          const recentSales = data.filter((sale) => { return new Date(sale.saleDate) >= sevenDaysAgo });
          const totalSalesAmount = recentSales.reduce((total, current) => { return total + current.totalPrice }, 0);
          const roundedSales = Math.round(totalSalesAmount / 1000) + "K";
          setSales7Days(roundedSales);
        } else {
          alert('Failed to fetch last 7 days sale count');
          console.error(data.message || data.error || 'Failed to fetch last 7 days sale count');
        }
      } else {
        alert('User is not an admin');
        console.error('User is not an admin');
      }

    } catch (err) {
      console.log(`Something went wrong, ${err.message}`);
    }
  }

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
        console.log(empMonthData);


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
    getProductCount();
    getStaffCount();
    getLowStockCount();
    getSalesCount();
    fetchData();
  }, []);

  const getFormattedMonth = () => {
    const date = new Date();
    return date.toLocaleString('default', { month: 'long', year: 'numeric' }); // e.g., "July 2024"
  };
  return (
    <div className="dashboard-home">
      <div className="dashboard-overview-cards">
        <div className="overview-card">
          <h2>{product}</h2>
          <p>Total Products</p>
          <p className="card-post">Available Products in Inventory</p>
        </div>
        <div className="overview-card">
          <h2>{staff}</h2>
          <p>Total Staff Members</p>
          <p className="card-post">Active Staff Accounts</p>
        </div>
        <div className="overview-card">
          <h2>{lowStock}</h2>
          <p>Low Stock Items</p>
          <p className="card-post">Products Low in Stock</p>
        </div>
        <div className="overview-card">
          <h2>Rs.{sales7Days}</h2>
          <p>Recent Sales</p>
          <p className="card-post">Sales in Last 7 Days</p>
        </div>
      </div>

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

      <div className="dashboard-quick-links">
        <h3>Quick Actions</h3>&nbsp; <i class="fa-solid fa-right-long"></i>&nbsp;
        <button type='submit'>Add New product</button>&nbsp;&nbsp;
        <button type='submit'>Register Staff</button>
      </div>
    </div>
  );
}

export default DashboardHome;
