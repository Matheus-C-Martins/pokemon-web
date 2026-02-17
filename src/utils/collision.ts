import { MapData, TILE_CONFIG } from '@/types/map.types'

export function canMoveTo(map: MapData, x: number, y: number): boolean {
  // Check bounds
  if (x < 0 || x >= map.width || y < 0 || y >= map.height) {
    return false
  }

  // Check if tile is walkable
  const tileType = map.tiles[y][x]
  const tile = TILE_CONFIG[tileType]
  
  return tile.walkable
}

export function checkEncounter(map: MapData, x: number, y: number): boolean {
  const tileType = map.tiles[y][x]
  const tile = TILE_CONFIG[tileType]
  
  if (!tile.encounterRate) return false
  
  // Random encounter check
  return Math.random() < tile.encounterRate
}

export function getTileAt(map: MapData, x: number, y: number) {
  if (x < 0 || x >= map.width || y < 0 || y >= map.height) {
    return null
  }
  
  const tileType = map.tiles[y][x]
  return TILE_CONFIG[tileType]
}
