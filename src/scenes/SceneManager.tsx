import { useGame } from '@/state/GameContext'
import TitleScreen from './TitleScreen/TitleScreen'
import OverworldScreen from './OverworldScreen/OverworldScreen'
import BattleScreen from './BattleScreen/BattleScreen'

const SceneManager = () => {
  const { state } = useGame()

  switch (state.currentScene) {
    case 'title':
      return <TitleScreen />
    case 'overworld':
      return <OverworldScreen />
    case 'battle':
      return <BattleScreen />
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
