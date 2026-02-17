import { Pokemon } from '@/types/game.types'
import AnimatedSprite from '@/components/Sprite/AnimatedSprite'
import './CatchSuccessModal.css'

interface CatchSuccessModalProps {
  pokemon: Pokemon
  onClose: () => void
}

const CatchSuccessModal = ({ pokemon, onClose }: CatchSuccessModalProps) => {
  return (
    <div className="catch-success-overlay" onClick={onClose}>
      <div className="catch-success-modal" onClick={(e) => e.stopPropagation()}>
        <div className="success-header">
          <h2 className="success-title">Gotcha!</h2>
          <p className="success-subtitle">{pokemon.name} was caught!</p>
        </div>

        <div className="success-sprite">
          <div className="pokeball-animation">
            <span className="pokeball-icon">⚾</span>
          </div>
          <AnimatedSprite pokemonName={pokemon.name} size="large" />
        </div>

        <div className="pokemon-info-card">
          <div className="info-row">
            <span className="info-label">Species:</span>
            <span className="info-value">{pokemon.name}</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Level:</span>
            <span className="info-value">Lv. {pokemon.level}</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Type:</span>
            <div className="type-badges">
              {pokemon.types.map(type => (
                <span key={type} className={`type-badge ${type}`}>
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="info-row">
            <span className="info-label">HP:</span>
            <span className="info-value">{pokemon.stats.maxHp}</span>
          </div>
        </div>

        <div className="success-footer">
          <p className="success-message">
            {pokemon.name}'s data was added to the Pokédex!
          </p>
          <button className="continue-btn" onClick={onClose}>
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default CatchSuccessModal
