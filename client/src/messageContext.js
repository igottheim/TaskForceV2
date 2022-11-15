
import React, {useContext, useState} from 'react'
  
const MessageContext = React.createContext()
const MessageUpdate = React.createContext()

export function useMessage()
{
    return useContext(MessageContext)
}

export function useUpdate()
{
    return useContext(MessageUpdate)
}


export function MessageProvider({children}){

    const [messageCurrent, setMessageCurrent]=useState([])
    
    function messageToggle(data)
    {
      setMessageCurrent([...messageCurrent, data])
    }

 
    return(

        <MessageContext.Provider value = {messageCurrent}>
           <MessageUpdate.Provider value = {messageToggle}>
            {children}
            </MessageUpdate.Provider> 
        </MessageContext.Provider>
    )


  }