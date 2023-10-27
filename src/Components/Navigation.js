import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({ selectedCategory, setSelectedCategory }) {
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <nav className="navbar">
      <div className="left">
        <Link to="/" className="logo">
          Your Logo
        </Link>
      </div>
      <ul className="center">
        <li className="navLinkItem">
          <button
            className={`navLink ${selectedCategory === "All" ? "active" : ""}`}
            onClick={() => handleCategorySelect("All")}
          >
            All
          </button>
        </li>
        <li className="navLinkItem">
          <button
            className={`navLink ${
              selectedCategory === "T-Shirts" ? "active" : ""
            }`}
            onClick={() => handleCategorySelect("T-Shirts")}
          >
            T-SHIRTS
          </button>
        </li>
        <li className="navLinkItem">
          <button
            className={`navLink ${
              selectedCategory === "Pants" ? "active" : ""
            }`}
            onClick={() => handleCategorySelect("Pants")}
          >
            PANTS
          </button>
        </li>
        <li className="navLinkItem">
          <button
            className={`navLink ${
              selectedCategory === "Shoes" ? "active" : ""
            }`}
            onClick={() => handleCategorySelect("Shoes")}
          >
            SHOES
          </button>
        </li>
      </ul>
      <div className="right">
        <Link to="/register" className="vendor-button">
          Want to become a Vendor
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
