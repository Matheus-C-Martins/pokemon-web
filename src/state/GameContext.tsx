import React, { createContext, useContext, useReducer, ReactNode, useCallback, useState } from 'react'
import { GameState, SceneType, Pokemon, BattleState } from '@/types/game.types'
import { gameReducer, INITIAL_GAME_STATE, GameAction } from './gameReducer'
import { loadGame, saveGame } from '@/utils/storage'

interface GameContextType {
  state: GameState
  dispatch: React.Dispatch<GameAction>
  isSaving: boolean
  actions: {
    changeScene: (scene: SceneType) => void
    setPlayerName: (name: string) => void
    movePlayer: (x: number, y: number, direction: 'up' | 'down' | 'left' | 'right') => void
    addPokemon: (pokemon: Pokemon) => void
    startBattle: (battle: BattleState) => void
    endBattle: () => void
    addMoney: (amount: number) => void
    removeMoney: (amount: number) => void
    saveGameState: () => void
    loadGameState: () => void
    resetGame: () => void
    autoSave: () => void
  }
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE)
  const [isSaving, setIsSaving] = useState(false)

  const actions = {
    changeScene: useCallback((scene: SceneType) => {
      dispatch({ type: 'CHANGE_SCENE', payload: scene })
    }, []),

    setPlayerName: useCallback((name: string) => {
      dispatch({ type: 'SET_PLAYER_NAME', payload: name })
    }, []),

    movePlayer: useCallback((x: number, y: number, direction: 'up' | 'down' | 'left' | 'right') => {
      dispatch({ type: 'MOVE_PLAYER', payload: { x, y, direction } })
    }, []),

    addPokemon: useCallback((pokemon: Pokemon) => {
      dispatch({ type: 'ADD_POKEMON', payload: pokemon })
      // Track in progress
      if (pokemon.isWild) {
        dispatch({
          type: 'SET_STORY_FLAG',
          payload: { flag: `caught_${pokemon.id}`, value: true },
        })
      }
    }, []),

    startBattle: useCallback((battle: BattleState) => {
      dispatch({ type: 'START_BATTLE', payload: battle })
    }, []),

    endBattle: useCallback(() => {
      dispatch({ type: 'END_BATTLE' })
    }, []),

    addMoney: useCallback((amount: number) => {
      dispatch({ type: 'ADD_MONEY', payload: amount })
    }, []),

    removeMoney: useCallback((amount: number) => {
      dispatch({ type: 'REMOVE_MONEY', payload: amount })
    }, []),

    saveGameState: useCallback(() => {
      setIsSaving(true)
      saveGame(state)
      setTimeout(() => setIsSaving(false), 2000)
    }, [state]),

    autoSave: useCallback(() => {
      saveGame(state)
    }, [state]),

    loadGameState: useCallback(() => {
      const loadedState = loadGame()
      if (loadedState) {
        dispatch({ type: 'LOAD_GAME', payload: loadedState })
      }
    }, []),

    resetGame: useCallback(() => {
      dispatch({ type: 'RESET_GAME' })
      localStorage.removeItem('pokemon-save')
    }, []),
  }

  return (
    <GameContext.Provider value={{ state, dispatch, actions, isSaving }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
