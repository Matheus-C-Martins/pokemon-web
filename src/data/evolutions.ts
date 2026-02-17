import { Evolution } from '@/types/game.types'

// Evolution chains for all Pokemon
export const EVOLUTIONS: Record<string, Evolution> = {
  // Starter evolutions - Grass line
  'leafeon': {
    evolvesInto: 'Forestorm',
    level: 16,
    sprite: '🌳',
    types: ['grass']
  },
  'forestorm': {
    evolvesInto: 'Terraleaf',
    level: 32,
    sprite: '🌲',
    types: ['grass']
  },

  // Starter evolutions - Fire line
  'embear': {
    evolvesInto: 'Blazeclaw',
    level: 16,
    sprite: '🔥',
    types: ['fire']
  },
  'blazeclaw': {
    evolvesInto: 'Infernotitan',
    level: 32,
    sprite: '🌋',
    types: ['fire', 'fighting']
  },

  // Starter evolutions - Water line
  'aquarius': {
    evolvesInto: 'Torrentseal',
    level: 16,
    sprite: '🌊',
    types: ['water']
  },
  'torrentseal': {
    evolvesInto: 'Hydroknight',
    level: 32,
    sprite: '💎',
    types: ['water', 'steel']
  },

  // Wild Pokemon evolutions
  'sparkrat': {
    evolvesInto: 'Voltrodent',
    level: 18,
    sprite: '⚡',
    types: ['electric']
  },
  'rockbite': {
    evolvesInto: 'Boulderjaw',
    level: 20,
    sprite: '🗿',
    types: ['rock', 'ground']
  },
  'fluttermoth': {
    evolvesInto: 'Celestialwing',
    level: 15,
    sprite: '🦋',
    types: ['bug', 'flying']
  }
}

// Helper function to check if a Pokemon can evolve at its current level
export function canEvolve(pokemonName: string, level: number): boolean {
  const evolutionKey = pokemonName.toLowerCase()
  const evolution = EVOLUTIONS[evolutionKey]
  
  if (!evolution) return false
  return level >= evolution.level
}

// Get evolution data for a Pokemon
export function getEvolution(pokemonName: string): Evolution | undefined {
  const evolutionKey = pokemonName.toLowerCase()
  return EVOLUTIONS[evolutionKey]
}
