import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChatProvider } from './chatContext';
import { UserContext } from './ReactJSContext';
import { MessageProvider } from './messageContext';


import store from "./store";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    
    <MessageProvider>
    <ChatProvider >
    <App />
    </ChatProvider >
    </MessageProvider>
  
);

