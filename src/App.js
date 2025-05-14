import './App.css';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './Components/Home/HomePage/HomePage'
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import AdminDashboard from './Components/AdminDashboard/AdminDashboardMain/AminDashboard/AdminDashboard';
import DashboardHome from './Components/AdminDashboard/AdminDashboardSub/DashboardHome/DashboardHome'
import RegisterStaff from './Components/AdminDashboard/AdminDashboardSub/RegisterStaff/RegisterStaff'
import StaffList from './Components/AdminDashboard/AdminDashboardSub/StaffList/StaffList'
import Products from './Components/AdminDashboard/AdminDashboardSub/Products/Products'
import AddProduct from './Components/AdminDashboard/AdminDashboardSub/AddProduct/AddProduct'
import LowStockAlert from './Components/AdminDashboard/AdminDashboardSub/LowStockAlert/LowStockAlert'
import Sales from './Components/AdminDashboard/AdminDashboardSub/Sales/Sales'
import Reports from './Components/AdminDashboard/AdminDashboardSub/Reports/Reports'
import AuditLogs from './Components/AdminDashboard/AdminDashboardSub/AuditLogs/AuditLogs';
import StaffDashboard from './Components/StaffDashboard/StaffDashboard/StaffDashboard';
import AddSale from './Components/StaffDashboard/StaffSub/AddSale/AddSale';
import SalesHistory from './Components/StaffDashboard/StaffSub/SalesHistory/SalesHistory';
import StaffDashboardHome from './Components/StaffDashboard/StaffSub/StaffDashboardHome/StaffDashboardHome';
import StaffProducts from './Components/StaffDashboard/StaffSub/StaffProducts/StaffProducts';
import StaffAudit from './Components/StaffDashboard/StaffSub/StaffAudit/StaffAudit';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  const showNavFooterPaths = ['/', '/login', '/signup'];

  const showNavFooter = showNavFooterPaths.includes(location.pathname); //return true or false
  return (
    <div className="App">
      {/* <Router> */}
      {showNavFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>


        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route path="" element={<DashboardHome />}></Route>
          <Route path="register-staff" element={<RegisterStaff />}></Route>
          <Route path="staff-list" element={<StaffList />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="add-product" element={<AddProduct />}></Route>
          <Route path="low-stock-alert" element={<LowStockAlert />}></Route>
          <Route path="sales" element={<Sales />}></Route>
          <Route path="reports" element={<Reports />}></Route>
          <Route path="audit-logs" element={<AuditLogs />}></Route>
        </Route>

        <Route path="/staff-dashboard" element={<StaffDashboard />}>
          <Route path="" element={<StaffDashboardHome />}></Route>
          <Route path="staff-products" element={<StaffProducts />}></Route>
          <Route path="add-sale" element={<AddSale/>}></Route>
          <Route path="sales-history" element={<SalesHistory />}></Route>
          <Route path="staff-audit" element={<StaffAudit />}></Route>
        </Route>


      </Routes>
      {showNavFooter && <Footer />}
      {/* </Router> */}
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
