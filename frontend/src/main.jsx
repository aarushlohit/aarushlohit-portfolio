import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/ThemeProvider.jsx'
import './index.css'
import App from './App.jsx'
import { LoveVault } from './components/LoveVault/LoveVault.jsx'

const pathname = window.location.pathname.replace(/\/+$/, '')
const isEasterEgg = pathname === '/easter-egg'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isEasterEgg ? (
      <LoveVault />
    ) : (
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )}
  </StrictMode>,
)

