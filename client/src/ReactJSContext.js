
import React, {useContext, useState} from 'react'
  
const ChatContext = React.createContext()
const ChatUpdate = React.createContext()

export function useChatR()
{
    return useContext(ChatContext)
}

export function useUpdateR()
{
    return useContext(ChatUpdate)
}


export function ReactProvider({children}){

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