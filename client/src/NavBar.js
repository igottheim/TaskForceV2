import React from "react";
import { Link } from "react-router-dom";
import './App.css';
// import Navbar from 'react-bootstrap/Navbar'
import { UserContext } from "./ReactJSContext";
import { useContext } from "react";
import { LiveUserContext } from "./LiveUsers";


function NavBar({ user, setUser }) {
  const {liveUsers, setLiveUsers}= useContext(LiveUserContext)
  const {reactJS, setReactJS}= useContext(UserContext)

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        setLiveUsers([liveUsers.filter((a)=>a.id!== user.id)])
      }
    });
  }
  console.log(reactJS)

  return (
    <div className = "NAV" >😃😆🙂🥴😎👽🤖👺 FLATIRON DISCORD 😃😆🙂🥴😎👽🤖👺
      <div className = "NAV2">
        {user ? (
            <>
            <Link className = "button-74" to="/testing">Rooms</Link>
            <Link className = "button-74" to="/activeusers">Active Users</Link>
          <button  className = "button-74" onClick={handleLogoutClick}>Logout</button>
       
          
          </>
        ) : (
          <>
          <Link className = "button-75" to="/">Home</Link>
          <Link className = "button-75" to="/signup">Signup</Link>
            <Link className = "button-75" to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;