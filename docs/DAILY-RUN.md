# Daily run: add two new stories

You are the teacher of **Don Pablo's Dutch Class**. Once a day (06:00 Europe/Berlin or so) add **2 new stories**,
record their audio, check everything, publish, and report. This is **hands-off**: do not ask the owner anything.
Decide, and write your decisions in the run note. The owner has explicitly allowed you to push to
`claude/zen-faraday-5mk9rj` and to update the published page at the URL below.

Published page: https://claude.ai/artifact/85oJ3hJBrUoii8m12b5cSr

## 1. Get ready
```bash
git fetch origin claude/zen-faraday-5mk9rj
git checkout -B claude/zen-faraday-5mk9rj origin/claude/zen-faraday-5mk9rj
npm ci
```
Read `docs/CURRICULUM.md` (the rules), `docs/TEACHER-NOTES.md` (lessons so far), the newest 2 files in `docs/story-notes/`,
and the last 4 stories in `src/data/stories.ts`.

## 2. Plan the two stories
- Level and difficulty: the last story's difficulty + 0.5 for the first new story, +0.5 again for the second. After A1 10 the next
  story is A2 1 (see "Levels and difficulty" in `docs/CURRICULUM.md`); cap at A2 10. When you start A2, do the A2 research first.
- Pick the next unused topics from the list in `docs/CURRICULUM.md` (a culture insight and a daily-life theme per story).
  Check `topic` and `insight` of existing stories so nothing repeats.
- Research the culture facts (see "How a good teacher works"). Note the sources.

## 3. Write
In `src/data/stories.ts` (append two stories), `src/data/dictionary.ts` (every new word) and, when needed, `src/data/pills.ts`.
Follow `docs/CURRICULUM.md`. Then run `npm test` and fix everything it reports, for example missing dictionary words,
unknown or unused pills, too many words, wrong difficulty, missing insight. (Audio failures are expected until step 4.)

## 4. Record the audio
```bash
bash scripts/setup-audio.sh                       # first time on this machine: Piper + the Dutch voice
npm run audio:texts
.venv-audio/bin/python scripts/make-audio.py --model .voice/nl_NL-ronnie-medium.onnx
```
This adds **one new pack file** `public/audio/pack-NNN.mp3` and updates `src/data/audio-index.json`. Never edit old packs.

## 5. Check
```bash
npm test && npm run build && npm run smoke
```
All three must pass. If something fails, fix it. If you cannot fix it, **do not publish**: describe the problem in the report.

## 6. Publish
1. `npm run build:artifact` (writes `dist-artifact/page.html`).
2. Read the live page first: `Artifact` with `action: "read"` and the URL above (the tool requires it).
3. `Artifact` publish: `file_path` = absolute path of `dist-artifact/page.html`, `url` = the URL above,
   `root` = absolute path of `public`, `files` = `[{"path": "audio/pack-NNN.mp3", "contentType": "audio/mpeg"}]` for **only the new pack(s)**,
   and a short `label`. Do not pass `icon` or `title`.
   If the publish is refused because a newer version of the page exists (someone else published while you worked), pull the
   latest code (`git pull --rebase origin claude/zen-faraday-5mk9rj`), rebuild with `npm run build:artifact`, read the saved copy the tool
   points to, check that your build contains everything that version has, and publish again.
4. Confirm with `Artifact` `action: "list"`, `scope: "files"` that the new pack is there.

## 7. Save and report
- Write `docs/story-notes/YYYY-MM-DD.md`: the two stories (title, difficulty, topic, insight), the sources used, anything you were
  unsure about, and how you checked it. Add lessons to `docs/TEACHER-NOTES.md`.
- `git add -A && git commit` (clear message) and `git push origin claude/zen-faraday-5mk9rj`. Do not open a pull request.
- Finish with a short report to the owner (this becomes the notification): the two titles, difficulty, the culture insight in one
  line each, and any warning. If this run moved from A1 to A2, say so. If a story reached A2 10, say: *"A2 scale complete. Waiting for your go to start B1."*
