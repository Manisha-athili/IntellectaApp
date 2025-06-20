import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { DarkModeProvider } from './Components/CommonUI/DarkModeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <DarkModeProvider>
          <App />
     </DarkModeProvider>
    </BrowserRouter>
  </StrictMode>,
)
