import React, { useState } from "react";
import Modal from "react-modal";
import "./OrderModal.css";

function OrderModal({
  isOpen,
  onRequestClose,
  onOrderSubmit,
  selectedProduct,
}) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    quantity: 1, // Initial quantity
    pinCode: "",
  });

  const clearForm = () => {
    setFormData({
      name: "",
      address: "",
      quantity: 1, // Reset quantity to 1
      pinCode: "",
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onOrderSubmit({
      ...formData,
      product: selectedProduct.name, // Include the selected product name
      totalPrice: selectedProduct.price * formData.quantity, // Calculate total price
    });
    clearForm(); // Clear the form data after successful submission
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setFormData({ ...formData, quantity: newQuantity });
    }
  };

  if (!selectedProduct) {
    return null; // Return null when selectedProduct is null
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
