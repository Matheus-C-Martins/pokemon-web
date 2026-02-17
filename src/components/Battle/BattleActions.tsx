import { Move } from '@/types/game.types'
import './BattleActions.css'

interface BattleActionsProps {
  onFight: () => void
  onBag: () => void
  onRun: () => void
  canRun: boolean
  disabled: boolean
}

interface MoveSelectionProps {
  moves: Move[]
  onSelectMove: (move: Move) => void
  onBack: () => void
}

interface BagMenuProps {
  onUsePokeball: () => void
  onUsePotion: () => void
  onBack: () => void
  hasItems: boolean
}

export const BattleActions = ({ onFight, onBag, onRun, canRun, disabled }: BattleActionsProps) => {
  return (
    <div className="battle-actions">
      <button className="action-btn fight" onClick={onFight} disabled={disabled}>
        ⚔️ Fight
      </button>
      <button className="action-btn bag" onClick={onBag} disabled={disabled}>
        🎒 Bag
      </button>
      <button className="action-btn run" onClick={onRun} disabled={disabled || !canRun}>
        🏃 Run
      </button>
    </div>
  )
}

export const MoveSelection = ({ moves, onSelectMove, onBack }: MoveSelectionProps) => {
  return (
    <div className="move-selection">
      <div className="moves-grid">
        {moves.map((move) => (
          <button
            key={move.id}
            className={`move-btn ${move.type}`}
            onClick={() => onSelectMove(move)}
            disabled={move.pp === 0}
          >
            <div className="move-name">{move.name}</div>
            <div className="move-info">
              <span className="move-type">{move.type}</span>
              <span className="move-pp">PP: {move.pp}/{move.maxPP}</span>
            </div>
          </button>
        ))}
      </div>
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>
    </div>
  )
}

export const BagMenu = ({ onUsePokeball, onUsePotion, onBack, hasItems }: BagMenuProps) => {
  return (
    <div className="bag-menu">
      <div className="bag-items">
        <button className="bag-item-btn" onClick={onUsePokeball}>
          <span className="item-icon">⚾</span>
          <span className="item-name">Poke Ball</span>
        </button>
        <button className="bag-item-btn" onClick={onUsePotion} disabled={!hasItems}>
          <span className="item-icon">🧪</span>
          <span className="item-name">Potion</span>
        </button>
      </div>
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>
    </div>
  )
}
