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




// function ChatRoom({user, rooms, users1 }) {

//   const [messages, setMessages] = useState([])
//   const [messageInput, setMessageInput] = useState('')
//   const [channel, setChannel] = useState(null)
//   const [currentRoom, setCurrentRoom] = useState(null)

//   const [errors, setErrors] = useState([]);
//   const {liveUsers, setLiveUsers}= useContext(LiveUserContext)




//   function handleMessageInputChange(e) {
//     setMessageInput(e.target.value)

//   }

//   function handleSubmit(e) {
//     e.preventDefault()
//   //  console.log(messageInput, user)

//     channel.send({content: messageInput})
//     setMessageInput('')
    
//   }

//   useEffect(() => {
   
//       fetch('/messages')
//       .then(res => res.json())
//       .then(messages => 
//         setMessages(messages.filter((m)=>m.user!==null)))
//   }, [])




 
//   let messages1 = messages.filter((message)=> message.user!==null).filter((message)=> message.category_id === rooms.category_id)
  
//   useEffect(() => {
  
//     if (user.id) {
//       const newChannel = consumer.subscriptions.create({ channel: "ChatChannel", room: rooms.category.name, category: rooms.category_id, user_id: user.id, user:user },
//       {
//         received: (data) => {
       
//           if (data.event_type === "message")
//           {
//             let search = users1.filter((a)=>a.id === data.content.user_id)
//             console.log(consumer.subscriptions.subscriptions.length)
//             // console.log(data)
          
//             setMessages((oldMessages) => [...oldMessages, {...data.content, user: search[0]}])
        
//           }
//           else if (data.event_type === "enter" && data.user_id !== user.id)
//           {
//               // Calls `AppearanceChannel#appear(data)` on the server.
//               // this.perform("appear", { appearing_on: this.appearingOn })
            
//             console.log("entering")
//             console.log(data)
//             console.log(consumer.subscriptions.subscriptions.length)
//             setMessages(oldMessages => [...oldMessages, data.content])
//             // alert(`${data.content}`)
            
//           }
//           else if (data.event_type === "exit" && data.user_id !== user.id)
//           {
//            console.log(data) 
//             console.log("goodbye")
//             setMessages(oldMessages => [...oldMessages, data])
//             // alert(`${data.content}`)
//           }
    
//         }
//       }, [user.id])

//       setChannel(newChannel)
   

//       return function cleanup()
//       {
//         console.log("unsubscribing ")
//         newChannel.unsubscribe()
//       }
  
     
//     }
    
//   }, [user,users1])


//   return (
//     <div >

// <div >
//       <h3 className = "button-74">{rooms.category.name} CHAT</h3>
//       </div>
//     <div className = "card">
//       {messages1.map((message, i) => <p className = "chat-app" key={i}> {message.user.username}: {message.content} 💻 {message.date}</p>)}
      

//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className = "reply-send"><input className = "textArea" type="text" value={messageInput} onChange={handleMessageInputChange} />
//         SEND MESSAGE ➡️<button>✈️</button>
//         </div>
//       </form>

//     </div>
//   )
// }



function App() {
  
  // const [users, setUsers] = useState([]);
  const [user, setCurrentUser] = useState("")
  // const [chatOpen, setChatOpen] = useState(null)
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


  // console.log(consumer.connections.length)
  
  
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