import { MapData, TILE_CONFIG } from '@/types/map.types'
import './MapRenderer.css'

interface MapRendererProps {
  map: MapData
  playerX: number
  playerY: number
  playerDirection: 'up' | 'down' | 'left' | 'right'
}

const TILE_SIZE = 32
const VIEWPORT_WIDTH = 15
const VIEWPORT_HEIGHT = 11

const MapRenderer = ({ map, playerX, playerY, playerDirection }: MapRendererProps) => {
  // Calculate camera position (centered on player)
  const cameraX = Math.max(0, Math.min(playerX - Math.floor(VIEWPORT_WIDTH / 2), map.width - VIEWPORT_WIDTH))
  const cameraY = Math.max(0, Math.min(playerY - Math.floor(VIEWPORT_HEIGHT / 2), map.height - VIEWPORT_HEIGHT))

  const directionSymbols = {
    up: '▲',
    down: '▼',
    left: '◀',
    right: '▶',
  }

  return (
    <div className="map-container">
      <div className="map-header">
        <h3>{map.name}</h3>
        <div className="controls-hint">Use Arrow Keys or WASD to move</div>
      </div>
      <div className="map-viewport">
        {Array.from({ length: VIEWPORT_HEIGHT }).map((_, viewY) => {
          const worldY = cameraY + viewY
          if (worldY >= map.height) return null

          return (
            <div key={viewY} className="map-row">
              {Array.from({ length: VIEWPORT_WIDTH }).map((_, viewX) => {
                const worldX = cameraX + viewX
                if (worldX >= map.width) return null

                const tileType = map.tiles[worldY][worldX]
                const tile = TILE_CONFIG[tileType]
                const isPlayer = worldX === playerX && worldY === playerY

                return (
                  <div
                    key={`${worldX}-${worldY}`}
                    className={`map-tile ${isPlayer ? 'player-tile' : ''}`}
                    style={{
                      backgroundColor: tile.color,
                      width: TILE_SIZE,
                      height: TILE_SIZE,
                    }}
                  >
                    {isPlayer ? (
                      <span className="player-sprite">{directionSymbols[playerDirection]}</span>
                    ) : (
                      <span className="tile-symbol">{tile.symbol}</span>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <div className="map-footer">
        <span>Position: ({playerX}, {playerY})</span>
      </div>
    </div>
  )
}

export default MapRenderer
