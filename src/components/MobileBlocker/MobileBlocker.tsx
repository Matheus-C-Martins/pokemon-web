import './MobileBlocker.css'

const MobileBlocker = () => {
  return (
    <div className="mobile-blocker">
      <div className="mobile-blocker-content">
        <div className="icon">🎮</div>
        <h2>Desktop Only</h2>
        <p>This Pokemon game is designed for desktop browsers.</p>
        <p className="hint">Please visit on a desktop or laptop computer to play!</p>
      </div>
    </div>
  )
}

export default MobileBlocker
