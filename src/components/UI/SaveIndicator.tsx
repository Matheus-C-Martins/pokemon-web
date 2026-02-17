import { useEffect, useState } from 'react'
import './SaveIndicator.css'

interface SaveIndicatorProps {
  isSaving: boolean
}

const SaveIndicator = ({ isSaving }: SaveIndicatorProps) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isSaving) {
      setShow(true)
      const timer = setTimeout(() => setShow(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isSaving])

  if (!show) return null

  return (
    <div className="save-indicator">
      <div className="save-content">
        <span className="save-icon">💾</span>
        <span className="save-text">Game Saved</span>
      </div>
    </div>
  )
}

export default SaveIndicator
