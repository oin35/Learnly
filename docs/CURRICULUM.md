# Curriculum: how the stories are written

The owner's brief: a Dutch reading course for English speakers for basic daily language tasks, starting at **A1** and moving on to **A2**.
Every day two new stories are added. Quality matters more than quantity: **be a good teacher**, and keep learning.
The level goes up by itself as described below; **B1 only when the owner says so**.

## Levels and difficulty (A1 then A2, each scored 1 to 10)

Every story has a **level** (`A1`, then `A2`) and a **difficulty from 1 to 10 inside that level**. Both show on the story title
as a small mark (the level letters plus a hairline ruler). The levels **overlap on purpose**: the top of A1 (10) is about as
hard as the start of A2 (1), so the step between them is smooth.

- The first **8 stories** are the baseline: all **A1, difficulty 1 or 2** (already written).
- From story 9 on, **each story is 0.5 harder than the one before** (story 9 = 2.5, story 10 = 3, story 11 = 3.5 …).
  Two stories a day means +1 per day. `npm test` enforces this (`difficulty ramp` in `src/data/content.test.ts`).
- After **A1 10** the next story is **A2 1** (level `"A2"`, difficulty `1`), then +0.5 per story again, up to **A2 10**.
- At **A2 10** keep writing at A2 10 and say clearly in the run report: *"A2 scale complete. Waiting for the owner's go to start B1."*
  Do **not** start B1 on your own (the `Level` type in `src/types.ts` only knows A1 and A2).
- **Before the first A2 story**, research the official A2 descriptors (CEFR and its Companion Volume, the Dutch NT2/Taalunie
  reference framework, a reputable A2 course syllabus), compare them with the table below, adjust it if the research says so,
  and write what you changed in `docs/TEACHER-NOTES.md`. Do the same for every new topic you are less sure about.

What a story at each step may contain (guide: adjust with research and common sense; the word limits are enforced):

| Level and difficulty | Max words | Sentences | Grammar and features |
|---|---|---|---|
| A1 1–2 | 100–130 | 3–8 words | present tense of very common verbs, de/het, een, ik/jij/hij…, simple questions, numbers to 10, polite phrases |
| A1 3–4 | 130–160 | 4–10 words | modal verbs (willen, kunnen, moeten), separable verbs, plurals, adjectives (groot/grote), clock times, prices, er is/er zijn, imperatives, en/maar/want |
| A1 5–6 | 160–180 | 5–11 words | question words (waarom, wanneer, hoe laat), simple comparisons (groter dan), ik ga + infinitive for plans, more dialogue, larger vocabulary |
| A1 7–8 | 180 | 6–12 words | first perfect-tense chunks (ik heb gegeten, ik ben geweest), omdat/dus in short sentences, time words (gisteren, vorige week) |
| A1 9–10 | 180 | up to ~14 words | short connected paragraphs mixing present, perfect and gaan-future, idioms glossed (gezellig), two cultural details |
| A2 1–2 | 180 | 6–12 words | the perfect tense with hebben (ik heb gewerkt), common irregular participles, gisteren / vorige week / vroeger |
| A2 3–4 | 180 | 7–13 words | the perfect with zijn (ik ben gegaan), past of zijn and hebben (was, had), the future with gaan and zullen, comparatives and superlatives |
| A2 5–6 | 180 | 7–14 words | past of the modals (kon, wilde, moest), **zou / zouden** for wishes, polite requests and advice (should/would: *Ik zou graag…*, *Je zou moeten…*), reflexive verbs, te + infinitive |
| A2 7–8 | 180 | 8–15 words | **als … dan** (if … then: *Als het regent, blijf ik thuis*), omdat / dat / toen / terwijl clauses (verb at the end), die / dat as relative words |
| A2 9–10 | 180 | up to ~16 words | short connected stories mixing past, present and future, opinions, plans and wishes, indirect questions, idioms |

Hard limits (tests check them): at most `min(180, 70 + 30 × difficulty)` words, and at most 3 minutes to read.
Introduce **one new grammar feature at a time** and teach it with a grammar pill the first time it appears.

## What every story contains

Follow the existing stories in `src/data/stories.ts` exactly (same fields). Append new stories at the **end** of the array.

1. `id` (kebab-case, unique), `title` (Dutch), `titleEn` (a **direct, literal** translation of the title: "Een dag van Emma" is
   "A day of Emma", not an idiomatic rewrite), `emoji`, `topic`, `level` (`"A1"` or `"A2"`), `difficulty`.
2. `intro`: up to **5 key words** (dictionary ids, all of which occur in the story) and **1–2 key grammar pills** (used in the story).
3. 3–4 `paragraphs`: `nl` with grammar pills marked inline as `{{phrase|pill-id}}`, and `en` (a faithful translation).
4. `quiz`: 2 multiple-choice questions in English (3 options).
5. `insight`: a **Dutch insight** (title and 1–3 sentences in English) about the culture, a place or a habit behind the story.
   Verify every fact with a reliable source before writing it. Never guess.

