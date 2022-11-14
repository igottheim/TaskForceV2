

import React, { useState, useEffect, Component } from "react";
import { LiveUserContext } from "./LiveUsers";
import { createConsumer } from "@rails/actioncable"

import { Provider } from "react-redux";
import { useContext } from "react";
const consumer = createConsumer()

function ChatRoom({user, rooms, users1 }) {

  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')
  const [channel, setChannel] = useState(null)
  const [currentRoom, setCurrentRoom] = useState(null)

  const [errors, setErrors] = useState([]);
  const {liveUsers, setLiveUsers}= useContext(LiveUserContext)



console.log(user)

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
  
    if (user.id) {
      const newChannel = consumer.subscriptions.create({ channel: "ChatChannel", room: rooms.category.name, category: rooms.category_id, user_id: user.id, user:user },
      {
        received: (data) => {
       
          if (data.event_type === "message")
          {
            let search = users1.filter((a)=>a.id === data.content.user_id)
            console.log(data)
            console.log(user)
          
            setMessages((oldMessages) => [...oldMessages, {...data.content, user: data.user}])
         
  
          }
          else if (data.event_type === "enter" && data.user_id !== user.id)
          {
         
            console.log("entering")
            console.log(data)
            console.log(user)
            console.log(consumer.subscriptions.subscriptions.length)
      
          }
          else if (data.event_type === "exit" && data.user_id !== user.id)
          {
           console.log(data) 
            console.log("goodbye")
           
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
    
  }, [user,users1])
  let messages1 = messages.filter((message)=> message.user!==null).filter((message)=> message.category_id === rooms.category_id)
  
  useEffect(() => {
   
    fetch('/messages')
    .then(res => res.json())
    .then(messages => 
      setMessages(messages.filter((m)=>m.user!==null)))
}, [])





  return (
    <div >

<div >
      <h3 className = "button-74">{rooms.category.name} CHAT</h3>
      </div>
    <div className = "scroller">
      {messages1.map((message, i) => <p className = "chat-app" key={i}> {message.user.username}: {message.content} 💻 {message.date}</p>)}
      

      </div>
      <form onSubmit={handleSubmit}>
        <div className = "reply-send"><input className = "textArea" type="text" value={messageInput} onChange={handleMessageInputChange} />
        SEND MESSAGE ➡️<button>✈️</button>
        </div>
      </form>

    </div>
  )
}

export default ChatRoom
