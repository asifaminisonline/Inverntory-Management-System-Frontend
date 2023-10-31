import React, { useState, useEffect } from "react";
import backendUrl from "../Admin/Config";
import "./MyOrders.css";

function MyOrders() {
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

  const handleReturnRequest = (orderId) => {
    // Implement the logic for making a return request here
    console.log("Return request for order with ID:", orderId);
  };

  return (
    <div className="sales-container">
      <h1>Order Details</h1>
      <table className="order-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Customer Name</th>
            <th>Address</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Return</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>
                <img src={order.image} alt="Product" className="order-image" />
              </td>
              <td>{order.name}</td>
              <td>{order.address}</td>
              <td>{order.quantity}</td>
              <td>₹{order.price}</td>
              <td>
                <button
                  onClick={() => handleReturnRequest(order._id)}
                  className="return-button"
                >
                  Return Back
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyOrders;
