import React, { useState, useEffect } from "react";
import backendUrl from "./Config";
import "./Sales.css";
import AdminDashboard from "./AdminHeader";

function Sales() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch order details when the component mounts
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch(`${backendUrl}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  // Calculate the total of all products
  const calculateTotal = () => {
    return orders.reduce((total, order) => total + order.price, 0);
  };

  const goBackToDashboard = () => {
    window.history.back();
  };
  return (
    <div>
      <AdminDashboard />
      <div className="back-to-dashb">
        <button onClick={goBackToDashboard}>👈 Go Back To Dashboard</button>
        <h3 style={{ border: "none" }}>👇 Manage Orders</h3>
        <p className="total-price">
          Total Price of All Products: ₹{calculateTotal()}
        </p>
      </div>
      <table className="order-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Address</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>
                <img src={order.image} alt="Product" />
              </td>
              <td>{order.name}</td>
              <td>{order.address}</td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;
