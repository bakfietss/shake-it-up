# Shake It Up - Frontend Eindopdracht

<p><img src="./public/assets/shakeitup-home.png" alt="ShakeItUp Screenshot" width="600"/></p>

## Inhoudsopgave

- [Inleiding](#inleiding)
- [Functionaliteiten](#functionaliteiten)
- [Gebruikte technieken](#gebruikte-technieken)
- [Installatie en gebruik](#installatie-en-gebruik)
- [API configuratie](#api-configuratie)
- [Inloggen](#inloggen)
- [Beschikbare npm-commando's](#beschikbare-npm-commandos)

## Inleiding

Shake It Up is een webapplicatie waarmee je cocktail recepten kunt ontdekken, doorzoeken en opslaan als favoriet. Tevens ook een leuke cocktail randomizer, voor het geval dat je geen inspiratie hebt! De app gebruikt de TheCocktailDB API voor cocktaildata en de NOVI Backend voor authenticatie en favorieten opslag.

## Functionaliteiten

- **Registreren en inloggen** - account aanmaken via de NOVI backend
- **Cocktails zoeken** - zoeken op naam, filteren op categorie of ingredient
- **Favorieten beheren** - cocktails opslaan en bekijken (alleen voor ingelogde gebruikers)
- **Random cocktail generator** - willekeurige cocktail genereren met een spin animatie
- **Cocktail details** - volledige info bekijken inclusief ingrediënten en bereidingswijze
- **Recent spins** - laatste 3 random resultaten worden lokaal bewaard

## Gebruikte technieken

| Techniek | Versie | Gebruikt voor |
|----------|--------|---------------|
| React | 19 | UI componenten en state management |
| React Router | 7 | Navigatie en routing tussen pagina's |
| Axios | 1.13 | API requests naar TheCocktailDB en NOVI backend |
| GSAP | 3.14 | Animaties (intro, hero, scroll effecten) |
| Sass/SCSS | 1.97 | Styling met variabelen en nesting |

## Installatie en gebruik

### Benodigdheden

- **Node.js** (v18 of hoger) en npm
- **Git**

### Stappen

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

## API configuratie

De applicatie gebruikt twee API's:

- **TheCocktailDB** - gratis, geen API key nodig
- **NOVI Backend** - voor authenticatie en favorieten opslag

Er is een `.env` bestand meegeleverd in de ZIP. Plaats dit in de root van het project. Hierin staan het NOVI project ID en de API URL. Zonder dit bestand kan de app niet verbinden met de backend.

Een voorbeeld van de inhoud staat in `.env.example`.

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
