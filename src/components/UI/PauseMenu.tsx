import { useEffect, useCallback } from 'react'
import './PauseMenu.css'

interface PauseMenuProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  onQuitToTitle: () => void
}

const PauseMenu = ({ isOpen, onClose, onSave, onQuitToTitle }: PauseMenuProps) => {
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      onClose()
    }
  }, [isOpen, onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  if (!isOpen) return null

  return (
    <div className="pause-menu-overlay" onClick={onClose}>
      <div className="pause-menu" onClick={(e) => e.stopPropagation()}>
        <h2 className="pause-title">Paused</h2>
        
        <div className="pause-menu-buttons">
          <button className="pause-btn resume" onClick={onClose}>
            ▶️ Resume
          </button>
          <button className="pause-btn save" onClick={onSave}>
            💾 Save Game
          </button>
          <button className="pause-btn quit" onClick={onQuitToTitle}>
            🏠 Quit to Title
          </button>
        </div>

        <div className="pause-hint">
          Press ESC to close
        </div>
      </div>
    </div>
  )
}

export default PauseMenu
