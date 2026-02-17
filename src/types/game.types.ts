// Pokemon Types
export type PokemonType = 
  | 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice'
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' 
  | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy'

export type MoveCategory = 'physical' | 'special' | 'status'

export interface Move {
  id: string
  name: string
  type: PokemonType
  category: MoveCategory
  power: number
  accuracy: number
  pp: number
  maxPP: number
  description: string
}

export interface PokemonStats {
  hp: number
  maxHp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}

export interface Evolution {
  evolvesInto: string
  level: number
  sprite: string
  types: PokemonType[]
}

export interface Pokemon {
  id: string
  name: string
  types: PokemonType[]
  level: number
  stats: PokemonStats
  moves: Move[]
  experience: number
  experienceToNextLevel: number
  status?: 'normal' | 'poisoned' | 'burned' | 'paralyzed' | 'asleep' | 'frozen'
  sprite: string
  isWild?: boolean
  evolution?: Evolution
}

// Item Types
export type ItemType = 'pokeball' | 'potion' | 'key'

export interface Item {
  id: string
  name: string
  type: ItemType
  description: string
  quantity: number
}

// Player Data
export interface Player {
  name: string
  x: number
  y: number
  direction: 'up' | 'down' | 'left' | 'right'
  sprite: string
  money: number
}

export interface GameProgress {
  badges: number
  pokemonSeen: string[]
  pokemonCaught: string[]
  storyFlags: Record<string, boolean>
}

// Battle State
export interface BattleState {
  playerPokemon: Pokemon
  enemyPokemon: Pokemon
  turn: 'player' | 'enemy'
  battleLog: string[]
  isWildBattle: boolean
  canEscape: boolean
}

// Scene Types
export type SceneType = 'title' | 'starterSelection' | 'overworld' | 'battle' | 'evolution' | 'menu' | 'pokemonMenu' | 'bagMenu'

export interface Scene {
  type: SceneType
  onEnter?: () => void
  onExit?: () => void
}

// Game State
export interface GameState {
  currentScene: SceneType
  player: Player
  party: Pokemon[]
  boxPokemon: Pokemon[]
  inventory: Item[]
  progress: GameProgress
  battle?: BattleState
}

// Save Data
export interface SaveData {
  version: string
  timestamp: number
  gameState: GameState
}
