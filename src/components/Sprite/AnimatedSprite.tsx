import { useEffect, useRef, useState } from 'react'
import { getPokemonSprite } from '@/data/sprites'
import { isSpriteConfig, isEmojiSprite } from '@/types/sprite.types'
import type { SpriteAnimation } from '@/types/sprite.types'
import './AnimatedSprite.css'

interface AnimatedSpriteProps {
  pokemonName: string
  animation?: SpriteAnimation
  size?: 'small' | 'medium' | 'large' | 'huge'
  className?: string
}

const AnimatedSprite = ({ 
  pokemonName, 
  animation = 'idle',
  size = 'medium',
  className = ''
}: AnimatedSpriteProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [imageError, setImageError] = useState(false)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const animationFrameRef = useRef<number>()
  const lastFrameTimeRef = useRef<number>(0)

  const sprite = getPokemonSprite(pokemonName)
  const isAnimated = isSpriteConfig(sprite)
  const isStatic = isAnimated && sprite.frameCount === 1

  useEffect(() => {
    if (!isAnimated || !canvasRef.current) return

    const config = sprite
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Load sprite sheet
    if (!imageRef.current) {
      const img = new Image()
      img.onload = () => {
        imageRef.current = img
        setImageError(false)
      }
      img.onerror = () => {
        console.error(`Failed to load sprite: ${config.url}`)
        setImageError(true)
      }
      // Prepend base URL for correct path resolution in dev and production
      const baseUrl = (import.meta as any).env.BASE_URL as string
      const spriteUrl = config.url.startsWith('/') 
        ? baseUrl.replace(/\/$/, '') + config.url 
        : config.url
      img.src = spriteUrl
      imageRef.current = img
    }

    // For static sprites (single frame), just draw once when image loads
    if (isStatic) {
      const drawStatic = () => {
        if (!imageRef.current?.complete) {
          requestAnimationFrame(drawStatic)
          return
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.imageSmoothingEnabled = false // Pixel art - no smoothing
        
        // Use crop settings if provided, otherwise use full frame
        const srcX = config.cropX ?? 0
        const srcY = config.cropY ?? 0
        const srcWidth = config.cropWidth ?? config.frameWidth
        const srcHeight = config.cropHeight ?? config.frameHeight
        
        if (config.maintainAspectRatio) {
          // Calculate aspect-ratio-preserving dimensions
          const imgAspect = srcWidth / srcHeight
          const canvasAspect = canvas.width / canvas.height
          
          let drawWidth, drawHeight, offsetX, offsetY
          
          if (imgAspect > canvasAspect) {
            // Image is wider - fit to width
            drawWidth = canvas.width
            drawHeight = canvas.width / imgAspect
            offsetX = 0
            offsetY = (canvas.height - drawHeight) / 2
          } else {
            // Image is taller - fit to height
            drawHeight = canvas.height
            drawWidth = canvas.height * imgAspect
            offsetX = (canvas.width - drawWidth) / 2
            offsetY = 0
          }
          
          ctx.drawImage(
            imageRef.current,
            srcX, srcY,
            srcWidth, srcHeight,
            offsetX, offsetY,
            drawWidth, drawHeight
          )
        } else {
          // Stretch to fill canvas
          ctx.drawImage(
            imageRef.current,
            srcX, srcY,
            srcWidth, srcHeight,
            0, 0,
            canvas.width, canvas.height
          )
        }
      }
      drawStatic()
      return
    }

    // Animation configuration for multi-frame sprites
    const fps = config.fps || 8
    const frameDuration = 1000 / fps
    
    // Get animation frames for current state
    const animConfig = config.animations?.[animation]
    const startFrame = animConfig?.startFrame || 0
    const frameCount = animConfig?.frameCount || config.frameCount
    const loop = config.loop !== false

    // Animation loop
    const animate = (timestamp: number) => {
      if (!imageRef.current?.complete) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      // Update frame based on time
      if (timestamp - lastFrameTimeRef.current >= frameDuration) {
        setCurrentFrame((prev: number) => {
          const nextFrame = prev + 1
          if (nextFrame >= frameCount) {
            return loop ? 0 : frameCount - 1
          }
          return nextFrame
        })
        lastFrameTimeRef.current = timestamp
      }

      // Draw current frame
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const actualFrame = startFrame + currentFrame
      const sx = (actualFrame * config.frameWidth) % imageRef.current.width
      const sy = Math.floor((actualFrame * config.frameWidth) / imageRef.current.width) * config.frameHeight

      // Use crop settings if provided (for animated sprites with crops)
      const srcX = sx + (config.cropX ?? 0)
      const srcY = sy + (config.cropY ?? 0)
      const srcWidth = config.cropWidth ?? config.frameWidth
      const srcHeight = config.cropHeight ?? config.frameHeight

      ctx.imageSmoothingEnabled = false // Pixel art - no smoothing
      
      if (config.maintainAspectRatio) {
        // Calculate aspect-ratio-preserving dimensions
        const imgAspect = srcWidth / srcHeight
        const canvasAspect = canvas.width / canvas.height
        
        let drawWidth, drawHeight, offsetX, offsetY
        
        if (imgAspect > canvasAspect) {
          // Image is wider - fit to width
          drawWidth = canvas.width
          drawHeight = canvas.width / imgAspect
          offsetX = 0
          offsetY = (canvas.height - drawHeight) / 2
        } else {
          // Image is taller - fit to height
          drawHeight = canvas.height
          drawWidth = canvas.height * imgAspect
          offsetX = (canvas.width - drawWidth) / 2
          offsetY = 0
        }
        
        ctx.drawImage(
          imageRef.current,
          srcX, srcY,
          srcWidth, srcHeight,
          offsetX, offsetY,
          drawWidth, drawHeight
        )
      } else {
        // Stretch to fill canvas
        ctx.drawImage(
          imageRef.current,
          srcX, srcY,
          srcWidth, srcHeight,
          0, 0,
          canvas.width, canvas.height
        )
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isAnimated, isStatic, sprite, animation, currentFrame])

  // Reset frame when animation changes
  useEffect(() => {
    setCurrentFrame(0)
    lastFrameTimeRef.current = 0
  }, [animation])

  if (!isAnimated || imageError) {
    // Fallback to emoji or string
    let fallback: string
    if (imageError) {
      fallback = '❓'
    } else if (isEmojiSprite(sprite)) {
      fallback = sprite.emoji
    } else if (typeof sprite === 'string') {
      fallback = sprite
    } else {
      fallback = '❓'
    }
    return <span className={`sprite-emoji sprite-${size} ${className}`}>{fallback}</span>
  }

  // Render animated sprite
  const sizeMap = { small: 32, medium: 64, large: 96, huge: 128 }
  const canvasSize = sizeMap[size]

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      className={`sprite-canvas sprite-${size} ${className}`}
    />
  )
}

export default AnimatedSprite
