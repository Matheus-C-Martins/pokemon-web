// Sprite animation states
export type SpriteAnimation = 'idle' | 'battle' | 'evolving' | 'fainted'

// Sprite configuration for animated sprites
export interface SpriteConfig {
  // URL to sprite sheet or single sprite
  url: string
  
  // Frame configuration
  frameWidth: number
  frameHeight: number
  frameCount: number
  
  // Animation settings
  fps?: number // Frames per second (default: 8)
  loop?: boolean // Loop animation (default: true)
  
  // Different animations for different states
  animations?: {
    idle?: { startFrame: number; frameCount: number }
    battle?: { startFrame: number; frameCount: number }
    evolving?: { startFrame: number; frameCount: number }
    fainted?: { startFrame: number; frameCount: number }
  }
}

// Fallback to emoji if no sprite available
export interface EmojiSprite {
  emoji: string
}

export type PokemonSprite = SpriteConfig | EmojiSprite | string

// Type guard
export function isSpriteConfig(sprite: PokemonSprite): sprite is SpriteConfig {
  return typeof sprite === 'object' && 'url' in sprite
}

export function isEmojiSprite(sprite: PokemonSprite): sprite is EmojiSprite {
  return typeof sprite === 'object' && 'emoji' in sprite
}

export function isStringSprite(sprite: PokemonSprite): sprite is string {
  return typeof sprite === 'string'
}
