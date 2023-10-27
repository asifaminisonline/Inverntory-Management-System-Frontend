import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
// import Users from "./Users";
import "./AdminHeader.css";

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <div className="admin-header">
        <h2>ADMIN DASHBOARD</h2>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      {/* <Users /> */}
    </>
  );
}

export default AdminDashboard;
