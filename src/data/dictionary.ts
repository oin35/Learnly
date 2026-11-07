import type { DictEntry, Pos } from "../types";

type Art = "de" | "het";

const e = (nl: string, en: string, pos: Pos, forms: string[] = [], article?: Art): DictEntry => ({
  nl,
  en,
  pos,
  article,
  forms: [nl.toLowerCase(), ...forms],
});
const n = (article: Art, nl: string, en: string, ...forms: string[]) => e(nl, en, "noun", forms, article);
const v = (nl: string, en: string, ...forms: string[]) => e(nl, en, "verb", forms);
const adj = (nl: string, en: string, ...forms: string[]) => e(nl, en, "adj", forms);
const adv = (nl: string, en: string, ...forms: string[]) => e(nl, en, "adv", forms);
const prep = (nl: string, en: string, ...forms: string[]) => e(nl, en, "prep", forms);
const pron = (nl: string, en: string, ...forms: string[]) => e(nl, en, "pron", forms);
const num = (nl: string, en: string, ...forms: string[]) => e(nl, en, "num", forms);
const phr = (nl: string, en: string, ...forms: string[]) => e(nl, en, "phrase", forms);
const name = (nl: string, en: string) => e(nl, en, "name");

export const dictionary: DictEntry[] = [
  // ── Nouns ──────────────────────────────────────────
  n("de", "ochtend", "morning"),
  n("de", "honger", "hunger"),
  n("de", "dorst", "thirst"),
  n("de", "wortel", "carrot", "wortels"),
  n("de", "tuin", "garden"),
  n("de", "bloem", "flower"),
  n("de", "boom", "tree"),
  n("de", "vogel", "bird"),
  n("het", "huis", "house, home", "huizen"),
  n("het", "land", "country, land", "landen"),
  n("de", "hoofdstad", "capital city"),
  n("de", "stad", "city, town"),
  n("de", "fiets", "bicycle (plural: fietsen)", "fietsen"),
  n("de", "gracht", "canal (in a city)", "grachten"),
  n("de", "mens", "person (plural: mensen = people)", "mensen"),
  n("het", "buurland", "neighbouring country"),
  n("de", "appel", "apple", "appels"),
  n("de", "appeltaart", "apple pie"),
  n("de", "koffie", "coffee"),
  n("de", "ober", "waiter"),
  n("de", "tafel", "table"),
  n("het", "café", "café"),
  n("de", "thee", "tea"),
  n("het", "brood", "bread"),
  n("de", "kaas", "cheese"),
  n("het", "werk", "work, job"),
  n("de", "salade", "salad"),
  n("de", "middag", "afternoon"),
  n("de", "avond", "evening"),
  n("de", "soep", "soup"),
  n("de", "televisie", "television"),
  n("het", "bed", "bed"),
  n("de", "markt", "market"),
  n("het", "stuk", "piece"),
  n("de", "man", "man"),
  n("de", "familie", "family"),
  n("de", "vader", "father"),
  n("de", "moeder", "mother"),
  n("de", "broer", "brother"),
  n("de", "zus", "sister"),
  n("de", "hond", "dog"),
  n("de", "zondag", "Sunday"),
  n("de", "maandag", "Monday"),
  n("de", "wind", "wind"),
  n("het", "raam", "window"),
  n("de", "regen", "rain"),
  n("de", "school", "school"),
  n("de", "leraar", "teacher"),
  n("de", "zon", "sun"),
  n("het", "park", "park"),
  n("de", "jas", "coat"),
  n("de", "paraplu", "umbrella"),
  n("het", "station", "station"),
  n("de", "vrouw", "woman"),
  n("de", "kerk", "church"),
  n("de", "supermarkt", "supermarket"),
  n("de", "trein", "train"),
  n("de", "tijd", "time"),
  n("de", "minuut", "minute", "minuten"),
  n("het", "uur", "hour; o'clock"),
  n("de", "euro", "euro"),
  n("het", "jaar", "year"),
  n("het", "konijn", "rabbit"),
  n("het", "konijntje", "little rabbit"),
  n("de", "eiffeltoren", "Eiffel Tower"),

  // ── Names & places ─────────────────────────────────
  name("Ali", "Ali (a name)"),
  name("Anna", "Anna (a name)"),
  name("Bram", "Bram (a name)"),
  name("Daan", "Daan (a name)"),
  name("Emma", "Emma (a name)"),
  name("Eva", "Eva (a name)"),
  name("Jan", "Jan (a name)"),
  name("Lisa", "Lisa (a name)"),
  name("Max", "Max (a name)"),
  name("Noor", "Noor (a name)"),
  name("Sara", "Sara (a name)"),
  name("Tom", "Tom (a name)"),
  name("Amsterdam", "Amsterdam, capital of the Netherlands"),
  name("België", "Belgium"),
  name("Berlijn", "Berlin"),
  name("Brussel", "Brussels"),
  name("Duitsland", "Germany"),
  name("Europa", "Europe"),
  name("Frankrijk", "France"),
  name("Nederland", "the Netherlands"),
  name("Parijs", "Paris"),
  name("Utrecht", "Utrecht (a Dutch city)"),

  // ── Verbs ──────────────────────────────────────────
  v("zijn", "to be", "ben", "bent", "is"),
  v("hebben", "to have", "heb", "hebt", "heeft"),
  v("heten", "to be called", "heet"),
  v("willen", "to want", "wil", "wilt"),
  v("moeten", "to have to, must", "moet"),
  v("kijken", "to look, to watch", "kijk", "kijkt"),
  v("zien", "to see", "ziet"),
  v("vragen", "to ask", "vraagt"),
  v("zeggen", "to say", "zegt"),
  v("springen", "to jump", "springt"),
  v("eten", "to eat", "eet"),
  v("staan", "to stand", "staat"),
  v("liggen", "to lie, to be located", "ligt"),
  v("wonen", "to live (somewhere)", "woon"),
  v("praten", "to talk, to speak"),
  v("brengen", "to bring", "brengt"),
  v("komen", "to come", "komt"),
  v("betalen", "to pay", "betaalt"),
  v("kosten", "to cost", "kost"),
  v("drinken", "to drink", "drinkt"),
  v("fietsen", "to cycle", "fietst"),
  v("gaan", "to go", "ga", "gaat"),
  v("werken", "to work", "werkt"),
  v("koken", "to cook", "kookt"),
  v("kopen", "to buy", "koopt"),
  v("zitten", "to sit", "zit"),
  v("lachen", "to laugh", "lacht"),
  v("pakken", "to take, to grab", "pakt"),
  v("schijnen", "to shine", "schijnt"),
  v("regenen", "to rain", "regent"),
  v("lopen", "to walk", "loopt"),
  v("zoeken", "to look for", "zoekt"),
  v("vertrekken", "to leave, to depart", "vertrekt"),
  v("houden", "to hold; houden van = to love", "hou"),

  // ── Adjectives & adverbs ───────────────────────────
  adj("groot", "big, large", "grote"),
  adj("blij", "happy"),
  adj("oranje", "orange"),
  adj("duur", "expensive"),
  adj("lekker", "tasty, nice"),
  adj("vers", "fresh"),
  adj("lief", "sweet, kind"),
  adj("koud", "cold"),
  adj("warm", "warm, hot"),
  adj("mooi", "beautiful, nice"),
  adj("nieuw", "new"),
  adj("oud", "old"),
  adj("ver", "far"),
  adj("veel", "many, much, a lot"),
  adj("elk", "every, each"),
  adj("frans", "French"),
  adj("nederlands", "Dutch"),
  adv("buiten", "outside"),
  adv("daar", "there"),
  adv("daarna", "afterwards"),
  adv("dan", "then"),
  adv("ook", "also, too"),
  adv("samen", "together"),
  adv("nu", "now"),
  adv("weer", "weather (also: again)"),
  adv("natuurlijk", "of course, naturally"),
  adv("graag", "gladly; ik wil graag = I would like"),
  adv("niet", "not"),
  adv("links", "left"),
  adv("rechtdoor", "straight ahead"),
  adv("morgen", "tomorrow (also: morning)"),
  adv("er", "there (e.g. er is = there is)"),
  adv("nee", "no"),
  adv("wel", "well (dank je wel = thank you very much)"),
  adv("hoeveel", "how much, how many"),
  adv("waar", "where"),
  adv("wat", "what"),
  adv("welke", "which"),

  // ── Pronouns, articles, conjunctions, prepositions ─
  pron("ik", "I"),
  pron("jij", "you (informal)", "je"),
  pron("u", "you (formal)"),
  pron("hij", "he"),
  pron("ze", "she; they"),
  pron("we", "we", "wij"),
  pron("het", "the (for het-words); it"),
  pron("de", "the (for de-words)"),
  pron("een", "a, an (also: one)"),
  pron("geen", "no, not any"),
  pron("dat", "that"),
  pron("dit", "this"),
  pron("mijn", "my"),
  pron("haar", "her"),
  e("en", "and", "conj"),
  e("maar", "but", "conj"),
  prep("in", "in"),
  prep("op", "on, at"),
  prep("bij", "at, by, near"),
  prep("naar", "to, towards"),
  prep("naast", "next to"),
  prep("van", "of, from"),
  prep("met", "with"),
  prep("om", "at (a time); around"),
  prep("tot", "until, up to"),

  // ── Numbers ────────────────────────────────────────
  num("twee", "two"),
  num("drie", "three"),
  num("vijf", "five"),
  num("zes", "six"),
  num("zeven", "seven"),
  num("acht", "eight"),
  num("tien", "ten"),
  num("elf", "eleven"),
  num("twaalf", "twelve"),
  num("twintig", "twenty"),
  num("vijftig", "fifty"),

  // ── Everyday phrases & words ───────────────────────
  phr("goedemorgen", "good morning"),
  phr("goedemiddag", "good afternoon"),
  phr("welterusten", "good night"),
  phr("pardon", "excuse me, sorry"),
  phr("alstublieft", "please; here you are (formal)", "alsjeblieft"),
  phr("dank", "thanks; dank je wel = thank you"),
  phr("ziens", "seeing; tot ziens = see you / goodbye"),
];

/** Lookup table: written form (lowercase) → dictionary entry */
const index = new Map<string, DictEntry>();
for (const entry of dictionary) {
  for (const form of entry.forms) {
    if (!index.has(form)) index.set(form, entry);
  }
}

export function lookup(word: string): DictEntry | undefined {
  return index.get(word.toLowerCase().normalize("NFC"));
}

export function entryId(entry: DictEntry): string {
  return entry.nl.toLowerCase();
}

export function entryById(id: string): DictEntry | undefined {
  return dictionary.find((d) => entryId(d) === id);
}

/** "de wortel" / "het huis" / "kijken" */
export function displayWord(entry: Pick<DictEntry, "nl" | "article">): string {
  return entry.article ? `${entry.article} ${entry.nl}` : entry.nl;
}
