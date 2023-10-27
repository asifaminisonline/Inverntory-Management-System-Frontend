import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import HomeProducts from "./HomeProducts";
import axios from "axios";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products based on the selected category when the component mounts
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const fetchProducts = async (category) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/products-by-category?category=${category}`
      );

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Navigation
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategorySelect}
      />
      <HomeProducts products={products} />
    </div>
  );
}

export default Home;
