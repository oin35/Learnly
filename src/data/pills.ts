import type { Pill } from "../types";

/** Grammar pills: bite-sized, practical explanations that appear inside the stories. */
export const pills: Pill[] = [
  {
    id: "art",
    title: "De or het?",
    summary: "Two words for “the”",
    points: [
      "Dutch has two words for “the”: de and het.",
      "About 3 out of 4 nouns use de. Only about 1 in 4 uses het.",
      "“A / an” is always een, for both de- and het-words.",
    ],
    examples: [
      { nl: "de tuin, de boom, de vogel", en: "the garden, the tree, the bird" },
      { nl: "het huis, het station", en: "the house, the station" },
    ],
    tip: "Always learn a noun together with its article: “de wortel”, “het huis”. When unsure, guess de.",
  },
  {
    id: "dim",
    title: "Small things: -je",
    summary: "Make a noun small with -je",
    points: [
      "Add -je (or -tje, -pje) to make something small or cute.",
      "Every -je word is a het-word, even if the original noun was de.",
      "Dutch speakers use -je a lot, also to sound friendly: een kopje koffie.",
    ],
    examples: [
      { nl: "het konijn → het konijntje", en: "the rabbit → the little rabbit" },
      { nl: "het huis → het huisje", en: "the house → the little house" },
    ],
    tip: "“Een momentje” (one little moment) is a very Dutch way to say “wait a second”.",
  },
  {
    id: "be",
    title: "To be: zijn",
    summary: "ik ben · jij bent · hij is · wij zijn",
    points: [
      "Zijn is irregular, so learn it by heart.",
      "ik ben · jij/je bent · hij/zij/het is · wij/we zijn · jullie zijn · zij zijn",
      "Use it for age, feelings and descriptions: Ik ben twintig jaar oud. Ik ben blij.",
      "To give your name you can say “Ik heet …” (literally: I am called).",
    ],
    examples: [
      { nl: "Ik ben Lisa. Zij is Eva.", en: "I am Lisa. She is Eva." },
      { nl: "Wij zijn blij.", en: "We are happy." },
    ],
  },
  {
    id: "have",
    title: "To have: hebben",
    summary: "ik heb · jij hebt · hij heeft · wij hebben",
    points: [
      "ik heb · jij hebt · hij/zij/het heeft · wij/we hebben · jullie hebben · zij hebben",
      "In questions with jij, the -t disappears: Heb jij een hond?",
      "Dutch says “I have hunger / thirst” where English says “I am hungry / thirsty”.",
    ],
    examples: [
      { nl: "Ik heb honger.", en: "I am hungry." },
      { nl: "Ze heeft dorst.", en: "She is thirsty." },
      { nl: "We hebben een hond.", en: "We have a dog." },
    ],
  },
  {
    id: "present",
    title: "Present tense in 3 steps",
    summary: "stem · stem + t · infinitive",
    points: [
      "1. Take the infinitive and remove -en to get the stem: wonen → woon.",
      "2. ik + stem (ik woon). jij / hij / zij + stem + t (hij woont).",
      "3. wij / jullie / zij + the infinitive (wij wonen).",
      "With jij after the verb, drop the t: Woon jij in Utrecht?",
      "The Dutch present tense also covers “I am living” (no -ing form needed).",
    ],
    examples: [
      { nl: "Ik woon in Utrecht.", en: "I live in Utrecht." },
      { nl: "Hij werkt in een café.", en: "He works in a café." },
      { nl: "Wij eten brood.", en: "We eat bread." },
    ],
  },
  {
    id: "v2",
    title: "The verb comes second",
    summary: "Start with time or place → verb, then subject",
    points: [
      "In a normal sentence the verb is always the second element.",
      "If you start with something else (time, place, “dan”), the subject moves behind the verb.",
      "Ik eet brood. → Vandaag eet ik brood. (not: Vandaag ik eet brood)",
    ],
    examples: [
      { nl: "Op zondag eten we samen.", en: "On Sunday we eat together." },
      { nl: "Daar staat een wortel.", en: "There stands a carrot." },
      { nl: "Dan fiets ik naar het park.", en: "Then I cycle to the park." },
    ],
    tip: "This single rule makes your Dutch sound much more natural.",
  },
  {
    id: "neg",
    title: "Niet or geen?",
    summary: "Two ways to say “no / not”",
    points: [
      "geen = “no / not any”. Use it before a noun that has een or no article: Ik zie geen wortel.",
      "niet = “not”. Use it for everything else: Het is niet ver. Ik wil niet naar buiten.",
      "Niet usually goes near the end of the sentence, after the verb and object.",
    ],
    examples: [
      { nl: "Ik heb geen fiets.", en: "I don't have a bike." },
      { nl: "Het werk is niet ver.", en: "The work is not far." },
    ],
  },
  {
    id: "q",
    title: "Asking questions",
    summary: "Verb first, or a question word first",
    points: [
      "Yes/no question: put the verb first. Is het ver? Heb jij een hond?",
      "Question words come first, then the verb: Waar is het station? Wat kost het? Hoeveel kost de kaas?",
      "Useful question words: wie (who), wat (what), waar (where), hoe (how), hoeveel (how much), wanneer (when), welke (which).",
    ],
    examples: [
      { nl: "Waar woon je?", en: "Where do you live?" },
      { nl: "Wat kost het?", en: "What does it cost?" },
      { nl: "Welke hoofdstad wil jij zien?", en: "Which capital do you want to see?" },
    ],
  },
  {
    id: "plural",
    title: "Plural: -en or -s",
    summary: "landen · appels",
    points: [
      "Most nouns add -en: land → landen, fiets → fietsen.",
      "Nouns ending in -el, -er, -em and small -je words add -s: appel → appels, ober → obers, konijntje → konijntjes.",
      "Mind the spelling: huis → huizen, stad → steden.",
      "After a number the noun is plural: drie appels.",
    ],
    examples: [
      { nl: "veel landen", en: "many countries" },
      { nl: "drie appels", en: "three apples" },
    ],
  },
  {
    id: "erzijn",
    title: "There is / there are",
    summary: "er is · er zijn",
    points: [
      "Er is + singular (or uncountable): Er is veel wind.",
      "Er zijn + plural: Er zijn veel fietsen.",
      "Er is very often shortens the sentence start; the verb stays in second place.",
    ],
    examples: [
      { nl: "Er is een café in de stad.", en: "There is a café in the city." },
      { nl: "Er zijn veel mensen.", en: "There are many people." },
    ],
  },
  {
    id: "modal",
    title: "Want, can, must",
    summary: "willen · kunnen · moeten + infinitive at the end",
    points: [
      "ik wil (want) · ik kan (can) · ik moet (must / have to).",
      "The second verb goes to the end of the sentence in the infinitive: Hij wil appels kopen.",
      "With movement the second verb can be left out: Ze moet naar school (… gaan).",
      "Ik wil graag … is the polite way to order or ask for something.",
    ],
    examples: [
      { nl: "Ik wil graag een koffie.", en: "I would like a coffee." },
      { nl: "Ik kan fietsen.", en: "I can cycle." },
      { nl: "Ze moet werken.", en: "She has to work." },
    ],
    tip: "“Ik wil graag …” is the most useful sentence for ordering in cafés and shops.",
  },
  {
    id: "polite",
    title: "You: je, jij or u",
    summary: "Informal vs. formal",
    points: [
      "je / jij: friends, family, children and people your age.",
      "u: strangers, older people, shop staff, official situations.",
      "u uses the same verb form as hij: u wilt, u heeft (jij wilt → je wilt).",
      "Dank je wel (informal) / Dank u wel (formal) mean “thank you very much”.",
    ],
    examples: [
      { nl: "Wat wilt u drinken?", en: "What would you like to drink? (formal)" },
      { nl: "Wat wil je drinken?", en: "What do you want to drink? (informal)" },
    ],
    tip: "When in doubt, start with u. People will often say: “Zeg maar je.”",
  },
  {
    id: "poss",
    title: "My, your, his, her",
    summary: "mijn · jouw · zijn · haar",
    points: [
      "mijn (my) · jouw / je (your) · zijn (his) · haar (her) · ons / onze (our) · jullie (your, plural) · hun (their)",
      "They do not change for de- or het-words (only ons/onze does).",
    ],
    examples: [
      { nl: "mijn vader, mijn moeder", en: "my father, my mother" },
      { nl: "haar werk", en: "her work" },
    ],
  },
  {
    id: "imp",
    title: "Commands",
    summary: "Use the verb stem, no pronoun",
    points: [
      "Take the stem of the verb and start the sentence with it: gaan → Ga! kijken → Kijk!",
      "Add alsjeblieft / alstublieft to be polite.",
      "Great for directions: Ga rechtdoor. Sla linksaf. Neem de trein.",
    ],
    examples: [
      { nl: "Ga rechtdoor.", en: "Go straight on." },
      { nl: "Kijk bij het huis!", en: "Look by the house!" },
    ],
  },
  {
    id: "sep",
    title: "Separable verbs",
    summary: "opstaan → ik sta … op",
    points: [
      "Many verbs have a prefix (op-, aan-, mee-, uit-) that jumps to the end of the sentence.",
      "Emma staat om zeven uur op.",
      "In the infinitive they stay together: Ik wil om zeven uur opstaan.",
    ],
    examples: [
      { nl: "Hij komt om tien uur aan.", en: "He arrives at ten o'clock." },
      { nl: "Ik neem mijn jas mee.", en: "I take my coat with me." },
    ],
  },
  {
    id: "numbers",
    title: "Numbers and prices",
    summary: "1–10 and euros",
    points: [
      "1 een · 2 twee · 3 drie · 4 vier · 5 vijf · 6 zes · 7 zeven · 8 acht · 9 negen · 10 tien",
      "Prices are said like this: €7,50 = zeven euro vijftig.",
      "Ask for the price with: Wat kost het? / Hoeveel kost dit?",
    ],
    examples: [
      { nl: "Het kost vijf euro.", en: "It costs five euros." },
    ],
  },
  {
    id: "time",
    title: "Telling the time",
    summary: "Om acht uur = at eight o'clock",
    points: [
      "Het is acht uur = It is eight o'clock.",
      "Om acht uur = at eight o'clock. Use om for a specific time.",
      "Remember the verb-second rule: Om acht uur gaat ze naar haar werk.",
    ],
    examples: [
      { nl: "Het is drie uur.", en: "It is three o'clock." },
      { nl: "De trein vertrekt om tien uur.", en: "The train leaves at ten o'clock." },
    ],
  },
  {
    id: "weather",
    title: "Weather with “het”",
    summary: "Het regent · Het is koud",
    points: [
      "For weather Dutch uses het as an empty subject: Het regent. Het is koud.",
      "It has no real meaning. You cannot leave it out.",
    ],
    examples: [
      { nl: "Het sneeuwt.", en: "It is snowing." },
      { nl: "Het is warm vandaag.", en: "It is warm today." },
    ],
  },
  {
    id: "adj",
    title: "Adjectives: groot or grote?",
    summary: "een groot museum · mooie schilderijen",
    points: [
      "An adjective before a noun usually gets an -e: de grote zaal, mooie schilderijen, mijn kleine zus.",
      "No -e when the noun is a het-word singular with een, or with no article: een groot museum, groot water.",
      "After the verb zijn the adjective never changes: Het museum is groot.",
      "Mind the spelling: groot → grote, mooi → mooie, klein → kleine.",
    ],
    examples: [
      { nl: "een groot museum", en: "a big museum" },
      { nl: "de kleine winkel", en: "the small shop" },
      { nl: "mooie schilderijen", en: "beautiful paintings" },
    ],
    tip: "The -e is the default (de grote zaal, mijn kleine zus). Only a het-word with een or no article drops it (een groot museum).",
  },
  {
    id: "conj",
    title: "And, but, because",
    summary: "en · maar · want",
    points: [
      "en = and, maar = but, want = because. They join two full sentences.",
      "After en, maar and want the word order does not change: the verb stays in second place.",
      "Use want to give a reason: Hij neemt de trein, want Lisa woont daar.",
      "Use maar for a contrast: Ik wil Fries leren, maar het is moeilijk.",
    ],
    examples: [
      { nl: "Het regent, maar ik ga naar buiten.", en: "It is raining, but I am going outside." },
      { nl: "Ik ben moe, want het is laat.", en: "I am tired, because it is late." },
    ],
    tip: "Want is for a reason, maar for a contrast, en for adding. Start simple: two short sentences with one of these words in between.",
  },
];

export const pillById = new Map(pills.map((p) => [p.id, p]));
