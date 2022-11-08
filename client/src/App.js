import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import Login from "./Login";
import NavBar from "./NavBar";
// import ChatRoom from "./Chatroom";
import SignUp from "./Signup";
import { createConsumer } from "@rails/actioncable"
import { ActionCableProvider } from "./actioncable";
const consumer = createConsumer()


function ChatRoom({user, rooms, users1 }) {
  
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')
  const [channel, setChannel] = useState(null)
  const [currentRoom, setCurrentRoom] = useState(null)
  const [liveUsers, setLiveUsers] = useState([])
  const [errors, setErrors] = useState([]);


console.log(users1)


    
  useEffect(() => {
    if (user.id) {
      const newChannel = consumer.subscriptions.create({ channel: "ChatChannel", room: rooms.category.name, category: rooms.category_id, user_id: user.id },
      {
        received: (data) => {
          // if state.currentUser === data.user_id !== 1 && data.event_type === 'enter'
          // do something based on this
          if (data.event_type === "message")
          {
            let search = users1.filter((a)=>a.id === data.content.user_id)
            console.log(users1)
            setMessages((oldMessages) => [...oldMessages, {...data.content, user: search[0]}])
        
            
          

          }
          else if (data.event_type === "enter" && data.user_id !== user.id)
          {
           
            console.log("entering")
            console.log(data)
            setMessages(oldMessages => [...oldMessages, data])
            
          }
          else if (data.event_type === "exit" && data.user_id !== user.id)
          {
           console.log(data.user_id) 
            console.log("goodbye")
            setMessages(oldMessages => [...oldMessages, data])
         
          }
    
        }
      }, [user.id])

      setChannel(newChannel)

      return function cleanup()
      {
        console.log("unsubscribing ")
        newChannel.unsubscribe()
      }
  
     
    }
    
  }, [user])

  // console.log(liveUsers)



  function handleMessageInputChange(e) {
    setMessageInput(e.target.value)

  }

  function handleSubmit(e) {
    e.preventDefault()
  //  console.log(messageInput, user)

    channel.send({content: messageInput})
    setMessageInput('')
    
  }

  useEffect(() => {
   
      fetch('/messages')
      .then(res => res.json())
      .then(messages => setMessages(messages))
  }, [])


  
  console.log(messages)
  let messages1 = messages.filter((message)=> message.category_id === rooms.category_id)


  return (
    <div>

      <h3>{user.first_name}</h3>
    <div className ="center-col">
      {messages1.map((message, i) => <p key={i}> {message.user.first_name}: {message.content} - {message.created_at} - {message.category_id}</p>)}
      

      </div>
      <form onSubmit={handleSubmit}>

        <input type="text" value={messageInput} onChange={handleMessageInputChange} />

      </form>

    </div>
  )
}



function App() {
  
  // const [users, setUsers] = useState([]);
  const [user, setCurrentUser] = useState("")
  const [chatOpen, setChatOpen] = useState(null)
  const [chat2Open, setChat2Open] = useState(null)
  const [chat3Open, setChat3Open] = useState(null)
    const [chat4Open, setChat4Open] = useState(null)
  const [rooms, setRooms] = useState([])
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);
  const [users1, setUsers1] = useState([])

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      }
    });
  }, []);

  useEffect(()=>{

    fetch('/users')
    .then(res => res.json())
    .then(users => {
      setUsers1(users)
    })
  }, [])


  useEffect(() => {
   
    fetch('/rooms')
    .then(res => res.json())
    .then(room => setRooms(room))
}, [setCurrentUser])


function deleteUser(e)
{
  console.log(e)
  fetch(`/users/${e.id}`,
      {
        method: "DELETE"
      })
   setCurrentUser(null)
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
  setCurrentUser(user)
  setUsers1([...users1, user])

}

console.log(users1)

  return (

    
    <BrowserRouter>
      <div className="App">
      <NavBar user={user} setUser = {setCurrentUser} />
      {user ? (
        <Switch>
          <Route path="/testing">
          <form onSubmit={handleUserChange}>
        <h1>Change Your Username!</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className = "div1"  type="submit">👟👟 Submit New Username 👟👟</button>
      </form>    
      
      <button className = "div1" onClick = {()=>deleteUser(user)} >Delete User</button>
      <button type="button" onClick={() => {setChatOpen(prev => !prev)}}>{chatOpen ? "Close JavaScript Chat" : "Open Javascript Chat"}</button>
      <button type="button" onClick={() => setChat2Open(prev => !prev)}>{chat2Open ? "Close ReactJS Chat" : "Open ReactJS Chat"}</button>
      <button type="button" onClick={() => setChat3Open(prev => !prev)}>{chat3Open ? "Close Ruby Chat" : "Open Ruby Chat"}</button>
      <button type="button" onClick={() => setChat4Open(prev => !prev)}>{chat4Open ? "Close Rails Chat" : "Open Rails Chat"}</button>
      {chatOpen ? <h1 user={user} /> : null}  
      {chatOpen ? <ChatRoom users1 = {users1} rooms = {rooms[0]} messages = {messages} user={user} /> : null}  
      {chat2Open ? <h1 user={user} /> : null}  
      {chat2Open ? <ChatRoom users1 = {users1} rooms = {rooms[1]} messages = {messages} user={user} /> : null}  
      {chat3Open ? <h1 user={user} /> : null}  
      {chat3Open ? <ChatRoom users1 = {users1} rooms = {rooms[2]} messages = {messages} user={user} /> : null}  
      {chat4Open ? <h1 user={user} /> : null}  
      {chat4Open ? <ChatRoom users1 = {users1} rooms = {rooms[3]} messages = {messages} user={user} /> : null}  
          </Route>
          </Switch>
           ) : (
          <Switch>
            <Route path="/signup">
          <SignUp setCurrentUser = {setCurrentUser}></SignUp>
          </Route>
          <Route path="/">
          <Login setCurrentUser = {setCurrentUser}></Login>
          </Route>

        </Switch>
           )}
      </div>

    </BrowserRouter>
   
  );
}

export default App;