# Sprite System Documentation

## Overview
The game now supports custom animated sprites! You can replace emoji placeholders with your own pixel art sprites.

## Quick Start

### 1. Create Your Sprite Sheet
- **Format**: PNG with transparency
- **Frame size**: 64x64 pixels (recommended)
- **Layout**: Horizontal sprite sheet (all frames in a row)
- **Example**: For 4 frames, your image should be 256x64 (64×4)

### 2. Add Sprite to Project
Place your sprite sheet in:
```
public/sprites/your-pokemon-name.png
```

### 3. Register Sprite
Edit `src/data/sprites.ts` and add your sprite configuration:

```typescript
'leafeon': {
  url: '/sprites/leafeon.png',
  frameWidth: 64,
  frameHeight: 64,
  frameCount: 4,
  fps: 8,
  loop: true,
  animations: {
    idle: { startFrame: 0, frameCount: 4 }
  }
}
```

## Sprite Configuration

### Basic Properties
- **url**: Path to your sprite sheet (relative to `public/`)
- **frameWidth**: Width of each frame in pixels
- **frameHeight**: Height of each frame in pixels
- **frameCount**: Total number of frames in the sprite sheet
- **fps**: Animation speed (frames per second, default: 8)
- **loop**: Whether animation loops (default: true)

### Animation States
You can define different animations for different game states:

```typescript
animations: {
  idle: { startFrame: 0, frameCount: 4 },      // Overworld/menu
  battle: { startFrame: 4, frameCount: 3 },    // During battle
  evolving: { startFrame: 7, frameCount: 2 },  // Evolution animation
  fainted: { startFrame: 9, frameCount: 1 }    // When HP = 0
}
```

## Sprite Sizes
The game uses 4 size presets:
- **small**: 32x32 (UI elements)
- **medium**: 64x64 (party display)
- **large**: 96x96 (battle display)
- **huge**: 128x128 (evolution screen)

## Example: Complete Setup

### Your Sprite Sheet Layout
```
[Frame 0][Frame 1][Frame 2][Frame 3]
  Idle     Idle     Idle     Idle
```

### Configuration
```typescript
'mypokemon': {
  url: '/sprites/mypokemon.png',
  frameWidth: 64,
  frameHeight: 64,
  frameCount: 4,
  fps: 8,
  loop: true,
  animations: {
    idle: { startFrame: 0, frameCount: 4 },
    battle: { startFrame: 0, frameCount: 4 } // Reuse idle animation
  }
}
```

## Pokemon Needing Sprites

### Priority 1: Starters (3 Pokemon)
- ✅ **Leafeon** (Grass) - DONE! Example sprite included
- ⬜ **Embear** (Fire)
- ⬜ **Aquarius** (Water)

### Priority 2: Stage 1 Evolutions (3 Pokemon)
- ⬜ **Forestorm** (Leafeon → Level 16)
- ⬜ **Blazeclaw** (Embear → Level 16)
- ⬜ **Torrentseal** (Aquarius → Level 16)

### Priority 3: Stage 2 Evolutions (3 Pokemon)
- ⬜ **Terraleaf** (Forestorm → Level 32)
- ⬜ **Infernotitan** (Blazeclaw → Level 32) [Fire/Fighting]
- ⬜ **Hydroknight** (Torrentseal → Level 32) [Water/Steel]

### Priority 4: Wild Pokemon (6 Pokemon)
- ⬜ **Sparkrat** (Electric)
- ⬜ **Voltrodent** (Sparkrat evolution)
- ⬜ **Rockbite** (Rock)
- ⬜ **Boulderjaw** (Rockbite evolution)
- ⬜ **Fluttermoth** (Bug/Flying)
- ⬜ **Celestialwing** (Fluttermoth evolution)

### Priority 5: Generic Wild (3 Pokemon)
- ⬜ **Grassling** (Grass)
- ⬜ **Flamepup** (Fire)
- ⬜ **Aquakid** (Water)

## Tips for Creating Sprites

### Style Guidelines
- Keep the pixel art style consistent with Leafeon
- Use clear outlines (black or dark colors)
- Limit color palette for retro feel
- Make sure sprites are readable at small sizes

### Animation Tips
- **Idle**: Subtle breathing or bobbing motion (2-4 frames)
- **Battle**: More dynamic pose, maybe attack wind-up (3-4 frames)
- **Evolution**: Glowing or transformation effect (2-3 frames)
- Keep animations simple - this makes them easier to loop

### File Organization
```
public/
  sprites/
    leafeon.png
    embear.png
    aquarius.png
    forestorm.png
    ...
```

## Testing Your Sprite
1. Add sprite sheet to `public/sprites/`
2. Update configuration in `src/data/sprites.ts`
3. Start the game and catch/select that Pokemon
4. Sprite should animate automatically!

## Fallback System
If a sprite isn't found or fails to load, the game automatically falls back to the emoji placeholder. No crashes!

## Need Help?
- Check `src/data/sprites.ts` for examples
- Look at the Leafeon configuration as a reference
- All sprites use the same `AnimatedSprite` component
