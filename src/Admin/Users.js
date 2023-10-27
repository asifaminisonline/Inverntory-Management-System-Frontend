import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoleUpdate = async (userId, selectedRole) => {
    try {
      const category =
        selectedRole === "admin"
          ? ""
          : users.find((user) => user._id === userId).category;
      await axios.put(`http://localhost:5000/users/${userId}`, {
        role: selectedRole,
        category: category,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? { ...user, role: selectedRole, category: category }
            : user
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryUpdate = async (userId, selectedCategory) => {
    try {
      await axios.put(`http://localhost:5000/users/${userId}/category`, {
        category: selectedCategory,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, category: selectedCategory } : user
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="user-options">
        <div className="option">
          <div className="back-to-dashb">
            <h3>👈 Go Back To Dashboard</h3>
            <h3 style={{ border: "none" }}>👇 Manage Users</h3>
          </div>
          <table className="user-list">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="user-item">
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      className="role"
                      value={user.role}
                      onChange={(e) =>
                        handleRoleUpdate(user._id, e.target.value)
                      }
                    >
                      <option value="vendor">Vendor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <select
                      className="category"
                      value={user.category}
                      onChange={(e) =>
                        handleCategoryUpdate(user._id, e.target.value)
                      }
                      disabled={user.role === "admin"} // Disable when the role is admin
                    >
                      <option value="">Select Category</option>
                      <option value="T-Shirts">T-Shirts</option>
                      <option value="Pants">Pants</option>
                      <option value="Shoes">Shoes</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleUserDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Users;
