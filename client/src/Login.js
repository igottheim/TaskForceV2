import React, { useState, useContext, useTransition } from "react";
import { useParams } from "react-router-dom";
import { useEffect, Component } from "react";
import chatContext from './App'  
import { LiveUserContext } from "./LiveUsers";


function Login({ setCurrentUser}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("")
  const test1 = useContext(chatContext)
  console.log(test1)
  


const {liveUsers, setLiveUsers}= useContext(LiveUserContext)
console.log(liveUsers)

function setCurrentUser1(user1)
{
setCurrentUser(user1)
}

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {setCurrentUser1(user)
          // setLiveUsers([...liveUsers,user])
        });

      }
      else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (

   
    <div className = "link4">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <h1>{test1}</h1>
        <label className = "button-76" htmlFor="username">Username</label>
        <input className = "link5"
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className = "button-76" htmlFor="password">Password</label>
        <input className = "link5"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className = "login_button" type="submit">Login</button>
      </form>
      {errors.length>0?errors.map((err) => (
          <h1 key={err}>{err}</h1>
        )):null}
    </div>
  );
}

export default Login;