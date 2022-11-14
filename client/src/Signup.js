import React, { useState, } from "react";
import { useChat } from "./chatContext";
  
function SignUp({ setCurrentUser, setUsers}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const chatTheme = useChat()


  console.log(chatTheme)

  function handleSubmit(e) {
    e.preventDefault();
    if(password===passwordConfirmation)
    {
    fetch('/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        first_name,
        last_name,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {setCurrentUser(user)

        
        })
      }
      else {
        r.json().then((err) => setErrors(err.error));
      }
    });
  }
  else{
    alert("Password and Password Confirmation are not the same! Please try again")
  
  }
}

  return (
    <div >
      <form  className="signup" onSubmit={handleSubmit}>
        <h1 className = "div3">Sign Up</h1>
       <div>
       <label  className = "div3" htmlFor="username">Username</label>
        <input
        className = "link5"
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div>
        <label  className = "div3" htmlFor="password">Password</label>
        <input
         className = "link5"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
       </div>
       <div>
        <label  className = "div3" htmlFor="password">Password </label>
        <label  className = "div3" htmlFor="password">Confirmation</label>
        <input
         className = "link5"
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
         </div>
         <label  className = "div3" htmlFor="first_name">First Name</label>
        <input
         className = "link5"
          type="text"
          id="first_name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          autoComplete="off"
        />
        <div>
         <label  className = "div3" htmlFor="last_name">Last Name</label>
        <input
         className = "link5"
          type="text"
          id="last_name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          autoComplete="off"
        />
        </div>
         {errors.map((err) => (
         <h1 className = "link2">{err}</h1>
        ))}
        <button className = "login_button" type="submit">Sign Up</button>
      </form>
  
      
    </div>
    
  );
}

export default SignUp;