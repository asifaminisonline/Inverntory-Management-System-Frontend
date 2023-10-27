import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backendUrl from "../Admin/Config";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registrationUrl = `${backendUrl}/register`;

  const handleSuccessfulRegistration = () => {
    // Redirect to the login page upon successful registration
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(registrationUrl, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Check the response and handle success
      if (response.status === 200) {
        // Call handleSuccessfulRegistration() after a successful registration
        handleSuccessfulRegistration();
      }
    } catch (error) {
      console.error("Registration Error:", error);

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Network error, please try again later");
      }
    }
  };

  return (
    <>
      <div className="registration-container">
        <h2 style={{ color: "#007BFF" }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <div className="already-account">
          <p className="login-text">Already have an account?</p>
          <button className="login-button" onClick={() => navigate("/login")}>
            Login Here
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;
