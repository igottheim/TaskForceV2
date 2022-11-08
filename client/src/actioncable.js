import {createContext} from "react"
import { createConsumer } from "@rails/actioncable"
import { useState, useEffect } from "react"
const ActionCableContext = createContext()

function ActionCableProvider({user, children}){
const [cable,setCable] = useState(null)

useEffect(()=>{
const cable = createConsumer()
setCable(cable)


return function cleanup()
{

    cable.disconnect()
    setCable(null)
}
}, [user])


    return (<ActionCableContext.Provider value={cable}> {children}</ActionCableContext.Provider>)
}

export {ActionCableContext, ActionCableProvider}