# Teman Hewan

Responsive React + Vite toddler speech-stimulation game. Ten animals, shuffled once per session, three-stage flow, speech recognition where supported, tap-to-answer fallback, narration/sound-effect controls, and replay.

## Run locally
1. Install Node.js (LTS).
2. In this folder run `npm install`
3. Run `npm run dev` and open the local URL shown.
4. Run `npm run build` to verify production build.

## Deploy to Vercel
Import this project folder/repository into Vercel. Framework preset: Vite. Build command `npm run build`, output directory `dist`.

## Audio status — important
This package does **not** contain pre-generated AI voice-over recordings. It uses browser speech synthesis as a clearly disclosed fallback for Indonesian narration, plus lightweight Web Audio tones for optional interaction feedback; these are not a substitute for authentic animal recordings. The app labels this in its parent-facing audio note. To meet the final audio brief, generate licensed Indonesian voice clips and authentic animal effects, then add them under `public/audio/` and map them in `src/main.jsx`. Speech recognition depends on browser support and may be unavailable in Safari/iOS; tap-to-answer remains available. No child audio is recorded or stored by the app.
