import React from "react";
import "./HomeProducts.css";

function HomeProducts({ products }) {
  return (
    <div className="product-container">
      {products.map((product) => (
        <div key={product._id} className="product-card">
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
            <a
              href={product.buyNowLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Now
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomeProducts;
