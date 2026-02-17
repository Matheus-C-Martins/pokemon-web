import { SpriteConfig, PokemonSprite } from '@/types/sprite.types'

// Sprite registry for all Pokemon
// Add your custom sprites here!
export const POKEMON_SPRITES: Record<string, PokemonSprite> = {
  // ===== STARTER POKEMON =====
  
  // Leafeon (Grass Starter) - Custom sprite with animations
  'leafeon': {
    url: '/sprites/leafeon.png', // Save first image as leafeon.png
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 8, // 4 idle + 3 walking + 1 evolving
    fps: 8,
    loop: true,
    animations: {
      idle: { startFrame: 0, frameCount: 4 }, // Top row: frames 0-3
      battle: { startFrame: 4, frameCount: 3 }, // Bottom row: frames 4-6 (walking)
      evolving: { startFrame: 7, frameCount: 1 }, // Bottom row: frame 7 (glowing)
    }
  } as SpriteConfig,
  
  // Forestorm (Leafeon evolution 1) - Custom sprite with animations
  'forestorm': {
    url: '/sprites/forestorm.png', // Save second image as forestorm.png
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 8, // 4 idle + 3 walking + 1 fainted
    fps: 8,
    loop: true,
    animations: {
      idle: { startFrame: 0, frameCount: 4 }, // Top row: frames 0-3
      battle: { startFrame: 4, frameCount: 3 }, // Bottom row: frames 4-6 (walking)
      fainted: { startFrame: 7, frameCount: 1 }, // Bottom row: frame 7 (defeated)
    }
  } as SpriteConfig,
  
  // Terraleaf (Forestorm evolution 2) - Ready for custom sprite!
  'terraleaf': {
    url: '/sprites/terraleaf.png', // Save third sprite as terraleaf.png
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 8, // 4 idle + 3 walking + 1 fainted
    fps: 8,
    loop: true,
    animations: {
      idle: { startFrame: 0, frameCount: 4 }, // Top row: frames 0-3
      battle: { startFrame: 4, frameCount: 3 }, // Bottom row: frames 4-6 (walking)
      fainted: { startFrame: 7, frameCount: 1 }, // Bottom row: frame 7 (defeated)
    }
  } as SpriteConfig,
  
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
