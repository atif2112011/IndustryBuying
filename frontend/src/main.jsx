import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LoaderProvider } from './contexts/LoaderContext.jsx'
import { AlertProvider } from './contexts/AlertContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoaderProvider>
    <AlertProvider>
      <AuthProvider>
    <App />
    </AuthProvider>
    </AlertProvider>
    </LoaderProvider>
    
  </StrictMode>,
)
