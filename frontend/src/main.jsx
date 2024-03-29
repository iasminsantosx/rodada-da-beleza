import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from "@chakra-ui/react";
import UserProvider from './context/UserProvider.jsx';
import InactivityChecker from './utils/ActivityCheck.jsx'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ChakraProvider>
        <InactivityChecker />
          <App />
        </ChakraProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
