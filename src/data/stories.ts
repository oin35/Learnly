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
  {
    id: "de-stroopwafel",
    title: "De stroopwafel",
    titleEn: "The stroopwafel",
    emoji: "🧇",
    topic: "Food",
    level: "A1",
    difficulty: 7.5,
    insight: {
      title: "The stroopwafel comes from Gouda",
      text: "The stroopwafel, two thin waffles with syrup in between, comes from the city of Gouda. Folklore says bakers first made them from leftover scraps and syrup; sources disagree on the exact date, somewhere between the late 18th and early 19th century. Many people put one on a hot cup of tea or coffee to make the syrup soft.",
    },
    intro: {
      words: ["stroopwafel", "stroop", "kraam", "zacht", "cadeau"],
      pills: ["omdat"],
    },
    paragraphs: [
      {
        nl: "Tom en Lisa zijn op de markt in Gouda. Dat is een stad in Zuid-Holland. Daar staat een kraam met stroopwafels.",
        en: "Tom and Lisa are at the market in Gouda. That is a city in South Holland. There is a stall with stroopwafels.",
      },
      {
        nl: "De verkoper bakt de wafels. Tom koopt een warme stroopwafel, {{omdat hij honger heeft.|omdat}} Lisa koopt een zak stroopwafels, {{omdat ze een cadeau voor haar moeder zoekt.|omdat}}",
        en: "The seller bakes the waffles. Tom buys a warm stroopwafel, because he is hungry. Lisa buys a bag of stroopwafels, because she is looking for a gift for her mother.",
      },
      {
        nl: "\"Een stroopwafel heeft twee dunne wafels met stroop,\" zegt de verkoper. \"Leg de wafel op een warme kop thee. Dan wordt de stroop zacht.\"",
        en: "\"A stroopwafel has two thin waffles with syrup,\" says the seller. \"Put the waffle on a warm cup of tea. Then the syrup becomes soft.\"",
      },
      {
        nl: "Tom zegt: \"Heerlijk!\" Lisa lacht, omdat Tom stroop op zijn neus heeft.",
        en: "Tom says: \"Delicious!\" Lisa laughs, because Tom has syrup on his nose.",
      },
    ],
    quiz: [
      { q: "Which word fits? “Tom koopt een stroopwafel, omdat hij honger ___.”", options: ["heeft", "hebben", "heb"], answer: 0 },
      { q: "Which sentence is correct?", options: ["Lisa lacht, omdat Tom stroop op zijn neus heeft.", "Lisa lacht, omdat Tom heeft stroop op zijn neus.", "Lisa lacht, omdat heeft Tom stroop op zijn neus."], answer: 0 },
      { q: "What does “stroop” mean in “Dan wordt de stroop zacht”?", options: ["syrup", "sugar", "cheese"], answer: 0 },
    ],
  },
  {
    id: "hagelslag",
    title: "Hagelslag",
    titleEn: "Hagelslag",
    emoji: "🍫",
    topic: "Food",
    level: "A1",
    difficulty: 8,
    insight: {
      title: "Chocolate sprinkles on bread",
      text: "Hagelslag are chocolate sprinkles that Dutch people put on buttered bread, often at breakfast or lunch. Estimates say the Dutch eat around 14 million kilos of them a year. The chocolate version is usually credited to the 1930s.",
    },
    intro: {
      words: ["hagelslag", "boterham", "boter", "chocolade", "doos"],
      pills: ["dus", "perf"],
    },
    paragraphs: [
      {
        nl: "{{Vorige week heeft Lisa bij Tom gegeten.|perf}} Tom heeft brood, boter en hagelslag gekocht.",
        en: "Last week Lisa ate at Tom's place. Tom bought bread, butter and hagelslag.",
      },
      {
        nl: "\"Wat is dat?\" vraagt Lisa. \"Dat is hagelslag,\" zegt Tom. \"Het zijn kleine stukjes chocolade, en je doet ze op brood met boter.\"",
        en: "\"What is that?\" asks Lisa. \"That is hagelslag,\" says Tom. \"They are small pieces of chocolate, and you put them on bread with butter.\"",
      },
      {
        nl: "{{Lisa heeft honger, dus ze eet twee boterhammen met hagelslag.|dus}} Ze vindt het heel lekker.",
        en: "Lisa is hungry, so she eats two slices of bread with hagelslag. She thinks it is very tasty.",
      },
      {
        nl: "Tom heeft gisteren ook hagelslag gegeten, {{dus de doos is bijna leeg.|dus}} Volgende week gaan ze nieuwe hagelslag kopen.",
        en: "Tom also ate hagelslag yesterday, so the box is almost empty. Next week they are going to buy new hagelslag.",
      },
    ],
    quiz: [
      { q: "What does “dus” mean in “Lisa heeft honger, dus ze eet twee boterhammen”?", options: ["so", "because", "but"], answer: 0 },
      { q: "Which sentence is correct?", options: ["Tom heeft gisteren hagelslag gegeten.", "Tom heeft gisteren gegeten hagelslag.", "Tom gisteren heeft hagelslag gegeten."], answer: 0 },
      { q: "What does “hagelslag” mean in “Dat is hagelslag”?", options: ["chocolate sprinkles", "a hailstorm", "a kind of cheese"], answer: 0 },
    ],
  },
  {
    id: "koningsdag",
    title: "Koningsdag",
    titleEn: "King's Day",
    emoji: "🧡",
    topic: "Calendar",
    level: "A1",
    difficulty: 8.5,
    insight: {
      title: "King's Day: orange and the free market",
      text: "Koningsdag is the king's birthday. It is on 27 April (on 26 April if the 27th is a Sunday). People wear orange, the colour of the royal house, and on the vrijmarkt (free market) people sell their old things in the street. The exact rules for the free market differ per municipality.",
    },
    intro: {
      words: ["koning", "vrijmarkt", "verkopen", "spullen", "oranje"],
      pills: ["noge", "omdat"],
    },
    paragraphs: [
      {
        nl: "Vandaag is het Koningsdag. Het is de verjaardag van de koning. Tom en Lisa dragen oranje kleren, {{omdat oranje de kleur van het koningshuis is.|omdat}}",
        en: "Today it is King's Day. It is the birthday of the king. Tom and Lisa wear orange clothes, because orange is the colour of the royal house.",
      },
      {
        nl: "Op straat is een vrijmarkt. Mensen verkopen oude spullen, zoals boeken, speelgoed en kleren. {{Lisa heeft al drie boeken verkocht.|noge}}",
        en: "In the street there is a free market. People sell old things, such as books, toys and clothes. Lisa has already sold three books.",
      },
      {
        nl: "Tom koopt een oude lamp. {{Hij heeft vijf euro betaald,|noge}} dus de lamp is nu van hem.",
        en: "Tom buys an old lamp. He has paid five euros, so the lamp is his now.",
      },
      {
        nl: "Aan het eind van de dag zijn ze moe, maar blij. \"Volgend jaar gaan we weer naar de vrijmarkt,\" zegt Lisa.",
        en: "At the end of the day they are tired, but happy. \"Next year we are going to the free market again,\" says Lisa.",
      },
    ],
    quiz: [
      { q: "Which word fits? “Lisa heeft al drie boeken ___.”", options: ["verkocht", "geverkocht", "verkopen"], answer: 0 },
      { q: "What does “spullen” mean in “Mensen verkopen oude spullen”?", options: ["things", "clothes", "tickets"], answer: 0 },
      { q: "Which sentence is correct?", options: ["Tom en Lisa dragen oranje kleren, omdat oranje de kleur van het koningshuis is.", "Tom en Lisa dragen oranje kleren, omdat oranje is de kleur van het koningshuis.", "Tom en Lisa dragen oranje kleren, omdat is oranje de kleur van het koningshuis."], answer: 0 },
    ],
  },
  {
    id: "de-verjaardag",
    title: "De verjaardag",
    titleEn: "The birthday",
    emoji: "🎂",
    topic: "Calendar",
    level: "A1",
    difficulty: 9,
    insight: {
      title: "The circle birthday",
      text: "At a Dutch birthday party the guests often sit in a circle (a kringverjaardag). You say “gefeliciteerd” not only to the birthday person but also to close family, such as the parents, partner or children. The mood is often described as gezellig: a cosy, friendly feeling of being together that is hard to translate.",
    },
    intro: {
      words: ["verjaardag", "kring", "taart", "gezellig", "gefeliciteerd"],
      pills: ["gezellig", "perf"],
    },
    paragraphs: [
      {
        nl: "Vandaag is het de verjaardag van de oma van Lisa. Tom en Lisa gaan naar haar huis. {{Tom heeft een bos bloemen gekocht.|perf}}",
        en: "Today it is the birthday of Lisa's grandmother. Tom and Lisa go to her house. Tom has bought a bunch of flowers.",
      },
      {
        nl: "In de kamer zitten veel mensen in een kring. Tom zegt \"gefeliciteerd\" tegen oma, maar ook tegen de andere mensen. Dat doet iedereen hier.",
        en: "In the room many people are sitting in a circle. Tom says \"congratulations\" to grandma, but also to the other people. Everybody does that here.",
      },
      {
        nl: "Er is koffie en er is taart. Iedereen praat en lacht. {{Het is erg gezellig.|gezellig}}",
        en: "There is coffee and there is cake. Everybody talks and laughs. It is very cosy and friendly.",
      },
      {
        nl: "Oma heeft zelf een taart gebakken. Straks gaan ze zingen en daarna gaan ze de taart eten. Tom kent het lied niet, dus hij luistert goed.",
        en: "Grandma has baked a cake herself. Soon they are going to sing and after that they are going to eat the cake. Tom does not know the song, so he listens carefully.",
      },
    ],
    quiz: [
      { q: "What does “gezellig” mean in “Het is erg gezellig”?", options: ["cosy and friendly", "expensive", "very quiet"], answer: 0 },
      { q: "Which word fits? “Oma heeft zelf een taart ___.”", options: ["gebakken", "gebakt", "bakken"], answer: 0 },
      { q: "Which sentence is correct?", options: ["Straks gaan ze zingen.", "Straks ze gaan zingen.", "Straks gaan zingen ze."], answer: 0 },
    ],
  },
  {
    id: "met-de-trein",
    title: "Met de trein",
    titleEn: "By train",
    emoji: "🚆",
    topic: "Everyday life",
    level: "A1",
    difficulty: 9.5,
    insight: {
      title: "Check in, check out",
      text: "On Dutch trains you check in at a gate or a card reader before you travel and check out when you arrive. This works with a public transport card (OV-chipkaart) and, nowadays, also with a contactless bank card or phone (OVpay). Use the same card or device both times: if you forget to check out, you pay extra.",
    },
    intro: {
      words: ["poort", "pas", "reis", "checken", "vergeten"],
      pills: ["sep", "sepperf"],
    },
    paragraphs: [
      {
        nl: "Vandaag gaat Tom met de trein naar Rotterdam. Hij heeft geen papieren kaartje, maar een pas. Eerst loopt hij naar de poort.",
        en: "Today Tom is going to Rotterdam by train. He has no paper ticket, but a card. First he walks to the gate.",
      },
      {
        nl: "{{Tom checkt in bij de poort.|sep}} Dat moet je altijd doen: je checkt in voor de reis en je checkt uit na de reis.",
        en: "Tom checks in at the gate. You always have to do that: you check in before the journey and you check out after the journey.",
      },
      {
        nl: "{{Gisteren heeft Tom niet uitgecheckt,|sepperf}} dus hij heeft te veel betaald. Dat is niet goed. Vandaag gaat hij dat niet vergeten.",
        en: "Yesterday Tom did not check out, so he paid too much. That is not good. Today he is not going to forget it.",
      },
      {
        nl: "Daarna komt de trein in Rotterdam aan. Tom checkt uit en loopt naar buiten. Hij is blij, want nu heeft hij alles goed gedaan.",
        en: "Then the train arrives in Rotterdam. Tom checks out and walks outside. He is happy, because now he has done everything right.",
      },
    ],
    quiz: [
      { q: "What does “uitchecken” mean in “Tom checkt uit”?", options: ["to check out", "to check in", "to pay"], answer: 0 },
      { q: "Which word fits? “Gisteren heeft Tom niet ___.”", options: ["uitgecheckt", "gecheckt uit", "uitchecken"], answer: 0 },
      { q: "Which sentence is correct?", options: ["Vandaag gaat hij dat niet vergeten.", "Vandaag hij gaat dat niet vergeten.", "Vandaag gaat hij niet dat vergeten."], answer: 0 },
    ],
  },
  {
    id: "doe-maar-gewoon",
    title: "Doe maar gewoon",
    titleEn: "Just act normal",
    emoji: "👔",
    topic: "Everyday life",
    level: "A1",
    difficulty: 10,
    insight: {
      title: "“Doe maar gewoon”: don't show off",
      text: "A famous Dutch saying is “Doe maar gewoon, dan doe je al gek genoeg”: just act normal, that is crazy enough. It reflects a value that many Dutch people share: be modest and do not try to stand out too much.",
    },
    intro: {
      words: ["baan", "collega", "pak", "gewoon", "gek"],
      pills: ["idiom", "perf"],
    },
    paragraphs: [
      {
        nl: "Tom heeft een nieuwe baan. Vandaag is zijn eerste dag. {{Hij heeft een pak en een stropdas gekocht.|perf}}",
        en: "Tom has a new job. Today is his first day. He has bought a suit and a tie.",
      },
      {
        nl: "Tom trekt zijn pak en zijn stropdas aan. Op kantoor ziet hij zijn collega's. Zij dragen een spijkerbroek en een trui.",
        en: "Tom puts on his suit and his tie. At the office he sees his colleagues. They wear jeans and a sweater.",
      },
      {
        nl: "Een collega zegt: \"Welkom! {{Doe maar gewoon, dan doe je al gek genoeg.|idiom}}\" Tom lacht, maar hij is een beetje rood.",
        en: "A colleague says: \"Welcome! Just act normal, that is crazy enough.\" Tom laughs, but he is a little red in the face.",
      },
      {
        nl: "Tom doet zijn stropdas af. Daarna drinken ze samen koffie. Morgen komt hij in een spijkerbroek.",
        en: "Tom takes off his tie. After that they drink coffee together. Tomorrow he will come in jeans.",
      },
    ],
    quiz: [
      { q: "What does “gewoon” mean in “Doe maar gewoon”?", options: ["normal", "special", "crazy"], answer: 0 },
      { q: "Which sentence is correct?", options: ["Tom heeft een pak en een stropdas gekocht.", "Tom heeft gekocht een pak en een stropdas.", "Tom gekocht heeft een pak en een stropdas."], answer: 0 },
      { q: "What does “Doe maar gewoon, dan doe je al gek genoeg” tell Tom?", options: ["Act normal, do not show off", "Dress as fancy as you can", "Work harder"], answer: 0 },
    ],
  },
  {
    id: "tulpen-in-de-keukenhof",
    title: "Tulpen in de Keukenhof",
    titleEn: "Tulips in the Keukenhof",
    emoji: "🌷",
    topic: "Nature",
    level: "A2",
    difficulty: 1,
    insight: {
      title: "The Keukenhof: a spring garden",
      text: "The Keukenhof, near Lisse, is a garden that is open for only about eight weeks each spring (in 2026 from 19 March to 10 May). Millions of flower bulbs are planted for it, so April is a good time to see tulips.",
    },
    intro: {
      words: ["tulp", "miljoen", "geel", "tulpenbol", "lopen"],
      pills: ["partirr", "perf"],
    },
    paragraphs: [
      {
        nl: "Vorige week zijn Tom en Lisa naar de Keukenhof gegaan. Dat is een tuin met miljoenen tulpen.",
        en: "Last week Tom and Lisa went to the Keukenhof. That is a garden with millions of tulips.",
      },
      {
        nl: "{{Ze hebben rode, gele en roze tulpen gezien.|partirr}} Ze hebben twee uur gelopen.",
        en: "They saw red, yellow and pink tulips. They walked for two hours.",
      },
      {
        nl: "{{Lisa heeft veel foto's gemaakt.|perf}} Tom heeft een zak tulpenbollen gekocht.",
        en: "Lisa took many photos. Tom bought a bag of tulip bulbs.",
      },
      {
        nl: "Daarna hebben ze koffie gedronken. Om vijf uur zijn ze naar huis gegaan.",
        en: "After that they drank coffee. At five o'clock they went home.",
      },
    ],
    quiz: [
      { q: "Which word fits? “Ze hebben twee uur ___.”", options: ["gelopen", "gelopt", "gelopend"], answer: 0 },
      { q: "What does “tulpenbollen” mean in “een zak tulpenbollen”?", options: ["tulip bulbs", "tulip petals", "tulip trees"], answer: 0 },
      { q: "Which sentence is correct?", options: ["Om vijf uur zijn ze naar huis gegaan.", "Om vijf uur hebben ze naar huis gegaan.", "Om vijf uur zijn ze gegaan naar huis."], answer: 0 },
    ],
  },
  {
    id: "wadlopen",
    title: "Wadlopen",
    titleEn: "Mudflat walking",
    emoji: "🥾",
    topic: "Nature",
    level: "A2",
    difficulty: 1.5,
    insight: {
      title: "The Wadden Sea: walking on the seabed",
      text: "The Wadden Sea in the north is a UNESCO World Heritage Site (the Dutch and German parts since 2009). At low tide the sea floor falls dry and people go mudflat walking (wadlopen). Go with a guide: the tide comes back quickly.",
    },
    intro: {
      words: ["eb", "bodem", "gids", "gevaarlijk", "zeehond"],
      pills: ["hebzijn", "partirr"],
    },
    paragraphs: [
      {
        nl: "{{Gisteren zijn Tom en Lisa naar de Waddenzee gegaan.|hebzijn}} Bij eb is het water weg. Dan kun je op de bodem lopen.",
        en: "Yesterday Tom and Lisa went to the Wadden Sea. At low tide the water is gone. Then you can walk on the sea floor.",
      },
      {
        nl: "Ze hebben een gids gehad, want het is gevaarlijk zonder gids. Het water komt snel terug.",
        en: "They had a guide, because it is dangerous without a guide. The water comes back quickly.",
      },
      {
        nl: "{{Ze hebben oude schoenen gedragen,|partirr}} want de bodem is nat. Ze hebben ver gelopen.",
        en: "They wore old shoes, because the sea floor is wet. They walked far.",
      },
      {
        nl: "Tom heeft een zeehond gezien. Lisa heeft een foto gemaakt. Ze zijn moe, maar blij.",
        en: "Tom saw a seal. Lisa took a photo. They are tired, but happy.",
      },
    ],
    quiz: [
      { q: "What does “eb” mean in “Bij eb is het water weg”?", options: ["low tide", "high tide", "a storm"], answer: 0 },
      { q: "Which word fits? “Tom heeft een zeehond ___.”", options: ["gezien", "gezeen", "gezet"], answer: 0 },
      { q: "Which word fits? “Gisteren ___ ze naar de Waddenzee gegaan.”", options: ["zijn", "hebben", "heeft"], answer: 0 },
    ],
  },
  {
    id: "de-elfstedentocht",
    title: "De Elfstedentocht",
    titleEn: "The Eleven Cities Tour",
    emoji: "⛸️",
    topic: "Nature",
    level: "A2",
    difficulty: 2,
    insight: {
      title: "The Elfstedentocht: skating through Friesland",
      text: "The Elfstedentocht is a skating tour of about 200 km along eleven cities in Friesland. It is held only when the natural ice is thick enough, so it has taken place just 15 times since 1909. The most recent one was in 1997.",
    },
    intro: {
      words: ["schaatsen", "ijs", "tocht", "dik", "winter"],
      pills: ["vroeger", "hebzijn"],
    },
    paragraphs: [
      {
        nl: "Lisa vertelt Tom over de Elfstedentocht. Mensen schaatsen dan tweehonderd kilometer door Friesland.",
        en: "Lisa tells Tom about the Eleven Cities Tour. People then skate two hundred kilometres through Friesland.",
      },
      {
        nl: "{{Vroeger heeft de opa van Lisa veel geschaatst.|vroeger}} Hij heeft de tocht gedaan.",
        en: "In the past Lisa's grandfather skated a lot. He did the tour.",
      },
      {
        nl: "Het ijs moet dik zijn. {{Daarom is er niet elke winter een Elfstedentocht geweest.|hebzijn}}",
        en: "The ice must be thick. That is why there has not been an Eleven Cities Tour every winter.",
      },
      {
        nl: "Tom en Lisa hopen op een koude winter, want ze willen graag een tocht zien.",
        en: "Tom and Lisa hope for a cold winter, because they would love to see a tour.",
      },
    ],
    quiz: [
      { q: "What does “vroeger” mean in “Vroeger heeft hij veel geschaatst”?", options: ["in the past", "early", "soon"], answer: 0 },
      { q: "Which word fits? “De opa van Lisa heeft veel ___.”", options: ["geschaatst", "geschaat", "schaatsen"], answer: 0 },
      { q: "Which sentence is correct?", options: ["Daarom is er niet elke winter een tocht geweest.", "Daarom heeft er niet elke winter een tocht geweest.", "Daarom is er niet elke winter geweest een tocht."], answer: 0 },
    ],
  },
  {
    id: "nederlands-oefenen",
    title: "Nederlands oefenen",
    titleEn: "Practising Dutch",
    emoji: "💬",
    topic: "Language",
    level: "A2",
    difficulty: 2.5,
    insight: {
      title: "Why the Dutch often answer in English",
      text: "The Netherlands came first of 123 countries in the EF English Proficiency Index 2025, a test taken by adults who chose to take it. English is taught from primary school, so many Dutch people switch to English when they hear an accent. For learners it is worth saying politely that you want to practise Dutch.",
    },
    intro: {
      words: ["oefenen", "antwoorden", "engels", "ober", "plan"],
      pills: ["talen", "perf"],
    },
    paragraphs: [
      {
        nl: "Tom wil Nederlands oefenen. Gisteren is hij naar een café gegaan.",
        en: "Tom wants to practise Dutch. Yesterday he went to a café.",
      },
      {
        nl: "{{Hij heeft in het Nederlands gevraagd,|perf}} maar de ober heeft in het Engels geantwoord.",
        en: "He asked in Dutch, but the waiter answered in English.",
      },
      {
        nl: "{{Veel Nederlanders spreken Engels en leren het op school.|talen}} Tom is niet boos, maar hij wil liever Nederlands praten.",
        en: "Many Dutch people speak English and learn it at school. Tom is not angry, but he would rather speak Dutch.",
      },
      {
        nl: "Nu heeft Tom een plan: hij blijft in het Nederlands praten.",
        en: "Now Tom has a plan: he keeps speaking Dutch.",
      },
    ],
    quiz: [
      { q: "What does “oefenen” mean in “Tom wil Nederlands oefenen”?", options: ["to practise", "to forget", "to translate"], answer: 0 },
      { q: "Which word fits? “De ober heeft in het Engels ___.”", options: ["geantwoord", "geantwoordt", "antwoorden"], answer: 0 },
      { q: "Which sentence is correct?", options: ["Tom heeft in het Nederlands gevraagd.", "Tom heeft in het Nederlands vragen.", "Tom heeft in Nederlands het gevraagd."], answer: 0 },
    ],
  },
  {
    id: "het-meisje-met-de-parel",
    title: "Het meisje met de parel",
    titleEn: "The girl with the pearl",
    emoji: "🖼️",
    topic: "Museums",
    level: "A2",
    difficulty: 3,
    insight: {
      title: "Girl with a Pearl Earring in The Hague",
      text: "The famous painting “Girl with a Pearl Earring” was made by Johannes Vermeer around 1665. It hangs in the Mauritshuis in The Hague and is quite small: about 45 by 40 centimetres.",
    },
    intro: {
      words: ["druk", "toerist", "schilderij", "parel", "oor"],
      pills: ["waswas"],
    },
    paragraphs: [
      {
        nl: "Vorige maand was Lisa in Den Haag. Ze is naar het Mauritshuis gegaan. Daar hangt een beroemd schilderij.",
        en: "Last month Lisa was in The Hague. She went to the Mauritshuis. A famous painting hangs there.",
      },
      {
        nl: "{{Het museum was niet groot, maar het was druk.|waswas}} Er waren veel toeristen. Lisa had een kaartje voor twaalf uur.",
        en: "The museum was not big, but it was busy. There were many tourists. Lisa had a ticket for twelve o'clock.",
      },
      {
        nl: "Het schilderij was klein, maar mooi. {{Het meisje had een parel in haar oor.|waswas}}",
        en: "The painting was small, but beautiful. The girl had a pearl in her ear.",
      },
      {
        nl: "Lisa heeft lang gekeken. Daarna heeft ze een foto gemaakt.",
        en: "Lisa looked for a long time. Afterwards she took a photo.",
      },
    ],
    quiz: [
      { q: "Which word fits (past tense)? “Het museum ___ druk.”", options: ["was", "waren", "hadden"], answer: 0 },
      { q: "What does “druk” mean in “Het museum was druk”?", options: ["busy", "quiet", "big"], answer: 0 },
      { q: "Which sentence is correct?", options: ["Lisa had een kaartje voor twaalf uur.", "Lisa was een kaartje voor twaalf uur.", "Lisa hadden een kaartje voor twaalf uur."], answer: 0 },
    ],
  },
  {
    id: "de-kaasmarkt",
    title: "De kaasmarkt",
    titleEn: "The cheese market",
    emoji: "🧀",
    topic: "Food",
    level: "A2",
    difficulty: 3.5,
    insight: {
      title: "The Alkmaar cheese market",
      text: "The cheese market in Alkmaar takes place on Friday mornings, from about 10 to 1 o'clock, from spring until the end of September. The cheese carriers, in white clothes, carry the cheeses; their guild dates back to 1593.",
    },
    intro: {
      words: ["kaasmarkt", "plein", "proeven", "jong", "dragen"],
      pills: ["sup"],
    },
    paragraphs: [
      {
        nl: "Tom en Lisa zijn op vrijdag in Alkmaar. Het is tien uur. Op het plein begint de kaasmarkt.",
        en: "Tom and Lisa are in Alkmaar on Friday. It is ten o'clock. On the square the cheese market begins.",
      },
      {
        nl: "Mannen in witte kleren dragen grote kazen. Er zijn jonge kazen en oude kazen.",
        en: "Men in white clothes carry big cheeses. There are young cheeses and old cheeses.",
      },
      {
        nl: "Lisa proeft de jonge kaas. Tom proeft de oude kaas. {{Tom vindt de oude kaas het lekkerst,|sup}} maar Lisa vindt de jonge kaas het lekkerst.",
        en: "Lisa tastes the young cheese. Tom tastes the old cheese. Tom thinks the old cheese is the tastiest, but Lisa thinks the young cheese is the tastiest.",
      },
      {
        nl: "Tom koopt een groot stuk. {{Dat is de duurste kaas van de markt!|sup}} Lisa lacht.",
        en: "Tom buys a big piece. That is the most expensive cheese of the market! Lisa laughs.",
      },
    ],
    quiz: [
      { q: "Which word fits? “Lisa vindt de jonge kaas het ___.”", options: ["lekkerst", "lekker", "lekkere"], answer: 0 },
      { q: "What does “proeven” mean in “Lisa proeft de jonge kaas”?", options: ["to taste", "to buy", "to carry"], answer: 0 },
      { q: "Which sentence is correct?", options: ["Dat is de duurste kaas van de markt.", "Dat is duurste de kaas van de markt.", "Dat is het duurste kaas van de markt."], answer: 0 },
    ],
  },
  {
    id: "de-nieuwjaarsduik",
    title: "De Nieuwjaarsduik",
    titleEn: "The New Year's dive",
    emoji: "🌊",
    topic: "Calendar",
    level: "A2",
    difficulty: 4,
    insight: {
      title: "A dive into the North Sea on 1 January",
      text: "On New Year's Day thousands of people run into the cold North Sea at Scheveningen, wearing orange hats; organisers count roughly 7,000 to 10,000 swimmers. The water is usually about 5 °C. The tradition began in the 1960s (sources say 1960 or 1965), and strong wind can cancel it.",
    },
    intro: {
      words: ["traditie", "graad", "muts", "januari", "duizend"],
      pills: ["zullen"],
    },
    paragraphs: [
      {
        nl: "Het is december. Tom en Lisa praten over het nieuwe jaar. Lisa heeft een plan. \"{{Op één januari zullen we in de zee springen!|zullen}}\"",
        en: "It is December. Tom and Lisa talk about the new year. Lisa has a plan. \"On the first of January we will jump into the sea!\"",
      },
      {
        nl: "Tom lacht. \"In januari? Het water is dan heel koud!\" \"Ja, ongeveer vijf graden,\" zegt Lisa. \"Maar het is een traditie in Scheveningen.\"",
        en: "Tom laughs. \"In January? The water is very cold then!\" \"Yes, about five degrees,\" says Lisa. \"But it is a tradition in Scheveningen.\"",
      },
      {
        nl: "Duizenden mensen doen mee. Ze dragen allemaal een oranje muts.",
        en: "Thousands of people take part. They all wear an orange hat.",
      },
      {
        nl: "\"Goed,\" zegt Tom. \"{{Ik zal meedoen,|zullen}} maar daarna wil ik warme chocolademelk.\" Lisa is blij. \"Zal ik twee mutsen kopen?\"",
        en: "\"OK,\" says Tom. \"I will take part, but afterwards I want hot chocolate.\" Lisa is happy. \"Shall I buy two hats?\"",
      },
    ],
    quiz: [
      { q: "Which word fits? “Op één januari ___ we in de zee springen.”", options: ["zullen", "zal", "zult"], answer: 0 },
      { q: "What does “Zal ik twee mutsen kopen?” mean?", options: ["Shall I buy two hats?", "Did I buy two hats?", "Must I buy two hats?"], answer: 0 },
      { q: "What does “muts” mean in “Ze dragen allemaal een oranje muts”?", options: ["a woolly hat", "a scarf", "a coat"], answer: 0 },
    ],
  },
  {
    id: "drie-zoenen",
    title: "Drie zoenen",
    titleEn: "Three kisses",
    emoji: "😘",
    topic: "Everyday life",
    level: "A2",
    difficulty: 4.5,
    insight: {
      title: "Three kisses or a handshake?",
      text: "Many Dutch people greet close friends and family with three kisses on the cheek, often right, left, right. People you meet for the first time usually get a handshake. The habit is changing: many younger people do it less than before.",
    },
    intro: {
      words: ["zoen", "ouders", "nerveus", "rechts", "afscheid"],
      pills: ["erprep"],
    },
    paragraphs: [
      {
        nl: "Tom gaat voor het eerst naar de ouders van Lisa. Hij is een beetje nerveus.",
        en: "Tom goes to Lisa's parents for the first time. He is a bit nervous.",
      },
      {
        nl: "De moeder van Lisa geeft Tom een hand. Maar Lisa geeft haar moeder drie zoenen: rechts, links, rechts. {{Tom kijkt er goed naar.|erprep}}",
        en: "Lisa's mother shakes Tom's hand. But Lisa gives her mother three kisses: right, left, right. Tom watches it closely.",
      },
      {
        nl: "\"Moet ik ook drie zoenen geven?\" vraagt Tom later. \"Nee,\" zegt Lisa. \"Dat doe je met familie en goede vrienden.\"",
        en: "\"Do I have to give three kisses too?\" Tom asks later. \"No,\" says Lisa. \"You do that with family and good friends.\"",
      },
      {
        nl: "Ze eten taart en drinken koffie. Het is gezellig. Bij het afscheid geeft de moeder van Lisa hem toch drie zoenen! {{Tom is er heel blij mee.|erprep}}",
        en: "They eat cake and drink coffee. It is cosy. When they say goodbye, Lisa's mother gives him three kisses after all! Tom is very happy with it.",
      },
    ],
    quiz: [
      { q: "What does “Tom is er heel blij mee” mean?", options: ["Tom is very happy with it", "Tom is very happy with her", "Tom is very happy there"], answer: 0 },
      { q: "What does “een hand geven” mean in “De moeder van Lisa geeft Tom een hand”?", options: ["to shake hands", "to help", "to wave"], answer: 0 },
      { q: "Which sentence is correct?", options: ["Tom kijkt er goed naar.", "Tom kijkt naar er goed.", "Tom er kijkt goed naar."], answer: 0 },
    ],
  },
  {
    id: "bij-de-huisarts",
    title: "Bij de huisarts",
    titleEn: "At the family doctor",
    emoji: "🩺",
    topic: "Health",
    level: "A2",
    difficulty: 5,
    insight: {
      title: "First the huisarts",
      text: "In the Netherlands you usually go to your family doctor (huisarts) first. To see a specialist or go to hospital you generally need a referral (verwijzing) from the huisarts, except in an emergency; without one, your health insurer may not pay.",
    },
    intro: {
      words: ["huisarts", "afspraak", "hoofdpijn", "verwijzing", "ziekenhuis"],
      pills: ["zou"],
    },
    paragraphs: [
      {
        nl: "Lisa heeft al een week hoofdpijn. Ze belt de huisarts. \"{{Ik zou graag een afspraak willen maken,|zou}}\" zegt ze.",
        en: "Lisa has had a headache for a week. She calls the family doctor. \"I would like to make an appointment,\" she says.",
      },
      {
        nl: "De assistente vraagt naar haar klachten. Lisa vertelt over de hoofdpijn. Ze kan morgen om tien uur komen.",
        en: "The assistant asks about her complaints. Lisa tells her about the headache. She can come tomorrow at ten o'clock.",
      },
      {
        nl: "De dokter luistert goed. \"{{U zou meer water moeten drinken,|zou}}\" zegt de dokter. \"En u moet minder naar uw telefoon kijken.\"",
        en: "The doctor listens carefully. \"You should drink more water,\" says the doctor. \"And you must look at your phone less.\"",
      },
      {
        nl: "\"Moet ik naar het ziekenhuis?\" vraagt Lisa. \"Nee,\" zegt de dokter. \"Voor het ziekenhuis heeft u eerst een verwijzing van mij nodig.\"",
        en: "\"Do I have to go to the hospital?\" asks Lisa. \"No,\" says the doctor. \"For the hospital you first need a referral from me.\"",
      },
    ],
    quiz: [
      { q: "Which is the polite way to ask?", options: ["Ik zou graag een afspraak willen maken.", "Ik wil nu een afspraak!", "Ik zou een afspraak gemaakt."], answer: 0 },
      { q: "What does “U zou meer water moeten drinken” mean?", options: ["You should drink more water", "You drank more water", "You can drink more water"], answer: 0 },
      { q: "What does “verwijzing” mean in “Voor het ziekenhuis heeft u eerst een verwijzing nodig”?", options: ["a referral", "a prescription", "an appointment"], answer: 0 },
    ],
  },
  {
    id: "stamppot",
    title: "Stamppot",
    titleEn: "Stamppot",
    emoji: "🥔",
    topic: "Food",
    level: "A2",
    difficulty: 5.5,
    insight: {
      title: "Stamppot: a Dutch winter dish",
      text: "Stamppot is potatoes mashed together with vegetables, such as kale (boerenkool), sauerkraut (zuurkool) or carrots and onions (hutspot). It is mostly eaten in winter, often with a smoked sausage (rookworst). Many people make a little well (kuiltje) in it for the gravy.",
    },
    intro: {
      words: ["aardappel", "boerenkool", "rookworst", "kuiltje", "jus"],
      pills: ["modpast"],
    },
    paragraphs: [
      {
        nl: "{{Vroeger moest Tom in de winter vaak stamppot eten.|modpast}} {{Hij wilde liever patat.|modpast}}",
        en: "In the past Tom often had to eat stamppot in winter. He would rather have had chips.",
      },
      {
        nl: "Gisteren mocht Tom bij Lisa eten. Lisa heeft boerenkool met aardappels gekookt, en er was ook een rookworst.",
        en: "Yesterday Tom was allowed to eat at Lisa's place. Lisa cooked kale with potatoes, and there was also a smoked sausage.",
      },
      {
        nl: "Tom moest lachen. \"Stamppot! Dat moest ik vroeger altijd eten.\" Maar hij heeft het geproefd, en het was heerlijk.",
        en: "Tom had to laugh. \"Stamppot! I always had to eat that in the past.\" But he tasted it, and it was delicious.",
      },
      {
        nl: "Lisa heeft een kuiltje voor de jus in de stamppot gemaakt. Tom wilde nog een bord.",
        en: "Lisa made a little well for the gravy in the stamppot. Tom wanted another plate.",
      },
    ],
    quiz: [
      { q: "Which word fits? “Vroeger ___ Tom vaak stamppot eten.”", options: ["moest", "moet", "moesten"], answer: 0 },
      { q: "What does “kuiltje” mean in “een kuiltje voor de jus”?", options: ["a little well (hole)", "a spoon", "a slice"], answer: 0 },
      { q: "Which sentence is correct?", options: ["Tom wilde nog een bord.", "Tom wilt nog een bord.", "Tom wilden nog een bord."], answer: 0 },
    ],
  },
];
