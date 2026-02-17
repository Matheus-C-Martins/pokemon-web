import { Pokemon, Move } from '@/types/game.types'
import { getTypeEffectiveness } from './typeEffectiveness'

export interface DamageResult {
  damage: number
  effectiveness: number
  isCritical: boolean
}

export function calculateDamage(
  attacker: Pokemon,
  defender: Pokemon,
  move: Move
): DamageResult {
  // Status moves don't deal damage
  if (move.category === 'status' || move.power === 0) {
    return { damage: 0, effectiveness: 1, isCritical: false }
  }

  // Base damage calculation (simplified Pokemon formula)
  const level = attacker.level
  const power = move.power
  
  // Determine attack and defense stats based on move category
  const attack = move.category === 'physical' 
    ? attacker.stats.attack 
    : attacker.stats.specialAttack
    
  const defense = move.category === 'physical'
    ? defender.stats.defense
    : defender.stats.specialDefense

  // Critical hit check (6.25% chance)
  const isCritical = Math.random() < 0.0625
  const criticalMultiplier = isCritical ? 1.5 : 1.0

  // Type effectiveness
  const effectiveness = getTypeEffectiveness(move.type, defender.types)

  // STAB (Same Type Attack Bonus) - 1.5x if move type matches attacker type
  const stab = attacker.types.includes(move.type) ? 1.5 : 1.0

  // Random factor (0.85 to 1.0)
  const randomFactor = 0.85 + Math.random() * 0.15

  // Damage formula (simplified)
  const baseDamage = ((2 * level / 5 + 2) * power * (attack / defense)) / 50 + 2
  const damage = Math.floor(
    baseDamage * stab * effectiveness * criticalMultiplier * randomFactor
  )

  return {
    damage: Math.max(1, damage), // Minimum 1 damage
    effectiveness,
    isCritical,
  }
}

export function calculateCatchRate(pokemon: Pokemon, ballMultiplier: number = 1.0): number {
  // Catch rate formula (simplified)
  const hpRatio = pokemon.stats.hp / pokemon.stats.maxHp
  const catchRate = 50 // Base catch rate for wild Pokemon
  
  const modifier = (1 - hpRatio * 0.7) * ballMultiplier
  const finalRate = Math.min(100, catchRate * modifier)
  
  return finalRate / 100 // Return as 0-1
}

export function calculateExperienceGain(defeatedPokemon: Pokemon, isWild: boolean): number {
  // Base experience formula
  const baseExp = 50
  const level = defeatedPokemon.level
  const wildMultiplier = isWild ? 1.0 : 1.5 // Trainer battles give more exp
  
  return Math.floor(baseExp * level * wildMultiplier / 7)
}

export function shouldLevelUp(pokemon: Pokemon): boolean {
  return pokemon.experience >= pokemon.experienceToNextLevel
}

export function levelUpPokemon(pokemon: Pokemon): Pokemon {
  const newLevel = pokemon.level + 1
  const statIncrease = 2 + Math.floor(Math.random() * 3) // 2-4 points
  
  return {
    ...pokemon,
    level: newLevel,
    experience: pokemon.experience - pokemon.experienceToNextLevel,
    experienceToNextLevel: Math.floor(pokemon.experienceToNextLevel * 1.2),
    stats: {
      ...pokemon.stats,
      maxHp: pokemon.stats.maxHp + statIncrease,
      hp: pokemon.stats.hp + statIncrease,
      attack: pokemon.stats.attack + Math.floor(statIncrease * 0.8),
      defense: pokemon.stats.defense + Math.floor(statIncrease * 0.8),
      specialAttack: pokemon.stats.specialAttack + Math.floor(statIncrease * 0.8),
      specialDefense: pokemon.stats.specialDefense + Math.floor(statIncrease * 0.8),
      speed: pokemon.stats.speed + Math.floor(statIncrease * 0.7),
    },
  }
}
