import { GameState, Pokemon, SceneType, BattleState } from '@/types/game.types'

export const INITIAL_GAME_STATE: GameState = {
  currentScene: 'title',
  player: {
    name: 'Trainer',
    x: 5,
    y: 5,
    direction: 'down',
    sprite: 'player',
    money: 3000,
  },
  party: [],
  boxPokemon: [],
  inventory: [
    {
      id: 'pokeball',
      name: 'Poke Ball',
      type: 'pokeball',
      description: 'A device for catching wild Pokemon.',
      quantity: 5,
    },
    {
      id: 'potion',
      name: 'Potion',
      type: 'potion',
      description: 'Restores 20 HP to a Pokemon.',
      quantity: 3,
    },
  ],
  progress: {
    badges: 0,
    pokemonSeen: [],
    pokemonCaught: [],
    storyFlags: {},
  },
}

export type GameAction =
  | { type: 'CHANGE_SCENE'; payload: SceneType }
  | { type: 'SET_PLAYER_NAME'; payload: string }
  | { type: 'MOVE_PLAYER'; payload: { x: number; y: number; direction: 'up' | 'down' | 'left' | 'right' } }
  | { type: 'ADD_POKEMON'; payload: Pokemon }
  | { type: 'REMOVE_POKEMON'; payload: string }
  | { type: 'UPDATE_POKEMON'; payload: { id: string; updates: Partial<Pokemon> } }
  | { type: 'REORDER_PARTY'; payload: Pokemon[] }
  | { type: 'ADD_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'START_BATTLE'; payload: BattleState }
  | { type: 'END_BATTLE' }
  | { type: 'UPDATE_BATTLE'; payload: Partial<BattleState> }
  | { type: 'ADD_MONEY'; payload: number }
  | { type: 'REMOVE_MONEY'; payload: number }
  | { type: 'SET_STORY_FLAG'; payload: { flag: string; value: boolean } }
  | { type: 'LOAD_GAME'; payload: GameState }
  | { type: 'RESET_GAME' }

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'CHANGE_SCENE':
      return { ...state, currentScene: action.payload }

    case 'SET_PLAYER_NAME':
      return { ...state, player: { ...state.player, name: action.payload } }

    case 'MOVE_PLAYER':
      return { ...state, player: { ...state.player, ...action.payload } }

    case 'ADD_POKEMON':
      if (state.party.length < 6) {
        return { ...state, party: [...state.party, action.payload] }
      }
      return { ...state, boxPokemon: [...state.boxPokemon, action.payload] }

    case 'REMOVE_POKEMON':
      return {
        ...state,
        party: state.party.filter(p => p.id !== action.payload),
      }

    case 'UPDATE_POKEMON': {
      const updatePokemonInArray = (pokemon: Pokemon[]) =>
        pokemon.map(p =>
          p.id === action.payload.id ? { ...p, ...action.payload.updates } : p
        )
      return {
        ...state,
        party: updatePokemonInArray(state.party),
        boxPokemon: updatePokemonInArray(state.boxPokemon),
      }
    }

    case 'REORDER_PARTY':
      return {
        ...state,
        party: action.payload
      }

    case 'ADD_ITEM': {
      const existingItem = state.inventory.find(i => i.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          inventory: state.inventory.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        }
      }
      return state
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        inventory: state.inventory.map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: Math.max(0, i.quantity - action.payload.quantity) }
            : i
        ).filter(i => i.quantity > 0),
      }
    }

    case 'START_BATTLE':
      return { ...state, battle: action.payload, currentScene: 'battle' }

    case 'END_BATTLE':
      return { ...state, battle: undefined, currentScene: 'overworld' }

    case 'UPDATE_BATTLE':
      if (!state.battle) return state
      return { ...state, battle: { ...state.battle, ...action.payload } }

    case 'ADD_MONEY':
      return { ...state, player: { ...state.player, money: state.player.money + action.payload } }

    case 'REMOVE_MONEY':
      return {
        ...state,
        player: { ...state.player, money: Math.max(0, state.player.money - action.payload) },
      }

    case 'SET_STORY_FLAG':
      return {
        ...state,
        progress: {
          ...state.progress,
          storyFlags: { ...state.progress.storyFlags, [action.payload.flag]: action.payload.value },
        },
      }

    case 'LOAD_GAME':
      return action.payload

    case 'RESET_GAME':
      return INITIAL_GAME_STATE

    default:
      return state
  }
}
