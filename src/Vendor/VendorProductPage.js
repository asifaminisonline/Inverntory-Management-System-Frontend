import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VendorProductPage.css";
import ProductCard from "./ProductCard";
import AdminHeader from "../Admin/AdminHeader";

function VendorProductPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
    buyNowLink: "",
  });

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [userCategory, setUserCategory] = useState(""); // State to store the user's category

  useEffect(() => {
    fetchProducts();
    fetchUserCategory(); // Fetch the user's category when the component mounts
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateProduct = async () => {
    try {
      // Assign the user's category to the new product
      newProduct.category = userCategory;

      await axios.post("http://localhost:5000/products", newProduct);
      fetchProducts();
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        image: "",
        buyNowLink: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProduct = async () => {
    if (!selectedProductId) return;

    try {
      await axios.put(
        `http://localhost:5000/products/${selectedProductId}`,
        newProduct
      );
      fetchProducts();
      setSelectedProductId(null);
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        image: "",
        buyNowLink: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProductId(product._id);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      buyNowLink: product.buyNowLink,
      category: userCategory,
    });
  };

  const fetchUserCategory = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the user's token from local storage
      if (!token) {
        console.error("User token not found.");
        return;
      }

      const response = await axios.get("http://localhost:5000/user-category", {
        headers: {
          Authorization: token,
        },
      });

      const { category } = response.data;
      setUserCategory(category); // Set the user's category in the state
    } catch (error) {
      console.error(error);
    }
  };

  // Filter products based on userCategory
  const filteredProducts = products.filter(
    (product) => product.category === userCategory
  );

  return (
    <>
      <AdminHeader />
      <div className="container">
        <h1 className="title">Manage Products</h1>
        <div>
          <div className="user-category">
            You have access to this category : {userCategory}
          </div>
          <div className="product-list">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        </div>
        <div className="form">
          <h2>Add Or Update Product </h2>
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description (15 to 20 words)"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Buy Now Link"
            value={newProduct.buyNowLink}
            onChange={(e) =>
              setNewProduct({ ...newProduct, buyNowLink: e.target.value })
            }
          />
          {selectedProductId ? (
            <button onClick={handleUpdateProduct}>Update Product</button>
          ) : (
            <button onClick={handleCreateProduct}>Create Product</button>
          )}
        </div>
        ;
      </div>
    </>
  );
}

export default VendorProductPage;
