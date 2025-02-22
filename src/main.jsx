import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainRoutes from './Routes/MainRoutes.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/MainRoutes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
