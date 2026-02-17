import { GameState, SaveData } from '@/types/game.types'

const SAVE_KEY = 'pokemon-save'
const SAVE_VERSION = '1.0.0'

export function saveGame(gameState: GameState): boolean {
  try {
    const saveData: SaveData = {
      version: SAVE_VERSION,
      timestamp: Date.now(),
      gameState,
    }
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData))
    return true
  } catch (error) {
    console.error('Failed to save game:', error)
    return false
  }
}

export function loadGame(): GameState | null {
  try {
    const savedData = localStorage.getItem(SAVE_KEY)
    if (!savedData) return null

    const saveData: SaveData = JSON.parse(savedData)
    
    // Version check (for future migrations)
    if (saveData.version !== SAVE_VERSION) {
      console.warn('Save file version mismatch')
      // Could implement migration logic here
    }

    return saveData.gameState
  } catch (error) {
    console.error('Failed to load game:', error)
    return null
  }
}

export function hasSaveData(): boolean {
  return localStorage.getItem(SAVE_KEY) !== null
}

export function deleteSave(): void {
  localStorage.removeItem(SAVE_KEY)
}

export function getSaveInfo(): { timestamp: number; playerName: string } | null {
  try {
    const savedData = localStorage.getItem(SAVE_KEY)
    if (!savedData) return null

    const saveData: SaveData = JSON.parse(savedData)
    return {
      timestamp: saveData.timestamp,
      playerName: saveData.gameState.player.name,
    }
  } catch (error) {
    return null
  }
}
