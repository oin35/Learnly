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
    difficulty: 1,
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
    difficulty: 2,
    insight: {
      title: "Amsterdam is the capital, but the government sits in The Hague",
      text: "Amsterdam is the capital of the Netherlands, but the government and the parliament are in The Hague (Den Haag), about an hour away by train. The king's working palace is in The Hague too.",
    },
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
    difficulty: 2,
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
    titleEn: "A day of Emma",
    emoji: "🚲",
    topic: "Daily life",
    level: "A1",
    difficulty: 2,
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
    difficulty: 2,
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
    difficulty: 1,
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
    difficulty: 2,
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
    difficulty: 2,
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
  {
    id: "het-rijksmuseum",
    title: "Het Rijksmuseum",
    titleEn: "The Rijksmuseum",
    emoji: "🖼️",
    topic: "Museums",
    level: "A1",
    difficulty: 2.5,
    insight: {
      title: "The Night Watch hangs in the Rijksmuseum",
      text: "Rembrandt finished The Night Watch (De Nachtwacht) in 1642. Today it hangs in the Rijksmuseum in Amsterdam, in the Gallery of Honour. Since 2021 you can see the whole painting again, because missing parts have been added around the original.",
    },
    intro: {
      words: ["museum", "schilderij", "kaartje", "zaal", "rij"],
      pills: ["time", "modal"],
    },
    paragraphs: [
      {
        nl: "Tom en Lisa zijn in Amsterdam. Ze gaan naar het Rijksmuseum. {{Het museum is open om negen uur.|time}} Er is al een rij.",
        en: "Tom and Lisa are in Amsterdam. They are going to the Rijksmuseum. The museum is open at nine o'clock. There is already a queue.",
      },
      {
        nl: "Tom koopt twee kaartjes. \"Alstublieft,\" zegt de vrouw. \"De zaal met De Nachtwacht is links.\" \"Dank u wel!\" zegt Tom.",
        en: "Tom buys two tickets. \"Here you are,\" says the woman. \"The room with The Night Watch is on the left.\" \"Thank you very much!\" says Tom.",
      },
      {
        nl: "In de zaal hangt een groot schilderij. Het is De Nachtwacht. {{Je kunt de mensen op het schilderij goed zien.|modal}} Het schilderij is heel oud.",
        en: "In the room hangs a big painting. It is The Night Watch. You can see the people in the painting well. The painting is very old.",
      },
      {
        nl: "Lisa maakt een foto. \"Wat mooi!\" zegt ze. Om twaalf uur eten ze een broodje in het café van het museum.",
        en: "Lisa takes a photo. \"How beautiful!\" she says. At twelve o'clock they eat a sandwich in the café of the museum.",
      },
    ],
    quiz: [
      { q: "When is the museum open?", options: ["At nine o'clock", "At twelve o'clock", "At ten o'clock"], answer: 0 },
      { q: "What is the big painting called?", options: ["The Night Watch", "The Girl", "The Sunflowers"], answer: 0 },
    ],
  },
  {
    id: "de-museumkaart",
    title: "De Museumkaart",
    titleEn: "The Museum card",
    emoji: "🎟️",
    topic: "Museums",
    level: "A1",
    difficulty: 3,
    insight: {
      title: "One card, more than 400 museums",
      text: "With a Dutch Museumkaart you get free entry to more than 400 museums in the Netherlands for one year. Some special exhibitions can still cost extra. Many Dutch people have one, so they visit museums often.",
    },
    intro: {
      words: ["museumkaart", "kunst", "vriend", "klein", "weekend"],
      pills: ["adj", "modal"],
    },
    paragraphs: [
      {
        nl: "Lisa woont in Utrecht. Ze houdt van kunst. {{Ze wil veel musea zien,|modal}} maar de kaartjes zijn duur.",
        en: "Lisa lives in Utrecht. She loves art. She wants to see many museums, but the tickets are expensive.",
      },
      {
        nl: "Een vriend zegt: \"Koop een Museumkaart! Met de kaart ga je een jaar lang naar meer dan vierhonderd musea.\" Lisa koopt de kaart. Ze is blij.",
        en: "A friend says: \"Buy a Museum card! With the card you go to more than four hundred museums for a year.\" Lisa buys the card. She is happy.",
      },
      {
        nl: "Dit weekend gaat ze naar een museum in Amsterdam. {{Het is een groot museum met mooie schilderijen.|adj}} In de kleine winkel koopt ze een kaart voor haar moeder.",
        en: "This weekend she goes to a museum in Amsterdam. It is a big museum with beautiful paintings. In the small shop she buys a card for her mother.",
      },
      {
        nl: "\"Ik wil elke week naar een museum gaan,\" zegt Lisa. Nu kan ze een jaar lang naar de musea.",
        en: "\"I want to go to a museum every week,\" says Lisa. Now she can go to the museums for a whole year.",
      },
    ],
    quiz: [
      { q: "Why does Lisa buy a Museumkaart?", options: ["Tickets are expensive", "Her mother asks her", "She works in a museum"], answer: 0 },
      { q: "Where does she go this weekend?", options: ["A shop", "A museum in Amsterdam", "A café"], answer: 1 },
    ],
  },
  {
    id: "naar-friesland",
    title: "Naar Friesland",
    titleEn: "To Friesland",
    emoji: "🚆",
    topic: "Provinces",
    level: "A1",
    difficulty: 3.5,
    insight: {
      title: "Friesland has its own official language",
      text: "Besides Dutch, Frisian (Fries) is an official language in the province of Friesland. Its capital Leeuwarden is called Ljouwert in Frisian, and signs in Friesland often show both names.",
    },
    intro: {
      words: ["taal", "naam", "bord", "eigen", "auto"],
      pills: ["conj", "modal"],
    },
    paragraphs: [
      {
        nl: "{{Tom wil Friesland zien.|modal}} Hij neemt de trein naar Leeuwarden, {{want Lisa woont daar.|conj}} Zij staat op het station.",
        en: "Tom wants to see Friesland. He takes the train to Leeuwarden, because Lisa lives there. She is at the station.",
      },
      {
        nl: "Ze gaan met de auto naar de stad. Bij de stad staat een groot bord met twee namen: Leeuwarden en Ljouwert. \"Wat is Ljouwert?\" vraagt Tom.",
        en: "They go to the city by car. At the city stands a big sign with two names: Leeuwarden and Ljouwert. \"What is Ljouwert?\" asks Tom.",
      },
      {
        nl: "\"Dat is Fries,\" zegt Lisa. \"Fries is een eigen taal, en veel mensen praten ook Nederlands.\"",
        en: "\"That is Frisian,\" says Lisa. \"Frisian is a language of its own, and many people also speak Dutch.\"",
      },
      {
        nl: "{{Tom wil een beetje Fries leren, maar het is moeilijk.|conj}} Lisa lacht. \"Eerst een kopje thee,\" zegt ze.",
        en: "Tom wants to learn a little Frisian, but it is difficult. Lisa laughs. \"First a cup of tea,\" she says.",
      },
    ],
    quiz: [
      { q: "Why does Tom take the train to Leeuwarden?", options: ["Lisa lives there", "He works there", "He wants to buy a car"], answer: 0 },
      { q: "What is Ljouwert?", options: ["A train station", "The Frisian name of Leeuwarden", "A cup of tea"], answer: 1 },
    ],
  },
  {
    id: "de-hunebedden",
    title: "De hunebedden",
    titleEn: "The hunebeds",
    emoji: "🪨",
    topic: "Provinces",
    level: "A1",
    difficulty: 4,
    insight: {
      title: "Drenthe, land of the hunebeds",
      text: "Of the 54 hunebeds (stone tombs) in the northern Netherlands, 52 are in the province of Drenthe. They are more than 5,000 years old and were built with big boulders that ice-age glaciers brought from Scandinavia. The capital of Drenthe is Assen.",
    },
    intro: {
      words: ["hunebed", "steen", "graf", "provincie", "zwaar"],
      pills: ["sep", "erzijn"],
    },
    paragraphs: [
      {
        nl: "Tom en Lisa zijn in Drenthe. Dat is een provincie in het noorden. De hoofdstad is Assen. Vandaag {{staan ze vroeg op,|sep}} want ze willen de hunebedden zien.",
        en: "Tom and Lisa are in Drenthe. That is a province in the north. The capital is Assen. Today they get up early, because they want to see the hunebeds.",
      },
      {
        nl: "Ze nemen water en brood mee. Het is mooi weer en ze fietsen door het bos. {{Er zijn veel bomen,|erzijn}} maar er zijn weinig mensen.",
        en: "They take water and bread with them. The weather is nice and they cycle through the forest. There are many trees, but there are few people.",
      },
      {
        nl: "Dan zien ze grote stenen op de grond. Dat is een hunebed. Een hunebed is een graf, en het is meer dan vijfduizend jaar oud. De stenen zijn heel zwaar.",
        en: "Then they see big stones on the ground. That is a hunebed. A hunebed is a tomb, and it is more than five thousand years old. The stones are very heavy.",
      },
      {
        nl: "In Drenthe liggen meer dan vijftig hunebedden. Lisa maakt een foto van een hunebed. Tom is moe, maar hij is blij.",
        en: "In Drenthe lie more than fifty hunebeds. Lisa takes a photo of a hunebed. Tom is tired, but he is happy.",
      },
    ],
    quiz: [
      { q: "What is a hunebed?", options: ["A forest path", "A tomb made of big stones", "A kind of bike"], answer: 1 },
      { q: "What do Tom and Lisa take with them?", options: ["Water and bread", "Tea and cheese", "An umbrella"], answer: 0 },
    ],
  },
  {
    id: "het-nieuwe-land",
    title: "Het nieuwe land",
    titleEn: "The new land",
    emoji: "🌱",
    topic: "Provinces",
    level: "A1",
    difficulty: 4.5,
    insight: {
      title: "Flevoland: land from the sea",
      text: "Flevoland is the youngest province of the Netherlands: it became a province on 1 January 1986. Almost all of its land was reclaimed from the former Zuiderzee, which was closed off by a dike in 1932. The capital is Lelystad, and the biggest city is Almere.",
    },
    intro: {
      words: ["provincie", "water", "dijk", "pompen", "nieuw"],
      pills: ["sep", "q"],
    },
    paragraphs: [
      {
        nl: "Tom en Lisa zijn in Flevoland. Het is de jongste provincie van Nederland. Het land is heel nieuw: het komt uit het water.",
        en: "Tom and Lisa are in Flevoland. It is the youngest province of the Netherlands. The land is very new: it comes out of the water.",
      },
      {
        nl: "\"{{Hoe komt het land uit het water?|q}}\" vraagt Tom. \"Mensen bouwen een dijk,\" zegt Lisa. \"{{Dan pompen ze het water weg.|sep}} Daarna is er droog land.\"",
        en: "\"How does the land come out of the water?\" asks Tom. \"People build a dike,\" says Lisa. \"Then they pump the water away. After that there is dry land.\"",
      },
      {
        nl: "{{Er zijn nu huizen, bossen en wegen.|erzijn}} De hoofdstad is Lelystad. Almere is een grote stad met veel jonge mensen.",
        en: "There are now houses, forests and roads. The capital is Lelystad. Almere is a big city with many young people.",
      },
      {
        nl: "Tom en Lisa fietsen over een lange dijk. Het is mooi weer en er is veel wind. Aan het eind van de dag eten ze een broodje in Lelystad.",
        en: "Tom and Lisa cycle over a long dike. The weather is nice and there is a lot of wind. At the end of the day they eat a sandwich in Lelystad.",
      },
    ],
    quiz: [
      { q: "How do people get dry land from the water?", options: ["They build a dike and pump the water away", "They wait for the sun", "They move the sea"], answer: 0 },
      { q: "What is the capital of Flevoland in the story?", options: ["Almere", "Lelystad", "Amsterdam"], answer: 1 },
    ],
  },
  {
    id: "student-in-groningen",
    title: "Student in Groningen",
    titleEn: "Student in Groningen",
    emoji: "🎓",
    topic: "Provinces",
    level: "A1",
    difficulty: 5,
    insight: {
      title: "Groningen: a city full of students",
      text: "Groningen is the biggest city in the north of the Netherlands. The University of Groningen was founded in 1614, and with its two higher-education institutions the city has around 60,000 students, nearly a quarter of its population.",
    },
    intro: {
      words: ["student", "universiteit", "kleiner", "bezoek", "kwart"],
      pills: ["comp", "sep"],
    },
    paragraphs: [
      {
        nl: "Lisa is student in Groningen. Dat is een stad in het noorden. {{De stad is kleiner dan Amsterdam,|comp}} maar er wonen veel jonge mensen.",
        en: "Lisa is a student in Groningen. That is a city in the north. The city is smaller than Amsterdam, but many young people live there.",
      },
      {
        nl: "Tom komt op bezoek. {{Hij komt om vier uur aan.|sep}} Lisa heeft twee fietsen. \"Jij kunt de oude fiets pakken,\" zegt ze.",
        en: "Tom comes to visit. He arrives at four o'clock. Lisa has two bicycles. \"You can take the old bike,\" she says.",
      },
      {
        nl: "Ze fietsen door de stad. Overal zie je studenten. \"Is de universiteit oud?\" vraagt Tom. \"Ja, ze is meer dan vierhonderd jaar oud,\" zegt Lisa. \"Bijna een kwart van de mensen in de stad is student.\"",
        en: "They cycle through the city. You see students everywhere. \"Is the university old?\" asks Tom. \"Yes, it is more than four hundred years old,\" says Lisa. \"Almost a quarter of the people in the city are students.\"",
      },
      {
        nl: "Die avond eten ze soep in de kleine kamer van Lisa. Tom is moe, maar blij. \"{{Groningen is kleiner dan Amsterdam, maar de stad is erg gezellig,|comp}}\" zegt hij.",
        en: "That evening they eat soup in Lisa's small room. Tom is tired, but happy. \"Groningen is smaller than Amsterdam, but the city is very cosy,\" he says.",
      },
    ],
    quiz: [
      { q: "How does Tom get to Lisa?", options: ["He cycles", "He arrives at four o'clock", "He stays at home"], answer: 1 },
      { q: "How old is the university according to Lisa?", options: ["More than 400 years", "About 40 years", "Exactly 100 years"], answer: 0 },
    ],
  },
  {
    id: "met-de-boot",
    title: "Met de boot",
    titleEn: "With the boat",
    emoji: "🛶",
    topic: "Provinces",
    level: "A1",
    difficulty: 5.5,
    insight: {
      title: "Giethoorn: a village of canals",
      text: "Giethoorn, in the province of Overijssel (capital: Zwolle), is famous for its canals, footbridges and quiet boats. In the old centre many people get around by boat, on foot or by bike. The canals come from peat that people dug up long ago.",
    },
    intro: {
      words: ["boot", "dorp", "brug", "varen", "ijsje"],
      pills: ["plan", "q"],
    },
    paragraphs: [
      {
        nl: "Tom en Lisa zijn in Overijssel. De hoofdstad is Zwolle, maar vandaag gaan ze naar een klein dorp: Giethoorn.",
        en: "Tom and Lisa are in Overijssel. The capital is Zwolle, but today they are going to a small village: Giethoorn.",
      },
      {
        nl: "Het dorp heeft veel water en veel bruggen. {{Ze gaan met een boot varen.|plan}} De boot is klein en stil.",
        en: "The village has a lot of water and many bridges. They are going to sail in a boat. The boat is small and quiet.",
      },
      {
        nl: "Veel mensen gaan hier met de boot. Er zijn ook fietspaden, maar er zijn weinig auto's. Tom ziet huizen met mooie tuinen aan het water.",
        en: "Many people go by boat here. There are also bike paths, but there are few cars. Tom sees houses with beautiful gardens by the water.",
      },
      {
        nl: "\"{{Hoe laat moeten we terug zijn?|q}}\" vraagt Tom. \"Om vijf uur,\" zegt de man van de boot. \"{{Dan ga ik nog een ijsje eten,|plan}}\" zegt Lisa.",
        en: "\"What time do we have to be back?\" asks Tom. \"At five o'clock,\" says the man from the boat. \"Then I am going to eat an ice cream first,\" says Lisa.",
      },
    ],
    quiz: [
      { q: "How do Tom and Lisa travel in Giethoorn?", options: ["By boat", "By train", "By taxi"], answer: 0 },
      { q: "What time must they be back?", options: ["At three o'clock", "At five o'clock", "At nine o'clock"], answer: 1 },
    ],
  },
  {
    id: "de-fietsenstalling",
    title: "De fietsenstalling",
    titleEn: "The bicycle parking",
    emoji: "🚲",
    topic: "Cycling",
    level: "A1",
    difficulty: 6,
    insight: {
      title: "The biggest bike parking in the world",
      text: "At Utrecht Centraal station there is a bicycle parking with room for about 12,500 bikes. Reports call it the largest in the world; the last part opened in August 2019. Many Dutch people cycle to the station and take the train from there.",
    },
    intro: {
      words: ["fietsenstalling", "perron", "plaats", "wereld", "kwart"],
      pills: ["clock", "sep"],
    },
    paragraphs: [
      {
        nl: "Lisa woont in Utrecht. Ze gaat elke dag met de trein naar haar werk. Eerst fietst ze naar het station.",
        en: "Lisa lives in Utrecht. Every day she goes to her work by train. First she cycles to the station.",
      },
      {
        nl: "{{Het is kwart voor negen.|clock}} Bij het station is een grote fietsenstalling. Lisa {{zet haar fiets daar neer|sep}} en loopt naar binnen.",
        en: "It is a quarter to nine. At the station there is a big bicycle parking. Lisa puts her bike down there and walks inside.",
      },
      {
        nl: "De stalling is heel groot: er is plaats voor meer dan twaalfduizend fietsen. Het is de grootste fietsenstalling van de wereld. Lisa koopt een koffie en een broodje.",
        en: "The parking is very big: there is room for more than twelve thousand bikes. It is the biggest bicycle parking in the world. Lisa buys a coffee and a sandwich.",
      },
      {
        nl: "Ze loopt naar het perron. {{De trein vertrekt om kwart over negen.|clock}} Lisa stapt in en pakt haar boek. Ze is op tijd.",
        en: "She walks to the platform. The train leaves at a quarter past nine. Lisa gets on and takes her book. She is on time.",
      },
    ],
    quiz: [
      { q: "Where does Lisa leave her bike?", options: ["At home", "In the bicycle parking at the station", "On the train"], answer: 1 },
      { q: "When does the train leave?", options: ["At a quarter past nine", "At a quarter to nine", "At half past nine"], answer: 0 },
    ],
  },
  {
    id: "de-grote-dam",
    title: "De grote dam",
    titleEn: "The big dam",
    emoji: "🌊",
    topic: "Water",
    level: "A1",
    difficulty: 6.5,
    insight: {
      title: "The Delta Works protect Zeeland",
      text: "After the North Sea flood of 1953 the Netherlands built the Delta Works. The Eastern Scheldt barrier (Oosterscheldekering) in Zeeland is about 9 km long and opened in 1986. Its gates normally stay open and close only when high water threatens.",
    },
    intro: {
      words: ["dam", "deur", "storm", "dicht", "zee"],
      pills: ["why"],
    },
    paragraphs: [
      {
        nl: "Tom en Lisa zijn in Zeeland. Ze staan op een heel lange dam in de zee. In de dam zijn grote deuren.",
        en: "Tom and Lisa are in Zeeland. They are standing on a very long dam in the sea. In the dam there are big doors.",
      },
      {
        nl: "\"{{Waarom zijn er deuren in de dam?|why}}\" vraagt Tom. \"Bij storm komt het water hoog,\" zegt Lisa. \"{{Daarom gaan de deuren dicht.|why}} Zo blijft het land droog.\"",
        en: "\"Why are there doors in the dam?\" asks Tom. \"In a storm the water comes up high,\" says Lisa. \"That is why the doors close. That way the land stays dry.\"",
      },
      {
        nl: "Meestal staan de deuren open. Dan kan het water van de zee naar binnen en weer naar buiten. Dat is goed voor de vissen.",
        en: "Most of the time the doors are open. Then the water can go from the sea to the inside and back outside. That is good for the fish.",
      },
      {
        nl: "Tom en Lisa lopen over de dam. De wind is sterk en het water is blauw. \"Dat is echt groot!\" zegt Tom.",
        en: "Tom and Lisa walk over the dam. The wind is strong and the water is blue. \"That is really big!\" says Tom.",
      },
    ],
    quiz: [
      { q: "What does “dicht” mean in “De deuren gaan dicht”?", options: ["closed", "open", "high"], answer: 0 },
      { q: "Which sentence is correct?", options: ["Daarom gaan de deuren dicht.", "Daarom de deuren gaan dicht.", "Daarom dicht gaan de deuren."], answer: 0 },
      { q: "What does “storm” mean in “Bij storm komt het water hoog”?", options: ["a storm", "rain", "a wave"], answer: 0 },
    ],
  },
  {
    id: "gisteren-bij-de-molens",
    title: "Gisteren bij de molens",
    titleEn: "Yesterday at the mills",
    emoji: "🌬️",
    topic: "Water",
    level: "A1",
    difficulty: 7,
    insight: {
      title: "The windmills of Kinderdijk",
      text: "Kinderdijk, in the province of South Holland, has 19 windmills from around 1740. They helped to keep the polder dry by moving water away. Since 1997 they have been a UNESCO World Heritage Site.",
    },
    intro: {
      words: ["molen", "gisteren", "langs", "plek", "negentien"],
      pills: ["perf"],
    },
    paragraphs: [
      {
        nl: "{{Tom en Lisa zijn gisteren naar Kinderdijk gegaan.|perf}} Dat is een plek in Zuid-Holland met negentien molens.",
        en: "Tom and Lisa went to Kinderdijk yesterday. That is a place in South Holland with nineteen windmills.",
      },
      {
        nl: "{{Ze hebben veel molens gezien.|perf}} De molens zijn heel oud en heel mooi. Veel mensen komen hier kijken.",
        en: "They saw many windmills. The windmills are very old and very beautiful. Many people come here to look.",
      },
      {
        nl: "Ze hebben langs het water gefietst. Daarna hebben ze koffie gedronken en een stuk appeltaart gegeten.",
        en: "They cycled along the water. Afterwards they drank coffee and ate a piece of apple pie.",
      },
      {
        nl: "Tom heeft veel foto's gemaakt. Lisa heeft een kaart gekocht voor haar moeder. Het was een lange dag, maar ze zijn blij.",
        en: "Tom took many photos. Lisa bought a card for her mother. It was a long day, but they are happy.",
      },
    ],
    quiz: [
      { q: "What does “gisteren” mean in “Gisteren zijn Tom en Lisa naar Kinderdijk gegaan”?", options: ["yesterday", "tomorrow", "today"], answer: 0 },
      { q: "Which word fits? “Gisteren ___ Tom koffie gedronken.”", options: ["heeft", "is", "hebben"], answer: 0 },
      { q: "Which sentence is correct?", options: ["Ze hebben veel molens gezien.", "Ze hebben gezien veel molens.", "Ze gezien hebben veel molens."], answer: 0 },
    ],
  },
];
