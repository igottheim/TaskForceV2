import React, { useState, useEffect } from 'react'
import { createConsumer } from "@rails/actioncable"
const consumer = createConsumer()


function ChatRoom({user, rooms}) {

  const [messages, setMessages] = useState([])
  const [messages1, setMessages1] = useState([])
  const [messageInput, setMessageInput] = useState('')
  const [channel, setChannel] = useState(null)
  const [errors, setErrors] = useState([]);
  

  // console.log(rooms[0].category.name)

  useEffect(() => {
    if (user) {
      fetch('/messages')
      .then(res => res.json())
      .then(messages => setMessages(messages))
    }
  }, [user])




  useEffect(() => {
    if (user) {
      const newChannel = consumer.subscriptions.create({ channel: "ChatChannel", room: `${rooms.category.name}` },
      {
        received: (data) => {
          // if state.currentUser === data.user_id !== 1 && data.event_type === 'enter'
          // do something based on this
          if (data.event_type === "message")
          {
            console.log("hello")
          }
          else
          {
            console.log("goodbye")
          }
          // console.log(data)
          setMessages(oldMessages => [...oldMessages, data])
        }
      })

      setChannel(newChannel)
      return ()=> newChannel.unsubscribe()
    }
    
  }, [user])




  function handleMessageInputChange(e) {
    setMessageInput(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    channel.send({content: messageInput})
    setMessageInput('')


    fetch("/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: messageInput }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((e) => console.log(e))
      }
      else {
        r.json().then((err) => setErrors(err.errors));
      }
    });


  }
  // messages.map((message) => console.log(message.user.first_name))

  return (
    <div>

      <h3>{user.first_name}</h3>
    <div className ="center-col">
      {messages.map((message, i) => <p key={i}> {message.user_id}: {message.content} - {message.created_at}</p>)}

      </div>
      <form onSubmit={handleSubmit}>

        <input type="text" value={messageInput} onChange={handleMessageInputChange} />

      </form>

    </div>
  )
}

export default ChatRoom
