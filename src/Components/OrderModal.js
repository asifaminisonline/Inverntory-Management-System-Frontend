import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./OrderModal.css";

const backendUrl = "http://localhost:5000"; // Update with your backend URL

function OrderModal({
  isOpen,
  onRequestClose,
  onOrderSubmit,
  selectedProduct,
}) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    quantity: 1,
    pinCode: "",
  });

  const clearForm = () => {
    setFormData({
      name: "",
      address: "",
      quantity: 1,
      pinCode: "",
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${backendUrl}/orders`, {
        productId: selectedProduct._id,
        name: formData.name,
        address: formData.address,
        quantity: formData.quantity,
        price: selectedProduct.price * formData.quantity,
        image: selectedProduct.image,
      })
      .then((response) => {
        onOrderSubmit(response.data);
        sendOrderConfirmationEmail(response.data);
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });

    clearForm();
  };

  const sendOrderConfirmationEmail = (orderData) => {
    axios
      .post(`${backendUrl}/send-order-confirmation`, {
        // Include email content or data needed for the email
        // You may want to include orderData in the request to customize the email
        // Example: { email: formData.email, order: orderData }
      })
      .then((response) => {
        console.log("Order confirmation email sent:", response.data);
      })
      .catch((error) => {
        console.error("Error sending order confirmation email:", error);
      });
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setFormData({ ...formData, quantity: newQuantity });
    }
  };

  if (!selectedProduct) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="order-modal"
    >
      <div className="products-details">
        <div className="product-image-container">
          <img src={selectedProduct.image} alt={selectedProduct.name} />
        </div>
        <div className="product-details-container">
          <h2 className="product-name">{selectedProduct.name}</h2>
        </div>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="quantity-control">
          <button
            onClick={() => handleQuantityChange(formData.quantity - 1)}
            className="quantity-button"
          >
            -
          </button>
          <p>
            Quantity:<span className="quantity">{formData.quantity}</span>
          </p>
          <button
            onClick={() => handleQuantityChange(formData.quantity + 1)}
            className="quantity-button"
          >
            +
          </button>
        </div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="name-input"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          required
          className="address-input"
        />
        <input
          type="text"
          name="pinCode"
          placeholder="Pin Code"
          value={formData.pinCode}
          onChange={(e) =>
            setFormData({ ...formData, pinCode: e.target.value })
          }
          required
          className="pinCode-input"
        />
        <div className="total-price">
          <p>Total Price: ₹{selectedProduct.price * formData.quantity}</p>
        </div>
        <button type="submit" className="submit-button">
          Place Order
        </button>
      </form>
    </Modal>
  );
}

export default OrderModal;
