import { useGame } from '@/state/GameContext'
import TitleScreen from './TitleScreen/TitleScreen'
import StarterSelectionScreen from './StarterSelectionScreen/StarterSelectionScreen'
import OverworldScreen from './OverworldScreen/OverworldScreen'
import BattleScreen from './BattleScreen/BattleScreen'

const SceneManager = () => {
  const { state } = useGame()

  switch (state.currentScene) {
    case 'title':
      return <TitleScreen />
    case 'starterSelection':
      return <StarterSelectionScreen />
    case 'overworld':
      return <OverworldScreen />
    case 'battle':
      return <BattleScreen />
    case 'evolution':
      // EvolutionScreen is rendered as overlay from BattleScreen
      return <OverworldScreen />
    case 'menu':
    case 'pokemonMenu':
    case 'bagMenu':
      // Placeholder for future menu screens
      return <OverworldScreen />
    default:
      return <TitleScreen />
  }
}

export default SceneManager
