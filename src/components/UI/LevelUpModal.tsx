import { Pokemon } from '@/types/game.types'
import AnimatedSprite from '@/components/Sprite/AnimatedSprite'
import './LevelUpModal.css'

interface StatChange {
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}

interface LevelUpModalProps {
  pokemon: Pokemon
  oldLevel: number
  statChanges: StatChange
  onClose: () => void
}

const LevelUpModal = ({ pokemon, oldLevel, statChanges, onClose }: LevelUpModalProps) => {
  const handleClick = (e: React.MouseEvent) => {
    // Only close if clicking outside the modal content
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleContinue = () => {
    onClose()
  }

  return (
    <div className="level-up-modal-overlay" onClick={handleClick}>
      <div className="level-up-modal">
        <div className="level-up-header">
          <h2 className="level-up-title">Level Up!</h2>
          <div className="level-up-sprite">
            <AnimatedSprite pokemonName={pokemon.name} size="large" />
          </div>
          <div className="level-up-pokemon-info">
            <h3 className="level-up-pokemon-name">{pokemon.name}</h3>
            <p className="level-up-level">
              Level {oldLevel} → <span className="level-new">{pokemon.level}</span>
            </p>
          </div>
        </div>

        <div className="level-up-stats">
          <h4 className="stats-title">Stat Changes</h4>
          <div className="stats-grid">
            <StatRow 
              label="HP" 
              oldValue={pokemon.stats.maxHp - statChanges.hp} 
              newValue={pokemon.stats.maxHp} 
              change={statChanges.hp} 
            />
            <StatRow 
              label="Attack" 
              oldValue={pokemon.stats.attack - statChanges.attack} 
              newValue={pokemon.stats.attack} 
              change={statChanges.attack} 
            />
            <StatRow 
              label="Defense" 
              oldValue={pokemon.stats.defense - statChanges.defense} 
              newValue={pokemon.stats.defense} 
              change={statChanges.defense} 
            />
            <StatRow 
              label="Sp. Atk" 
              oldValue={pokemon.stats.specialAttack - statChanges.specialAttack} 
              newValue={pokemon.stats.specialAttack} 
              change={statChanges.specialAttack} 
            />
            <StatRow 
              label="Sp. Def" 
              oldValue={pokemon.stats.specialDefense - statChanges.specialDefense} 
              newValue={pokemon.stats.specialDefense} 
              change={statChanges.specialDefense} 
            />
            <StatRow 
              label="Speed" 
              oldValue={pokemon.stats.speed - statChanges.speed} 
              newValue={pokemon.stats.speed} 
              change={statChanges.speed} 
            />
          </div>
        </div>

        <div className="level-up-actions">
          <button className="level-up-button" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

interface StatRowProps {
  label: string
  oldValue: number
  newValue: number
  change: number
}

const StatRow = ({ label, oldValue, newValue, change }: StatRowProps) => {
  return (
    <div className="stat-row">
      <span className="stat-label">{label}</span>
      <div className="stat-values">
        <span className="stat-old">{oldValue}</span>
        <span className="stat-arrow">→</span>
        <span className="stat-new">{newValue}</span>
        {change > 0 && <span className="stat-change">+{change}</span>}
      </div>
    </div>
  )
}

export default LevelUpModal
