import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './csscustom.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Navbar from "./component/Navbar.jsx";
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Navbar/>
          <App />
      </BrowserRouter>

  </StrictMode>,
)
