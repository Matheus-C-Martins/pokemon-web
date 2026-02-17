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

    // Arrow keys for movement
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(key)) {
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
