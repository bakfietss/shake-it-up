# Shake It Up - Frontend Eindopdracht
<p><img src="./public/assets/shakeitup-home.png" alt="ShakeItUp Screenshot" width="600"/></p>

## Inleiding

Shake It Up is een webapplicatie waarmee je cocktail recepten kunt ontdekken, doorzoeken en opslaan als favoriet. Tevens ook een leuke cocktail randomizer, voor het geval dat je geen inspiratie hebt! De app gebruikt de TheCocktailDB API voor cocktaildata en de NOVI Backend voor authenticatie.

## Benodigdheden

- **Node.js** (v18 of hoger) en npm
- **Git**
- De repository link:
  ```
  https://github.com/bakfietss/shake-it-up
  ```

## Installatie en gebruik

1. **Repository clonen**
   ```bash
   git clone https://github.com/bakfietss/shake-it-up.git
   ```

2. **Dependencies installeren**
   ```bash
   cd shake-it-up
   npm install
   ```

3. **Applicatie starten**
   ```bash
   npm run dev
   ```
   De applicatie is bereikbaar via:
   ```
   http://localhost:5173
   ```

## Inloggen

De applicatie is gekoppeld aan de NOVI backend. Je kunt registreren met een eigen account of inloggen met het testaccount:

- **Email:** test@test.nl
- **Wachtwoord:** test123

## Beschikbare npm-commando's

| Commando | Functie |
|----------|---------|
| `npm run dev` | Start de Vite-ontwikkelserver |
| `npm run build` | Maakt een productie-build in `/dist` |
| `npm run preview` | Preview van de productie-build |
| `npm run lint` | Controleert code met ESLint |

## Dependencies

```json
"dependencies": {
  "axios": "^1.13.3",
  "gsap": "^3.14.2",
  "jwt-decode": "^4.0.0",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.13.0",
  "sass": "^1.97.3"
},
"devDependencies": {
  "@eslint/js": "^9.39.1",
  "@vitejs/plugin-react": "^5.1.1",
  "eslint": "^9.39.1",
  "vite": "^7.2.4"
}
```
