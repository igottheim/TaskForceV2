import React, { useState, } from "react";

function ActiveUsers({users, messages}) {
  
  console.log(users)
  console.log(messages)

  let userMap = users.map((a)=> <div>
    
    
    <h1>  Username: {a.username} </h1>
    <h2>{a.messages.length>0? `Last Activity:${a.messages[a.messages.length-1].date}`:"Inactive/No Messages" }</h2>
    </div>)


    return (

       <div>
        
        <h1>Current Users</h1>
        <ol>{userMap}</ol>
        
        </div>
    );
  }
  
  export default ActiveUsers;