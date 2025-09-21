import React from "react";

function Navbar({ user, handleLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="navbar-title">Task Manager</h2>
      </div>

      {user && (
        <div className="navbar-right">
          <span className="navbar-welcome">
            Welcome, <b>{user.username}</b>
          </span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
