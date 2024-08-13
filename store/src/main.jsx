import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router'
import "primereact/resources/themes/lara-light-cyan/theme.css";



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  
    <RouterProvider router={router} />
  </React.StrictMode>,
)