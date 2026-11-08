# Curriculum: how the stories are written

The owner's brief: a Dutch reading course for English speakers, now at **A1**, for basic daily language tasks.
Every day two new stories are added. Quality matters more than quantity: **be a good teacher**, and keep learning.
Level goes up later, when the owner says so ("we will improve the level"). Until then stay inside A1.

## Difficulty scale (A1 only, 1 to 10)

- The first **8 stories** are the baseline: all difficulty **1 or 2** (already written).
- From story 9 on, **each story is 0.5 harder than the one before** (story 9 = 2.5, story 10 = 3, story 11 = 3.5 …).
  Two stories a day means +1 per day. `npm test` enforces this (`difficulty ramp` in `src/data/content.test.ts`).
- The scale **stops at 10** (the top of A1). When a story reaches 10, keep writing at 10 and say clearly in the
  run report: *"A1 scale complete. Waiting for the owner's go to start A2."* Do **not** start A2 on your own.

What a story at each step may contain (guide, adjust with research and common sense; the numbers are limits):

| Difficulty | Max words | Sentences | Grammar and features |
|---|---|---|---|
| 1–2 | 100–130 | 3–8 words | present tense of very common verbs, de/het, een, ik/jij/hij…, simple questions, numbers to 10, polite phrases |
| 3–4 | 130–160 | 4–10 words | modal verbs (willen, kunnen, moeten), separable verbs, plurals, adjectives (groot/grote), clock times, prices, er is/er zijn, imperatives, en/maar/want |
| 5–6 | 160–180 | 5–11 words | question words (waarom, wanneer, hoe laat), simple comparisons (groter dan), ik ga + infinitive for plans, more dialogue, larger vocabulary |
| 7–8 | 180 | 6–12 words | first perfect-tense chunks (ik heb gegeten, ik ben geweest), omdat/dus in short sentences, time words (gisteren, vorige week) |
| 9–10 | 180 | up to ~14 words | short connected paragraphs mixing present, perfect and gaan-future, idioms glossed (gezellig), two cultural details |

Hard limits (tests check them): at most `min(180, 70 + 30 × difficulty)` words, and at most 3 minutes to read.
Introduce **one new grammar feature at a time** and teach it with a grammar pill the first time it appears.

## What every story contains

Follow the existing stories in `src/data/stories.ts` exactly (same fields). Append new stories at the **end** of the array.

1. `id` (kebab-case, unique), `title` (Dutch), `titleEn` (a **direct, literal** translation of the title: "Een dag van Emma" is
   "A day of Emma", not an idiomatic rewrite), `emoji`, `topic`, `level: "A1"`, `difficulty`.
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

## Names

Use friendly, **non-controversial** first names. Mix Dutch and Turkish names, for example:
- Dutch: Emma, Sara, Tom, Daan, Lisa, Noor, Eva, Bram, Sem, Julia, Finn, Lotte, Thijs, Fleur, Lars, Anna, Jan.
- Turkish: Volkan, Özkan, Deniz, Beyza, Buket, Elif, Mert, Selin, Can, Emre, Zeynep, Kerem, Defne.

Never use the names of politicians, religious figures, celebrities or anyone in the news. Don't tie a name to a stereotype.
(The Dutch voice reads Turkish names with Dutch pronunciation. That is acceptable.)

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
