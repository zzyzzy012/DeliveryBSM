import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { RouterProvider } from 'react-router-dom'
// import router from './router/index.tsx'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <RouterProvider router={router}><App /></RouterProvider> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
