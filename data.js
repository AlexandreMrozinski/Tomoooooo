// ============================================================
//  TML W2 2026 — Timetable data
//  Vendredi 24 / Samedi 25 / Dimanche 26 juillet
//  Source: tomorrowland.com official timetable
// ============================================================

// Votes: null=pas voté, 1=priorité 🔥, 2=si dispo 👍, 3=pourquoi pas 🤷
const VOTE_LEVELS = [
  { value: 1, label: "Priorité",     emoji: "🔥", color: "#FF6B35" },
  { value: 2, label: "Si dispo",     emoji: "👍", color: "#3498DB" },
  { value: 3, label: "Pourquoi pas", emoji: "🤷", color: "#7878a0" },
];

// time: "HH:MM", duration in minutes
const TIMETABLE = [

  // ══════════════════════════════════════
  //  VENDREDI 24 JUILLET
  // ══════════════════════════════════════

  // MAINSTAGE
  { id: 1,   day: 1, stage: "Mainstage",              name: "Discovery",              time: "12:00", duration: 120 },
  { id: 2,   day: 1, stage: "Mainstage",              name: "Vintage Culture",         time: "14:00", duration: 90  },
  { id: 3,   day: 1, stage: "Mainstage",              name: "Disco Lines",             time: "15:30", duration: 60  },
  { id: 4,   day: 1, stage: "Mainstage",              name: "Bassjackers",             time: "16:30", duration: 60  },
  { id: 5,   day: 1, stage: "Mainstage",              name: "Henri PFR",               time: "17:35", duration: 65  },
  { id: 6,   day: 1, stage: "Mainstage",              name: "NERVO",                   time: "18:40", duration: 60  },
  { id: 7,   day: 1, stage: "Mainstage",              name: "Marlon Hoffstadt",        time: "19:40", duration: 60  },
  { id: 8,   day: 1, stage: "Mainstage",              name: "Novah",                   time: "20:40", duration: 65  },
  { id: 9,   day: 1, stage: "Mainstage",              name: "The Chainsmokers",        time: "21:45", duration: 60  },
  { id: 10,  day: 1, stage: "Mainstage",              name: "Sebastian Ingrosso",      time: "22:50", duration: 60  },
  { id: 11,  day: 1, stage: "Mainstage",              name: "Martin Garrix",           time: "23:50", duration: 60  },

  // FREEDOM BY BUD
  { id: 20,  day: 1, stage: "Freedom by Bud",         name: "Semsei",                  time: "12:00", duration: 90  },
  { id: 21,  day: 1, stage: "Freedom by Bud",         name: "Jesabel",                 time: "13:30", duration: 90  },
  { id: 22,  day: 1, stage: "Freedom by Bud",         name: "Rose Ringed",             time: "15:00", duration: 90  },
  { id: 23,  day: 1, stage: "Freedom by Bud",         name: "Frank Verstraeten",       time: "16:30", duration: 90  },
  { id: 24,  day: 1, stage: "Freedom by Bud",         name: "Max Styler",              time: "18:00", duration: 90  },
  { id: 25,  day: 1, stage: "Freedom by Bud",         name: "Miss Monique",            time: "19:30", duration: 90  },
  { id: 26,  day: 1, stage: "Freedom by Bud",         name: "Mind Against",            time: "21:00", duration: 90  },
  { id: 27,  day: 1, stage: "Freedom by Bud",         name: "4444 OF A KIND",          time: "22:30", duration: 60  },
  { id: 28,  day: 1, stage: "Freedom by Bud",         name: "Holy Priest",             time: "23:30", duration: 60  },

  // THE ROSE GARDEN
  { id: 40,  day: 1, stage: "The Rose Garden",        name: "Synoxis",                 time: "12:00", duration: 90  },
  { id: 41,  day: 1, stage: "The Rose Garden",        name: "MAE LIEN",                time: "13:30", duration: 60  },
  { id: 42,  day: 1, stage: "The Rose Garden",        name: "Anton Invicta",           time: "14:30", duration: 90  },
  { id: 43,  day: 1, stage: "The Rose Garden",        name: "STOOG3S",                 time: "16:00", duration: 60  },
  { id: 44,  day: 1, stage: "The Rose Garden",        name: "Blooom b2b S...",         time: "17:00", duration: 60  },
  { id: 45,  day: 1, stage: "The Rose Garden",        name: "Primate",                 time: "18:00", duration: 60  },
  { id: 46,  day: 1, stage: "The Rose Garden",        name: "ÆEON:MODE",               time: "19:00", duration: 60  },
  { id: 47,  day: 1, stage: "The Rose Garden",        name: "Murdock",                 time: "20:00", duration: 60  },
  { id: 48,  day: 1, stage: "The Rose Garden",        name: "A Little Sound",          time: "21:00", duration: 60  },
  { id: 49,  day: 1, stage: "The Rose Garden",        name: "Kanine",                  time: "22:00", duration: 60  },
  { id: 50,  day: 1, stage: "The Rose Garden",        name: "Alison Wonderland",       time: "23:00", duration: 60  },

  // ELIXIR
  { id: 60,  day: 1, stage: "Elixir",                 name: "Monsieur",                time: "13:00", duration: 90  },
  { id: 61,  day: 1, stage: "Elixir",                 name: "High Grade Sound",        time: "14:30", duration: 90  },
  { id: 62,  day: 1, stage: "Elixir",                 name: "Milinguap",               time: "16:00", duration: 60  },
  { id: 63,  day: 1, stage: "Elixir",                 name: "Soul Shakers",            time: "17:00", duration: 60  },
  { id: 64,  day: 1, stage: "Elixir",                 name: "Flavour Drop",            time: "18:00", duration: 90  },
  { id: 65,  day: 1, stage: "Elixir",                 name: "Tola OG",                 time: "19:30", duration: 60  },
  { id: 66,  day: 1, stage: "Elixir",                 name: "Nona Van Bra...",         time: "20:30", duration: 60  },
  { id: 67,  day: 1, stage: "Elixir",                 name: "Unregular",               time: "21:30", duration: 60  },
  { id: 68,  day: 1, stage: "Elixir",                 name: "Audiowave",               time: "22:30", duration: 60  },
  { id: 69,  day: 1, stage: "Elixir",                 name: "Rick & James 80s Party",  time: "23:30", duration: 60  },

  // CAGE
  { id: 80,  day: 1, stage: "Cage",                   name: "Sacha Malice",            time: "12:00", duration: 60  },
  { id: 81,  day: 1, stage: "Cage",                   name: "RAYZEN",                  time: "13:00", duration: 60  },
  { id: 82,  day: 1, stage: "Cage",                   name: "SANDY WAREZ",             time: "14:00", duration: 60  },
  { id: 83,  day: 1, stage: "Cage",                   name: "elMefti",                 time: "15:00", duration: 60  },
  { id: 84,  day: 1, stage: "Cage",                   name: "Lolalita & Bre...",       time: "16:00", duration: 60  },
  { id: 85,  day: 1, stage: "Cage",                   name: "VON BIKRÄV",              time: "17:00", duration: 60  },
  { id: 86,  day: 1, stage: "Cage",                   name: "DITHER",                  time: "18:00", duration: 60  },
  { id: 87,  day: 1, stage: "Cage",                   name: "GPF b2b DR D...",         time: "19:00", duration: 60  },
  { id: 88,  day: 1, stage: "Cage",                   name: "MIND COMPR...",           time: "20:00", duration: 60  },
  { id: 89,  day: 1, stage: "Cage",                   name: "LUNAKORPZ",               time: "21:00", duration: 60  },
  { id: 90,  day: 1, stage: "Cage",                   name: "VERNEX b2b ...",          time: "22:00", duration: 60  },

  // THE RAVE CAVE
  { id: 100, day: 1, stage: "The Rave Cave",           name: "More to be announced",    time: "13:00", duration: 90  },
  { id: 101, day: 1, stage: "The Rave Cave",           name: "Thomas Moulene",          time: "14:30", duration: 90  },
  { id: 102, day: 1, stage: "The Rave Cave",           name: "Panda Sound ...",         time: "16:00", duration: 60  },
  { id: 103, day: 1, stage: "The Rave Cave",           name: "Paloma",                  time: "17:00", duration: 90  },
  { id: 104, day: 1, stage: "The Rave Cave",           name: "ZUKE",                    time: "18:30", duration: 60  },
  { id: 105, day: 1, stage: "The Rave Cave",           name: "Justin Wilkes",           time: "19:30", duration: 90  },
  { id: 106, day: 1, stage: "The Rave Cave",           name: "Nastya Dikikh",           time: "21:00", duration: 60  },
  { id: 107, day: 1, stage: "The Rave Cave",           name: "CVNTS",                   time: "22:00", duration: 60  },
  { id: 108, day: 1, stage: "The Rave Cave",           name: "Junkie Kid",              time: "23:00", duration: 60  },

  // PLANAXIS
  { id: 120, day: 1, stage: "Planaxis",                name: "Cyborg-18",               time: "12:00", duration: 60  },
  { id: 121, day: 1, stage: "Planaxis",                name: "Yannick Thiry",           time: "13:00", duration: 60  },
  { id: 122, day: 1, stage: "Planaxis",                name: "Trip-Tamine",             time: "14:00", duration: 60  },
  { id: 123, day: 1, stage: "Planaxis",                name: "John OO Fleming",         time: "15:00", duration: 60  },
  { id: 124, day: 1, stage: "Planaxis",                name: "Firaga",                  time: "16:00", duration: 60  },
  { id: 125, day: 1, stage: "Planaxis",                name: "Somnia",                  time: "17:00", duration: 60  },
  { id: 126, day: 1, stage: "Planaxis",                name: "Hi Profile",              time: "18:00", duration: 60  },
  { id: 127, day: 1, stage: "Planaxis",                name: "Fabio Fusco",             time: "19:00", duration: 60  },
  { id: 128, day: 1, stage: "Planaxis",                name: "Neelix",                  time: "20:00", duration: 90  },
  { id: 129, day: 1, stage: "Planaxis",                name: "Omiki",                   time: "21:30", duration: 60  },
  { id: 130, day: 1, stage: "Planaxis",                name: "Mad Maxx",                time: "22:30", duration: 90  },

  // MELODIA BY CORONA
  { id: 140, day: 1, stage: "Melodia by Corona",       name: "Isa Roos",                time: "12:00", duration: 90  },
  { id: 141, day: 1, stage: "Melodia by Corona",       name: "Lerato Tsotetsi",         time: "13:30", duration: 90  },
  { id: 142, day: 1, stage: "Melodia by Corona",       name: "Rosey Gold",              time: "15:00", duration: 90  },
  { id: 143, day: 1, stage: "Melodia by Corona",       name: "Thakzin",                 time: "16:30", duration: 90  },
  { id: 144, day: 1, stage: "Melodia by Corona",       name: "Danni Gato",              time: "18:00", duration: 60  },
  { id: 145, day: 1, stage: "Melodia by Corona",       name: "Vanco",                   time: "19:00", duration: 90  },
  { id: 146, day: 1, stage: "Melodia by Corona",       name: "AWEN",                    time: "20:30", duration: 90  },
  { id: 147, day: 1, stage: "Melodia by Corona",       name: "Da Capo b2b Caiiro b2b Enoo Napa", time: "22:00", duration: 120 },

  // CELESTIA BY KUCOIN
  { id: 160, day: 1, stage: "Celestia by Kucoin",      name: "ROOX",                    time: "12:00", duration: 60  },
  { id: 161, day: 1, stage: "Celestia by Kucoin",      name: "MRMK",                    time: "13:00", duration: 60  },
  { id: 162, day: 1, stage: "Celestia by Kucoin",      name: "Juno",                    time: "14:00", duration: 90  },
  { id: 163, day: 1, stage: "Celestia by Kucoin",      name: "Rozie",                   time: "15:30", duration: 90  },
  { id: 164, day: 1, stage: "Celestia by Kucoin",      name: "Diffrent",                time: "17:00", duration: 90  },
  { id: 165, day: 1, stage: "Celestia by Kucoin",      name: "MPH",                     time: "18:30", duration: 90  },
  { id: 166, day: 1, stage: "Celestia by Kucoin",      name: "Olive Anguz",             time: "20:00", duration: 90  },
  { id: 167, day: 1, stage: "Celestia by Kucoin",      name: "Bennett",                 time: "21:30", duration: 90  },

  // ATMOSPHERE
  { id: 180, day: 1, stage: "Atmosphere",              name: "Bisoux",                  time: "12:00", duration: 120 },
  { id: 181, day: 1, stage: "Atmosphere",              name: "ROW1",                    time: "14:00", duration: 90  },
  { id: 182, day: 1, stage: "Atmosphere",              name: "Peterblue",               time: "15:30", duration: 90  },
  { id: 183, day: 1, stage: "Atmosphere",              name: "simOne b2b Southstar",    time: "17:00", duration: 90  },
  { id: 184, day: 1, stage: "Atmosphere",              name: "KUKO",                    time: "18:30", duration: 90  },
  { id: 185, day: 1, stage: "Atmosphere",              name: "MANDY b2b NEGITIV",       time: "20:00", duration: 90  },
  { id: 186, day: 1, stage: "Atmosphere",              name: "Nico Moreno",             time: "21:30", duration: 90  },
  { id: 187, day: 1, stage: "Atmosphere",              name: "Sara Landry",             time: "23:00", duration: 55  },

  // CORE
  { id: 200, day: 1, stage: "Core",                    name: "Eileen",                  time: "12:00", duration: 120 },
  { id: 201, day: 1, stage: "Core",                    name: "John Noseda b2b Kenny Montana", time: "14:00", duration: 180 },
  { id: 202, day: 1, stage: "Core",                    name: "Bibi Seck",               time: "17:00", duration: 120 },
  { id: 203, day: 1, stage: "Core",                    name: "Sally C",                 time: "19:00", duration: 120 },
  { id: 204, day: 1, stage: "Core",                    name: "Sasha b2b Young Marco",   time: "21:00", duration: 120 },
  { id: 205, day: 1, stage: "Core",                    name: "Modeselektor (DJ-set)",   time: "23:00", duration: 50  },

  // CRYSTAL GARDEN
  { id: 220, day: 1, stage: "Crystal Garden",          name: "DJORA",                   time: "12:00", duration: 90  },
  { id: 221, day: 1, stage: "Crystal Garden",          name: "Eridu",                   time: "13:30", duration: 90  },
  { id: 222, day: 1, stage: "Crystal Garden",          name: "Marsolo",                 time: "15:00", duration: 90  },
  { id: 223, day: 1, stage: "Crystal Garden",          name: "Camila Jun",              time: "16:30", duration: 90  },
  { id: 224, day: 1, stage: "Crystal Garden",          name: "More to be announced",    time: "18:00", duration: 90  },
  { id: 225, day: 1, stage: "Crystal Garden",          name: "BLOND:ISH",               time: "19:30", duration: 90  },
  { id: 226, day: 1, stage: "Crystal Garden",          name: "Kettama b2b Michael Bibi",time: "21:00", duration: 120 },
  { id: 227, day: 1, stage: "Crystal Garden",          name: "Franky Rizardo",          time: "23:00", duration: 60  },

  // THE GREAT LIBRARY
  { id: 240, day: 1, stage: "The Great Library",       name: "MagiK",                   time: "12:00", duration: 60  },
  { id: 241, day: 1, stage: "The Great Library",       name: "Manuals",                 time: "13:00", duration: 60  },
  { id: 242, day: 1, stage: "The Great Library",       name: "Tomas Grey",              time: "14:00", duration: 60  },
  { id: 243, day: 1, stage: "The Great Library",       name: "DJ Sally",                time: "15:00", duration: 60  },
  { id: 244, day: 1, stage: "The Great Library",       name: "Whisnu Santika",          time: "16:00", duration: 60  },
  { id: 245, day: 1, stage: "The Great Library",       name: "Mike Williams",           time: "17:00", duration: 60  },
  { id: 246, day: 1, stage: "The Great Library",       name: "Sam Feldt",               time: "18:00", duration: 60  },
  { id: 247, day: 1, stage: "The Great Library",       name: "Da Tweekaz",              time: "19:00", duration: 60  },
  { id: 248, day: 1, stage: "The Great Library",       name: "Ofenbach",                time: "20:00", duration: 60  },
  { id: 249, day: 1, stage: "The Great Library",       name: "R3hab",                   time: "21:00", duration: 60  },
  { id: 250, day: 1, stage: "The Great Library",       name: "Artbat",                  time: "22:00", duration: 60  },
  { id: 251, day: 1, stage: "The Great Library",       name: "Nicky Romero",            time: "23:00", duration: 60  },

  // MOOSE BAR
  { id: 260, day: 1, stage: "Moose Bar",               name: "Bosart",                  time: "12:00", duration: 240 },
  { id: 261, day: 1, stage: "Moose Bar",               name: "Rino",                    time: "16:00", duration: 180 },
  { id: 262, day: 1, stage: "Moose Bar",               name: "Wilbert Pigmans",         time: "19:00", duration: 60  },
  { id: 263, day: 1, stage: "Moose Bar",               name: "Funktastix",              time: "20:00", duration: 240 },

  // HOUSE OF FORTUNE BY JBL
  { id: 280, day: 1, stage: "House of Fortune by JBL", name: "More to be announced",   time: "13:00", duration: 60  },
  { id: 281, day: 1, stage: "House of Fortune by JBL", name: "Fran Ares",              time: "14:00", duration: 60  },
  { id: 282, day: 1, stage: "House of Fortune by JBL", name: "Lucca Van Da...",        time: "15:00", duration: 60  },
  { id: 283, day: 1, stage: "House of Fortune by JBL", name: "StadiumX",               time: "16:00", duration: 60  },
  { id: 284, day: 1, stage: "House of Fortune by JBL", name: "Amber Broos ...",        time: "17:00", duration: 60  },
  { id: 285, day: 1, stage: "House of Fortune by JBL", name: "Conrad Taylor",          time: "18:00", duration: 60  },
  { id: 286, day: 1, stage: "House of Fortune by JBL", name: "Nicky Romero",           time: "19:00", duration: 60  },
  { id: 287, day: 1, stage: "House of Fortune by JBL", name: "Mike Williams ...",      time: "20:00", duration: 60  },
  { id: 288, day: 1, stage: "House of Fortune by JBL", name: "Gravagerz",              time: "21:00", duration: 60  },

  // ══════════════════════════════════════
  //  SAMEDI 25 JUILLET
  // ══════════════════════════════════════

  // MAINSTAGE
  { id: 1001, day: 2, stage: "Mainstage",              name: "Discovery",               time: "12:00", duration: 120 },
  { id: 1002, day: 2, stage: "Mainstage",              name: "Merow",                   time: "14:00", duration: 60  },
  { id: 1003, day: 2, stage: "Mainstage",              name: "Stephani B",              time: "15:00", duration: 60  },
  { id: 1004, day: 2, stage: "Mainstage",              name: "Omdat Het Ka...",         time: "16:00", duration: 60  },
  { id: 1005, day: 2, stage: "Mainstage",              name: "Maddix",                  time: "17:05", duration: 55  },
  { id: 1006, day: 2, stage: "Mainstage",              name: "HALÖ",                    time: "18:10", duration: 60  },
  { id: 1007, day: 2, stage: "Mainstage",              name: "Boris Brejcha",           time: "19:10", duration: 60  },
  { id: 1008, day: 2, stage: "Mainstage",              name: "John Newman",             time: "20:10", duration: 65  },
  { id: 1009, day: 2, stage: "Mainstage",              name: "Fisher",                  time: "21:15", duration: 65  },
  { id: 1010, day: 2, stage: "Mainstage",              name: "Dimitri Vegas & Like Mike", time: "22:20", duration: 75  },
  { id: 1011, day: 2, stage: "Mainstage",              name: "David Guetta",            time: "23:35", duration: 75  },

  // FREEDOM BY BUD
  { id: 1020, day: 2, stage: "Freedom by Bud",         name: "Dave Lambert",            time: "12:00", duration: 90  },
  { id: 1021, day: 2, stage: "Freedom by Bud",         name: "Luna & Lenthe",           time: "13:30", duration: 90  },
  { id: 1022, day: 2, stage: "Freedom by Bud",         name: "Plastik Funk b2b Olympe", time: "15:00", duration: 90  },
  { id: 1023, day: 2, stage: "Freedom by Bud",         name: "Space 92",                time: "16:30", duration: 90  },
  { id: 1024, day: 2, stage: "Freedom by Bud",         name: "Symphony Of ...",         time: "18:00", duration: 60  },
  { id: 1025, day: 2, stage: "Freedom by Bud",         name: "Meduza³",                 time: "19:00", duration: 60  },
  { id: 1026, day: 2, stage: "Freedom by Bud",         name: "Netsky",                  time: "20:00", duration: 60  },
  { id: 1027, day: 2, stage: "Freedom by Bud",         name: "Symphony Of ...",         time: "21:00", duration: 60  },
  { id: 1028, day: 2, stage: "Freedom by Bud",         name: "Armin van Buuren",        time: "22:00", duration: 90  },

  // THE ROSE GARDEN
  { id: 1040, day: 2, stage: "The Rose Garden",        name: "Just-K",                  time: "12:00", duration: 60  },
  { id: 1041, day: 2, stage: "The Rose Garden",        name: "Phi Phi",                 time: "13:00", duration: 60  },
  { id: 1042, day: 2, stage: "The Rose Garden",        name: "Jente b2b Neall",         time: "14:00", duration: 60  },
  { id: 1043, day: 2, stage: "The Rose Garden",        name: "Blvckprint",              time: "15:00", duration: 60  },
  { id: 1044, day: 2, stage: "The Rose Garden",        name: "Greg S.",                 time: "16:00", duration: 60  },
  { id: 1045, day: 2, stage: "The Rose Garden",        name: "DJ Furax",                time: "17:00", duration: 60  },
  { id: 1046, day: 2, stage: "The Rose Garden",        name: "DJ Ghost",                time: "18:00", duration: 60  },
  { id: 1047, day: 2, stage: "The Rose Garden",        name: "Push",                    time: "19:00", duration: 60  },
  { id: 1048, day: 2, stage: "The Rose Garden",        name: "Jan Vervloet",            time: "20:00", duration: 60  },
  { id: 1049, day: 2, stage: "The Rose Garden",        name: "Funkhauser",              time: "21:00", duration: 60  },
  { id: 1050, day: 2, stage: "The Rose Garden",        name: "Franky Kloeck",           time: "22:00", duration: 60  },
  { id: 1051, day: 2, stage: "The Rose Garden",        name: "X-Tof",                   time: "23:00", duration: 60  },
  { id: 1052, day: 2, stage: "The Rose Garden",        name: "Bonzai All Stars",        time: "00:00", duration: 60  },

  // ELIXIR
  { id: 1060, day: 2, stage: "Elixir",                 name: "Sojuju & Julia...",       time: "13:00", duration: 60  },
  { id: 1061, day: 2, stage: "Elixir",                 name: "Lordesius & A...",        time: "14:00", duration: 60  },
  { id: 1062, day: 2, stage: "Elixir",                 name: "Pretty Girls Li...",      time: "15:00", duration: 60  },
  { id: 1063, day: 2, stage: "Elixir",                 name: "Ballantine & D...",       time: "16:00", duration: 60  },
  { id: 1064, day: 2, stage: "Elixir",                 name: "WEF",                     time: "17:00", duration: 60  },
  { id: 1065, day: 2, stage: "Elixir",                 name: "MELVIEE",                 time: "18:00", duration: 60  },
  { id: 1066, day: 2, stage: "Elixir",                 name: "Vunzige Deunt...",        time: "19:00", duration: 60  },
  { id: 1067, day: 2, stage: "Elixir",                 name: "Kurashi Sound...",        time: "20:00", duration: 60  },
  { id: 1068, day: 2, stage: "Elixir",                 name: "Encore Sound...",         time: "21:00", duration: 60  },
  { id: 1069, day: 2, stage: "Elixir",                 name: "Rockefellababe",          time: "22:00", duration: 60  },
  { id: 1070, day: 2, stage: "Elixir",                 name: "Afrolosjes Sou...",       time: "23:00", duration: 60  },
  { id: 1071, day: 2, stage: "Elixir",                 name: "Steww Sounds...",         time: "00:00", duration: 60  },

  // CAGE
  { id: 1080, day: 2, stage: "Cage",                   name: "Luna Fields",             time: "12:00", duration: 120 },
  { id: 1081, day: 2, stage: "Cage",                   name: "Maike Depas",             time: "14:00", duration: 90  },
  { id: 1082, day: 2, stage: "Cage",                   name: "Not My Type",             time: "15:30", duration: 90  },
  { id: 1083, day: 2, stage: "Cage",                   name: "A.N.I.",                  time: "17:00", duration: 90  },
  { id: 1084, day: 2, stage: "Cage",                   name: "Dexphase",                time: "18:30", duration: 90  },
  { id: 1085, day: 2, stage: "Cage",                   name: "Byorn",                   time: "20:00", duration: 90  },
  { id: 1086, day: 2, stage: "Cage",                   name: "Vieze Asbak",             time: "21:30", duration: 90  },

  // THE RAVE CAVE
  { id: 1100, day: 2, stage: "The Rave Cave",           name: "The Spook",               time: "13:00", duration: 60  },
  { id: 1101, day: 2, stage: "The Rave Cave",           name: "Los Bomberos",            time: "14:00", duration: 60  },
  { id: 1102, day: 2, stage: "The Rave Cave",           name: "Aghatixx",                time: "15:00", duration: 60  },
  { id: 1103, day: 2, stage: "The Rave Cave",           name: "Brits & Boen",            time: "16:00", duration: 90  },
  { id: 1104, day: 2, stage: "The Rave Cave",           name: "Monta",                   time: "17:30", duration: 90  },
  { id: 1105, day: 2, stage: "The Rave Cave",           name: "Vitucci",                 time: "19:00", duration: 90  },
  { id: 1106, day: 2, stage: "The Rave Cave",           name: "Soulcity",                time: "20:30", duration: 90  },
  { id: 1107, day: 2, stage: "The Rave Cave",           name: "Bobby & Djenko",          time: "22:00", duration: 90  },
  { id: 1108, day: 2, stage: "The Rave Cave",           name: "Jonas van Opstal",        time: "23:30", duration: 90  },

  // PLANAXIS
  { id: 1120, day: 2, stage: "Planaxis",                name: "D'Angello & Fr...",       time: "12:00", duration: 60  },
  { id: 1121, day: 2, stage: "Planaxis",                name: "Chocolate Puma",          time: "13:00", duration: 60  },
  { id: 1122, day: 2, stage: "Planaxis",                name: "Marnik",                  time: "14:00", duration: 60  },
  { id: 1123, day: 2, stage: "Planaxis",                name: "Kaaze",                   time: "15:00", duration: 60  },
  { id: 1124, day: 2, stage: "Planaxis",                name: "Ian Asher",               time: "16:00", duration: 60  },
  { id: 1125, day: 2, stage: "Planaxis",                name: "Quintino",                time: "17:00", duration: 60  },
  { id: 1126, day: 2, stage: "Planaxis",                name: "Laidback Luke",           time: "18:00", duration: 60  },
  { id: 1127, day: 2, stage: "Planaxis",                name: "SURPRISE",                time: "19:00", duration: 60  },
  { id: 1128, day: 2, stage: "Planaxis",                name: "Lucas & Steve",           time: "20:00", duration: 60  },
  { id: 1129, day: 2, stage: "Planaxis",                name: "Bassjackers",             time: "21:00", duration: 60  },
  { id: 1130, day: 2, stage: "Planaxis",                name: "DVBBS",                   time: "22:00", duration: 60  },
  { id: 1131, day: 2, stage: "Planaxis",                name: "Steve Aoki",              time: "23:00", duration: 50  },

  // MELODIA BY CORONA
  { id: 1140, day: 2, stage: "Melodia by Corona",       name: "LYA",                     time: "12:00", duration: 90  },
  { id: 1141, day: 2, stage: "Melodia by Corona",       name: "Hermanos Inglesos",       time: "13:30", duration: 90  },
  { id: 1142, day: 2, stage: "Melodia by Corona",       name: "Emiliano Demarco",        time: "15:00", duration: 90  },
  { id: 1143, day: 2, stage: "Melodia by Corona",       name: "UNREAD",                  time: "16:30", duration: 90  },
  { id: 1144, day: 2, stage: "Melodia by Corona",       name: "Chinonegro",              time: "18:00", duration: 60  },
  { id: 1145, day: 2, stage: "Melodia by Corona",       name: "Idemi",                   time: "19:00", duration: 90  },
  { id: 1146, day: 2, stage: "Melodia by Corona",       name: "Sam Shure",               time: "20:30", duration: 90  },
  { id: 1147, day: 2, stage: "Melodia by Corona",       name: "Twenty Six",              time: "22:00", duration: 60  },
  { id: 1148, day: 2, stage: "Melodia by Corona",       name: "Arado",                   time: "23:00", duration: 60  },

  // CELESTIA BY KUCOIN
  { id: 1160, day: 2, stage: "Celestia by Kucoin",      name: "Sef sansT",               time: "12:00", duration: 60  },
  { id: 1161, day: 2, stage: "Celestia by Kucoin",      name: "Sebsky",                  time: "13:00", duration: 60  },
  { id: 1162, day: 2, stage: "Celestia by Kucoin",      name: "Encure b2b H...",         time: "14:00", duration: 60  },
  { id: 1163, day: 2, stage: "Celestia by Kucoin",      name: "Joyse b2b Rya...",        time: "15:00", duration: 60  },
  { id: 1164, day: 2, stage: "Celestia by Kucoin",      name: "Block & Crow...",         time: "16:00", duration: 60  },
  { id: 1165, day: 2, stage: "Celestia by Kucoin",      name: "Diego Miranda...",        time: "17:00", duration: 60  },
  { id: 1166, day: 2, stage: "Celestia by Kucoin",      name: "Dimitri Vangeli...",      time: "18:00", duration: 60  },
  { id: 1167, day: 2, stage: "Celestia by Kucoin",      name: "Yves V",                  time: "19:00", duration: 60  },
  { id: 1168, day: 2, stage: "Celestia by Kucoin",      name: "Dj Nano",                 time: "20:00", duration: 60  },
  { id: 1169, day: 2, stage: "Celestia by Kucoin",      name: "Matisse & Sadko",         time: "21:00", duration: 60  },
  { id: 1170, day: 2, stage: "Celestia by Kucoin",      name: "Will Sparks",             time: "22:00", duration: 60  },

  // ATMOSPHERE
  { id: 1180, day: 2, stage: "Atmosphere",              name: "Interactive Noise",       time: "12:00", duration: 120 },
  { id: 1181, day: 2, stage: "Atmosphere",              name: "Marhu",                   time: "14:00", duration: 90  },
  { id: 1182, day: 2, stage: "Atmosphere",              name: "Estella Boersma",         time: "15:30", duration: 90  },
  { id: 1183, day: 2, stage: "Atmosphere",              name: "Elli Acula",              time: "17:00", duration: 90  },
  { id: 1184, day: 2, stage: "Atmosphere",              name: "Ben Klock",               time: "18:30", duration: 90  },
  { id: 1185, day: 2, stage: "Atmosphere",              name: "BIIa b2b Charlie Sparks", time: "20:00", duration: 90  },
  { id: 1186, day: 2, stage: "Atmosphere",              name: "Indira Paganotto",        time: "21:30", duration: 120 },
  { id: 1187, day: 2, stage: "Atmosphere",              name: "Reinier Zonneveld (live)", time: "23:30", duration: 60 },

  // CORE
  { id: 1200, day: 2, stage: "Core",                    name: "Capoon",                  time: "12:00", duration: 90  },
  { id: 1201, day: 2, stage: "Core",                    name: "Curol",                   time: "13:30", duration: 90  },
  { id: 1202, day: 2, stage: "Core",                    name: "Betical",                 time: "15:00", duration: 90  },
  { id: 1203, day: 2, stage: "Core",                    name: "Dino Lenny",              time: "16:30", duration: 90  },
  { id: 1204, day: 2, stage: "Core",                    name: "Antdot",                  time: "18:00", duration: 90  },
  { id: 1205, day: 2, stage: "Core",                    name: "SAMM b2b Ajna",           time: "19:30", duration: 120 },
  { id: 1206, day: 2, stage: "Core",                    name: "Carlita b2b Malive",      time: "21:30", duration: 90  },
  { id: 1207, day: 2, stage: "Core",                    name: "Bedouin",                 time: "23:00", duration: 50  },

  // CRYSTAL GARDEN
  { id: 1220, day: 2, stage: "Crystal Garden",          name: "Cici Daze",               time: "12:00", duration: 90  },
  { id: 1221, day: 2, stage: "Crystal Garden",          name: "DALI",                    time: "13:30", duration: 90  },
  { id: 1222, day: 2, stage: "Crystal Garden",          name: "NOSI",                    time: "15:00", duration: 120 },
  { id: 1223, day: 2, stage: "Crystal Garden",          name: "Dean Turnley",            time: "17:00", duration: 90  },
  { id: 1224, day: 2, stage: "Crystal Garden",          name: "Ben Hemsley",             time: "18:30", duration: 90  },
  { id: 1225, day: 2, stage: "Crystal Garden",          name: "Morten b2b Malaa",        time: "20:00", duration: 90  },
  { id: 1226, day: 2, stage: "Crystal Garden",          name: "Steve Angello",           time: "21:30", duration: 90  },

  // THE GREAT LIBRARY
  { id: 1240, day: 2, stage: "The Great Library",       name: "Marvin & Cam...",         time: "12:00", duration: 60  },
  { id: 1241, day: 2, stage: "The Great Library",       name: "CIEL",                    time: "13:00", duration: 60  },
  { id: 1242, day: 2, stage: "The Great Library",       name: "Marwan Dua",              time: "14:00", duration: 60  },
  { id: 1243, day: 2, stage: "The Great Library",       name: "Linska",                  time: "15:00", duration: 60  },
  { id: 1244, day: 2, stage: "The Great Library",       name: "More to be an...",        time: "16:00", duration: 60  },
  { id: 1245, day: 2, stage: "The Great Library",       name: "Jazzy",                   time: "17:00", duration: 60  },
  { id: 1246, day: 2, stage: "The Great Library",       name: "Andromedik",              time: "18:00", duration: 60  },
  { id: 1247, day: 2, stage: "The Great Library",       name: "Marten Hørger",           time: "19:00", duration: 60  },
  { id: 1248, day: 2, stage: "The Great Library",       name: "Agents Of Time",          time: "20:00", duration: 90  },
  { id: 1249, day: 2, stage: "The Great Library",       name: "Lost Frequencies",        time: "21:30", duration: 75  },
  { id: 1250, day: 2, stage: "The Great Library",       name: "Oliver Heldens",          time: "22:45", duration: 75  },

  // MOOSE BAR
  { id: 1260, day: 2, stage: "Moose Bar",               name: "Jeroen Visser",           time: "12:00", duration: 180 },
  { id: 1261, day: 2, stage: "Moose Bar",               name: "Funkhauser",              time: "15:00", duration: 240 },
  { id: 1262, day: 2, stage: "Moose Bar",               name: "Je Broer",                time: "19:00", duration: 60  },
  { id: 1263, day: 2, stage: "Moose Bar",               name: "Jelle DK",                time: "20:00", duration: 240 },

  // HOUSE OF FORTUNE BY JBL
  { id: 1280, day: 2, stage: "House of Fortune by JBL", name: "Makasi",                  time: "13:00", duration: 60  },
  { id: 1281, day: 2, stage: "House of Fortune by JBL", name: "Lennert Wolfs",           time: "14:00", duration: 60  },
  { id: 1282, day: 2, stage: "House of Fortune by JBL", name: "Mark Roma",               time: "15:00", duration: 60  },
  { id: 1283, day: 2, stage: "House of Fortune by JBL", name: "Fonsi Nieto",             time: "16:00", duration: 60  },
  { id: 1284, day: 2, stage: "House of Fortune by JBL", name: "More to be an...",        time: "17:00", duration: 60  },
  { id: 1285, day: 2, stage: "House of Fortune by JBL", name: "Lucas & Steve",           time: "18:00", duration: 60  },
  { id: 1286, day: 2, stage: "House of Fortune by JBL", name: "Kris Kross Am...",        time: "19:00", duration: 60  },
  { id: 1287, day: 2, stage: "House of Fortune by JBL", name: "Yuuki Yoshiyama",         time: "20:00", duration: 60  },
  { id: 1288, day: 2, stage: "House of Fortune by JBL", name: "MANDY",                   time: "21:00", duration: 60  },

  // ══════════════════════════════════════
  //  DIMANCHE 26 JUILLET
  // ══════════════════════════════════════

  // MAINSTAGE
  { id: 2001, day: 3, stage: "Mainstage",              name: "Discovery",               time: "12:00", duration: 150 },
  { id: 2002, day: 3, stage: "Mainstage",              name: "Hannah Laing",            time: "14:30", duration: 60  },
  { id: 2003, day: 3, stage: "Mainstage",              name: "Karakals",                time: "15:30", duration: 60  },
  { id: 2004, day: 3, stage: "Mainstage",              name: "Malugi",                  time: "16:30", duration: 60  },
  { id: 2005, day: 3, stage: "Mainstage",              name: "Kevin de Vries",          time: "17:35", duration: 65  },
  { id: 2006, day: 3, stage: "Mainstage",              name: "B Jones",                 time: "18:40", duration: 60  },
  { id: 2007, day: 3, stage: "Mainstage",              name: "SURPRISE",                time: "19:40", duration: 60  },
  { id: 2008, day: 3, stage: "Mainstage",              name: "John Summit",             time: "20:40", duration: 65  },
  { id: 2009, day: 3, stage: "Mainstage",              name: "Alesso",                  time: "21:45", duration: 65  },
  { id: 2010, day: 3, stage: "Mainstage",              name: "Calvin Harris",           time: "22:50", duration: 60  },

  // FREEDOM BY BUD
  { id: 2020, day: 3, stage: "Freedom by Bud",         name: "Neon",                    time: "12:00", duration: 90  },
  { id: 2021, day: 3, stage: "Freedom by Bud",         name: "DJ Licious",              time: "13:30", duration: 90  },
  { id: 2022, day: 3, stage: "Freedom by Bud",         name: "Aline Rocha",             time: "15:00", duration: 60  },
  { id: 2023, day: 3, stage: "Freedom by Bud",         name: "Arielle Free",            time: "16:00", duration: 90  },
  { id: 2024, day: 3, stage: "Freedom by Bud",         name: "Jack Shore",              time: "17:30", duration: 60  },
  { id: 2025, day: 3, stage: "Freedom by Bud",         name: "Pegassi",                 time: "18:30", duration: 90  },
  { id: 2026, day: 3, stage: "Freedom by Bud",         name: "Chase & Status",          time: "20:00", duration: 60  },
  { id: 2027, day: 3, stage: "Freedom by Bud",         name: "ALOK: Rave T...",         time: "21:00", duration: 60  },
  { id: 2028, day: 3, stage: "Freedom by Bud",         name: "I Hate Models",           time: "22:00", duration: 90  },

  // THE ROSE GARDEN
  { id: 2040, day: 3, stage: "The Rose Garden",        name: "Digital Madness",         time: "12:00", duration: 60  },
  { id: 2041, day: 3, stage: "The Rose Garden",        name: "The Z.",                  time: "13:00", duration: 90  },
  { id: 2042, day: 3, stage: "The Rose Garden",        name: "Adrenalize",              time: "14:30", duration: 60  },
  { id: 2043, day: 3, stage: "The Rose Garden",        name: "TNT",                     time: "15:30", duration: 60  },
  { id: 2044, day: 3, stage: "The Rose Garden",        name: "Rooler",                  time: "16:30", duration: 60  },
  { id: 2045, day: 3, stage: "The Rose Garden",        name: "Isaac",                   time: "17:30", duration: 60  },
  { id: 2046, day: 3, stage: "The Rose Garden",        name: "Rebelion",                time: "18:30", duration: 60  },
  { id: 2047, day: 3, stage: "The Rose Garden",        name: "Pat B",                   time: "19:30", duration: 60  },
  { id: 2048, day: 3, stage: "The Rose Garden",        name: "Sub Zero Project",        time: "20:30", duration: 90  },
  { id: 2049, day: 3, stage: "The Rose Garden",        name: "The Saints",              time: "22:00", duration: 60  },

  // ELIXIR
  { id: 2060, day: 3, stage: "Elixir",                 name: "G-Lo",                    time: "13:00", duration: 60  },
  { id: 2061, day: 3, stage: "Elixir",                 name: "Sako Glitch",             time: "14:00", duration: 60  },
  { id: 2062, day: 3, stage: "Elixir",                 name: "Favella Som Si...",       time: "15:00", duration: 60  },
  { id: 2063, day: 3, stage: "Elixir",                 name: "DJ FASTA",                time: "16:00", duration: 60  },
  { id: 2064, day: 3, stage: "Elixir",                 name: "Noah",                    time: "17:00", duration: 60  },
  { id: 2065, day: 3, stage: "Elixir",                 name: "Team Damp",               time: "18:00", duration: 60  },
  { id: 2066, day: 3, stage: "Elixir",                 name: "Heaven Sam",              time: "19:00", duration: 60  },
  { id: 2067, day: 3, stage: "Elixir",                 name: "Karyo",                   time: "20:00", duration: 60  },
  { id: 2068, day: 3, stage: "Elixir",                 name: "Tribal Kush",             time: "21:00", duration: 60  },
  { id: 2069, day: 3, stage: "Elixir",                 name: "Sleazy Stereo",           time: "22:00", duration: 60  },
  { id: 2070, day: 3, stage: "Elixir",                 name: "Jeronimo",                time: "23:00", duration: 60  },

  // CAGE
  { id: 2080, day: 3, stage: "Cage",                   name: "Klaps F2F Miamor",        time: "12:00", duration: 120 },
  { id: 2081, day: 3, stage: "Cage",                   name: "Hurts F2F ROW 1",         time: "14:00", duration: 90  },
  { id: 2082, day: 3, stage: "Cage",                   name: "FUMI F2F HUJUS",          time: "15:30", duration: 90  },
  { id: 2083, day: 3, stage: "Cage",                   name: "David Löhlein F2F Yasmin r...", time: "17:00", duration: 90 },
  { id: 2084, day: 3, stage: "Cage",                   name: "EMILIJA F2F Frederic.",   time: "18:30", duration: 90  },
  { id: 2085, day: 3, stage: "Cage",                   name: "Serafina F2F zwilling",   time: "20:00", duration: 90  },
  { id: 2086, day: 3, stage: "Cage",                   name: "Adrián Mills F2F SISU",   time: "21:30", duration: 90  },

  // THE RAVE CAVE
  { id: 2100, day: 3, stage: "The Rave Cave",           name: "YERUN",                   time: "13:00", duration: 120 },
  { id: 2101, day: 3, stage: "The Rave Cave",           name: "Mell Tierra",             time: "15:00", duration: 90  },
  { id: 2102, day: 3, stage: "The Rave Cave",           name: "Dries Smet",              time: "16:30", duration: 60  },
  { id: 2103, day: 3, stage: "The Rave Cave",           name: "Noaffection b2b OM3N",    time: "17:30", duration: 90  },
  { id: 2104, day: 3, stage: "The Rave Cave",           name: "Nederhand",               time: "19:00", duration: 60  },
  { id: 2105, day: 3, stage: "The Rave Cave",           name: "Foxed Up",                time: "20:00", duration: 60  },
  { id: 2106, day: 3, stage: "The Rave Cave",           name: "Mitched",                 time: "21:00", duration: 60  },
  { id: 2107, day: 3, stage: "The Rave Cave",           name: "Coco Bevan",              time: "22:00", duration: 60  },
  { id: 2108, day: 3, stage: "The Rave Cave",           name: "Godtripper",              time: "23:00", duration: 50  },

  // PLANAXIS
  { id: 2120, day: 3, stage: "Planaxis",                name: "Exception",               time: "12:00", duration: 75  },
  { id: 2121, day: 3, stage: "Planaxis",                name: "Punctual",                time: "13:15", duration: 105 },
  { id: 2122, day: 3, stage: "Planaxis",                name: "SABAI",                   time: "15:00", duration: 60  },
  { id: 2123, day: 3, stage: "Planaxis",                name: "[IVY]",                   time: "16:00", duration: 60  },
  { id: 2124, day: 3, stage: "Planaxis",                name: "Nostalgix",               time: "17:00", duration: 60  },
  { id: 2125, day: 3, stage: "Planaxis",                name: "LEVEL UP",                time: "18:00", duration: 60  },
  { id: 2126, day: 3, stage: "Planaxis",                name: "Arcando",                 time: "19:00", duration: 60  },
  { id: 2127, day: 3, stage: "Planaxis",                name: "Malaa's Alter...",        time: "20:00", duration: 60  },
  { id: 2128, day: 3, stage: "Planaxis",                name: "Liquid Stranger",         time: "21:00", duration: 60  },
  { id: 2129, day: 3, stage: "Planaxis",                name: "Seven Lions",             time: "22:00", duration: 60  },
  { id: 2130, day: 3, stage: "Planaxis",                name: "Subtronics",              time: "23:00", duration: 60  },

  // MELODIA BY CORONA
  { id: 2140, day: 3, stage: "Melodia by Corona",       name: "Le Windey",               time: "12:00", duration: 90  },
  { id: 2141, day: 3, stage: "Melodia by Corona",       name: "DJ Gee",                  time: "13:30", duration: 60  },
  { id: 2142, day: 3, stage: "Melodia by Corona",       name: "Christian82",             time: "14:30", duration: 60  },
  { id: 2143, day: 3, stage: "Melodia by Corona",       name: "Tania Moon",              time: "15:30", duration: 60  },
  { id: 2144, day: 3, stage: "Melodia by Corona",       name: "CRISTINA TOSIO",          time: "16:30", duration: 90  },
  { id: 2145, day: 3, stage: "Melodia by Corona",       name: "Lunnas",                  time: "18:00", duration: 60  },
  { id: 2146, day: 3, stage: "Melodia by Corona",       name: "Marta Loe b2b...",        time: "19:00", duration: 60  },
  { id: 2147, day: 3, stage: "Melodia by Corona",       name: "Delafino",                time: "20:00", duration: 60  },
  { id: 2148, day: 3, stage: "Melodia by Corona",       name: "Dave Hang",               time: "21:00", duration: 60  },
  { id: 2149, day: 3, stage: "Melodia by Corona",       name: "Felix Da Funk",           time: "22:00", duration: 60  },

  // CELESTIA BY KUCOIN
  { id: 2160, day: 3, stage: "Celestia by Kucoin",      name: "Sentin",                  time: "12:00", duration: 90  },
  { id: 2161, day: 3, stage: "Celestia by Kucoin",      name: "Cyria (Hybrid)",          time: "13:30", duration: 90  },
  { id: 2162, day: 3, stage: "Celestia by Kucoin",      name: "Fake Mood",               time: "15:00", duration: 90  },
  { id: 2163, day: 3, stage: "Celestia by Kucoin",      name: "Öona Dahl",               time: "16:30", duration: 90  },
  { id: 2164, day: 3, stage: "Celestia by Kucoin",      name: "Helsloot",                time: "18:00", duration: 90  },
  { id: 2165, day: 3, stage: "Celestia by Kucoin",      name: "MXGPU (Hybrid)",          time: "19:30", duration: 90  },
  { id: 2166, day: 3, stage: "Celestia by Kucoin",      name: "Nico Morano b2b Xinobi",  time: "21:00", duration: 90  },

  // ATMOSPHERE
  { id: 2180, day: 3, stage: "Atmosphere",              name: "Flour",                   time: "12:00", duration: 120 },
  { id: 2181, day: 3, stage: "Atmosphere",              name: "VE/RA",                   time: "14:00", duration: 120 },
  { id: 2182, day: 3, stage: "Atmosphere",              name: "Blondex",                 time: "16:00", duration: 90  },
  { id: 2183, day: 3, stage: "Atmosphere",              name: "SHDW b2b ÜBERKIKZ",       time: "17:30", duration: 90  },
  { id: 2184, day: 3, stage: "Atmosphere",              name: "Øtta",                    time: "19:00", duration: 90  },
  { id: 2185, day: 3, stage: "Atmosphere",              name: "Anetha",                  time: "20:30", duration: 120 },
  { id: 2186, day: 3, stage: "Atmosphere",              name: "Amelie Lens",             time: "22:30", duration: 85  },

  // CORE
  { id: 2200, day: 3, stage: "Core",                    name: "Massignan.y",             time: "12:00", duration: 120 },
  { id: 2201, day: 3, stage: "Core",                    name: "Ineffekt",                time: "14:00", duration: 120 },
  { id: 2202, day: 3, stage: "Core",                    name: "Fafi Abdel Nour",         time: "16:00", duration: 120 },
  { id: 2203, day: 3, stage: "Core",                    name: "Sedef Adası",             time: "18:00", duration: 120 },
  { id: 2204, day: 3, stage: "Core",                    name: "Avalon Emerson b2b Ben UFO", time: "20:00", duration: 120 },
  { id: 2205, day: 3, stage: "Core",                    name: "Job Jobse",               time: "22:00", duration: 110 },

  // CRYSTAL GARDEN
  { id: 2220, day: 3, stage: "Crystal Garden",          name: "Poleen",                  time: "12:00", duration: 90  },
  { id: 2221, day: 3, stage: "Crystal Garden",          name: "Re-Type",                 time: "13:30", duration: 90  },
  { id: 2222, day: 3, stage: "Crystal Garden",          name: "Hitty",                   time: "15:00", duration: 90  },
  { id: 2223, day: 3, stage: "Crystal Garden",          name: "ELFIGO",                  time: "16:30", duration: 90  },
  { id: 2224, day: 3, stage: "Crystal Garden",          name: "Wade",                    time: "18:00", duration: 90  },
  { id: 2225, day: 3, stage: "Crystal Garden",          name: "DJ Gigola",               time: "19:30", duration: 90  },
  { id: 2226, day: 3, stage: "Crystal Garden",          name: "Oscar and the...",        time: "21:00", duration: 60  },
  { id: 2227, day: 3, stage: "Crystal Garden",          name: "DJ Tennis b2b Vintage Cul...", time: "22:00", duration: 90 },

  // THE GREAT LIBRARY
  { id: 2240, day: 3, stage: "The Great Library",       name: "Diëtro",                  time: "12:00", duration: 60  },
  { id: 2241, day: 3, stage: "The Great Library",       name: "Yazzmin",                 time: "13:00", duration: 60  },
  { id: 2242, day: 3, stage: "The Great Library",       name: "James Carter",            time: "14:00", duration: 60  },
  { id: 2243, day: 3, stage: "The Great Library",       name: "Viktor",                  time: "15:00", duration: 60  },
  { id: 2244, day: 3, stage: "The Great Library",       name: "Hypaton",                 time: "16:00", duration: 60  },
  { id: 2245, day: 3, stage: "The Great Library",       name: "Gabry Ponte",             time: "17:00", duration: 60  },
  { id: 2246, day: 3, stage: "The Great Library",       name: "MATTN",                   time: "18:00", duration: 60  },
  { id: 2247, day: 3, stage: "The Great Library",       name: "Blasterjaxx",             time: "19:00", duration: 60  },
  { id: 2248, day: 3, stage: "The Great Library",       name: "Gryffin",                 time: "20:00", duration: 60  },
  { id: 2249, day: 3, stage: "The Great Library",       name: "Dimitri Vegas ...",       time: "21:00", duration: 60  },
  { id: 2250, day: 3, stage: "The Great Library",       name: "Afrojack",                time: "22:00", duration: 60  },
  { id: 2251, day: 3, stage: "The Great Library",       name: "Vini Vici",               time: "23:00", duration: 55  },

  // MOOSE BAR
  { id: 2260, day: 3, stage: "Moose Bar",               name: "Tom Cosyns",              time: "12:00", duration: 240 },
  { id: 2261, day: 3, stage: "Moose Bar",               name: "Les Mecs Eclectics",      time: "16:00", duration: 180 },
  { id: 2262, day: 3, stage: "Moose Bar",               name: "Effe Serieus",            time: "19:00", duration: 60  },
  { id: 2263, day: 3, stage: "Moose Bar",               name: "Jerrooo",                 time: "20:00", duration: 240 },

  // HOUSE OF FORTUNE BY JBL
  { id: 2280, day: 3, stage: "House of Fortune by JBL", name: "DJ GAB",                  time: "13:00", duration: 60  },
  { id: 2281, day: 3, stage: "House of Fortune by JBL", name: "Krevix",                  time: "14:00", duration: 60  },
  { id: 2282, day: 3, stage: "House of Fortune by JBL", name: "AdamK",                   time: "15:00", duration: 60  },
  { id: 2283, day: 3, stage: "House of Fortune by JBL", name: "Sofia Cristo",            time: "16:00", duration: 60  },
  { id: 2284, day: 3, stage: "House of Fortune by JBL", name: "Sam Hofman",              time: "17:00", duration: 60  },
  { id: 2285, day: 3, stage: "House of Fortune by JBL", name: "NORO$T",                  time: "18:00", duration: 60  },
  { id: 2286, day: 3, stage: "House of Fortune by JBL", name: "Da Tweekaz",              time: "19:00", duration: 60  },
  { id: 2287, day: 3, stage: "House of Fortune by JBL", name: "More to be an...",        time: "20:00", duration: 60  },
  { id: 2288, day: 3, stage: "House of Fortune by JBL", name: "Blasterjaxx",             time: "21:00", duration: 60  },
];

const DAY_LABELS = { 1: "Vendredi 24/07", 2: "Samedi 25/07", 3: "Dimanche 26/07" };

const STAGES_ORDER = [
  "Mainstage", "Freedom by Bud", "Atmosphere", "Crystal Garden", "The Great Library",
  "Core", "Planaxis", "The Rose Garden", "Elixir", "Cage",
  "The Rave Cave", "Melodia by Corona", "Celestia by Kucoin",
  "House of Fortune by JBL", "Moose Bar",
];

const STAGE_COLORS = {
  "Mainstage":              "#FF6B35",
  "Freedom by Bud":         "#9B59B6",
  "The Great Library":      "#3498DB",
  "Crystal Garden":         "#2ECC71",
  "Core":                   "#E74C3C",
  "Planaxis":               "#F39C12",
  "Atmosphere":             "#1ABC9C",
  "The Rose Garden":        "#E91E8C",
  "Cage":                   "#795548",
  "Elixir":                 "#00BCD4",
  "Celestia by Kucoin":     "#FF9800",
  "The Rave Cave":          "#607D8B",
  "Melodia by Corona":      "#8BC34A",
  "House of Fortune by JBL":"#FF5722",
  "Moose Bar":              "#9E9E9E",
};
