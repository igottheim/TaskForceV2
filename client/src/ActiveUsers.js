import React, { useState, } from "react";
import { useMessage } from "./messageContext";
import {format, formatInTimeZone,utcToZonedTime} from 'date-fns-tz'

function ActiveUsers({users, messages}) {
  

  const x = useMessage()
  



  let userMap = users.map((a)=> <li className = "button-79">
    
    
    <h1>  Username: {a.username} </h1>
    <h2 >{a.messages.length>0? `Last Activity:${formatInTimeZone(a.messages[a.messages.length-1].date, 'Europe/London', 'yyyy-MM-dd HH:mm:ss 	a')}`:"Inactive/No Messages" }</h2>
    </li>)




    return (

       <div>
        
        <h1>Current Users</h1>
        <ul className = "scroller">{userMap}</ul>
        
        </div>
    );
  }
  
  export default ActiveUsers;