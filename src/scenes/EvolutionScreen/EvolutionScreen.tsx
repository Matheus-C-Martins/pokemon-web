import { useState, useEffect } from 'react'
import { Pokemon } from '@/types/game.types'
import AnimatedSprite from '@/components/Sprite/AnimatedSprite'
import './EvolutionScreen.css'

interface EvolutionScreenProps {
  pokemon: Pokemon
  onComplete: (evolved: boolean) => void
}

const EvolutionScreen = ({ pokemon, onComplete }: EvolutionScreenProps) => {
  const [stage, setStage] = useState<'question' | 'evolving' | 'complete'>('question')
  const [showNewForm, setShowNewForm] = useState(false)

  useEffect(() => {
    if (stage === 'evolving') {
      // Animation sequence
      const timer1 = setTimeout(() => setShowNewForm(true), 2000)
      const timer2 = setTimeout(() => setStage('complete'), 4000)
      
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [stage])

  const handleEvolve = () => {
    setStage('evolving')
  }

  const handleCancel = () => {
    onComplete(false)
  }

  const handleContinue = () => {
    onComplete(true)
  }

  if (!pokemon.evolution) {
    onComplete(false)
    return null
  }

  return (
    <div className="evolution-screen">
      <div className="evolution-content">
        {stage === 'question' && (
          <div className="evolution-question">
            <h2>What?</h2>
            <p className="evolution-text">
              {pokemon.name} is evolving!
            </p>
            <div className="pokemon-preview">
              <AnimatedSprite 
                pokemonName={pokemon.name}
                animation="idle"
                size="huge"
              />
            </div>
            <div className="evolution-buttons">
              <button className="evolution-btn evolve" onClick={handleEvolve}>
                ✨ Let it evolve
              </button>
              <button className="evolution-btn cancel" onClick={handleCancel}>
                ⏸️ Stop evolution
              </button>
            </div>
          </div>
        )}

        {stage === 'evolving' && (
          <div className="evolution-animation">
            <div className={`evolution-sprite ${showNewForm ? 'fade-out' : ''}`}>
              <AnimatedSprite 
                pokemonName={pokemon.name}
                animation="evolving"
                size="huge"
              />
            </div>
            {showNewForm && (
              <div className="evolution-sprite fade-in">
                <AnimatedSprite 
                  pokemonName={pokemon.evolution.evolvesInto}
                  animation="evolving"
                  size="huge"
                />
              </div>
            )}
            <div className="evolution-light"></div>
          </div>
        )}

        {stage === 'complete' && (
          <div className="evolution-complete">
            <h2>Congratulations!</h2>
            <p className="evolution-text">
              {pokemon.name} evolved into {pokemon.evolution.evolvesInto}!
            </p>
            <div className="pokemon-preview">
              <AnimatedSprite 
                pokemonName={pokemon.evolution.evolvesInto}
                animation="idle"
                size="huge"
              />
            </div>
            <button className="evolution-btn continue" onClick={handleContinue}>
              ▶️ Continue
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default EvolutionScreen
