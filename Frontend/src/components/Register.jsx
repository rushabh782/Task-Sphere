/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        username,
        password,
      });
      alert("Registration successful! Please login.");
      navigate("/login"); // redirect to login
    } catch (err) {
      alert("Username already taken!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account?{" "}
        <span onClick={() => navigate("/login")} className="link">
          Login here
        </span>
      </p>
    </div>
  );
}

export default Register;
