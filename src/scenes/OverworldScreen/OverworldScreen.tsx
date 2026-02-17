import { useCallback, useState } from 'react'
import { useGame } from '@/state/GameContext'
import { useKeyboard } from '@/hooks/useKeyboard'
import { MAPS } from '@/data/maps'
import { canMoveTo, checkEncounter } from '@/utils/collision'
import { generateWildPokemon } from '@/data/pokemon'
import { Pokemon } from '@/types/game.types'
import MapRenderer from '@/components/Map/MapRenderer'
import PauseMenu from '@/components/UI/PauseMenu'
import PokemonDetailModal from '@/components/UI/PokemonDetailModal'
import KeyboardGuide from '@/components/UI/KeyboardGuide'
import SaveIndicator from '@/components/UI/SaveIndicator'
import PartyManagement from '@/components/UI/PartyManagement'
import AnimatedSprite from '@/components/Sprite/AnimatedSprite'
import './OverworldScreen.css'

const OverworldScreen = () => {
  const { state, actions, dispatch, isSaving } = useGame()
  const currentMap = MAPS.starterTown
  const [isPaused, setIsPaused] = useState(false)
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [showGuide, setShowGuide] = useState(false)
  const [showPartyManagement, setShowPartyManagement] = useState(false)

  // Handle keyboard movement
  const handleKeyPress = useCallback((key: string) => {
    // ESC for pause menu (toggle)
    if (key === 'Escape') {
      setIsPaused(prev => !prev)
      return
    }

    // H for help
    if (key === 'h' || key === 'H') {
      setShowGuide(true)
      return
    }

    // P for party management
    if (key === 'p' || key === 'P') {
      setShowPartyManagement(true)
      return
    }

    // Don't allow movement when paused
    if (isPaused) return

    let newX = state.player.x
    let newY = state.player.y
    let direction: 'up' | 'down' | 'left' | 'right' = state.player.direction

    switch (key) {
      case 'ArrowUp':
      case 'w':
        newY -= 1
        direction = 'up'
        break
      case 'ArrowDown':
      case 's':
        newY += 1
        direction = 'down'
        break
      case 'ArrowLeft':
      case 'a':
        newX -= 1
        direction = 'left'
        break
      case 'ArrowRight':
      case 'd':
        newX += 1
        direction = 'right'
        break
      default:
        return
    }

    // Check if movement is valid
    if (canMoveTo(currentMap, newX, newY)) {
      actions.movePlayer(newX, newY, direction)

      // Check for wild encounter
      if (checkEncounter(currentMap, newX, newY) && state.party.length > 0) {
        const wildPokemon = generateWildPokemon(5 + Math.floor(Math.random() * 3))
        
        // Auto-save before battle
        actions.autoSave()
        
        // Start battle
        actions.startBattle({
          playerPokemon: state.party[0],
          enemyPokemon: wildPokemon,
          turn: Math.random() > 0.5 ? 'player' : 'enemy',
          battleLog: [`A wild ${wildPokemon.name} appeared!`],
          isWildBattle: true,
          canEscape: true,
        })
      }
    }
  }, [state.player, currentMap, state.party, dispatch, actions, isPaused])

  useKeyboard(handleKeyPress)

  const handleQuitToTitle = () => {
    actions.autoSave()
    actions.changeScene('title')
  }

  const handleSave = () => {
    actions.saveGameState()
  }

  const handlePartyReorder = (newOrder: Pokemon[]) => {
    // Update the entire party with new order
    dispatch({
      type: 'REORDER_PARTY',
      payload: newOrder
    })
  }

  return (
    <div className="overworld-screen">
      <SaveIndicator isSaving={isSaving} />
      
      <div className="overworld-ui">
        <div className="party-display">
          <h4>Party</h4>
          {state.party.length === 0 ? (
            <p className="no-pokemon">No Pokemon</p>
          ) : (
            <div className="party-list">
              {state.party.map((pokemon) => (
                <div 
                  key={pokemon.id} 
                  className="party-pokemon"
                  onClick={() => setSelectedPokemon(pokemon)}
                  role="button"
                  tabIndex={0}
                >
                  <AnimatedSprite 
                    pokemonName={pokemon.name}
                    animation="idle"
                    size="medium"
                  />
                  <div className="pokemon-info">
                    <span className="pokemon-name">{pokemon.name}</span>
                    <span className="pokemon-level">Lv.{pokemon.level}</span>
                  </div>
                  <div className="hp-bar">
                    <div
                      className="hp-fill"
                      style={{ width: `${(pokemon.stats.hp / pokemon.stats.maxHp) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <MapRenderer
          map={currentMap}
          playerX={state.player.x}
          playerY={state.player.y}
          playerDirection={state.player.direction}
        />

        <div className="player-info">
          <div className="info-item">
            <span className="label">Money:</span>
            <span className="value">₽{state.player.money}</span>
          </div>
          <div className="info-item">
            <span className="label">Badges:</span>
            <span className="value">{state.progress.badges}/8</span>
          </div>
          <button className="help-btn" onClick={() => setShowGuide(true)}>
            ❓ Controls
          </button>
        </div>
      </div>

      <PauseMenu
        isOpen={isPaused}
        onClose={() => setIsPaused(false)}
        onSave={handleSave}
        onQuitToTitle={handleQuitToTitle}
      />

      {selectedPokemon && (
        <PokemonDetailModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}

      <KeyboardGuide
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
      />

      {showPartyManagement && (
        <PartyManagement
          party={state.party}
          onReorder={handlePartyReorder}
          onClose={() => setShowPartyManagement(false)}
        />
      )}
    </div>
  )
}

export default OverworldScreen
