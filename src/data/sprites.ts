import { SpriteConfig, PokemonSprite } from '@/types/sprite.types'

// Sprite registry for all Pokemon
// Add your custom sprites here!
export const POKEMON_SPRITES: Record<string, PokemonSprite> = {
  // ===== STARTER POKEMON =====
  
  // Leafeon (Grass Starter) - EXAMPLE with custom sprite
  'leafeon': {
    url: '/sprites/leafeon.png', // Place your sprite sheet in public/sprites/
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 4, // Total frames in your sprite sheet
    fps: 8,
    loop: true,
    animations: {
      idle: { startFrame: 0, frameCount: 4 }, // Frames 0-3 for idle animation
      battle: { startFrame: 0, frameCount: 4 }, // Can use same frames or define different ones
    }
  } as SpriteConfig,
  
  // Forestorm (Leafeon evolution 1)
  'forestorm': '🌳',
  
  // Terraleaf (Leafeon evolution 2)
  'terraleaf': '🌲',
  
  // Embear (Fire Starter)
  'embear': '🔥',
  
  // Blazeclaw (Embear evolution 1)
  'blazeclaw': '🔥',
  
  // Infernotitan (Embear evolution 2)
  'infernotitan': '🌋',
  
  // Aquarius (Water Starter)
  'aquarius': '💧',
  
  // Torrentseal (Aquarius evolution 1)
  'torrentseal': '🌊',
  
  // Hydroknight (Aquarius evolution 2)
  'hydroknight': '💎',
  
  // ===== WILD POKEMON =====
  
  'sparkrat': '⚡',
  'voltrodent': '⚡',
  
  'rockbite': '🪨',
  'boulderjaw': '🗿',
  
  'fluttermoth': '🦋',
  'celestialwing': '🦋',
  
  // Generic wild Pokemon (from generateWildPokemon)
  'grassling': '🌱',
  'flamepup': '🔥',
  'aquakid': '💧',
}

// Helper function to get sprite by Pokemon name
export function getPokemonSprite(pokemonName: string): PokemonSprite {
  const key = pokemonName.toLowerCase()
  return POKEMON_SPRITES[key] || '❓' // Fallback to question mark if not found
}

// Helper to check if a Pokemon has a custom sprite
export function hasCustomSprite(pokemonName: string): boolean {
  const sprite = getPokemonSprite(pokemonName)
  return typeof sprite === 'object' && 'url' in sprite
}
