import { useEffect, useRef, useState } from 'react'
import { getPokemonSprite } from '@/data/sprites'
import { isSpriteConfig, SpriteAnimation } from '@/types/sprite.types'
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
  const imageRef = useRef<HTMLImageElement | null>(null)
  const animationFrameRef = useRef<number>()
  const lastFrameTimeRef = useRef<number>(0)

  const sprite = getPokemonSprite(pokemonName)
  const isAnimated = isSpriteConfig(sprite)

  useEffect(() => {
    if (!isAnimated || !canvasRef.current) return

    const config = sprite
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Load sprite sheet
    if (!imageRef.current) {
      const img = new Image()
      img.src = config.url
      img.onload = () => {
        imageRef.current = img
      }
      imageRef.current = img
    }

    // Animation configuration
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

      ctx.imageSmoothingEnabled = false // Pixel art - no smoothing
      ctx.drawImage(
        imageRef.current,
        sx, sy,
        config.frameWidth, config.frameHeight,
        0, 0,
        canvas.width, canvas.height
      )

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isAnimated, sprite, animation, currentFrame])

  // Reset frame when animation changes
  useEffect(() => {
    setCurrentFrame(0)
    lastFrameTimeRef.current = 0
  }, [animation])

  if (!isAnimated) {
    // Fallback to emoji or string
    const spriteContent = typeof sprite === 'object' && 'emoji' in sprite ? sprite.emoji : sprite
    return <span className={`sprite-emoji sprite-${size} ${className}`}>{spriteContent}</span>
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
