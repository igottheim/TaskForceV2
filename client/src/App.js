import React, { useState, useEffect, Component } from "react";
import './App.css';
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import { useChat, useUpdate } from "./chatContext";
import Login from "./Login";
import NavBar from "./NavBar";
// import ChatRoom from "./Chatroom";
import SignUp from "./Signup";
import { createConsumer } from "@rails/actioncable"
import { ActionCableProvider } from "./actioncable";
import { ChatProvider } from "./chatContext";
import { ReactProvider, useChatR, useUpdateR } from "./ReactJSContext";
import { UserContext } from './ReactJSContext';
import ChatRoom from "./Chatroom";
import { LiveUserContext } from "./LiveUsers";
import { Provider } from "react-redux";
import { useContext } from "react";
import ActiveUsers from "./ActiveUsers";
import Home from "./Home";
const consumer = createConsumer()



function App() {
  
  
  const [user, setCurrentUser] = useState("")
 
  const [chat2Open, setChat2Open] = useState(null)
  const [chat3Open, setChat3Open] = useState(null)
    const [chat4Open, setChat4Open] = useState(null)
  const [rooms, setRooms] = useState([])
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);
  const [users1, setUsers1] = useState([])
  const chatTheme = useChat()
  const toggleTest = useUpdate()
  const [reactJS, setReactJS]= useState(null)
 
  const [liveUsers, setLiveUsers] = useState([])



  
  
  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
        setCurrentUser(user)
      setLiveUsers([...liveUsers, user])
      
      });
      }
    });
  }, []);

  useEffect(()=>{

    fetch('/users')
    .then(res => res.json())
    .then(users => {
      setUsers1(users)
    })
  }, [setCurrentUser])




  useEffect(() => {
   
    fetch('/rooms')
    .then(res => res.json())
    .then(room => setRooms(room))
}, [])

useEffect(() => {
   
  fetch('/messages')
  .then(res => res.json())
  .then(messages => 
    setMessages(messages.filter((m)=>m.user!==null)))
}, [])


function deleteUser(e)
{

  fetch(`/users/${e.id}`,
      {
        method: "DELETE"
      })
      
   setCurrentUser(null)
   setMessages(messages.filter((m)=>m.user.id!==e.id))
}

function handleUserChange(e) {
  e.preventDefault();
 console.log(e.target[0].value)
 console.log(username)
  fetch(`/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username
    }),
  }).then((r) => {
    if (r.ok) {
      r.json().then((user) => setCurrentUser(user))
      alert(`Username Changed to ${username}!`)
    }
    else {
      r.json().then((err) => setErrors(err.error));
      alert("Username blank or already in use!!!")
    }
  });
}

function setUsers2(user)
{
  console.log(user)
  setCurrentUser(user)
  setUsers1([...users1, user])

}

console.log(users1)




  return (

    
    <BrowserRouter>
    <LiveUserContext.Provider value = {{liveUsers, setLiveUsers}}>
<UserContext.Provider value = {{reactJS,setReactJS}}>
      <div className="App">
      <NavBar user={user} setUser = {setCurrentUser} />
      {user ? (
        <Switch>
          <Route path="/testing">
    
          <form onSubmit={handleUserChange}>
      
        <label htmlFor="username">Change Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button  className = "login_button" type="submit"> Submit New Username </button>
      </form>    
      
     
      <button    className = "login_button" onClick = {()=>deleteUser(user)} >Delete User</button>
      <div className = "chats">
      <button className = "button-74" type="button" onClick={toggleTest}>{chatTheme ? "Close JavaScript Chat" : "Open Javascript Chat"}</button>
      <button className = "button-74" type="button" onClick={() => setReactJS(prev => !prev)}>{reactJS ? "Close ReactJS Chat" : "Open ReactJS Chat"}</button>
      <button  className = "button-74" type="button" onClick={() => setChat3Open(prev => !prev)}>{chat3Open ? "Close Ruby Chat" : "Open Ruby Chat"}</button>
      <button  className = "button-74" type="button" onClick={() => setChat4Open(prev => !prev)}>{chat4Open ? "Close Rails Chat" : "Open Rails Chat"}</button>
      </div>
      <div className = "row">
      {chatTheme ? <h1 user={user} /> : null}  
      {chatTheme ? <ChatRoom className = "column" users1 = {users1} rooms = {rooms[0]}  user={user} /> : null}  
      {reactJS ? <h1 user={user} /> : null}  
      {reactJS ? <ChatRoom className = "column" users1 = {users1} rooms = {rooms[1]}   user={user} /> : null}  
      {chat3Open ? <h1 user={user} /> : null}  
      {chat3Open ? <ChatRoom className = "column" users1 = {users1} rooms = {rooms[2]}  user={user} /> : null}  
      {chat4Open ? <h1 user={user} /> : null}  
      {chat4Open ? <ChatRoom className = "column" users1 = {users1} rooms = {rooms[3]}  user={user} /> : null} 
      </div> 
          </Route>
          <Route path="/activeusers">
         <ActiveUsers users = {users1}/>
          </Route>
          </Switch>
           ) : (
          <Switch>
              <Route exact path="/">
         <Home/>
          </Route>
            <Route path="/signup">
          <SignUp setCurrentUser = {setUsers2}></SignUp>
          </Route>
          <Route path="/login">
          <Login setCurrentUser = {setCurrentUser}></Login>
          </Route>

        </Switch>
           )}
      </div>
      </UserContext.Provider>
      </LiveUserContext.Provider >

    </BrowserRouter>
   
   
  );
}

export default App;