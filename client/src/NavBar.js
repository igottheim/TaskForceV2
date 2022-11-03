import React from "react";
import { Link } from "react-router-dom";
import './App.css';
// import Navbar from 'react-bootstrap/Navbar'


function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <div >
      <div >
        {user ? (
            <>
            <Link className = "div2" to="/testing">User Information</Link>
            <Link className = "div5" to="/rooms">Rooms</Link>
          <button className = "div1" onClick={handleLogoutClick}>Logout</button>
          
          </>
        ) : (
          <>
          <Link className = "div5" to="/">Home</Link>
          <Link className = "div5" to="/signup">Signup</Link>
            <Link className = "div5" to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;