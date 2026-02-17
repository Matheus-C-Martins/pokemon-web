import { SpriteConfig, PokemonSprite } from '@/types/sprite.types'

// Sprite registry for all Pokemon
// 
// STATIC SPRITE FORMAT (single image):
// {
//   url: '/sprites/pokemon.png',
//   frameWidth: 128,
//   frameHeight: 128,
//   frameCount: 1
// }
//
// ANIMATED SPRITE FORMAT (sprite sheet with multiple frames):
// {
//   url: '/sprites/pokemon.png',
//   frameWidth: 64,
//   frameHeight: 64,
//   frameCount: 8,
//   fps: 8,
//   loop: true,
//   animations: {
//     idle: { startFrame: 0, frameCount: 4 },
//     battle: { startFrame: 4, frameCount: 3 },
//     evolving: { startFrame: 7, frameCount: 1 }
//   }
// }
//
export const POKEMON_SPRITES: Record<string, PokemonSprite> = {
  // ===== STARTER POKEMON =====
  
  // Leafeon (Grass Starter) - Simple static sprite
  'leafeon': {
    url: '/sprites/leafeon.png',
    frameWidth: 1344,
    frameHeight: 768,
    frameCount: 1, // Single static sprite
    maintainAspectRatio: true, // Prevent stretching
    // Crop to zoom in on character
    cropX: 350,
    cropY: 0,
    cropWidth: 700,
    cropHeight: 768,
  } as SpriteConfig,
  
  // Forestorm (Leafeon evolution 1) - Simple static sprite
  'forestorm': {
    url: '/sprites/forestorm.png',
    frameWidth: 1344,
    frameHeight: 768,
    frameCount: 1, // Single static sprite
    maintainAspectRatio: true, // Prevent stretching
    // Crop to zoom in on character
    cropX: 350,
    cropY: 0,
    cropWidth: 700,
    cropHeight: 768,
  } as SpriteConfig,
  
  // Terraleaf (Forestorm evolution 2) - Simple static sprite
  'terraleaf': {
    url: '/sprites/terraleaf.png',
    frameWidth: 1344,
    frameHeight: 768,
    frameCount: 1, // Single static sprite
    maintainAspectRatio: true, // Prevent stretching
    // Crop to zoom in on character
    cropX: 350,
    cropY: 0,
    cropWidth: 700,
    cropHeight: 768,
  } as SpriteConfig,

  // ========== FIRE STARTER LINE ==========
  
  // Embear (Fire Starter) - Simple static sprite
  'embear': {
    url: '/sprites/embear.png',
    frameWidth: 1024,
    frameHeight: 1024,
    frameCount: 1, // Single static sprite
    maintainAspectRatio: true, // Prevent stretching
  } as SpriteConfig,
  
  // Blazeclaw (Embear evolution 1) - Simple static sprite
  'blazeclaw': {
    url: '/sprites/blazeclaw.png',
    frameWidth: 1024,
    frameHeight: 1024,
    frameCount: 1, // Single static sprite
    maintainAspectRatio: true, // Prevent stretching
  } as SpriteConfig,
  
  // Infernotitan (Blazeclaw evolution 2) - Simple static sprite
  'infernotitan': {
    url: '/sprites/infernotitan.png',
    frameWidth: 1024,
    frameHeight: 1024,
    frameCount: 1, // Single static sprite
    maintainAspectRatio: true, // Prevent stretching
  } as SpriteConfig,

  // ========== WATER STARTER LINE ==========
  
  // Aquarius (Water Starter) - Simple static sprite
  'aquarius': {
    url: '/sprites/aquarius.png',
    frameWidth: 1024,
    frameHeight: 1024,
    frameCount: 1, // Single static sprite
    maintainAspectRatio: true, // Prevent stretching
  } as SpriteConfig,
  
  // Torrentseal (Aquarius evolution 1) - Simple static sprite
  'torrentseal': {
    url: '/sprites/torrentseal.png',
    frameWidth: 1024,
    frameHeight: 1024,
    frameCount: 1, // Single static sprite
    maintainAspectRatio: true, // Prevent stretching
  } as SpriteConfig,
  
  // Hydroknight (Torrentseal evolution 2) - Simple static sprite
  'hydroknight': {
    url: '/sprites/hydroknight.png',
    frameWidth: 1024,
    frameHeight: 1024,
    frameCount: 1, // Single static sprite
    maintainAspectRatio: true, // Prevent stretching
  } as SpriteConfig,

  // ========== WILD POKEMON ==========
  
  // Grassling (Wild Grass type) - Simple static sprite
  'grassling': {
    url: '/sprites/grassling.png',
    frameWidth: 2048,
    frameHeight: 2048,
    frameCount: 1, // Single static sprite
    maintainAspectRatio: true, // Prevent stretching
    // Crop to zoom in on character (2048x2048 source)
    cropX: 400,
    cropY: 200,
    cropWidth: 1300,
    cropHeight: 1700,
  } as SpriteConfig,
  
  // Flamepup (Wild Fire type) - Simple static sprite
  'flamepup': {
    url: '/sprites/flamepup.png',
    frameWidth: 2048,
    frameHeight: 2048,
    frameCount: 1, // Single static sprite
    maintainAspectRatio: true, // Prevent stretching
    // Crop to zoom in on character (2048x2048 source)
    cropX: 400,
    cropY: 200,
    cropWidth: 1300,
    cropHeight: 1700,
  } as SpriteConfig,
  
  // Aquakid (Wild Water type) - Simple static sprite
  'aquakid': {
    url: '/sprites/aquakid.png',
    frameWidth: 1024,
    frameHeight: 1024,
    frameCount: 1, // Single static sprite
    maintainAspectRatio: true, // Prevent stretching
  } as SpriteConfig,

  // ========== WILD POKEMON WITH EVOLUTIONS ==========
  
  // Sparkrat (Wild Electric type) - Simple static sprite
  'sparkrat': {
    url: '/sprites/sparkrat.png',
    frameWidth: 2048,
    frameHeight: 2048,
    frameCount: 1, // Single static sprite
    maintainAspectRatio: true, // Prevent stretching
    // Crop to zoom in on character (2048x2048 source)
    cropX: 400,
    cropY: 200,
    cropWidth: 1300,
    cropHeight: 1700,
  } as SpriteConfig,
  
  // Voltrodent (Sparkrat evolution) - Simple static sprite
  'voltrodent': {
    url: '/sprites/voltrodent.png',
    frameWidth: 1024,
    frameHeight: 1024,
    frameCount: 1, // Single static sprite
    maintainAspectRatio: true, // Prevent stretching
  } as SpriteConfig,
  
  // Rockbite (Wild Rock/Ground type) - Simple static sprite
  'rockbite': {
    url: '/sprites/rockbite.png',
    frameWidth: 2048,
    frameHeight: 2048,
    frameCount: 1, // Single static sprite
    maintainAspectRatio: true, // Prevent stretching
    // Crop to zoom in on character (2048x2048 source)
    cropX: 400,
    cropY: 200,
    cropWidth: 1300,
    cropHeight: 1700,
  } as SpriteConfig,
  
  // Boulderjaw (Rockbite evolution) - Simple static sprite
  'boulderjaw': {
    url: '/sprites/boulderjaw.png',
    frameWidth: 1024,
    frameHeight: 1024,
    frameCount: 1, // Single static sprite
    maintainAspectRatio: true, // Prevent stretching
  } as SpriteConfig,
  
  // Fluttermoth (Wild Bug/Flying type) - Simple static sprite
  'fluttermoth': {
    url: '/sprites/fluttermoth.png',
    frameWidth: 1024,
    frameHeight: 1024,
    frameCount: 1, // Single static sprite
    maintainAspectRatio: true, // Prevent stretching
  } as SpriteConfig,
  
  // Celestialwing (Fluttermoth evolution) - Simple static sprite
  'celestialwing': {
    url: '/sprites/celestialwing.png',
    frameWidth: 1024,
    frameHeight: 1024,
    frameCount: 1, // Single static sprite
    maintainAspectRatio: true, // Prevent stretching
  } as SpriteConfig,
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
