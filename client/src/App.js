import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import Login from "./Login";
import NavBar from "./NavBar";
// import ChatRoom from "./Chatroom";
import SignUp from "./Signup";
import { createConsumer } from "@rails/actioncable"
const consumer = createConsumer()


function ChatRoom({user, rooms }) {
  
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')
  const [channel, setChannel] = useState(null)
  const [currentRoom, setCurrentRoom] = useState(null)
  const [liveUsers, setLiveUsers] = useState([])



  useEffect(() => {
    if (user) {
      const newChannel = consumer.subscriptions.create({ channel: "ChatChannel", room: `${rooms.category.name}`, category: `${rooms.category_id}` },
      {
        received: (data) => {
          // if state.currentUser === data.user_id !== 1 && data.event_type === 'enter'
          // do something based on this
          if (data.event_type === "message")
          {
         
            setMessages(oldMessages => [...oldMessages, data.content])
           
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
      })

      setChannel(newChannel)
      return ()=> newChannel.unsubscribe()
     
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
    if (user) {
      fetch('/messages')
      .then(res => res.json())
      .then(messages => setMessages(messages))
    }
  }, [user])

  

  let messages1 = messages.filter((message)=> message.category_id === rooms.category_id)
  

  return (
    <div>

      <h3>{user.first_name}</h3>
    <div className ="center-col">
      {messages1.map((message, i) => <p key={i}> {message.user_id}: {message.content} - {message.created_at} - {message.category_id}</p>)}
      

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

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      }
    });
  }, []);


  useEffect(() => {
   
    fetch('/rooms')
    .then(res => res.json())
    .then(room => setRooms(room))
}, [setCurrentUser])



  return (
    <BrowserRouter>
      <div className="App">
      <NavBar user={user} setUser = {setCurrentUser} />
      {user ? (
        <Switch>
          <Route path="/testing">
      <button type="button" onClick={() => {
      
      
      setChatOpen(prev => !prev)
      // setCurrentRoom(rooms[0])

      
      
      }}>{chatOpen ? "Close JavaScript Chat" : "Open Javascript Chat"}</button>
      <button type="button" onClick={() => setChat2Open(prev => !prev)}>{chat2Open ? "Close ReactJS Chat" : "Open ReactJS Chat"}</button>
      <button type="button" onClick={() => setChat3Open(prev => !prev)}>{chat3Open ? "Close Ruby Chat" : "Open Ruby Chat"}</button>
      <button type="button" onClick={() => setChat4Open(prev => !prev)}>{chat4Open ? "Close Rails Chat" : "Open Rails Chat"}</button>
      {chatOpen ? <h1 user={user} /> : null}  
      {chatOpen ? <ChatRoom rooms = {rooms[0]} messages = {messages} user={user} /> : null}  
      {chat2Open ? <h1 user={user} /> : null}  
      {chat2Open ? <ChatRoom rooms = {rooms[1]} messages = {messages} user={user} /> : null}  
      {chat3Open ? <h1 user={user} /> : null}  
      {chat3Open ? <ChatRoom rooms = {rooms[2]} messages = {messages} user={user} /> : null}  
      {chat4Open ? <h1 user={user} /> : null}  
      {chat4Open ? <ChatRoom rooms = {rooms[3]} messages = {messages} user={user} /> : null}  
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