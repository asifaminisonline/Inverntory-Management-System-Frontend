import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import backendUrl from "../Admin/Config";
import OrderModal from "./OrderModal"; // Import the OrderModal component

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch product details using the backend URL
    fetch(`${backendUrl}/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleBuyNowClick = () => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const handleOrderSubmit = (formData) => {
    if (selectedProduct) {
      const orderData = {
        productId: selectedProduct._id,
        name: formData.name,
        address: formData.address,
        quantity: formData.quantity,
        price: selectedProduct.price * formData.quantity,
        image: selectedProduct.image,
      };

      fetch(`${backendUrl}/orders`, {
        // Use the backend URL here
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Order Submitted:", data);
          closeModal();
        })
        .catch((error) => {
          console.error("Error submitting order:", error);
        });
    }
  };

  return (
    <div className="product-details-container">
      <h2 className="product-details-title">Product Details</h2>
      <div className="product-details-content">
        <img className="product-image" src={product.image} alt={product.name} />
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">Price: ₹{product.price}</p>
        <p className="product-category">Category: {product.category}</p>
        <button className="buy-now" onClick={handleBuyNowClick}>
          Buy Now
        </button>
      </div>
      <OrderModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onOrderSubmit={handleOrderSubmit}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default ProductDetails;
