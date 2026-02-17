export type TileType = 
  | 'grass' 
  | 'water' 
  | 'path' 
  | 'tree' 
  | 'building' 
  | 'door'
  | 'sign'
  | 'flower'

export interface Tile {
  type: TileType
  walkable: boolean
  encounterRate?: number // 0-1, chance of wild encounter
  color: string
  symbol?: string
}

export interface MapData {
  width: number
  height: number
  tiles: TileType[][]
  name: string
  spawnX: number
  spawnY: number
}

export const TILE_CONFIG: Record<TileType, Tile> = {
  grass: {
    type: 'grass',
    walkable: true,
    encounterRate: 0.15,
    color: '#4a9d5f',
    symbol: '.',
  },
  water: {
    type: 'water',
    walkable: false,
    color: '#4a9dcf',
    symbol: '~',
  },
  path: {
    type: 'path',
    walkable: true,
    color: '#8b7355',
    symbol: ' ',
  },
  tree: {
    type: 'tree',
    walkable: false,
    color: '#2d5016',
    symbol: '♣',
  },
  building: {
    type: 'building',
    walkable: false,
    color: '#7a5c47',
    symbol: '■',
  },
  door: {
    type: 'door',
    walkable: true,
    color: '#5a3c27',
    symbol: '▪',
  },
  sign: {
    type: 'sign',
    walkable: false,
    color: '#8b7355',
    symbol: '!',
  },
  flower: {
    type: 'flower',
    walkable: true,
    color: '#ff69b4',
    symbol: '✿',
  },
}
