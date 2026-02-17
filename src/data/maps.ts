import { MapData, TileType } from '@/types/map.types'

// Starting town map
export const STARTER_TOWN: MapData = {
  name: 'Starter Town',
  width: 20,
  height: 15,
  spawnX: 10,
  spawnY: 12,
  tiles: [
    // Row 0
    ['tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree'],
    // Row 1
    ['tree', 'grass', 'grass', 'grass', 'grass', 'tree', 'tree', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'tree', 'tree', 'grass', 'grass', 'grass', 'grass', 'tree'],
    // Row 2
    ['tree', 'grass', 'flower', 'grass', 'grass', 'tree', 'tree', 'grass', 'building', 'building', 'building', 'grass', 'grass', 'tree', 'tree', 'grass', 'flower', 'grass', 'grass', 'tree'],
    // Row 3
    ['tree', 'grass', 'grass', 'path', 'path', 'path', 'path', 'path', 'door', 'building', 'building', 'grass', 'grass', 'tree', 'tree', 'grass', 'grass', 'grass', 'grass', 'tree'],
    // Row 4
    ['tree', 'grass', 'grass', 'path', 'grass', 'grass', 'grass', 'path', 'building', 'building', 'building', 'grass', 'grass', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree'],
    // Row 5
    ['tree', 'tree', 'tree', 'path', 'grass', 'grass', 'grass', 'path', 'path', 'path', 'path', 'path', 'path', 'path', 'path', 'path', 'tree', 'tree', 'tree', 'tree'],
    // Row 6
    ['tree', 'water', 'water', 'path', 'grass', 'sign', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'path', 'tree', 'water', 'water', 'tree'],
    // Row 7
    ['tree', 'water', 'water', 'path', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'path', 'tree', 'water', 'water', 'tree'],
    // Row 8
    ['tree', 'water', 'water', 'path', 'path', 'path', 'path', 'grass', 'grass', 'grass', 'grass', 'grass', 'path', 'path', 'path', 'path', 'tree', 'water', 'water', 'tree'],
    // Row 9
    ['tree', 'tree', 'tree', 'tree', 'grass', 'grass', 'path', 'grass', 'grass', 'grass', 'grass', 'grass', 'path', 'grass', 'grass', 'tree', 'tree', 'tree', 'tree', 'tree'],
    // Row 10
    ['tree', 'grass', 'grass', 'grass', 'grass', 'grass', 'path', 'grass', 'grass', 'grass', 'grass', 'grass', 'path', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'tree'],
    // Row 11
    ['tree', 'grass', 'grass', 'grass', 'grass', 'grass', 'path', 'grass', 'grass', 'grass', 'grass', 'grass', 'path', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'tree'],
    // Row 12
    ['tree', 'flower', 'grass', 'grass', 'grass', 'grass', 'path', 'path', 'path', 'path', 'path', 'path', 'path', 'grass', 'grass', 'grass', 'grass', 'grass', 'flower', 'tree'],
    // Row 13
    ['tree', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'tree'],
    // Row 14
    ['tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree', 'tree'],
  ] as TileType[][],
}

export const MAPS: Record<string, MapData> = {
  starterTown: STARTER_TOWN,
}
