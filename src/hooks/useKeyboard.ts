import { useEffect, useCallback, useRef } from 'react'

interface KeyState {
  [key: string]: boolean
}

export function useKeyboard(onKeyPress: (key: string) => void) {
  const keysPressed = useRef<KeyState>({})
  const lastPressTime = useRef<number>(0)
  const PRESS_COOLDOWN = 200 // ms between movements

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.key
    const now = Date.now()

    // Movement keys with cooldown
    const movementKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd']
    
    if (movementKeys.includes(key)) {
      event.preventDefault()
      
      // Cooldown to prevent too rapid movement
      if (now - lastPressTime.current < PRESS_COOLDOWN) {
        return
      }

      if (!keysPressed.current[key]) {
        keysPressed.current[key] = true
        lastPressTime.current = now
        onKeyPress(key)
      }
    } 
    // Other keys (ESC, H, etc.) without cooldown
    else if (['Escape', 'h', 'H'].includes(key)) {
      if (!keysPressed.current[key]) {
        keysPressed.current[key] = true
        onKeyPress(key)
      }
    }
  }, [onKeyPress])

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    keysPressed.current[event.key] = false
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])
}
