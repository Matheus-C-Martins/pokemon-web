// Sprite animation states
export type SpriteAnimation = 'idle' | 'battle' | 'evolving' | 'fainted'

// Sprite configuration for both static and animated sprites
// Static sprite example: { url: '/path.png', frameWidth: 128, frameHeight: 128, frameCount: 1 }
// Animated sprite example: { url: '/path.png', frameWidth: 64, frameHeight: 64, frameCount: 8, animations: {...} }
export interface SpriteConfig {
  // URL to sprite sheet or single sprite image
  url: string
  
  // Frame configuration
  frameWidth: number   // Width of a single frame or entire sprite
  frameHeight: number  // Height of a single frame or entire sprite
  frameCount: number   // Total number of frames (1 for static sprites)
  
  // Animation settings (optional - only needed for animated sprites)
  fps?: number // Frames per second (default: 8)
  loop?: boolean // Loop animation (default: true)
  maintainAspectRatio?: boolean // Maintain aspect ratio instead of stretching (default: false)
  
  // Different animations for different states (optional - only for animated sprites)
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
