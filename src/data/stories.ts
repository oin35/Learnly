import type { Story } from "../types";

/**
 * A1 stories. Keep each under ~150 words (about 3 minutes for a beginner).
 * Grammar pills are marked inline as {{phrase|pill-id}} (see data/pills.ts).
 */
export const stories: Story[] = [
  {
    id: "konijn-wortel",
    title: "Het konijn en de wortel",
    titleEn: "The rabbit and the carrot",
    emoji: "🐰",
    topic: "Animals",
    level: "A1",
    intro: {
      words: ["wortel", "tuin", "vogel", "honger", "blij"],
      pills: ["dim", "have"],
    },
    paragraphs: [
      {
        nl: "Het is ochtend. {{Het konijntje|dim}} heet Bram. {{Bram heeft honger.|have}} {{Hij wil een wortel.|modal}}",
        en: "It is morning. The little rabbit is called Bram. Bram is hungry. He wants a carrot.",
      },
      {
        nl: "Bram kijkt in {{de tuin|art}}. Hij ziet {{geen wortel|neg}}. Hij ziet een bloem, een boom en een vogel.",
        en: "Bram looks in the garden. He sees no carrot. He sees a flower, a tree and a bird.",
      },
      {
        nl: "\"{{Waar is de wortel?|q}}\" vraagt Bram. De vogel zegt: \"{{Kijk bij het huis!|imp}}\"",
        en: "\"Where is the carrot?\" asks Bram. The bird says: \"Look by the house!\"",
      },
      {
        nl: "Bram springt naar het huis. {{Daar staat een grote, oranje wortel!|v2}} \"Dank je wel, vogel!\" zegt Bram. Hij eet de wortel en is blij.",
        en: "Bram jumps to the house. There stands a big, orange carrot! \"Thank you, bird!\" says Bram. He eats the carrot and is happy.",
      },
    ],
    quiz: [
      { q: "What does Bram want?", options: ["A carrot", "A flower", "A bird"], answer: 0 },
      { q: "Who tells Bram where to look?", options: ["A tree", "A bird", "A rabbit"], answer: 1 },
    ],
  },
  {
    id: "hoofdsteden",
    title: "Hoofdsteden van Europa",
    titleEn: "Capital cities of Europe",
    emoji: "🌍",
    topic: "Geography",
    level: "A1",
    intro: {
      words: ["hoofdstad", "land", "stad", "mens", "wonen"],
      pills: ["plural", "erzijn"],
    },
    paragraphs: [
      {
        nl: "Europa heeft veel {{landen|plural}}. Elk land heeft een hoofdstad. Dat is de grote stad van het land.",
        en: "Europe has many countries. Every country has a capital. That is the big city of the country.",
      },
      {
        nl: "Nederland ligt in Europa. De hoofdstad is Amsterdam. {{Er zijn veel fietsen en grachten.|erzijn}} Veel mensen wonen daar.",
        en: "The Netherlands is in Europe. The capital is Amsterdam. There are many bicycles and canals. Many people live there.",
      },
      {
        nl: "België is een buurland van Nederland. De hoofdstad is Brussel. {{In Brussel praten mensen Frans en Nederlands.|v2}}",
        en: "Belgium is a neighbouring country of the Netherlands. The capital is Brussels. In Brussels people speak French and Dutch.",
      },
      {
        nl: "Frankrijk is een groot land. De hoofdstad is Parijs. In Parijs staat de Eiffeltoren. Duitsland ligt naast Nederland. De hoofdstad is Berlijn. {{Welke hoofdstad wil jij zien?|q}}",
        en: "France is a big country. The capital is Paris. In Paris stands the Eiffel Tower. Germany lies next to the Netherlands. The capital is Berlin. Which capital do you want to see?",
      },
    ],
    quiz: [
      { q: "What is the capital of the Netherlands?", options: ["Amsterdam", "Brussels", "Berlin"], answer: 0 },
      { q: "Which country lies next to the Netherlands?", options: ["France", "Germany", "Italy"], answer: 1 },
    ],
  },
  {
    id: "in-het-cafe",
    title: "In het café",
    titleEn: "In the café",
    emoji: "☕",
    topic: "Daily life",
    level: "A1",
    intro: {
      words: ["koffie", "ober", "alstublieft", "kosten", "betalen"],
      pills: ["modal", "polite"],
    },
    paragraphs: [
      {
        nl: "Sara zit in een café. {{Ze heeft dorst.|have}} De ober komt naar haar tafel.",
        en: "Sara sits in a café. She is thirsty. The waiter comes to her table.",
      },
      {
        nl: "\"Goedemiddag! {{Wat wilt u drinken?|polite}}\" vraagt de ober. \"{{Ik wil graag een koffie en een appeltaart, alstublieft,|modal}}\" zegt Sara.",
        en: "\"Good afternoon! What would you like to drink?\" asks the waiter. \"I would like a coffee and an apple pie, please,\" says Sara.",
      },
      {
        nl: "De ober brengt de koffie en de appeltaart. \"Alstublieft!\" \"Dank u wel!\" zegt Sara. Daarna vraagt ze: \"{{Wat kost het?|q}}\" \"Het kost {{zeven euro vijftig.|numbers}}\" Sara betaalt en zegt: \"Tot ziens!\"",
        en: "The waiter brings the coffee and the apple pie. \"Here you are!\" \"Thank you very much!\" says Sara. Afterwards she asks: \"What does it cost?\" \"It costs seven euros fifty.\" Sara pays and says: \"See you!\"",
      },
    ],
    quiz: [
      { q: "What does Sara order?", options: ["Tea and bread", "Coffee and apple pie", "Water and soup"], answer: 1 },
      { q: "How much does it cost?", options: ["€5.50", "€7.50", "€17.50"], answer: 1 },
    ],
  },
  {
    id: "een-dag-van-emma",
    title: "Een dag van Emma",
    titleEn: "A day in Emma's life",
    emoji: "🚲",
    topic: "Daily life",
    level: "A1",
    intro: {
      words: ["werk", "middag", "avond", "koken", "fietsen"],
      pills: ["sep", "time"],
    },
    paragraphs: [
      {
        nl: "{{Emma staat om zeven uur op.|sep}} Ze drinkt thee en eet brood met kaas.",
        en: "Emma gets up at seven o'clock. She drinks tea and eats bread with cheese.",
      },
      {
        nl: "{{Om acht uur gaat ze naar haar werk.|v2}} Ze fietst. Het werk is {{niet ver.|neg}}",
        en: "At eight o'clock she goes to her work. She cycles. The work is not far.",
      },
      {
        nl: "Om twaalf uur eet ze een salade. In de middag werkt ze weer. {{Om zes uur|time}} gaat ze naar huis.",
        en: "At twelve o'clock she eats a salad. In the afternoon she works again. At six o'clock she goes home.",
      },
      {
        nl: "In de avond kookt ze soep. Daarna kijkt ze televisie. Om elf uur gaat ze naar bed. Welterusten, Emma!",
        en: "In the evening she cooks soup. Afterwards she watches television. At eleven o'clock she goes to bed. Good night, Emma!",
      },
    ],
    quiz: [
      { q: "How does Emma go to work?", options: ["By bike", "By train", "On foot"], answer: 0 },
      { q: "What does she cook in the evening?", options: ["Salad", "Soup", "Bread"], answer: 1 },
    ],
  },
  {
    id: "op-de-markt",
    title: "Op de markt",
    titleEn: "At the market",
    emoji: "🍎",
    topic: "Shopping",
    level: "A1",
    intro: {
      words: ["markt", "kopen", "duur", "lekker", "hoeveel"],
      pills: ["q", "plural"],
    },
    paragraphs: [
      {
        nl: "Tom is op de markt. {{Hij wil appels, kaas en brood kopen.|modal}}",
        en: "Tom is at the market. He wants to buy apples, cheese and bread.",
      },
      {
        nl: "\"Goedemorgen! Ik wil graag {{drie appels,|plural}}\" zegt Tom. \"Natuurlijk! Dat is twee euro.\" \"En ik wil ook een stuk kaas.\"",
        en: "\"Good morning! I would like three apples,\" says Tom. \"Of course! That is two euros.\" \"And I also want a piece of cheese.\"",
      },
      {
        nl: "\"{{Hoeveel kost de kaas?|q}}\" \"Vijf euro.\" \"Dat is duur!\" zegt Tom. \"Nee, het is lekker en vers,\" zegt de man. Tom koopt de kaas. {{Nu heeft hij appels, kaas en brood.|v2}} Hij is blij.",
        en: "\"How much does the cheese cost?\" \"Five euros.\" \"That is expensive!\" says Tom. \"No, it is tasty and fresh,\" says the man. Tom buys the cheese. Now he has apples, cheese and bread. He is happy.",
      },
    ],
    quiz: [
      { q: "What does Tom want to buy?", options: ["Fish and milk", "Apples, cheese and bread", "Flowers"], answer: 1 },
      { q: "Does Tom buy the cheese?", options: ["Yes", "No", "The story doesn't say"], answer: 0 },
    ],
  },
  {
    id: "mijn-familie",
    title: "Mijn familie",
    titleEn: "My family",
    emoji: "👨‍👩‍👧‍👦",
    topic: "People",
    level: "A1",
    intro: {
      words: ["familie", "vader", "moeder", "broer", "zus"],
      pills: ["be", "poss"],
    },
    paragraphs: [
      {
        nl: "Ik heet Lisa. {{Ik ben twintig jaar oud.|be}} {{Ik woon in Utrecht.|present}} Dit is mijn familie.",
        en: "My name is Lisa. I am twenty years old. I live in Utrecht. This is my family.",
      },
      {
        nl: "{{Mijn vader|poss}} heet Jan en mijn moeder heet Anna. {{Ik heb ook een broer en een zus.|have}} Mijn broer heet Daan en mijn zus heet Eva.",
        en: "My father is called Jan and my mother is called Anna. I also have a brother and a sister. My brother is called Daan and my sister is called Eva.",
      },
      {
        nl: "We hebben een hond. De hond heet Max. Max is groot en hij is lief.",
        en: "We have a dog. The dog is called Max. Max is big and he is sweet.",
      },
      {
        nl: "{{Op zondag eten we samen.|v2}} We zijn blij. Ik hou van mijn familie.",
        en: "On Sunday we eat together. We are happy. I love my family.",
      },
    ],
    quiz: [
      { q: "Where does Lisa live?", options: ["Amsterdam", "Utrecht", "Berlin"], answer: 1 },
      { q: "What is the dog called?", options: ["Max", "Daan", "Jan"], answer: 0 },
    ],
  },
  {
    id: "het-weer",
    title: "Het weer",
    titleEn: "The weather",
    emoji: "🌧️",
    topic: "Daily life",
    level: "A1",
    intro: {
      words: ["regen", "koud", "warm", "zon", "paraplu"],
      pills: ["weather", "neg"],
    },
    paragraphs: [
      {
        nl: "Het is maandag. {{Buiten regent het.|weather}} Het is koud en er is veel wind.",
        en: "It is Monday. Outside it is raining. It is cold and there is a lot of wind.",
      },
      {
        nl: "Noor staat bij het raam. Ze ziet de regen. \"{{Ik wil niet naar buiten,|neg}}\" zegt ze. {{Maar ze moet naar school.|modal}} Ze pakt haar paraplu en haar jas.",
        en: "Noor stands by the window. She sees the rain. \"I don't want to go outside,\" she says. But she has to go to school. She takes her umbrella and her coat.",
      },
      {
        nl: "Op school zegt de leraar: \"Morgen is het mooi weer. De zon schijnt en het is warm.\" Noor lacht. \"{{Dan fiets ik naar het park!|v2}}\" zegt ze.",
        en: "At school the teacher says: \"Tomorrow the weather is nice. The sun shines and it is warm.\" Noor laughs. \"Then I will cycle to the park!\" she says.",
      },
    ],
    quiz: [
      { q: "What is the weather like on Monday?", options: ["Sunny", "Rainy and cold", "Hot"], answer: 1 },
      { q: "What will Noor do tomorrow?", options: ["Stay at home", "Take the bus", "Cycle to the park"], answer: 2 },
    ],
  },
  {
    id: "de-weg-vragen",
    title: "De weg vragen",
    titleEn: "Asking for directions",
    emoji: "🚉",
    topic: "Daily life",
    level: "A1",
    intro: {
      words: ["station", "rechtdoor", "links", "naast", "ver"],
      pills: ["imp", "q"],
    },
    paragraphs: [
      {
        nl: "Ali is nieuw in de stad. Hij zoekt het station. Hij vraagt een vrouw: \"Pardon, {{waar is het station?|q}}\"",
        en: "Ali is new in the city. He is looking for the station. He asks a woman: \"Excuse me, where is the station?\"",
      },
      {
        nl: "\"{{Ga rechtdoor,|imp}}\" zegt de vrouw. \"Dan ga je links bij de kerk. Het station is naast de supermarkt.\" \"{{Is het ver?|q}}\" \"Nee, het is vijf minuten lopen.\"",
        en: "\"Go straight on,\" says the woman. \"Then you go left at the church. The station is next to the supermarket.\" \"Is it far?\" \"No, it is five minutes' walk.\"",
      },
      {
        nl: "\"{{Dank u wel!|polite}}\" zegt Ali. Hij loopt rechtdoor, gaat links bij de kerk en ziet het station. De trein vertrekt om tien uur. Ali is op tijd.",
        en: "\"Thank you very much!\" says Ali. He walks straight on, goes left at the church and sees the station. The train leaves at ten o'clock. Ali is on time.",
      },
    ],
    quiz: [
      { q: "Where is the station?", options: ["Next to the church", "Next to the supermarket", "Next to the park"], answer: 1 },
      { q: "How far is it?", options: ["5 minutes", "15 minutes", "50 minutes"], answer: 0 },
    ],
  },
];
