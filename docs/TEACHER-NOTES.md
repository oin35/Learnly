# Teacher notes

What the daily runs have learned. **Read this at the start of every run; add to it at the end.**
Keep entries short and practical: what went wrong or went well, and what to do next time.

- Names: people are only Tom and Lisa; cats are Leo, dogs Coco, other animals and things get creative names (owner's decision). The Dutch voice mispronounces other people's names, Turkish ones especially.
- Keep paragraphs short (2–4 sentences); each one becomes one audio clip and one highlighted block.
- The grammar pills must teach something the story actually shows; every pill needs a story that uses it.
- Check de/het for every new noun, even "obvious" ones. When unsure, look it up and note the source.
- Run 1: the tokenizer counts digits as words and the voice may misread numbers, so keep years/prices as words or in the insight only. Inflected forms (woont, houdt, mooie, elke, kunt) must be added as dictionary forms; test failures list them. The dictionary lemma 'van' already exists as a preposition, so do not add it as a name.
- Check that a sentence says what it means: "Ze heeft nu een jaar lang tijd voor kunst" (Museumkaart story) is stilted; a card gives *toegang* (access), not time. Prefer "Nu kan ze een jaar lang naar de musea."
- Run 2: a pill listed in the story intro must also be marked in that story's text (modal was missing in 'Naar Friesland'). Pack numbers keep rising when the owner adds packs (pack-002 existed), so check public/audio before publishing and send only the pack the run created.
- Run 3: adding a word that already exists as another part of speech (lang, oud, weg) breaks the unique-lemma test; add the new form to the existing entry instead. Avoid an apostrophe-s start ("'s avonds") because the tokenizer cannot look it up.
- Run 4: when an intro key word or pill is not found, the test names it; fix by swapping the intro word or marking the pill in the text. Sources often disagree on fun 'facts' (Giethoorn 'no roads'): state only the part all sources support.
- Questions test the language, not the plot (owner's rule from story 17 on): quote Dutch in “ ” or give Dutch options; ask for meaning in context, the right verb form, word order, de/het, or what to say. Never "When is the museum open?"-style memory questions.
- Run 5: write quiz questions together with the story: quote a Dutch word/sentence in “ ” (all its words must be in the dictionary) or give Dutch options; one question about a key word, one about the pill. 'Which sentence is correct?' with three Dutch word-order options works well and passes the test.
- Run 6: an 'obvious' date or name from memory (stroopwafel 1784, baker Kamphuisen) was not in any source: always verify, then drop what cannot be confirmed. Folklore should be worded as folklore. When a word has two meanings under one spelling (zijn = to be / his), note both in the one dictionary entry because lemma ids must be unique.
