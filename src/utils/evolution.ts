import { Pokemon } from '@/types/game.types'
import { canEvolve, getEvolution } from '@/data/evolutions'

export function evolvePokemon(pokemon: Pokemon): Pokemon {
  const evolution = getEvolution(pokemon.name)
  
  if (!evolution) {
    return pokemon
  }

  // Calculate stat increases (10% boost on evolution)
  const statBoost = 1.1
  
  return {
    ...pokemon,
    name: evolution.evolvesInto,
    types: evolution.types,
    sprite: evolution.sprite,
    stats: {
      ...pokemon.stats,
      maxHp: Math.floor(pokemon.stats.maxHp * statBoost),
      hp: Math.floor(pokemon.stats.hp * statBoost),
      attack: Math.floor(pokemon.stats.attack * statBoost),
      defense: Math.floor(pokemon.stats.defense * statBoost),
      specialAttack: Math.floor(pokemon.stats.specialAttack * statBoost),
      specialDefense: Math.floor(pokemon.stats.specialDefense * statBoost),
      speed: Math.floor(pokemon.stats.speed * statBoost),
    },
    evolution: getEvolution(evolution.evolvesInto), // Check if it can evolve again
  }
}

export function checkEvolution(pokemon: Pokemon): boolean {
  return canEvolve(pokemon.name, pokemon.level)
}
