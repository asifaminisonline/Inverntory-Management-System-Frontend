// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AdminHeader from "./AdminHeader";
// import "./Products.css";

// function Products() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/products");
//       setProducts(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleProductDelete = async (productId) => {
//     try {
//       await axios.delete(`http://localhost:5000/products/${productId}`);
//       setProducts((prevProducts) =>
//         prevProducts.filter((product) => product._id !== productId)
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const goBackToDashboard = () => {
//     window.history.back(); // This will navigate back to the previous page
//   };

//   return (
//     <>
//       <AdminHeader />
//       <div className="product-options">
//         <div className="option">
//           <div className="back-to-dashb">
//             <button onClick={goBackToDashboard}>👈 Go Back To Dashboard</button>
//             <h3 style={{ border: "none" }}>👇 Manage Products</h3>
//           </div>
//           <table className="admin-product-list">
//             <thead>
//               <tr>
//                 <th>Image</th>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Price</th>
//                 <th>Category</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product) => (
//                 <tr key={product._id} className="product-item">
//                   <td>
//                     <img
//                       src={product.image} // Assuming that 'image' is the URL of the image
//                       alt={product.name} // Provide an alt text for accessibility
//                       width="70" // You can adjust the width as needed
//                     />
//                   </td>
//                   <td>{product._id}</td>
//                   <td>{product.name}</td>
//                   <td>{product.price}</td>
//                   <td>{product.category}</td>
//                   <td>
//                     <button
//                       className="product-delete-button"
//                       onClick={() => handleProductDelete(product._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Products;

import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const goBackToDashboard = () => {
    window.history.back();
  };

  return (
    <>
      <AdminHeader />
      <div className="product-options">
        <div className="option">
          <div className="back-to-dashb">
            <button onClick={goBackToDashboard}>👈 Go Back To Dashboard</button>
            <h3 style={{ border: "none" }}>👇 Manage Products</h3>
          </div>
          <table className="admin-product-list">
            <thead>
              <tr>
                <th>QR Code</th>
                <th>Image</th>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="product-item">
                  <td>
                    <QRCode value={JSON.stringify(product)} />{" "}
                    {/* Serialize product details */}
                  </td>
                  <td>
                    <img src={product.image} alt={product.name} width="70" />
                  </td>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <button
                      className="product-delete-button"
                      onClick={() => handleProductDelete(product._id)}
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

export default Products;
