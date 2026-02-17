import { useEffect, useCallback } from 'react'
import { useGame } from '@/state/GameContext'
import { useKeyboard } from '@/hooks/useKeyboard'
import { MAPS } from '@/data/maps'
import { canMoveTo, checkEncounter } from '@/utils/collision'
import { generateWildPokemon, createStarterPokemon } from '@/data/pokemon'
import MapRenderer from '@/components/Map/MapRenderer'
import './OverworldScreen.css'

const OverworldScreen = () => {
  const { state, actions, dispatch } = useGame()
  const currentMap = MAPS.starterTown

  // Initialize with starter Pokemon if party is empty
  useEffect(() => {
    if (state.party.length === 0) {
      // Give player a starter Pokemon
      const starter = createStarterPokemon('Leafeon', 'grass')
      actions.addPokemon(starter)
    }
  }, [state.party.length, actions])

  // Handle keyboard movement
  const handleKeyPress = useCallback((key: string) => {
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

    // Check if move is valid
    if (canMoveTo(currentMap, newX, newY)) {
      // Update player position
      dispatch({
        type: 'MOVE_PLAYER',
        payload: { x: newX, y: newY, direction },
      })

      // Check for wild encounter
      if (checkEncounter(currentMap, newX, newY) && state.party.length > 0) {
        const wildPokemon = generateWildPokemon(5 + Math.floor(Math.random() * 3))
        
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
  }, [state.player, currentMap, state.party, dispatch, actions])

  useKeyboard(handleKeyPress)

  return (
    <div className="overworld-screen">
      <div className="overworld-ui">
        <div className="party-display">
          <h4>Party</h4>
          {state.party.length === 0 ? (
            <p className="no-pokemon">No Pokemon</p>
          ) : (
            <div className="party-list">
              {state.party.map((pokemon) => (
                <div key={pokemon.id} className="party-pokemon">
                  <span className="pokemon-sprite">{pokemon.sprite}</span>
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
        </div>
      </div>
    </div>
  )
}

export default OverworldScreen
