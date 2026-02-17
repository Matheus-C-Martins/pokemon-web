import { Pokemon } from '@/types/game.types'

export function generateWildPokemon(level: number = 5): Pokemon {
  // Simple starter wild Pokemon - we'll expand this later
  const wildPokemonPool = [
    {
      name: 'Grassling',
      types: ['grass' as const],
      baseStats: { hp: 45, attack: 49, defense: 49, specialAttack: 65, specialDefense: 65, speed: 45 },
    },
    {
      name: 'Flamepup',
      types: ['fire' as const],
      baseStats: { hp: 39, attack: 52, defense: 43, specialAttack: 60, specialDefense: 50, speed: 65 },
    },
    {
      name: 'Aquakid',
      types: ['water' as const],
      baseStats: { hp: 44, attack: 48, defense: 65, specialAttack: 50, specialDefense: 64, speed: 43 },
    },
  ]

  const template = wildPokemonPool[Math.floor(Math.random() * wildPokemonPool.length)]
  const statMultiplier = 1 + (level - 5) * 0.1

  const maxHp = Math.floor(template.baseStats.hp * statMultiplier)

  const wild: Pokemon = {
    id: `wild-${Date.now()}-${Math.random()}`,
    name: template.name,
    types: template.types,
    level,
    stats: {
      hp: maxHp,
      maxHp,
      attack: Math.floor(template.baseStats.attack * statMultiplier),
      defense: Math.floor(template.baseStats.defense * statMultiplier),
      specialAttack: Math.floor(template.baseStats.specialAttack * statMultiplier),
      specialDefense: Math.floor(template.baseStats.specialDefense * statMultiplier),
      speed: Math.floor(template.baseStats.speed * statMultiplier),
    },
    moves: [
      {
        id: 'tackle',
        name: 'Tackle',
        type: 'normal',
        category: 'physical',
        power: 40,
        accuracy: 100,
        pp: 35,
        maxPP: 35,
        description: 'A physical attack.',
      },
      {
        id: 'growl',
        name: 'Growl',
        type: 'normal',
        category: 'status',
        power: 0,
        accuracy: 100,
        pp: 40,
        maxPP: 40,
        description: 'Lowers the foe\'s Attack.',
      },
    ],
    experience: 0,
    experienceToNextLevel: 100,
    status: 'normal',
    sprite: `🐾`,
    isWild: true,
  }

  return wild
}

export function createStarterPokemon(_name: string, type: 'grass' | 'fire' | 'water'): Pokemon {
  const starters = {
    grass: {
      name: 'Leafeon',
      types: ['grass' as const],
      sprite: '🌿',
      baseStats: { hp: 45, attack: 49, defense: 49, specialAttack: 65, specialDefense: 65, speed: 45 },
    },
    fire: {
      name: 'Embear',
      types: ['fire' as const],
      sprite: '🔥',
      baseStats: { hp: 39, attack: 52, defense: 43, specialAttack: 60, specialDefense: 50, speed: 65 },
    },
    water: {
      name: 'Aquarius',
      types: ['water' as const],
      sprite: '💧',
      baseStats: { hp: 44, attack: 48, defense: 65, specialAttack: 50, specialDefense: 64, speed: 43 },
    },
  }

  const template = starters[type]
  const maxHp = template.baseStats.hp

  return {
    id: `starter-${Date.now()}`,
    name: template.name,
    types: template.types,
    level: 5,
    stats: {
      hp: maxHp,
      maxHp,
      attack: template.baseStats.attack,
      defense: template.baseStats.defense,
      specialAttack: template.baseStats.specialAttack,
      specialDefense: template.baseStats.specialDefense,
      speed: template.baseStats.speed,
    },
    moves: [
      {
        id: 'tackle',
        name: 'Tackle',
        type: 'normal',
        category: 'physical',
        power: 40,
        accuracy: 100,
        pp: 35,
        maxPP: 35,
        description: 'A physical attack.',
      },
      {
        id: type === 'grass' ? 'vinewhip' : type === 'fire' ? 'ember' : 'watergun',
        name: type === 'grass' ? 'Vine Whip' : type === 'fire' ? 'Ember' : 'Water Gun',
        type: type,
        category: 'special',
        power: 40,
        accuracy: 100,
        pp: 25,
        maxPP: 25,
        description: `A ${type}-type attack.`,
      },
    ],
    experience: 0,
    experienceToNextLevel: 100,
    status: 'normal',
    sprite: template.sprite,
    isWild: false,
  }
}
