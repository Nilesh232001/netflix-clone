# Netflix Clone — Full Stack (React + Redux Toolkit + Node/Express + MongoDB)

This project implements a Netflix-like app with:
- **Auth** (Firebase email/password out of the box; swap with any provider as needed)
- **Home** (hero banner, trending rows)
- **Movies & TV** pages with **genre filtering** (TMDB)
- **Player** (HTML5 video page)
- **My List** (persist liked titles in MongoDB)

## Monorepo Structure
```
netflix-clone/
  client/   # Vite React frontend
  server/   # Express + MongoDB backend
```

## Prerequisites
- Node.js >= 18
- Yarn or npm
- MongoDB instance (local or Atlas)
- TMDB API key (v3) — https://www.themoviedb.org/
- Firebase project (for web) — https://firebase.google.com/

## Quick Start

### 1) Backend
```bash
cd server
cp .env.sample .env
# Edit .env with your MONGODB_URI and PORT (optional)
yarn install   # or npm install
yarn dev       # or npm run dev
```
The server runs on `http://localhost:5000` by default.

### 2) Frontend
```bash
cd ../client
cp .env.sample .env
# Edit .env with your TMDB_API_KEY and Firebase config
yarn install   # or npm install
yarn dev       # or npm run dev
```
Vite dev server will print a local URL (e.g., `http://localhost:5173`).

> **Note**: Ensure CORS is allowed (already configured) and that the backend is reachable from the frontend.

## Environment Variables

### `client/.env`
```
VITE_TMDB_API_KEY=YOUR_TMDB_V3_API_KEY

# Firebase web config (from your Firebase console)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
```

### `server/.env`
```
MONGODB_URI=mongodb://127.0.0.1:27017/netflix
PORT=5000
```

## High-Level Flow
1. On first load, the app fetches **genres** from TMDB and caches in Redux.
2. **Home** shows a hero and six **CardSlider** rows fed by the Redux store (trending/all).
3. **Movies** / **TV** pages allow **genre selection**; a thunk requests discover endpoints.
4. Clicking **Play** opens the **Player** page with an HTML5 `<video>`.
5. Clicking **＋ / ✓** toggles **My List**, persisted via the **Express API** into MongoDB.
6. **My List** page fetches liked titles for the logged-in user and renders as cards.

## Scripts
- `client`: `dev`, `build`, `preview`, `lint`
- `server`: `dev`, `start` (with nodemon for dev)

## Notes
- Assets are placeholders; replace with your own images/video in `client/src/assets/`.
- Firebase auth is wired for email/password. Add Google provider if desired.
- The Redux slice purposely keeps logic in thunks for clarity, closely following the tutorial's approach.

Happy hacking!
"# netflix-clone" 
