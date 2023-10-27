import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backendUrl from "../Admin/Config";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginUrl = `${backendUrl}/login`;

  const handleSuccessfulLogin = (token) => {
    localStorage.setItem("token", token); // Store the token in localStorage

    // Add this line to set the user's category
    localStorage.setItem("category", "user_category_here"); // Replace "user_category_here" with the actual category

    setFormData({ email: "", password: "" }); // Reset the form fields
    navigate("/vendor-products");
  };

  const handleRegisterHere = () => {
    navigate("/register"); // Redirect to the registration page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(loginUrl, formData);
      const { token } = response.data;
      handleSuccessfulLogin(token);
    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        if (error.response.status === 401) {
          setError("Invalid email or password");
        } else if (error.response.status === 404) {
          setError("User not registered. Please register.");
        } else {
          setError("Login failed. Please try again later.");
        }
      } else {
        setError("Network error, please try again later");
      }
    }
  };

  return (
    <div className="login-container">
      <h2 style={{ color: "#007BFF" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <p className="error-message">{error}</p>
      <div className="register-here">
        <p className="register-text">Don't have an account?</p>
        <button className="register-button" onClick={handleRegisterHere}>
          Register Here
        </button>
      </div>
    </div>
  );
}

export default Login;
