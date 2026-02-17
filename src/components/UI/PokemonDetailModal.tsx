import { Pokemon } from '@/types/game.types'
import AnimatedSprite from '@/components/Sprite/AnimatedSprite'
import './PokemonDetailModal.css'

interface PokemonDetailModalProps {
  pokemon: Pokemon
  onClose: () => void
}

const PokemonDetailModal = ({ pokemon, onClose }: PokemonDetailModalProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="pokemon-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="detail-header">
          <AnimatedSprite 
            pokemonName={pokemon.name}
            animation="idle"
            size="large"
          />
          <div className="detail-header-info">
            <h2 className="detail-name">{pokemon.name}</h2>
            <div className="detail-types">
              {pokemon.types.map(type => (
                <span key={type} className={`type-badge ${type}`}>
                  {type}
                </span>
              ))}
            </div>
            <div className="detail-level">Level {pokemon.level}</div>
          </div>
        </div>

        <div className="detail-stats">
          <h3>Stats</h3>
          <div className="stat-row">
            <span className="stat-label">HP</span>
            <div className="stat-bar-container">
              <div className="stat-bar" style={{ width: `${(pokemon.stats.hp / pokemon.stats.maxHp) * 100}%` }} />
            </div>
            <span className="stat-value">{pokemon.stats.hp}/{pokemon.stats.maxHp}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Attack</span>
            <div className="stat-bar-container">
              <div className="stat-bar attack" style={{ width: `${(pokemon.stats.attack / 100) * 100}%` }} />
            </div>
            <span className="stat-value">{pokemon.stats.attack}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Defense</span>
            <div className="stat-bar-container">
              <div className="stat-bar defense" style={{ width: `${(pokemon.stats.defense / 100) * 100}%` }} />
            </div>
            <span className="stat-value">{pokemon.stats.defense}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Sp. Atk</span>
            <div className="stat-bar-container">
              <div className="stat-bar special" style={{ width: `${(pokemon.stats.specialAttack / 100) * 100}%` }} />
            </div>
            <span className="stat-value">{pokemon.stats.specialAttack}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Sp. Def</span>
            <div className="stat-bar-container">
              <div className="stat-bar special" style={{ width: `${(pokemon.stats.specialDefense / 100) * 100}%` }} />
            </div>
            <span className="stat-value">{pokemon.stats.specialDefense}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Speed</span>
            <div className="stat-bar-container">
              <div className="stat-bar speed" style={{ width: `${(pokemon.stats.speed / 100) * 100}%` }} />
            </div>
            <span className="stat-value">{pokemon.stats.speed}</span>
          </div>
        </div>

        <div className="detail-moves">
          <h3>Moves</h3>
          <div className="moves-list">
            {pokemon.moves.map(move => (
              <div key={move.id} className={`move-card ${move.type}`}>
                <div className="move-card-header">
                  <span className="move-card-name">{move.name}</span>
                  <span className="move-card-pp">PP: {move.pp}/{move.maxPP}</span>
                </div>
                <div className="move-card-info">
                  <span className={`move-card-type ${move.type}`}>{move.type}</span>
                  <span className="move-card-category">{move.category}</span>
                  {move.power > 0 && <span className="move-card-power">Pow: {move.power}</span>}
                  <span className="move-card-accuracy">Acc: {move.accuracy}%</span>
                </div>
                <p className="move-card-description">{move.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-experience">
          <div className="exp-label">Experience to Next Level</div>
          <div className="exp-bar-container">
            <div 
              className="exp-bar" 
              style={{ width: `${(pokemon.experience / pokemon.experienceToNextLevel) * 100}%` }}
            />
          </div>
          <div className="exp-text">{pokemon.experience} / {pokemon.experienceToNextLevel}</div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetailModal
