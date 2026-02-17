import { useEffect, useState } from 'react'
import MobileBlocker from './components/MobileBlocker/MobileBlocker'
import './App.css'

function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  if (isMobile) {
    return <MobileBlocker />
  }

  return (
    <div className="app">
      <div className="game-container">
        <h1>Pokemon Clone</h1>
        <p className="subtitle">A minimalist web-based Pokemon adventure</p>
        <div className="info-box">
          <p>🎮 Project initialized successfully!</p>
          <p>Ready to start building the game...</p>
        </div>
      </div>
    </div>
  )
}

export default App
