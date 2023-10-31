import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Vendor/Register";
import Login from "./Vendor/Login";
import AdminDashboard from "./Admin/AdminDashboard";
import Home from "./Components/Home";
import Users from "./Admin/Users";
import Products from "./Admin/Products";
import Sales from "./Admin/Sales";
import VendorProductPage from "./Vendor/VendorProductPage";
import MyOrders from "./Components/MyOrders";
import ProductDetails from "./Components/ProductDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/vendor-products" element={<VendorProductPage />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
