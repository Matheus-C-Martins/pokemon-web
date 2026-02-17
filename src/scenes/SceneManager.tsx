import { useGame } from '@/state/GameContext'
import TitleScreen from './TitleScreen/TitleScreen'
import OverworldScreen from './OverworldScreen/OverworldScreen'
import BattleScreen from './BattleScreen/BattleScreen'
import EvolutionScreen from './EvolutionScreen/EvolutionScreen'

const SceneManager = () => {
  const { state } = useGame()

  switch (state.currentScene) {
    case 'title':
      return <TitleScreen />
    case 'overworld':
      return <OverworldScreen />
    case 'battle':
      return <BattleScreen />
    case 'evolution':
      // EvolutionScreen will be triggered from battle, needs props passed via state
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
