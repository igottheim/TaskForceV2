
import {format, formatInTimeZone,utcToZonedTime} from 'date-fns-tz'

import React, { useState, useEffect, Component } from "react";

import { createConsumer } from "@rails/actioncable"


const consumer = createConsumer()

function ChatRoom({user, rooms, users1 }) {

  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')
  const [channel, setChannel] = useState(null)
  





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
            // let search = users1.filter((a)=>a.id === data.content.user_id)
            console.log(data)
            console.log(user)
            console.log(data.content)
          
            setMessages((oldMessages) => [...oldMessages, {...data.content, user: data.user}])
            

            
          }
          else if (data.event_type === "enter" && data.user_id !== user.id)
          {
         
            console.log("entering")
            console.log(data)
            console.log(user)
           
            setMessages((oldMessages) => [...oldMessages, {content: data.content, user_id: data.user_id, user: data.user, category_id: parseInt(data.category_id), date: data.date}])
          }
          else if (data.event_type === "exit" && data.user_id !== user.id)
          {
           console.log(data) 
         
          setMessages((oldMessages) => [...oldMessages, {content: data.content, user_id: data.user_id, user: data.user, category_id: parseInt(data.category_id), date: data.date}])
          
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
    <div className = "div1">

<div >
      <h3 className = "button-77">{rooms.category.name} CHAT</h3>
      </div>
    <div className = "scroller">
      {messages1.map((message, i) => message.user.id===user.id? <p className = "chat-app" key={i}> {message.user.username}: {message.content} 💻 {formatInTimeZone(message.date, 'Europe/London', 'yyyy-MM-dd HH:mm:ss 	a')}</p>:
      <p className = "chat-app1" key={i}> {message.user.username}: {message.content} 💻 {formatInTimeZone(message.date, 'Europe/London', 'yyyy-MM-dd HH:mm:ss 	a')}</p>  
      )}
      

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