Also, every time:
- Add **every new word** to `src/data/dictionary.ts` with all its written forms, the right article (**de/het must be correct**),
  and a direct English meaning. Names and places are added as names.
- Add a **new grammar pill** to `src/data/pills.ts` whenever a new feature appears (same style as the others: title, summary,
  points, 2–3 examples, tip). Every pill must be used in at least one story.
- Record the audio (see `docs/DAILY-RUN.md`). Tests fail until every paragraph, word and example has a recording.

## Names (decided by the owner)

The Dutch voice cannot pronounce most foreign names well (Turkish ones in particular), so names are strictly limited.

**People: only Tom (a man or boy) and Lisa (a woman or girl). Always.** No other first names, no nicknames.
- Need a second person of the same gender? Use a role instead: *de ober, de buurman, de buurvrouw, de leraar, de verkoper,
  de vrouw, de man, de dokter, de agent*.
- Never use real people, celebrities, politicians or religious figures in the story text. Famous artists or buildings belong in the
  English culture insight, where the name is part of a fact (the *Van Gogh Museum*, *Rembrandt*), not in the Dutch text.

**Animals and things may have names (owner's rule):**
- **A cat is Leo. A dog is Coco.**
- **Any other animal or thing** (a rabbit, a bird, a horse, a bike, a car, a teddy bear …): be creative. Choose a short, friendly name
  that is easy for the Dutch voice and for an English speaker, clearly not a person's name, and not controversial.
  Examples: *Snuf* (rabbit), *Pip* (bird), *Blits* (bike), *Knuffel* (teddy bear). Real Dutch words make good names.

**Places** (Amsterdam, Utrecht, Friesland …) are fine.

**Dictionary and test:** add every name to `src/data/dictionary.ts` with `name(...)`. A person's name uses the English text
`"Tom (a name)"`; an animal or thing uses a different text such as `"Leo (a cat's name)"` or `"Pip (a bird's name)"`; a place uses
its English name. `npm test` checks that new stories use no person's name other than Tom and Lisa (it looks for "(a name)").
The 8 baseline stories keep the names they have.

## Dutch insights: topics (one per story, paired with a daily-life theme)

Work through these, roughly in order, then invent more of the same kind. Pair each with a daily-life situation that
teaches vocabulary people really use (shopping, transport, food, health, home, work, free time, appointments, weather, …).

1. Museums: Rijksmuseum (De Nachtwacht), Van Gogh Museum, Mauritshuis (Girl with a Pearl Earring), Museumkaart, NEMO.
2. The 12 provinces, a few per story: Groningen, Friesland, Drenthe, Overijssel, Flevoland, Gelderland, Utrecht,
   Noord-Holland, Zuid-Holland, Zeeland, Noord-Brabant, Limburg (capitals, one typical thing each).
3. Cycling: bike lanes, parking at the station, cycling in rain, the bike as transport for everyone.
4. Water: dikes, polders, the Delta Works, Kinderdijk windmills, why a quarter of the country lies below sea level.
5. Food: stroopwafel, hagelslag, broodje kaas, patat, stamppot, Albert Cuyp market, Alkmaar cheese market, Hollandse nieuwe.
6. Calendar: Koningsdag (orange, vrijmarkt), Bevrijdingsdag, birthdays and the "circle party", Pasen, Kerst, New Year's dive.
7. Everyday life: OV-chipkaart and trains (NS), the supermarket, opening hours, "gezellig", being direct, "doe maar gewoon",
   splitting the bill, tea or coffee at work, the Dutch way of greeting with three kisses (not everywhere).
8. Nature and places: tulips and Keukenhof, the Wadden Sea, the Veluwe, Zeeland beaches, Elfstedentocht and ice skating.
9. Language: Frisian, Flemish versus Dutch, loanwords, the 'g', why Dutch people speak English.

Avoid: party politics, religion as a debate, colonial history and other sensitive topics, jokes about nationalities,
alcohol and gambling as a theme, anything that needs a content warning.

## How a good teacher works (every run)

- **Research**: for each culture topic, read at least two reliable sources (official museum or government sites, Rijksoverheid,
  Netherlands Tourism, Taalunie, Wikipedia only as a starting point) and cross-check numbers, dates and names.
- **Check the Dutch** like a native checker would: de/het (check Woordenlijst.org or Van Dale when unsure), verb forms, word order
  (verb second; verb at the end after modals), spelling (Het Groene Boekje), natural phrasing rather than word-for-word English.
- **Review your own work** once, slowly, before testing: read each sentence aloud in your head; fix anything stiff or ambiguous.
- **Learn**: after each run add what you learned (a mistake you caught, a better source, a better way to explain) to
  `docs/TEACHER-NOTES.md`, and re-read that file at the start of the next run.
- **Be honest**: if you are unsure about a fact or a form, change the sentence to something you are sure about, or flag it
  in the run note. Never invent facts.
