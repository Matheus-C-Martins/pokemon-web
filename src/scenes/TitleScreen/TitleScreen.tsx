import { useGame } from '@/state/GameContext'
import { hasSaveData } from '@/utils/storage'
import './TitleScreen.css'

const TitleScreen = () => {
  const { actions } = useGame()
  const hasExistingSave = hasSaveData()

  const handleNewGame = () => {
    actions.resetGame()
    actions.changeScene('overworld')
  }

  const handleContinue = () => {
    actions.loadGameState()
    actions.changeScene('overworld')
  }

  return (
    <div className="title-screen">
      <div className="title-content">
        <h1 className="game-title">Pokemon Clone</h1>
        <p className="game-subtitle">A Web Adventure</p>
        
        <div className="title-menu">
          <button className="menu-button" onClick={handleNewGame}>
            New Game
          </button>
          {hasExistingSave && (
            <button className="menu-button" onClick={handleContinue}>
              Continue
            </button>
          )}
          <button className="menu-button disabled" disabled>
            Options
          </button>
        </div>

        <div className="title-footer">
          <p>Press button to start</p>
          <p className="hint">Desktop only • Use arrow keys to move</p>
        </div>
      </div>
    </div>
  )
}

export default TitleScreen
