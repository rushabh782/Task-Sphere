/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/auth/login",
        { username, password },
        { withCredentials: true }
      );
      navigate("/tasks"); // redirect to task manager
    } catch (err) {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      <p>
        Don’t have an account?{" "}
        <span onClick={() => navigate("/register")} className="link">
          Register here
        </span>
      </p>
    </div>
  );
}

export default Login;
