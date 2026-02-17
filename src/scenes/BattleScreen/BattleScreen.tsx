import { useState, useEffect } from 'react'
import { useGame } from '@/state/GameContext'
import { Move, Pokemon } from '@/types/game.types'
import { calculateDamage, calculateCatchRate, calculateExperienceGain, shouldLevelUp, levelUpPokemon } from '@/utils/battleCalculations'
import { getEffectivenessMessage } from '@/utils/typeEffectiveness'
import PokemonDisplay from '@/components/Battle/PokemonDisplay'
import BattleLog from '@/components/Battle/BattleLog'
import { BattleActions, MoveSelection, BagMenu } from '@/components/Battle/BattleActions'
import './BattleScreen.css'

type BattleMenu = 'main' | 'moves' | 'bag'

const BattleScreen = () => {
  const { state, actions, dispatch } = useGame()
  const [currentMenu, setCurrentMenu] = useState<BattleMenu>('main')
  const [isProcessing, setIsProcessing] = useState(false)
  const [battleLog, setBattleLog] = useState<string[]>([])

  const battle = state.battle

  useEffect(() => {
    if (battle) {
      setBattleLog(battle.battleLog)
    }
  }, [battle])

  if (!battle) {
    actions.changeScene('overworld')
    return null
  }

  const addLog = (message: string) => {
    setBattleLog(prev => [...prev, message])
  }

  const updatePlayerPokemon = (updates: Partial<Pokemon>) => {
    dispatch({
      type: 'UPDATE_BATTLE',
      payload: {
        playerPokemon: { ...battle.playerPokemon, ...updates }
      }
    })
    // Also update in party
    dispatch({
      type: 'UPDATE_POKEMON',
      payload: {
        id: battle.playerPokemon.id,
        updates
      }
    })
  }

  const updateEnemyPokemon = (updates: Partial<Pokemon>) => {
    dispatch({
      type: 'UPDATE_BATTLE',
      payload: {
        enemyPokemon: { ...battle.enemyPokemon, ...updates }
      }
    })
  }

  const handlePlayerAttack = async (move: Move) => {
    if (isProcessing) return
    setIsProcessing(true)
    setCurrentMenu('main')

    // Player attacks
    addLog(`${battle.playerPokemon.name} used ${move.name}!`)
    
    await new Promise(resolve => setTimeout(resolve, 800))

    const result = calculateDamage(battle.playerPokemon, battle.enemyPokemon, move)
    const newEnemyHp = Math.max(0, battle.enemyPokemon.stats.hp - result.damage)

    updateEnemyPokemon({
      stats: { ...battle.enemyPokemon.stats, hp: newEnemyHp }
    })

    // Reduce PP
    const updatedMoves = battle.playerPokemon.moves.map(m =>
      m.id === move.id ? { ...m, pp: m.pp - 1 } : m
    )
    updatePlayerPokemon({ moves: updatedMoves })

    await new Promise(resolve => setTimeout(resolve, 600))

    if (result.isCritical) {
      addLog('A critical hit!')
    }
    
    const effectivenessMsg = getEffectivenessMessage(result.effectiveness)
    if (effectivenessMsg) {
      addLog(effectivenessMsg)
    }

    await new Promise(resolve => setTimeout(resolve, 800))

    // Check if enemy fainted
    if (newEnemyHp === 0) {
      addLog(`Wild ${battle.enemyPokemon.name} fainted!`)
      await new Promise(resolve => setTimeout(resolve, 1000))
      handleVictory()
      return
    }

    // Enemy attacks
    await enemyTurn()
    setIsProcessing(false)
  }

  const enemyTurn = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const enemyMove = battle.enemyPokemon.moves[Math.floor(Math.random() * battle.enemyPokemon.moves.length)]
    addLog(`Wild ${battle.enemyPokemon.name} used ${enemyMove.name}!`)

    await new Promise(resolve => setTimeout(resolve, 800))

    const result = calculateDamage(battle.enemyPokemon, battle.playerPokemon, enemyMove)
    const newPlayerHp = Math.max(0, battle.playerPokemon.stats.hp - result.damage)

    updatePlayerPokemon({
      stats: { ...battle.playerPokemon.stats, hp: newPlayerHp }
    })

    await new Promise(resolve => setTimeout(resolve, 600))

    if (result.isCritical) {
      addLog('A critical hit!')
    }

    const effectivenessMsg = getEffectivenessMessage(result.effectiveness)
    if (effectivenessMsg) {
      addLog(effectivenessMsg)
    }

    await new Promise(resolve => setTimeout(resolve, 800))

    // Check if player fainted
    if (newPlayerHp === 0) {
      addLog(`${battle.playerPokemon.name} fainted!`)
      await new Promise(resolve => setTimeout(resolve, 1000))
      handleDefeat()
    }
  }

  const handleCatch = async () => {
    if (isProcessing || !battle.isWildBattle) return
    setIsProcessing(true)
    setCurrentMenu('main')

    addLog('You threw a Poke Ball!')
    await new Promise(resolve => setTimeout(resolve, 1000))

    const catchRate = calculateCatchRate(battle.enemyPokemon, 1.0)
    const caught = Math.random() < catchRate

    if (caught) {
      addLog(`Gotcha! ${battle.enemyPokemon.name} was caught!`)
      
      // Add to party/box
      const caughtPokemon = {
        ...battle.enemyPokemon,
        isWild: false,
        stats: { ...battle.enemyPokemon.stats, hp: battle.enemyPokemon.stats.maxHp }
      }
      
      actions.addPokemon(caughtPokemon)
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      actions.endBattle()
    } else {
      addLog('Oh no! The Pokemon broke free!')
      await new Promise(resolve => setTimeout(resolve, 1000))
      await enemyTurn()
      setIsProcessing(false)
    }
  }

  const handleUsePotion = async () => {
    if (isProcessing) return
    setIsProcessing(true)
    setCurrentMenu('main')

    const healAmount = Math.min(20, battle.playerPokemon.stats.maxHp - battle.playerPokemon.stats.hp)
    
    if (healAmount > 0) {
      addLog(`You used a Potion!`)
      updatePlayerPokemon({
        stats: { ...battle.playerPokemon.stats, hp: battle.playerPokemon.stats.hp + healAmount }
      })
      
      dispatch({ type: 'REMOVE_ITEM', payload: { id: 'potion', quantity: 1 } })
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      addLog(`${battle.playerPokemon.name} recovered ${healAmount} HP!`)
      await new Promise(resolve => setTimeout(resolve, 1000))
      await enemyTurn()
    } else {
      addLog(`${battle.playerPokemon.name}'s HP is full!`)
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    setIsProcessing(false)
  }

  const handleRun = async () => {
    if (isProcessing || !battle.canEscape) return
    setIsProcessing(true)

    addLog('Got away safely!')
    await new Promise(resolve => setTimeout(resolve, 1000))
    actions.endBattle()
  }

  const handleVictory = async () => {
    const expGained = calculateExperienceGain(battle.enemyPokemon, battle.isWildBattle)
    addLog(`${battle.playerPokemon.name} gained ${expGained} EXP!`)
    
    const newExp = battle.playerPokemon.experience + expGained
    updatePlayerPokemon({ experience: newExp })

    await new Promise(resolve => setTimeout(resolve, 1500))

    // Check level up
    let pokemon = { ...battle.playerPokemon, experience: newExp }
    if (shouldLevelUp(pokemon)) {
      pokemon = levelUpPokemon(pokemon)
      addLog(`${pokemon.name} grew to level ${pokemon.level}!`)
      updatePlayerPokemon(pokemon)
      await new Promise(resolve => setTimeout(resolve, 1500))
    }

    actions.endBattle()
  }

  const handleDefeat = async () => {
    addLog('You have no more Pokemon!')
    await new Promise(resolve => setTimeout(resolve, 1500))
    // Heal Pokemon and return
    updatePlayerPokemon({
      stats: { ...battle.playerPokemon.stats, hp: battle.playerPokemon.stats.maxHp }
    })
    actions.endBattle()
  }

  const hasPotion = state.inventory.find(item => item.id === 'potion')?.quantity ?? 0

  return (
    <div className="battle-screen">
      <div className="battle-arena">
        <div className="pokemon-area enemy-area">
          <PokemonDisplay pokemon={battle.enemyPokemon} isPlayer={false} />
        </div>

        <div className="pokemon-area player-area">
          <PokemonDisplay pokemon={battle.playerPokemon} isPlayer={true} />
        </div>

        <div className="battle-ui">
          <BattleLog messages={battleLog} />
          
          <div className="battle-controls">
            {currentMenu === 'main' && (
              <BattleActions
                onFight={() => setCurrentMenu('moves')}
                onBag={() => setCurrentMenu('bag')}
                onRun={handleRun}
                canRun={battle.canEscape}
                disabled={isProcessing}
              />
            )}

            {currentMenu === 'moves' && (
              <MoveSelection
                moves={battle.playerPokemon.moves}
                onSelectMove={handlePlayerAttack}
                onBack={() => setCurrentMenu('main')}
              />
            )}

            {currentMenu === 'bag' && (
              <BagMenu
                onUsePokeball={handleCatch}
                onUsePotion={handleUsePotion}
                onBack={() => setCurrentMenu('main')}
                hasItems={hasPotion > 0}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BattleScreen
