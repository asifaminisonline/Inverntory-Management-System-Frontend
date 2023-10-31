// import React, { useState } from "react";
// import OrderModal from "./OrderModal";
// import "./HomeProducts.css";
// import backendUrl from "../Admin/Config";
// function HomeProducts({ products }) {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const openModal = (product) => {
//     setSelectedProduct(product);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedProduct(null);
//     setModalOpen(false);
//   };

//   const handleOrderSubmit = (formData) => {
//     if (selectedProduct) {
//       const orderData = {
//         productId: selectedProduct._id,
//         name: formData.name,
//         address: formData.address,
//         quantity: formData.quantity,
//         price: selectedProduct.price * formData.quantity,
//         image: selectedProduct.image,
//       };

//       fetch(`${backendUrl}/orders`, {
//         // Use the backend URL here
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("Order Submitted:", data);
//           closeModal();
//         })
//         .catch((error) => {
//           console.error("Error submitting order:", error);
//         });
//     }
//   };

//   return (
//     <div className="product-container">
//       {products.map((product) => (
//         <div key={product._id} className="product-card">
//           <div className="product-image">
//             <img src={product.image} alt={product.name} />
//           </div>
//           <p>
//             <hr />
//           </p>
//           <div className="product-details">
//             <h3>{product.name}</h3>
//             <p>{product.description}</p>
//             <p>Price: ₹{product.price}</p>
//             <button className="buy-now" onClick={() => openModal(product)}>
//               Buy Now
//             </button>
//           </div>
//         </div>
//       ))}
//       <OrderModal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         onOrderSubmit={handleOrderSubmit}
//         selectedProduct={selectedProduct}
//       />
//     </div>
//   );
// }

// export default HomeProducts;

import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
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
            <Link to={`/products/${product._id}`}>
              <button className="view-details">View Details</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomeProducts;
