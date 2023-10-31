import React from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <AdminHeader />
      <div className="admin-options">
        <div className="admin-card" onClick={() => handleCardClick("/users")}>
          <h3>Users</h3>
          <p>View and manage user accounts.</p>
        </div>
        <div
          className="admin-card"
          onClick={() => handleCardClick("/products")}
        >
          <h3>Products</h3>
          <p>Manage the products in your system.</p>
        </div>
        <div className="admin-card" onClick={() => handleCardClick("/sales")}>
          <h3>Sales & Return</h3>
          <p>Manage sales and return transactions.</p>
        </div>
        <div className="admin-card" onClick={() => handleCardClick("/reports")}>
          <h3>Reports</h3>
          <p>Generate reports and analytics.</p>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
