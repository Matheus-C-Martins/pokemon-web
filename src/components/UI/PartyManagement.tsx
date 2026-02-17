import { useState } from 'react'
import { Pokemon } from '@/types/game.types'
import AnimatedSprite from '@/components/Sprite/AnimatedSprite'
import './PartyManagement.css'

interface PartyManagementProps {
  party: Pokemon[]
  onReorder: (newOrder: Pokemon[]) => void
  onClose: () => void
}

const PartyManagement = ({ party, onReorder, onClose }: PartyManagementProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleSelectPokemon = (index: number) => {
    if (selectedIndex === null) {
      // First selection - mark for swapping
      setSelectedIndex(index)
    } else if (selectedIndex === index) {
      // Clicked same Pokemon - deselect
      setSelectedIndex(null)
    } else {
      // Second selection - swap positions
      const newParty = [...party]
      const temp = newParty[selectedIndex]
      newParty[selectedIndex] = newParty[index]
      newParty[index] = temp
      onReorder(newParty)
      setSelectedIndex(null)
    }
  }

  return (
    <div className="party-management-overlay">
      <div className="party-management-container">
        <div className="party-header">
          <h2>Pokemon Party</h2>
          <p className="party-subtitle">
            {selectedIndex !== null 
              ? 'Select another Pokemon to swap positions' 
              : 'Click a Pokemon to swap its position'}
          </p>
        </div>

        <div className="party-grid">
          {party.map((pokemon, index) => {
            const hpPercentage = (pokemon.stats.hp / pokemon.stats.maxHp) * 100
            const isSelected = selectedIndex === index
            const isLeader = index === 0

            return (
              <div
                key={pokemon.id}
                className={`party-pokemon-card ${isSelected ? 'selected' : ''} ${isLeader ? 'leader' : ''}`}
                onClick={() => handleSelectPokemon(index)}
              >
                {isLeader && (
                  <div className="leader-badge">★ Party Leader</div>
                )}

                <div className="pokemon-card-sprite">
                  <AnimatedSprite pokemonName={pokemon.name} size="medium" />
                </div>

                <div className="pokemon-card-info">
                  <div className="pokemon-card-header">
                    <h3 className="pokemon-card-name">{pokemon.name}</h3>
                    <span className="pokemon-card-level">Lv. {pokemon.level}</span>
                  </div>

                  <div className="pokemon-card-types">
                    {pokemon.types.map(type => (
                      <span key={type} className={`type-badge ${type}`}>
                        {type}
                      </span>
                    ))}
                  </div>

                  <div className="pokemon-card-hp">
                    <span className="hp-label">HP</span>
                    <div className="hp-bar-container">
                      <div 
                        className={`hp-bar ${
                          hpPercentage > 50 ? 'high' : 
                          hpPercentage > 20 ? 'medium' : 
                          hpPercentage === 0 ? 'fainted' : 'low'
                        }`}
                        style={{ width: `${hpPercentage}%` }}
                      />
                    </div>
                    <span className="hp-text">
                      {pokemon.stats.hp} / {pokemon.stats.maxHp}
                    </span>
                  </div>

                  <div className="pokemon-card-stats">
                    <div className="stat-mini">
                      <span className="stat-mini-label">ATK</span>
                      <span className="stat-mini-value">{pokemon.stats.attack}</span>
                    </div>
                    <div className="stat-mini">
                      <span className="stat-mini-label">DEF</span>
                      <span className="stat-mini-value">{pokemon.stats.defense}</span>
                    </div>
                    <div className="stat-mini">
                      <span className="stat-mini-label">SPD</span>
                      <span className="stat-mini-value">{pokemon.stats.speed}</span>
                    </div>
                  </div>

                  {pokemon.stats.hp === 0 && (
                    <div className="fainted-overlay">FAINTED</div>
                  )}
                </div>

                {isSelected && (
                  <div className="selected-indicator">
                    <span>✓ Selected</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="party-footer">
          <p className="party-hint">
            💡 The first Pokemon in your party will lead in battles
          </p>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default PartyManagement
