import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChatProvider } from './chatContext';

import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ChatProvider >
    <App />
    </ChatProvider >
);

