import React from "react";
import "./ProductCard.css";

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <p>
        <hr />
      </p>
      <div className="product-details">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Price: ₹{product.price}</p>
        <a href={product.buyNowLink} target="_blank" rel="noopener noreferrer">
          Buy Now
        </a>
      </div>
      <div className="product-actions">
        <button className="edit-button" onClick={() => onEdit(product)}>
          Update Product
        </button>
        <button className="delete-button" onClick={() => onDelete(product._id)}>
          Delete Product
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
