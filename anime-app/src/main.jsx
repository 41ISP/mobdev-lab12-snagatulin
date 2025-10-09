import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router.jsx'
import { TelegramProvider } from './context/TelegramContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TelegramProvider>
      <RouterProvider router={router} basename="/mobdev-lab12-snagatulin"/>
    </TelegramProvider>
  </React.StrictMode>,
)