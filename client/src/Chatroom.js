import React, { useState, useEffect } from 'react'
import { createConsumer } from "@rails/actioncable"
const consumer = createConsumer()
const consumer1 = createConsumer()

function ChatRoom({user}) {

  const [messages, setMessages] = useState([])
  const [messages1, setMessages1] = useState([])
  const [messageInput, setMessageInput] = useState('')
  const [channel, setChannel] = useState(null)

  useEffect(() => {
    if (user) {
      fetch('/messages')
      .then(res => res.json())
      .then(messages => setMessages(messages))
    }
  }, [user])

  useEffect(() => {
    if (user) {
      const newChannel = consumer.subscriptions.create({ channel: "ChatChannel", room: "Plumbing" },
      {
        received: (data) => {
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
  }

  console.log(consumer.subscriptions)
  return (
    <div>

      <h3>{user.first_name}</h3>

      {messages.map((message, i) => <p key={i}>{message.content} - {message.created_at}</p>)}

      <form onSubmit={handleSubmit}>

        <input type="text" value={messageInput} onChange={handleMessageInputChange} />

      </form>

    </div>
  )
}

export default ChatRoom
