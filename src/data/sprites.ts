import { SpriteConfig, PokemonSprite } from '@/types/sprite.types'

// Sprite registry for all Pokemon
// Add your custom sprites here!
export const POKEMON_SPRITES: Record<string, PokemonSprite> = {
  // ===== STARTER POKEMON =====
  
  // Leafeon (Grass Starter) - Custom sprite with animations
  'leafeon': {
    url: '/pokemon-web/sprites/leafeon.png', // GitHub Pages base path
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
    url: '/pokemon-web/sprites/forestorm.png', // GitHub Pages base path
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
    url: '/pokemon-web/sprites/terraleaf.png', // GitHub Pages base path
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

  // ========== FIRE STARTER LINE ==========
  
  // Embear (Fire Starter) - Needs sprite!
  'embear': {
    url: '/pokemon-web/sprites/embear.png',
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
    url: '/pokemon-web/sprites/blazeclaw.png',
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
    url: '/pokemon-web/sprites/infernotitan.png',
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
    url: '/pokemon-web/sprites/aquarius.png',
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
    url: '/pokemon-web/sprites/torrentseal.png',
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
    url: '/pokemon-web/sprites/hydroknight.png',
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
    url: '/pokemon-web/sprites/grassling.png',
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
    url: '/pokemon-web/sprites/flamepup.png',
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
    url: '/pokemon-web/sprites/aquakid.png',
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
    url: '/pokemon-web/sprites/sparkrat.png',
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
    url: '/pokemon-web/sprites/voltrodent.png',
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
    url: '/pokemon-web/sprites/rockbite.png',
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
    url: '/pokemon-web/sprites/boulderjaw.png',
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
    url: '/pokemon-web/sprites/fluttermoth.png',
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
    url: '/pokemon-web/sprites/celestialwing.png',
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
