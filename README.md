# Don Pablo’s Dutch Class

Learn Dutch by reading. The app gives English speakers short **A1 stories** (3 minutes or less) and turns every
story into a small lesson: tap any word for its meaning, save it to your vocabulary, review it as a flashcard,
and pick up **grammar pills** exactly where the grammar appears. The goal isn't grammar for its own sake. It's
being able to handle basic daily situations: ordering a coffee, shopping, asking the way.

## Features (reading milestone)

- **Entry page**: before every story, a short "Before you read" page with up to 5 key words (each with a
  pronunciation button, plus *Play all*) and 1–2 key grammar pills. The story opens only after **To the story**.
- **Story deck**: read one story at a time, then **Like & save** it or **Skip** it.
- **Choose your level**: the small sliders icon next to “N new stories to read” opens a slider to jump ahead to harder stories or roll back to easier ones. Stories you jump over stay unread (`src/lib/deck.ts`).
- **Saved stories**: recall any saved story later, with your quiz score.
- **Tap-a-word dictionary**: inflected forms resolve to the dictionary word (`kijkt` → `kijken`), with the
  article for nouns (`de wortel`). Save words to your vocabulary; saved words are highlighted in later stories.
- **Word quiz**: a 3-choice question for each saved word (NL → EN or EN → NL, keys 1–3). A word is **Learning** until
  you answer it correctly 3 times in a row, then it is **Known**; a wrong answer sends it back. Review is
  spaced (1 / 3 / 7 / 14 / 30 days) and the Words tab filters All / Learning / Known.
- **Grammar pills**: star your favorites, filter to them with the star button, and search the pills; 18 bite-sized pills (de/het, verb in second place, niet/geen, questions, "ik wil graag…",
  u vs. je, numbers & prices, time, …), highlighted inline in the stories and collected in the Grammar tab.
- **Listen to the whole story**: a read-aloud player (play / pause / stop, *Slow* mode) that highlights the
  paragraph being read, in a natural pre-recorded voice that also works in iPhone silent mode. Every paragraph,
  word and example has its own listen button.
- **Extras**: show/hide English translation per story, a 2-question comprehension check, a daily streak, dark mode.
- Everything is stored in the browser (`localStorage`). No account, no backend.

## Where it runs

- **Website:** https://oin35.github.io/Learnly/ (GitHub Pages). `.github/workflows/pages.yml` tests, builds and deploys on every push.
- **claude.ai page:** the same app published as an artifact (no sync there: that page cannot reach outside services).

## Progress and sync

Progress is saved in the browser. On the website, people can also turn on **sync** (cloud button in the header): they choose
their own **sync key** (at least 6 characters), progress is saved online under it, and entering the same key on another device
continues there. No accounts. Creating a key that is already in use is refused. The key never leaves the device: the app sends
a code derived from it. Storage is a free Supabase project: `docs/supabase-setup.sql` creates one closed table and two functions
(load / save; only a hash is stored). The project URL and publishable key live in `src/lib/syncConfig.ts`. Sync is hidden on
the claude.ai page. Logic and merge rules: `src/lib/sync.ts` (tests in `src/lib/sync.test.ts`).

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

Natural Dutch audio is **pre-recorded**: 271 small MP3 clips in `public/audio/` (every story paragraph, every dictionary
word with its article, and every grammar-pill example), about 3.4 MB. They were rendered with
[Piper](https://github.com/OHF-Voice/piper1-gpl) and the `nl_NL-ronnie-medium` voice (CC0, no attribution required), and
are played through a normal `<audio>` element, which sounds natural and keeps playing when an iPhone is on **silent
mode** (speech synthesis does not). `src/data/audio-index.json` lists which clips exist; a clip is found by a hash of
its text (`src/lib/audioId.ts`).

To make taps instant, the app downloads the clips in the background as soon as it opens (the current story
first, then everything else, about 3.4 MB in total) and plays them from memory; a tap before its clip has arrived
simply streams it. Repeated taps reuse one shared audio player, so sounds never overlap.

If a clip is missing or can't play, the app falls back to the browser's built-in speech synthesis (`nl-NL`), written
defensively for iOS/Safari (see `src/lib/speech.ts`). If neither starts, a notice explains what to check. The **Sound
check** panel (Words tab) tests the beep, the recorded clips and the phone voice step by step.

### Daily stories and recording clips

Two new stories are added every day by a scheduled run: the rules are in `docs/CURRICULUM.md` (difficulty scale,
names, Dutch insights) and the steps in `docs/DAILY-RUN.md`. Clips are stored in **packs** (one new MP3 file per run, plus
`src/data/audio-index.json`), because the hosting allows a limited number of files. `npm test` fails when a story, word or
grammar example has no recording. To record by hand:

```bash
bash scripts/setup-audio.sh            # Piper + the nl_NL-ronnie-medium voice (needs ffmpeg)
npm run audio:texts
.venv-audio/bin/python scripts/make-audio.py --model .voice/nl_NL-ronnie-medium.onnx
```

Only missing clips are recorded, into a new pack (`--rebuild` records everything again into one pack).
`npm run smoke` opens every story in a real browser; `npm run build:artifact` makes the page that is published.
