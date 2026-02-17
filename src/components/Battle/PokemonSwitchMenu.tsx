import { Pokemon } from '@/types/game.types'
import './PokemonSwitchMenu.css'

interface PokemonSwitchMenuProps {
  party: Pokemon[]
  currentPokemonId: string
  onSelectPokemon: (pokemon: Pokemon) => void
  onBack: () => void
}

export const PokemonSwitchMenu = ({ 
  party, 
  currentPokemonId, 
  onSelectPokemon, 
  onBack 
}: PokemonSwitchMenuProps) => {
  return (
    <div className="pokemon-switch-menu">
      <div className="switch-header">
        <h3>Choose a Pokemon</h3>
      </div>
      
      <div className="pokemon-list">
        {party.map((pokemon) => {
          const isCurrent = pokemon.id === currentPokemonId
          const isFainted = pokemon.stats.hp === 0
          const hpPercentage = (pokemon.stats.hp / pokemon.stats.maxHp) * 100
          
          return (
            <button
              key={pokemon.id}
              className={`pokemon-item ${isCurrent ? 'current' : ''} ${isFainted ? 'fainted' : ''}`}
              onClick={() => onSelectPokemon(pokemon)}
              disabled={isCurrent || isFainted}
            >
              <div className="pokemon-item-content">
                <div className="pokemon-item-info">
                  <div className="pokemon-item-header">
                    <span className="pokemon-item-name">{pokemon.name}</span>
                    <span className="pokemon-item-level">Lv. {pokemon.level}</span>
                  </div>
                  
                  <div className="pokemon-item-types">
                    {pokemon.types.map(type => (
                      <span key={type} className={`type-badge ${type}`}>
                        {type}
                      </span>
                    ))}
                  </div>
                  
                  <div className="pokemon-item-hp">
                    <div className="hp-bar-container">
                      <div 
                        className={`hp-bar ${
                          hpPercentage > 50 ? 'high' : 
                          hpPercentage > 20 ? 'medium' : 
                          'low'
                        }`}
                        style={{ width: `${hpPercentage}%` }}
                      />
                    </div>
                    <span className="hp-text">
                      {pokemon.stats.hp} / {pokemon.stats.maxHp}
                    </span>
                  </div>
                </div>
                
                {isCurrent && (
                  <div className="current-badge">In Battle</div>
                )}
                
                {isFainted && (
                  <div className="fainted-badge">Fainted</div>
                )}
              </div>
            </button>
          )
        })}
      </div>
      
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>
    </div>
  )
}
