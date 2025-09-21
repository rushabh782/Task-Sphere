import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Task Manager App. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
