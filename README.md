# Learnly

Learn Dutch by reading. Learnly gives English speakers short **A1 stories** (3 minutes or less) and turns every
story into a small lesson: tap any word for its meaning, save it to your vocabulary, review it as a flashcard,
and pick up **grammar pills** exactly where the grammar appears. The goal isn't grammar for its own sake. It's
being able to handle basic daily situations: ordering a coffee, shopping, asking the way.

## Features (reading milestone)

- **Entry page**: before every story, a short "Before you read" page with up to 5 key words (each with a
  pronunciation button, plus *Play all*) and 1–2 key grammar pills. The story opens only after **To the story**.
- **Story deck**: read one story at a time, then **Like & save** it or **Skip** it.
- **Saved stories**: recall any saved story later, with your quiz score.
- **Tap-a-word dictionary**: inflected forms resolve to the dictionary word (`kijkt` → `kijken`), with the
  article for nouns (`de wortel`). Save words to your vocabulary; saved words are highlighted in later stories.
- **Flashcards**: spaced repetition (Leitner boxes, 1 / 3 / 7 / 14 / 30 days), NL → EN or EN → NL, keyboard
  shortcuts (Space to flip, 1 = not yet, 2 = got it).
- **Grammar pills**: 18 bite-sized pills (de/het, verb in second place, niet/geen, questions, "ik wil graag…",
  u vs. je, numbers & prices, time, …), highlighted inline in the stories and collected in the Grammar tab.
- **Listen to the whole story**: a read-aloud player (play / pause / stop, *Slow* mode) that highlights the
  paragraph being read; every paragraph, word and example also has its own listen button.
- **Extras**: show/hide English translation per story, a 2-question comprehension check, a daily streak, dark mode.
- Everything is stored in the browser (`localStorage`). No account, no backend.

## Develop

```bash
npm install
npm run dev          # http://localhost:5173
npm test             # content checks + logic tests
npm run build        # type-check + production build in dist/
npm run build:single # one self-contained dist-single/index.html
```

## Adding a story

Stories live in `src/data/stories.ts`. Mark grammar pills inline with `{{phrase|pill-id}}` (ids are in
`src/data/pills.ts`). Give each story an `intro` with up to 5 key words (dictionary ids) and 1–2 key pills;
they must occur in the story. Every word must exist in `src/data/dictionary.ts`: `npm test` lists any word that
is missing, any unknown pill id, and any story that is too long for a 3-minute read.

## Roadmap

Writing, listening and speaking sections come next (the listen buttons are a first step towards listening).

## Sound

Audio uses the browser's built-in text-to-speech (`nl-NL`, no network needed), see `src/lib/speech.ts`.
It is written defensively for iOS/Safari (utterances kept referenced, no needless `cancel()`, audio session set to
`playback`, explicit Dutch voice). If nothing starts within ~2.5 s the app shows a notice with what to check
(Silent mode, volume, an installed Dutch voice). Pre-recorded audio files would be the next step if a device has
no Dutch voice at all.
