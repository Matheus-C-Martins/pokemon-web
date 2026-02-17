# Pokemon Sprite Checklist

All sprites need to be **512x128 pixels** (8 frames of 64x64 each):
- **Top row (4 frames):** Idle animation
- **Bottom row (3 frames):** Battle/walking animation  
- **Bottom row (1 frame):** Special frame (evolving OR fainted)

## ✅ Completed Sprites

- [x] **Leafeon** (Grass Starter) - evolving frame
- [x] **Forestorm** (Leafeon Evo 1) - fainted frame
- [x] **Terraleaf** (Leafeon Evo 2) - fainted frame

## 🔥 Fire Starter Line (Level 16 → Level 32)

- [ ] **Embear** (Fire) - Small bear with flames → needs **evolving** frame
- [ ] **Blazeclaw** (Fire) - Larger bear with claws → needs **evolving** frame
- [ ] **Infernotitan** (Fire/Fighting) - Massive flaming beast → needs **fainted** frame

## 💧 Water Starter Line (Level 16 → Level 32)

- [ ] **Aquarius** (Water) - Small water creature → needs **evolving** frame
- [ ] **Torrentseal** (Water) - Seal-like with waves → needs **evolving** frame
- [ ] **Hydroknight** (Water/Steel) - Armored water knight → needs **fainted** frame

## 🌾 Basic Wild Pokemon (No evolutions)

- [ ] **Grassling** (Grass) - Small grass creature → needs **fainted** frame
- [ ] **Flamepup** (Fire) - Small fire puppy → needs **fainted** frame
- [ ] **Aquakid** (Water) - Small water kid → needs **fainted** frame

## ⚡ Electric Line (Level 18)

- [ ] **Sparkrat** (Electric) - Electric rodent → needs **evolving** frame
- [ ] **Voltrodent** (Electric) - Larger electric rodent → needs **fainted** frame

## 🪨 Rock Line (Level 20)

- [ ] **Rockbite** (Rock/Ground) - Small rocky creature → needs **evolving** frame
- [ ] **Boulderjaw** (Rock/Ground) - Large boulder with jaws → needs **fainted** frame

## 🦋 Bug Line (Level 15)

- [ ] **Fluttermoth** (Bug/Flying) - Moth/butterfly → needs **evolving** frame
- [ ] **Celestialwing** (Bug/Flying) - Majestic celestial wings → needs **fainted** frame

---

## 📋 Sprite Creation Tips

1. **Naming:** Save as lowercase (e.g., `embear.png`, `blazeclaw.png`)
2. **Format:** PNG with transparency
3. **Size:** Exactly 512x128 pixels (64x64 per frame)
4. **Layout:** 
   ```
   [Idle1][Idle2][Idle3][Idle4]
   [Walk1][Walk2][Walk3][Special]
   ```
5. **Special frame:**
   - **Evolving** (for base/middle stage): Glowing/levitating effect
   - **Fainted** (for final stage): Defeated/knocked out pose

## 🎨 Style Guide

- **Pixel art:** Keep the retro pixel art aesthetic
- **Consistency:** Match the style of Leafeon/Forestorm/Terraleaf
- **Animation:** Smooth transitions between idle frames
- **Personality:** Each Pokemon should have distinct character

## 📁 File Locations

- **Art files:** Save sprites to `public/sprites/`
- **Config:** Already set up in `src/data/sprites.ts`
- **Auto-deploy:** Push to GitHub and sprites will work automatically!

---

**Progress: 3 / 18 sprites complete** 🎯
