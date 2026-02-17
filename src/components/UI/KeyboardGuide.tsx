import './KeyboardGuide.css'

interface KeyboardGuideProps {
  isOpen: boolean
  onClose: () => void
}

const KeyboardGuide = ({ isOpen, onClose }: KeyboardGuideProps) => {
  if (!isOpen) return null

  return (
    <div className="keyboard-guide-overlay" onClick={onClose}>
      <div className="keyboard-guide" onClick={(e) => e.stopPropagation()}>
        <button className="guide-close" onClick={onClose}>✕</button>
        
        <h2 className="guide-title">🎮 Controls</h2>
        
        <div className="guide-sections">
          <div className="guide-section">
            <h3>Movement</h3>
            <div className="key-group">
              <div className="key-row">
                <kbd>↑</kbd> or <kbd>W</kbd> - Move Up
              </div>
              <div className="key-row">
                <kbd>↓</kbd> or <kbd>S</kbd> - Move Down
              </div>
              <div className="key-row">
                <kbd>←</kbd> or <kbd>A</kbd> - Move Left
              </div>
              <div className="key-row">
                <kbd>→</kbd> or <kbd>D</kbd> - Move Right
              </div>
            </div>
          </div>

          <div className="guide-section">
            <h3>Battle</h3>
            <div className="key-group">
              <div className="key-row">
                Click moves or use mouse to navigate battle options
              </div>
            </div>
          </div>

          <div className="guide-section">
            <h3>Menu</h3>
            <div className="key-group">
              <div className="key-row">
                <kbd>ESC</kbd> - Pause Menu
              </div>
              <div className="key-row">
                Click Pokemon - View Details
              </div>
            </div>
          </div>
        </div>

        <div className="guide-tip">
          💡 Tip: Walk in grass areas to encounter wild Pokemon!
        </div>
      </div>
    </div>
  )
}

export default KeyboardGuide
