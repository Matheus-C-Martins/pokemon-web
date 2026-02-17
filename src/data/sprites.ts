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
  } as SpriteConfig,
  
  // Forestorm (Leafeon evolution 1) - Simple static sprite
  'forestorm': {
    url: '/sprites/forestorm.png',
    frameWidth: 1344,
    frameHeight: 768,
    frameCount: 1, // Single static sprite
    maintainAspectRatio: true, // Prevent stretching
  } as SpriteConfig,
  
  // Terraleaf (Forestorm evolution 2) - Simple static sprite
  'terraleaf': {
    url: '/sprites/terraleaf.png',
    frameWidth: 1344,
    frameHeight: 768,
    frameCount: 1, // Single static sprite
    maintainAspectRatio: true, // Prevent stretching
  } as SpriteConfig,

  // ========== FIRE STARTER LINE ==========
  
  // Embear (Fire Starter) - Needs sprite!
  'embear': {
    url: '/sprites/embear.png',
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 8,
    fps: 8,
    loop: true,
    animations: {
      idle: { startFrame: 0, frameCount: 4 },
      battle: { startFrame: 4, frameCount: 3 },
      evolving: { startFrame: 7, frameCount: 1 },
    }
  } as SpriteConfig,
  
  // Blazeclaw (Embear evolution 1) - Needs sprite!
  'blazeclaw': {
    url: '/sprites/blazeclaw.png',
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 8,
    fps: 8,
    loop: true,
    animations: {
      idle: { startFrame: 0, frameCount: 4 },
      battle: { startFrame: 4, frameCount: 3 },
      evolving: { startFrame: 7, frameCount: 1 },
    }
  } as SpriteConfig,
  
  // Infernotitan (Blazeclaw evolution 2) - Needs sprite!
  'infernotitan': {
    url: '/sprites/infernotitan.png',
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 8,
    fps: 8,
    loop: true,
    animations: {
      idle: { startFrame: 0, frameCount: 4 },
      battle: { startFrame: 4, frameCount: 3 },
      fainted: { startFrame: 7, frameCount: 1 },
    }
  } as SpriteConfig,

  // ========== WATER STARTER LINE ==========
  
  // Aquarius (Water Starter) - Needs sprite!
  'aquarius': {
    url: '/sprites/aquarius.png',
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 8,
    fps: 8,
    loop: true,
    animations: {
      idle: { startFrame: 0, frameCount: 4 },
      battle: { startFrame: 4, frameCount: 3 },
      evolving: { startFrame: 7, frameCount: 1 },
    }
  } as SpriteConfig,
  
  // Torrentseal (Aquarius evolution 1) - Needs sprite!
  'torrentseal': {
    url: '/sprites/torrentseal.png',
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 8,
    fps: 8,
    loop: true,
    animations: {
      idle: { startFrame: 0, frameCount: 4 },
      battle: { startFrame: 4, frameCount: 3 },
      evolving: { startFrame: 7, frameCount: 1 },
    }
  } as SpriteConfig,
  
  // Hydroknight (Torrentseal evolution 2) - Needs sprite!
  'hydroknight': {
    url: '/sprites/hydroknight.png',
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 8,
    fps: 8,
    loop: true,
    animations: {
      idle: { startFrame: 0, frameCount: 4 },
      battle: { startFrame: 4, frameCount: 3 },
      fainted: { startFrame: 7, frameCount: 1 },
    }
  } as SpriteConfig,

  // ========== WILD POKEMON ==========
  
  // Grassling (Wild Grass type) - Needs sprite!
  'grassling': {
    url: '/sprites/grassling.png',
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 8,
    fps: 8,
    loop: true,
    animations: {
      idle: { startFrame: 0, frameCount: 4 },
      battle: { startFrame: 4, frameCount: 3 },
      fainted: { startFrame: 7, frameCount: 1 },
    }
  } as SpriteConfig,
  
  // Flamepup (Wild Fire type) - Needs sprite!
  'flamepup': {
    url: '/sprites/flamepup.png',
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 8,
    fps: 8,
    loop: true,
    animations: {
      idle: { startFrame: 0, frameCount: 4 },
      battle: { startFrame: 4, frameCount: 3 },
      fainted: { startFrame: 7, frameCount: 1 },
    }
  } as SpriteConfig,
  
  // Aquakid (Wild Water type) - Needs sprite!
  'aquakid': {
    url: '/sprites/aquakid.png',
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 8,
    fps: 8,
    loop: true,
    animations: {
      idle: { startFrame: 0, frameCount: 4 },
      battle: { startFrame: 4, frameCount: 3 },
      fainted: { startFrame: 7, frameCount: 1 },
    }
  } as SpriteConfig,

  // ========== WILD POKEMON WITH EVOLUTIONS ==========
  
  // Sparkrat (Wild Electric type) - Needs sprite!
  'sparkrat': {
    url: '/sprites/sparkrat.png',
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 8,
    fps: 8,
    loop: true,
    animations: {
      idle: { startFrame: 0, frameCount: 4 },
      battle: { startFrame: 4, frameCount: 3 },
      evolving: { startFrame: 7, frameCount: 1 },
    }
  } as SpriteConfig,
  
  // Voltrodent (Sparkrat evolution) - Needs sprite!
  'voltrodent': {
    url: '/sprites/voltrodent.png',
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 8,
    fps: 8,
    loop: true,
    animations: {
      idle: { startFrame: 0, frameCount: 4 },
      battle: { startFrame: 4, frameCount: 3 },
      fainted: { startFrame: 7, frameCount: 1 },
    }
  } as SpriteConfig,
  
  // Rockbite (Wild Rock/Ground type) - Needs sprite!
  'rockbite': {
    url: '/sprites/rockbite.png',
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 8,
    fps: 8,
    loop: true,
    animations: {
      idle: { startFrame: 0, frameCount: 4 },
      battle: { startFrame: 4, frameCount: 3 },
      evolving: { startFrame: 7, frameCount: 1 },
    }
  } as SpriteConfig,
  
  // Boulderjaw (Rockbite evolution) - Needs sprite!
  'boulderjaw': {
    url: '/sprites/boulderjaw.png',
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 8,
    fps: 8,
    loop: true,
    animations: {
      idle: { startFrame: 0, frameCount: 4 },
      battle: { startFrame: 4, frameCount: 3 },
      fainted: { startFrame: 7, frameCount: 1 },
    }
  } as SpriteConfig,
  
  // Fluttermoth (Wild Bug/Flying type) - Needs sprite!
  'fluttermoth': {
    url: '/sprites/fluttermoth.png',
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 8,
    fps: 8,
    loop: true,
    animations: {
      idle: { startFrame: 0, frameCount: 4 },
      battle: { startFrame: 4, frameCount: 3 },
      evolving: { startFrame: 7, frameCount: 1 },
    }
  } as SpriteConfig,
  
  // Celestialwing (Fluttermoth evolution) - Needs sprite!
  'celestialwing': {
    url: '/sprites/celestialwing.png',
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 8,
    fps: 8,
    loop: true,
    animations: {
      idle: { startFrame: 0, frameCount: 4 },
      battle: { startFrame: 4, frameCount: 3 },
      fainted: { startFrame: 7, frameCount: 1 },
    }
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
