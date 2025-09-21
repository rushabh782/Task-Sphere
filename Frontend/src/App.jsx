import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TaskPage from "./components/TaskPage";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:8080/api/auth/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <div className="app-container">
      <Navbar user={user} handleLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/tasks"
          element={
            <TaskPage
              setUser={setUser}
              user={user}
              handleLogout={handleLogout}
            />
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
