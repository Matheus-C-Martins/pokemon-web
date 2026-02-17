import { Pokemon } from '@/types/game.types'
import AnimatedSprite from '@/components/Sprite/AnimatedSprite'
import './PokemonDisplay.css'

interface PokemonDisplayProps {
  pokemon: Pokemon
  isPlayer: boolean
}

const PokemonDisplay = ({ pokemon, isPlayer }: PokemonDisplayProps) => {
  const hpPercentage = (pokemon.stats.hp / pokemon.stats.maxHp) * 100
  const hpColor = hpPercentage > 50 ? '#4ade80' : hpPercentage > 20 ? '#fbbf24' : '#ef4444'
  const isFainted = pokemon.stats.hp === 0

  return (
    <div className={`pokemon-display ${isPlayer ? 'player' : 'enemy'}`}>
      <div className="pokemon-sprite">
        <AnimatedSprite 
          pokemonName={pokemon.name}
          animation={isFainted ? 'fainted' : 'battle'}
          size="large"
          flipHorizontal={isPlayer}
        />
        {!isPlayer && pokemon.isWild && (
          <div className="wild-badge">WILD</div>
        )}
      </div>
      
      <div className="pokemon-info-box">
        <div className="pokemon-header">
          <span className="pokemon-name">{pokemon.name}</span>
          <span className="pokemon-level">Lv.{pokemon.level}</span>
        </div>
        
        <div className="hp-container">
          <div className="hp-label">HP</div>
          <div className="hp-bar-outer">
            <div 
              className="hp-bar-inner"
              style={{ 
                width: `${hpPercentage}%`,
                backgroundColor: hpColor
              }}
            />
          </div>
          <div className="hp-text">
            {pokemon.stats.hp}/{pokemon.stats.maxHp}
          </div>
        </div>

        {pokemon.status && pokemon.status !== 'normal' && (
          <div className={`status-badge ${pokemon.status}`}>
            {pokemon.status.toUpperCase()}
          </div>
        )}
      </div>
    </div>
  )
}

export default PokemonDisplay
