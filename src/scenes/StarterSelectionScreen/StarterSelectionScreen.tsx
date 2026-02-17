import { useState } from 'react'
import { useGame } from '@/state/GameContext'
import { createStarterPokemon } from '@/data/pokemon'
import AnimatedSprite from '@/components/Sprite/AnimatedSprite'
import './StarterSelectionScreen.css'

type StarterType = 'grass' | 'fire' | 'water'

interface StarterInfo {
  type: StarterType
  name: string
  description: string
  types: string[]
}

const STARTERS: StarterInfo[] = [
  {
    type: 'grass',
    name: 'Leafeon',
    description: 'A plant Pokemon with sharp leaves. It can blend into foliage.',
    types: ['Grass']
  },
  {
    type: 'fire',
    name: 'Embear',
    description: 'A fiery bear cub with flames on its ears. It radiates warmth.',
    types: ['Fire']
  },
  {
    type: 'water',
    name: 'Aquarius',
    description: 'A playful water creature with bubbles. It loves to swim.',
    types: ['Water']
  }
]

const StarterSelectionScreen = () => {
  const { actions } = useGame()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isConfirming, setIsConfirming] = useState(false)

  const selectedStarter = STARTERS[selectedIndex]

  const handleSelect = (index: number) => {
    setSelectedIndex(index)
    setIsConfirming(false)
  }

  const handleConfirm = () => {
    if (!isConfirming) {
      setIsConfirming(true)
      return
    }

    // Create the selected starter Pokemon and add to party
    const starter = createStarterPokemon(selectedStarter.name, selectedStarter.type)
    actions.addPokemon(starter)
    actions.changeScene('overworld')
  }

  const handleBack = () => {
    if (isConfirming) {
      setIsConfirming(false)
    } else {
      actions.changeScene('title')
    }
  }

  return (
    <div className="starter-selection-screen">
      <div className="starter-content">
        <h1 className="starter-title">Choose Your Starter Pokemon!</h1>
        <p className="starter-subtitle">This Pokemon will be your partner throughout your journey</p>

        <div className="starters-grid">
          {STARTERS.map((starter, index) => (
            <div
              key={starter.type}
              className={`starter-card ${selectedIndex === index ? 'selected' : ''}`}
              onClick={() => handleSelect(index)}
            >
              <div className="starter-sprite">
                <AnimatedSprite
                  pokemonName={starter.name}
                  animation="idle"
                  size="huge"
                />
              </div>
              <h2 className="starter-name">{starter.name}</h2>
              <div className="starter-types">
                {starter.types.map(type => (
                  <span key={type} className={`type-badge ${type.toLowerCase()}`}>
                    {type}
                  </span>
                ))}
              </div>
              <p className="starter-description">{starter.description}</p>
            </div>
          ))}
        </div>

        <div className="starter-actions">
          {!isConfirming ? (
            <>
              <button className="starter-button confirm" onClick={handleConfirm}>
                Choose {selectedStarter.name}
              </button>
              <button className="starter-button cancel" onClick={handleBack}>
                Back
              </button>
            </>
          ) : (
            <div className="confirmation-box">
              <p className="confirmation-text">
                Are you sure you want to choose {selectedStarter.name}?
              </p>
              <div className="confirmation-actions">
                <button className="starter-button confirm" onClick={handleConfirm}>
                  Yes, I'm sure!
                </button>
                <button className="starter-button cancel" onClick={handleBack}>
                  No, let me reconsider
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StarterSelectionScreen
