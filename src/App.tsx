import { useEffect, useState } from 'react'
import MobileBlocker from './components/MobileBlocker/MobileBlocker'
import { GameProvider } from './state/GameContext'
import SceneManager from './scenes/SceneManager'
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
    <GameProvider>
      <div className="app">
        <SceneManager />
      </div>
    </GameProvider>
  )
}

export default App
