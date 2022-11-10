
import React, {useContext, useState} from 'react'
  
const ChatContext = React.createContext()
const ChatUpdate = React.createContext()

export function useChat()
{
    return useContext(ChatContext)
}

export function useUpdate()
{
    return useContext(ChatUpdate)
}


export function ChatProvider({children}){

    const [test, setTest]=useState(false)
    function toggleTest()
    {
      setTest(prevTest =>  !prevTest)
    }

 
    return(

        <ChatContext.Provider value = {test}>
           <ChatUpdate.Provider value = {toggleTest}>
            {children}
            </ChatUpdate.Provider> 
        </ChatContext.Provider>
    )


  }