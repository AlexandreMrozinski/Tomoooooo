// ============================================================
//  TML W2 2026 — Timetable data (OFFICIAL)
//  Vendredi 24 / Samedi 25 / Dimanche 26 juillet
// ============================================================

const VOTE_LEVELS = [
  { value: 1, label: "Priorité",     emoji: "🔥", color: "#FF6B35" },
  { value: 2, label: "Si dispo",     emoji: "👍", color: "#3498DB" },
  { value: 3, label: "Pourquoi pas", emoji: "🤷", color: "#7878a0" },
];

const TIMETABLE = [

  // ══════════════════════════════════════
  //  VENDREDI 24 JUILLET
  // ══════════════════════════════════════

  // MAINSTAGE
  { id: 1,   day: 1, stage: "Mainstage",              name: "Discovery",                    time: "12:00", duration: 120 },
  { id: 2,   day: 1, stage: "Mainstage",              name: "More to be announced",         time: "14:00", duration: 90  },
  { id: 3,   day: 1, stage: "Mainstage",              name: "Ely Oaks",                     time: "15:30", duration: 60  },
  { id: 4,   day: 1, stage: "Mainstage",              name: "Yves V",                       time: "16:30", duration: 65  },
  { id: 5,   day: 1, stage: "Mainstage",              name: "Miss Monique",                 time: "17:35", duration: 65  },
  { id: 6,   day: 1, stage: "Mainstage",              name: "Indira Paganotto",             time: "18:40", duration: 60  },
  { id: 7,   day: 1, stage: "Mainstage",              name: "Nicky Romero",                 time: "19:40", duration: 60  },
  { id: 8,   day: 1, stage: "Mainstage",              name: "Kölsch",                       time: "20:40", duration: 65  },
  { id: 9,   day: 1, stage: "Mainstage",              name: "Alok",                         time: "21:45", duration: 65  },
  { id: 10,  day: 1, stage: "Mainstage",              name: "Steve Angello",                time: "22:50", duration: 60  },

  // FREEDOM BY BUD
  { id: 20,  day: 1, stage: "Freedom by Bud",         name: "Esin Boz",                     time: "12:00", duration: 90  },
  { id: 21,  day: 1, stage: "Freedom by Bud",         name: "JOA",                          time: "13:30", duration: 90  },
  { id: 22,  day: 1, stage: "Freedom by Bud",         name: "Aaron Hibell",                 time: "15:00", duration: 60  },
  { id: 23,  day: 1, stage: "Freedom by Bud",         name: "Amber Broos b2b Juliet Fox",   time: "16:00", duration: 90  },
  { id: 24,  day: 1, stage: "Freedom by Bud",         name: "Enrico Sangiuliano",           time: "17:30", duration: 90  },
  { id: 25,  day: 1, stage: "Freedom by Bud",         name: "John Newman...",               time: "19:00", duration: 60  },
  { id: 26,  day: 1, stage: "Freedom by Bud",         name: "B...",                         time: "20:00", duration: 30  },
  { id: 27,  day: 1, stage: "Freedom by Bud",         name: "James Hype",                   time: "20:30", duration: 60  },
  { id: 28,  day: 1, stage: "Freedom by Bud",         name: "Fisher",                       time: "21:30", duration: 90  },
  { id: 29,  day: 1, stage: "Freedom by Bud",         name: "Alesso",                       time: "23:00", duration: 90  },

  // THE ROSE GARDEN
  { id: 40,  day: 1, stage: "The Rose Garden",        name: "Shawiya Tribe",                time: "12:00", duration: 90  },
  { id: 41,  day: 1, stage: "The Rose Garden",        name: "LICIA",                        time: "13:30", duration: 90  },
  { id: 42,  day: 1, stage: "The Rose Garden",        name: "Lucky Luke",                   time: "15:00", duration: 60  },
  { id: 43,  day: 1, stage: "The Rose Garden",        name: "Goddard & Dr...",              time: "16:00", duration: 60  },
  { id: 44,  day: 1, stage: "The Rose Garden",        name: "Ghengar",                      time: "17:00", duration: 60  },
  { id: 45,  day: 1, stage: "The Rose Garden",        name: "ALLEYCVT",                     time: "18:00", duration: 60  },
  { id: 46,  day: 1, stage: "The Rose Garden",        name: "Basstripper",                  time: "19:00", duration: 60  },
  { id: 47,  day: 1, stage: "The Rose Garden",        name: "Jessica Audiffred",            time: "20:00", duration: 60  },
  { id: 48,  day: 1, stage: "The Rose Garden",        name: "Riot Ten",                     time: "21:00", duration: 60  },
  { id: 49,  day: 1, stage: "The Rose Garden",        name: "BOU + B LIVE...",              time: "22:00", duration: 60  },
  { id: 50,  day: 1, stage: "The Rose Garden",        name: "Borgore",                      time: "23:00", duration: 60  },

  // ELIXIR
  { id: 60,  day: 1, stage: "Elixir",                 name: "Rosh",                         time: "13:00", duration: 90  },
  { id: 61,  day: 1, stage: "Elixir",                 name: "Brooke Bailey b2b Taliyah...", time: "14:30", duration: 90  },
  { id: 62,  day: 1, stage: "Elixir",                 name: "Valentino Ignoto",             time: "16:00", duration: 60  },
  { id: 63,  day: 1, stage: "Elixir",                 name: "Iris Rooth",                   time: "17:00", duration: 60  },
  { id: 64,  day: 1, stage: "Elixir",                 name: "Miro",                         time: "18:00", duration: 60  },
  { id: 65,  day: 1, stage: "Elixir",                 name: "Nems",                         time: "19:00", duration: 60  },
  { id: 66,  day: 1, stage: "Elixir",                 name: "Shirak",                       time: "20:00", duration: 60  },
  { id: 67,  day: 1, stage: "Elixir",                 name: "Flash",                        time: "21:00", duration: 60  },
  { id: 68,  day: 1, stage: "Elixir",                 name: "Dany Neville",                 time: "22:00", duration: 60  },
  { id: 69,  day: 1, stage: "Elixir",                 name: "Irwan",                        time: "23:00", duration: 60  },

  // CAGE
  { id: 80,  day: 1, stage: "Cage",                   name: "BAZZY",                        time: "12:00", duration: 60  },
  { id: 81,  day: 1, stage: "Cage",                   name: "TOXIC TWINS",                  time: "13:00", duration: 60  },
  { id: 82,  day: 1, stage: "Cage",                   name: "TODIEFOR",                     time: "14:00", duration: 60  },
  { id: 83,  day: 1, stage: "Cage",                   name: "IMHAPPY",                      time: "15:00", duration: 60  },
  { id: 84,  day: 1, stage: "Cage",                   name: "NATTE VISSTICK",               time: "16:00", duration: 60  },
  { id: 85,  day: 1, stage: "Cage",                   name: "DJ FURAX",                     time: "17:00", duration: 60  },
  { id: 86,  day: 1, stage: "Cage",                   name: "PARTYRAISER...",               time: "18:00", duration: 60  },
  { id: 87,  day: 1, stage: "Cage",                   name: "DRS b2b SAN...",               time: "19:00", duration: 60  },
  { id: 88,  day: 1, stage: "Cage",                   name: "LEKKERFACES",                  time: "20:00", duration: 60  },
  { id: 89,  day: 1, stage: "Cage",                   name: "YOSHIKO",                      time: "21:00", duration: 60  },
  { id: 90,  day: 1, stage: "Cage",                   name: "TERRORCLOWN",                  time: "22:00", duration: 60  },

  // THE RAVE CAVE
  { id: 100, day: 1, stage: "The Rave Cave",           name: "Sanne Dammers",                time: "13:00", duration: 90  },
  { id: 101, day: 1, stage: "The Rave Cave",           name: "Leesa",                        time: "14:30", duration: 90  },
  { id: 102, day: 1, stage: "The Rave Cave",           name: "VIKTÖR b2b MZDZ",              time: "16:00", duration: 90  },
  { id: 103, day: 1, stage: "The Rave Cave",           name: "Lou8",                         time: "17:30", duration: 60  },
  { id: 104, day: 1, stage: "The Rave Cave",           name: "Jared",                        time: "18:30", duration: 60  },
  { id: 105, day: 1, stage: "The Rave Cave",           name: "Xijaro & Pitch",               time: "19:30", duration: 60  },
  { id: 106, day: 1, stage: "The Rave Cave",           name: "Mr. Joy",                      time: "20:30", duration: 90  },
  { id: 107, day: 1, stage: "The Rave Cave",           name: "Mairee",                       time: "22:00", duration: 60  },
  { id: 108, day: 1, stage: "The Rave Cave",           name: "Bisoux b2b Je...",             time: "23:00", duration: 60  },

  // PLANAXIS
  { id: 120, day: 1, stage: "Planaxis",                name: "Locus",                        time: "12:00", duration: 60  },
  { id: 121, day: 1, stage: "Planaxis",                name: "Domi Re",                      time: "13:00", duration: 60  },
  { id: 122, day: 1, stage: "Planaxis",                name: "Beat Controllers",             time: "14:00", duration: 60  },
  { id: 123, day: 1, stage: "Planaxis",                name: "Vitor Falabella",              time: "15:00", duration: 60  },
  { id: 124, day: 1, stage: "Planaxis",                name: "Firaga",                       time: "16:00", duration: 60  },
  { id: 125, day: 1, stage: "Planaxis",                name: "Somnia",                       time: "17:00", duration: 60  },
  { id: 126, day: 1, stage: "Planaxis",                name: "Phaxe",                        time: "18:00", duration: 60  },
  { id: 127, day: 1, stage: "Planaxis",                name: "Blazy",                        time: "19:00", duration: 60  },
  { id: 128, day: 1, stage: "Planaxis",                name: "Blastoyz",                     time: "20:00", duration: 60  },
  { id: 129, day: 1, stage: "Planaxis",                name: "Vegas",                        time: "21:00", duration: 60  },
  { id: 130, day: 1, stage: "Planaxis",                name: "Avalon",                       time: "22:00", duration: 60  },
  { id: 131, day: 1, stage: "Planaxis",                name: "Electric Universe",            time: "23:00", duration: 60  },

  // MELODIA BY CORONA
  { id: 140, day: 1, stage: "Melodia by Corona",       name: "SPIES",                        time: "12:00", duration: 120 },
  { id: 141, day: 1, stage: "Melodia by Corona",       name: "Joulie",                       time: "14:00", duration: 90  },
  { id: 142, day: 1, stage: "Melodia by Corona",       name: "L-Fêtes",                      time: "15:30", duration: 90  },
  { id: 143, day: 1, stage: "Melodia by Corona",       name: "Planet Groove DJ's",           time: "17:00", duration: 75  },
  { id: 144, day: 1, stage: "Melodia by Corona",       name: "Eko Roo...",                   time: "19:15", duration: 45  },
  { id: 145, day: 1, stage: "Melodia by Corona",       name: "John Noseda",                  time: "20:00", duration: 120 },
  { id: 146, day: 1, stage: "Melodia by Corona",       name: "Jeroen Delodder",              time: "22:00", duration: 60  },

  // CELESTIA BY KUCOIN
  { id: 160, day: 1, stage: "Celestia by Kucoin",      name: "Gissa",                        time: "12:00", duration: 90  },
  { id: 161, day: 1, stage: "Celestia by Kucoin",      name: "Saar Kuus",                    time: "13:30", duration: 90  },
  { id: 162, day: 1, stage: "Celestia by Kucoin",      name: "AAT",                          time: "15:00", duration: 90  },
  { id: 163, day: 1, stage: "Celestia by Kucoin",      name: "Belters Only",                 time: "16:30", duration: 120 },
  { id: 164, day: 1, stage: "Celestia by Kucoin",      name: "Ruze b2b Ranger Trucco",       time: "18:30", duration: 90  },
  { id: 165, day: 1, stage: "Celestia by Kucoin",      name: "Mr. Belt & Wezol",             time: "20:00", duration: 90  },

  // ATMOSPHERE
  { id: 180, day: 1, stage: "Atmosphere",              name: "Skeletor Yogi",                time: "12:00", duration: 120 },
  { id: 181, day: 1, stage: "Atmosphere",              name: "BOY&GIRL",                     time: "14:00", duration: 90  },
  { id: 182, day: 1, stage: "Atmosphere",              name: "Mha Iri",                      time: "15:30", duration: 90  },
  { id: 183, day: 1, stage: "Atmosphere",              name: "Callush",                      time: "17:00", duration: 90  },
  { id: 184, day: 1, stage: "Atmosphere",              name: "Hannah Laing",                 time: "18:30", duration: 60  },
  { id: 185, day: 1, stage: "Atmosphere",              name: "Byorn",                        time: "19:30", duration: 60  },
  { id: 186, day: 1, stage: "Atmosphere",              name: "Dyen b2b Mad...",              time: "20:30", duration: 60  },
  { id: 187, day: 1, stage: "Atmosphere",              name: "Azyr",                         time: "21:30", duration: 90  },
  { id: 188, day: 1, stage: "Atmosphere",              name: "Onlynumbers",                  time: "23:00", duration: 60  },

  // CORE
  { id: 200, day: 1, stage: "Core",                    name: "Fais Le Beau b2b Sixsixsixties", time: "12:00", duration: 180 },
  { id: 201, day: 1, stage: "Core",                    name: "Kamma",                        time: "15:00", duration: 120 },
  { id: 202, day: 1, stage: "Core",                    name: "Bibi Seck b2b Faisal",         time: "17:00", duration: 120 },
  { id: 203, day: 1, stage: "Core",                    name: "Ogazón",                       time: "19:00", duration: 90  },
  { id: 204, day: 1, stage: "Core",                    name: "Bullet Tooth",                 time: "20:30", duration: 90  },
  { id: 205, day: 1, stage: "Core",                    name: "Mall Grab",                    time: "22:00", duration: 105 },

  // CRYSTAL GARDEN
  { id: 220, day: 1, stage: "Crystal Garden",          name: "Deco",                         time: "12:00", duration: 90  },
  { id: 221, day: 1, stage: "Crystal Garden",          name: "Capoon",                       time: "13:30", duration: 120 },
  { id: 222, day: 1, stage: "Crystal Garden",          name: "Malive",                       time: "15:30", duration: 90  },
  { id: 223, day: 1, stage: "Crystal Garden",          name: "Joezi",                        time: "17:00", duration: 90  },
  { id: 224, day: 1, stage: "Crystal Garden",          name: "Kitty Amor b2b Curol",         time: "18:30", duration: 90  },
  { id: 225, day: 1, stage: "Crystal Garden",          name: "Shimza",                       time: "20:00", duration: 90  },
  { id: 226, day: 1, stage: "Crystal Garden",          name: "Hugel",                        time: "21:30", duration: 90  },
  { id: 227, day: 1, stage: "Crystal Garden",          name: "Mahmut Orhan",                 time: "23:00", duration: 90  },

  // THE GREAT LIBRARY
  { id: 240, day: 1, stage: "The Great Library",       name: "Calumny",                      time: "12:00", duration: 60  },
  { id: 241, day: 1, stage: "The Great Library",       name: "Meaghan",                      time: "13:00", duration: 60  },
  { id: 242, day: 1, stage: "The Great Library",       name: "NOME.",                        time: "14:00", duration: 60  },
  { id: 243, day: 1, stage: "The Great Library",       name: "5NAPBACK",                     time: "15:00", duration: 60  },
  { id: 244, day: 1, stage: "The Great Library",       name: "Merow",                        time: "16:00", duration: 60  },
  { id: 245, day: 1, stage: "The Great Library",       name: "B Jones",                      time: "17:00", duration: 60  },
  { id: 246, day: 1, stage: "The Great Library",       name: "Regi",                         time: "18:00", duration: 60  },
  { id: 247, day: 1, stage: "The Great Library",       name: "MANDY",                        time: "19:00", duration: 60  },
  { id: 248, day: 1, stage: "The Great Library",       name: "Omdat Het Ka...",              time: "20:00", duration: 60  },
  { id: 249, day: 1, stage: "The Great Library",       name: "HALÖ",                         time: "21:00", duration: 60  },
  { id: 250, day: 1, stage: "The Great Library",       name: "Kaskade",                      time: "22:00", duration: 60  },
  { id: 251, day: 1, stage: "The Great Library",       name: "Alan Walker",                  time: "23:00", duration: 60  },

  // MOOSE BAR
  { id: 260, day: 1, stage: "Moose Bar",               name: "Prosit",                       time: "12:00", duration: 240 },
  { id: 261, day: 1, stage: "Moose Bar",               name: "Jo Cox",                       time: "16:00", duration: 180 },
  { id: 262, day: 1, stage: "Moose Bar",               name: "Otto Wunderbar",               time: "19:00", duration: 60  },
  { id: 263, day: 1, stage: "Moose Bar",               name: "The Bobmeister",               time: "20:00", duration: 240 },

  // HOUSE OF FORTUNE BY JBL
  { id: 280, day: 1, stage: "House of Fortune by JBL", name: "Reygel",                       time: "13:00", duration: 60  },
  { id: 281, day: 1, stage: "House of Fortune by JBL", name: "Alan Alvarez...",              time: "14:00", duration: 60  },
  { id: 282, day: 1, stage: "House of Fortune by JBL", name: "Martin Trevy",                 time: "15:00", duration: 60  },
  { id: 283, day: 1, stage: "House of Fortune by JBL", name: "Vinne",                        time: "16:00", duration: 60  },
  { id: 284, day: 1, stage: "House of Fortune by JBL", name: "Ely Oaks",                     time: "17:00", duration: 60  },
  { id: 285, day: 1, stage: "House of Fortune by JBL", name: "ELFIGO",                       time: "18:00", duration: 60  },
  { id: 286, day: 1, stage: "House of Fortune by JBL", name: "Telykast",                     time: "19:00", duration: 60  },
  { id: 287, day: 1, stage: "House of Fortune by JBL", name: "Didi Han",                     time: "20:00", duration: 60  },
  { id: 288, day: 1, stage: "House of Fortune by JBL", name: "MEGURU",                       time: "21:00", duration: 60  },

  // ══════════════════════════════════════
  //  SAMEDI 25 JUILLET
  // ══════════════════════════════════════

  // MAINSTAGE
  { id: 1001, day: 2, stage: "Mainstage",              name: "Discovery",                    time: "12:00", duration: 120 },
  { id: 1002, day: 2, stage: "Mainstage",              name: "Angemi",                       time: "14:00", duration: 60  },
  { id: 1003, day: 2, stage: "Mainstage",              name: "Mike Williams",                time: "15:00", duration: 75  },
  { id: 1004, day: 2, stage: "Mainstage",              name: "D.O.D",                        time: "16:15", duration: 60  },
  { id: 1005, day: 2, stage: "Mainstage",              name: "MATTN",                        time: "17:20", duration: 60  },
  { id: 1006, day: 2, stage: "Mainstage",              name: "Morten",                       time: "18:20", duration: 60  },
  { id: 1007, day: 2, stage: "Mainstage",              name: "Agents of Time",               time: "19:20", duration: 60  },
  { id: 1008, day: 2, stage: "Mainstage",              name: "Sub Zero Project",             time: "20:25", duration: 60  },
  { id: 1009, day: 2, stage: "Mainstage",              name: "Armin van Buuren",             time: "21:25", duration: 65  },
  { id: 1010, day: 2, stage: "Mainstage",              name: "Dimitri Vegas & Like Mike",    time: "22:30", duration: 75  },
  { id: 1011, day: 2, stage: "Mainstage",              name: "Calvin Harris",                time: "23:45", duration: 60  },

  // FREEDOM BY BUD
  { id: 1020, day: 2, stage: "Freedom by Bud",         name: "Romy Janssen",                 time: "12:00", duration: 90  },
  { id: 1021, day: 2, stage: "Freedom by Bud",         name: "Calao",                        time: "13:30", duration: 90  },
  { id: 1022, day: 2, stage: "Freedom by Bud",         name: "Philou",                       time: "15:00", duration: 60  },
  { id: 1023, day: 2, stage: "Freedom by Bud",         name: "Mosimann b2b...",              time: "16:00", duration: 60  },
  { id: 1024, day: 2, stage: "Freedom by Bud",         name: "Andromedik",                   time: "17:00", duration: 60  },
  { id: 1025, day: 2, stage: "Freedom by Bud",         name: "Symphony Of...",               time: "18:00", duration: 60  },
  { id: 1026, day: 2, stage: "Freedom by Bud",         name: "Massano",                      time: "19:00", duration: 60  },
  { id: 1027, day: 2, stage: "Freedom by Bud",         name: "Argy presents...",             time: "20:00", duration: 60  },
  { id: 1028, day: 2, stage: "Freedom by Bud",         name: "Symphony Of...",               time: "21:00", duration: 60  },
  { id: 1029, day: 2, stage: "Freedom by Bud",         name: "Sebastian Ingrosso",           time: "22:00", duration: 60  },
  { id: 1030, day: 2, stage: "Freedom by Bud",         name: "Timmy Trumpet",                time: "23:00", duration: 90  },

  // THE ROSE GARDEN
  { id: 1040, day: 2, stage: "The Rose Garden",        name: "Quincy",                       time: "12:00", duration: 90  },
  { id: 1041, day: 2, stage: "The Rose Garden",        name: "Danny Corten",                 time: "13:30", duration: 90  },
  { id: 1042, day: 2, stage: "The Rose Garden",        name: "Maite Dedecker",               time: "15:00", duration: 90  },
  { id: 1043, day: 2, stage: "The Rose Garden",        name: "Dimitri Cooman",               time: "16:30", duration: 60  },
  { id: 1044, day: 2, stage: "The Rose Garden",        name: "DJ Ghost",                     time: "17:30", duration: 60  },
  { id: 1045, day: 2, stage: "The Rose Garden",        name: "Franky Kloeck",                time: "18:30", duration: 60  },
  { id: 1046, day: 2, stage: "The Rose Garden",        name: "Jamie Dill",                   time: "19:30", duration: 60  },
  { id: 1047, day: 2, stage: "The Rose Garden",        name: "Youri Parker",                 time: "20:30", duration: 60  },
  { id: 1048, day: 2, stage: "The Rose Garden",        name: "BountyHunter",                 time: "21:30", duration: 90  },
  { id: 1049, day: 2, stage: "The Rose Garden",        name: "Cherry Moon Legends (& Friends)", time: "23:00", duration: 60 },

  // ELIXIR
  { id: 1060, day: 2, stage: "Elixir",                 name: "Knox Kind",                    time: "13:00", duration: 60  },
  { id: 1061, day: 2, stage: "Elixir",                 name: "RUBY XX",                      time: "14:00", duration: 60  },
  { id: 1062, day: 2, stage: "Elixir",                 name: "Butterfly Effect",             time: "15:00", duration: 60  },
  { id: 1063, day: 2, stage: "Elixir",                 name: "DJ ART",                       time: "16:00", duration: 60  },
  { id: 1064, day: 2, stage: "Elixir",                 name: "Eimco",                        time: "17:00", duration: 60  },
  { id: 1065, day: 2, stage: "Elixir",                 name: "Sandersville",                 time: "18:00", duration: 60  },
  { id: 1066, day: 2, stage: "Elixir",                 name: "Lady S",                       time: "19:00", duration: 60  },
  { id: 1067, day: 2, stage: "Elixir",                 name: "SHOARMA SO...",                time: "20:00", duration: 60  },
  { id: 1068, day: 2, stage: "Elixir",                 name: "Annabel Stop It",              time: "21:00", duration: 60  },
  { id: 1069, day: 2, stage: "Elixir",                 name: "Nina Black",                   time: "22:00", duration: 60  },
  { id: 1070, day: 2, stage: "Elixir",                 name: "NOA",                          time: "23:00", duration: 60  },

  // CAGE
  { id: 1080, day: 2, stage: "Cage",                   name: "Rune Evens",                   time: "12:00", duration: 90  },
  { id: 1081, day: 2, stage: "Cage",                   name: "Macon",                        time: "13:30", duration: 75  },
  { id: 1082, day: 2, stage: "Cage",                   name: "X&Trick",                      time: "14:45", duration: 90  },
  { id: 1083, day: 2, stage: "Cage",                   name: "IOSIO",                        time: "16:15", duration: 75  },
  { id: 1084, day: 2, stage: "Cage",                   name: "Daire b2b Mero",               time: "17:30", duration: 90  },
  { id: 1085, day: 2, stage: "Cage",                   name: "Uberjak'd feat...",            time: "19:00", duration: 60  },
  { id: 1086, day: 2, stage: "Cage",                   name: "Niotech",                      time: "20:00", duration: 60  },
  { id: 1087, day: 2, stage: "Cage",                   name: "Mondello",                     time: "21:00", duration: 60  },
  { id: 1088, day: 2, stage: "Cage",                   name: "Stanne",                       time: "22:00", duration: 60  },

  // THE RAVE CAVE
  { id: 1100, day: 2, stage: "The Rave Cave",           name: "Charleen Herzig",              time: "13:00", duration: 90  },
  { id: 1101, day: 2, stage: "The Rave Cave",           name: "Simon B",                      time: "14:30", duration: 90  },
  { id: 1102, day: 2, stage: "The Rave Cave",           name: "Pat Krimson",                  time: "16:00", duration: 90  },
  { id: 1103, day: 2, stage: "The Rave Cave",           name: "Roma",                         time: "17:30", duration: 90  },
  { id: 1104, day: 2, stage: "The Rave Cave",           name: "Ben Malone",                   time: "19:00", duration: 90  },
  { id: 1105, day: 2, stage: "The Rave Cave",           name: "Jorn Pricez",                  time: "20:30", duration: 90  },
  { id: 1106, day: 2, stage: "The Rave Cave",           name: "Flowchief",                    time: "22:00", duration: 60  },
  { id: 1107, day: 2, stage: "The Rave Cave",           name: "Netherworld",                  time: "23:00", duration: 60  },

  // PLANAXIS
  { id: 1120, day: 2, stage: "Planaxis",                name: "NA:TUS",                       time: "12:00", duration: 90  },
  { id: 1121, day: 2, stage: "Planaxis",                name: "Tim Bliss",                    time: "13:30", duration: 90  },
  { id: 1122, day: 2, stage: "Planaxis",                name: "Alicia Hahn",                  time: "15:00", duration: 90  },
  { id: 1123, day: 2, stage: "Planaxis",                name: "Yet More",                     time: "16:30", duration: 90  },
  { id: 1124, day: 2, stage: "Planaxis",                name: "Dyzen",                        time: "18:00", duration: 90  },
  { id: 1125, day: 2, stage: "Planaxis",                name: "Yulia Niko",                   time: "19:30", duration: 90  },
  { id: 1126, day: 2, stage: "Planaxis",                name: "Colyn b2b Sainte Vie",         time: "21:00", duration: 90  },
  { id: 1127, day: 2, stage: "Planaxis",                name: "Chris Avantgarde b2b Kon...",  time: "22:30", duration: 90  },

  // MELODIA BY CORONA
  { id: 1140, day: 2, stage: "Melodia by Corona",       name: "Mooris",                       time: "12:00", duration: 120 },
  { id: 1141, day: 2, stage: "Melodia by Corona",       name: "Emilia De La Paz",             time: "14:00", duration: 90  },
  { id: 1142, day: 2, stage: "Melodia by Corona",       name: "Soulastico b2b Tohma",         time: "15:30", duration: 120 },
  { id: 1143, day: 2, stage: "Melodia by Corona",       name: "Larry Masmero",                time: "17:30", duration: 90  },
  { id: 1144, day: 2, stage: "Melodia by Corona",       name: "Geheimzinnig Soundsystem",     time: "19:00", duration: 90  },
  { id: 1145, day: 2, stage: "Melodia by Corona",       name: "Séa",                          time: "20:30", duration: 90  },
  { id: 1146, day: 2, stage: "Melodia by Corona",       name: "Sam Girling",                  time: "22:00", duration: 60  },

  // CELESTIA BY KUCOIN
  { id: 1160, day: 2, stage: "Celestia by Kucoin",      name: "Yamo",                         time: "12:00", duration: 60  },
  { id: 1161, day: 2, stage: "Celestia by Kucoin",      name: "Odssey",                       time: "13:00", duration: 60  },
  { id: 1162, day: 2, stage: "Celestia by Kucoin",      name: "LNY TNZ: Jump Never Dies (Take-Over)", time: "14:00", duration: 120 },
  { id: 1163, day: 2, stage: "Celestia by Kucoin",      name: "Swanky Tunes",                 time: "16:00", duration: 60  },
  { id: 1164, day: 2, stage: "Celestia by Kucoin",      name: "Bingo Players...",             time: "17:00", duration: 60  },
  { id: 1165, day: 2, stage: "Celestia by Kucoin",      name: "Dada Life",                    time: "18:00", duration: 60  },
  { id: 1166, day: 2, stage: "Celestia by Kucoin",      name: "Chocolate Puma",               time: "19:00", duration: 60  },
  { id: 1167, day: 2, stage: "Celestia by Kucoin",      name: "Gregor Salto",                 time: "20:00", duration: 60  },
  { id: 1168, day: 2, stage: "Celestia by Kucoin",      name: "Sander van do...",             time: "21:00", duration: 60  },
  { id: 1169, day: 2, stage: "Celestia by Kucoin",      name: "Dannic b2b Dyro",              time: "22:00", duration: 60  },

  // ATMOSPHERE
  { id: 1180, day: 2, stage: "Atmosphere",              name: "Kneiz",                        time: "12:00", duration: 120 },
  { id: 1181, day: 2, stage: "Atmosphere",              name: "2hot2play",                    time: "14:00", duration: 120 },
  { id: 1182, day: 2, stage: "Atmosphere",              name: "Noise Mafia",                  time: "16:00", duration: 90  },
  { id: 1183, day: 2, stage: "Atmosphere",              name: "EMILIJA b2b Fenrick",          time: "17:30", duration: 90  },
  { id: 1184, day: 2, stage: "Atmosphere",              name: "Alt8",                         time: "19:00", duration: 90  },
  { id: 1185, day: 2, stage: "Atmosphere",              name: "Pegassi",                      time: "20:30", duration: 90  },
  { id: 1186, day: 2, stage: "Atmosphere",              name: "Novah",                        time: "22:00", duration: 90  },
  { id: 1187, day: 2, stage: "Atmosphere",              name: "I Hate Models",                time: "23:30", duration: 60  },

  // CORE
  { id: 1200, day: 2, stage: "Core",                    name: "DC Noises b2b Tori.Ann",       time: "12:00", duration: 180 },
  { id: 1201, day: 2, stage: "Core",                    name: "SHEE",                         time: "15:00", duration: 90  },
  { id: 1202, day: 2, stage: "Core",                    name: "Dino Lenny b2b Radioslave",    time: "16:30", duration: 120 },
  { id: 1203, day: 2, stage: "Core",                    name: "DJ Boring",                    time: "18:30", duration: 120 },
  { id: 1204, day: 2, stage: "Core",                    name: "Skream b2b dj Seinfeld",       time: "20:30", duration: 120 },
  { id: 1205, day: 2, stage: "Core",                    name: "HAAi b2b The Blessed Madonna", time: "22:30", duration: 80  },

  // CRYSTAL GARDEN
  { id: 1220, day: 2, stage: "Crystal Garden",          name: "Naomi Cazier",                 time: "12:00", duration: 90  },
  { id: 1221, day: 2, stage: "Crystal Garden",          name: "GUZ",                          time: "13:30", duration: 90  },
  { id: 1222, day: 2, stage: "Crystal Garden",          name: "Roddy Lima",                   time: "15:00", duration: 90  },
  { id: 1223, day: 2, stage: "Crystal Garden",          name: "LP Giobbi",                    time: "16:30", duration: 90  },
  { id: 1224, day: 2, stage: "Crystal Garden",          name: "Ayybo b2b Odd Mob",            time: "18:00", duration: 90  },
  { id: 1225, day: 2, stage: "Crystal Garden",          name: "Max Styler",                   time: "19:30", duration: 90  },
  { id: 1226, day: 2, stage: "Crystal Garden",          name: "HI-LO b2b Layton Giordani",   time: "21:00", duration: 90  },
  { id: 1227, day: 2, stage: "Crystal Garden",          name: "John Summit",                  time: "22:30", duration: 90  },

  // THE GREAT LIBRARY
  { id: 1240, day: 2, stage: "The Great Library",       name: "Radio Cargo",                  time: "13:00", duration: 60  },
  { id: 1241, day: 2, stage: "The Great Library",       name: "me n ü",                       time: "14:00", duration: 60  },
  { id: 1242, day: 2, stage: "The Great Library",       name: "Mesto",                        time: "15:00", duration: 60  },
  { id: 1243, day: 2, stage: "The Great Library",       name: "ZHU",                          time: "16:00", duration: 60  },
  { id: 1244, day: 2, stage: "The Great Library",       name: "Henri PFR",                    time: "17:00", duration: 60  },
  { id: 1245, day: 2, stage: "The Great Library",       name: "Chris Lorenzo",                time: "18:00", duration: 60  },
  { id: 1246, day: 2, stage: "The Great Library",       name: "Wilkinson",                    time: "19:00", duration: 60  },
  { id: 1247, day: 2, stage: "The Great Library",       name: "Sonny Fodera",                 time: "20:00", duration: 90  },
  { id: 1248, day: 2, stage: "The Great Library",       name: "Lost Frequencies",             time: "21:30", duration: 75  },
  { id: 1249, day: 2, stage: "The Great Library",       name: "Gorgon City",                  time: "22:45", duration: 75  },
  { id: 1250, day: 2, stage: "The Great Library",       name: "Netsky",                       time: "00:00", duration: 55  },

  // MOOSE BAR
  { id: 1260, day: 2, stage: "Moose Bar",               name: "Mobius One",                   time: "12:00", duration: 180 },
  { id: 1261, day: 2, stage: "Moose Bar",               name: "Mr. E",                        time: "15:00", duration: 240 },
  { id: 1262, day: 2, stage: "Moose Bar",               name: "De Romeo's",                   time: "19:00", duration: 60  },
  { id: 1263, day: 2, stage: "Moose Bar",               name: "Kurt Verheyen",                time: "20:00", duration: 240 },

  // HOUSE OF FORTUNE BY JBL
  { id: 1280, day: 2, stage: "House of Fortune by JBL", name: "Triciaa",                      time: "13:00", duration: 60  },
  { id: 1281, day: 2, stage: "House of Fortune by JBL", name: "Li...",                        time: "14:00", duration: 60  },
  { id: 1282, day: 2, stage: "House of Fortune by JBL", name: "G...",                         time: "15:00", duration: 60  },
  { id: 1283, day: 2, stage: "House of Fortune by JBL", name: "R...",                         time: "16:00", duration: 60  },
  { id: 1284, day: 2, stage: "House of Fortune by JBL", name: "T...",                         time: "17:00", duration: 60  },
  { id: 1285, day: 2, stage: "House of Fortune by JBL", name: "Yaz.",                         time: "16:00", duration: 60  },
  { id: 1286, day: 2, stage: "House of Fortune by JBL", name: "Carly Wilford",                time: "17:00", duration: 60  },
  { id: 1287, day: 2, stage: "House of Fortune by JBL", name: "Mosimann",                     time: "18:00", duration: 60  },
  { id: 1288, day: 2, stage: "House of Fortune by JBL", name: "Nosefin",                      time: "19:00", duration: 60  },
  { id: 1289, day: 2, stage: "House of Fortune by JBL", name: "More to be an...",             time: "20:00", duration: 60  },
  { id: 1290, day: 2, stage: "House of Fortune by JBL", name: "Atkö",                         time: "21:00", duration: 60  },

  // ══════════════════════════════════════
  //  DIMANCHE 26 JUILLET
  // ══════════════════════════════════════

  // MAINSTAGE
  { id: 2001, day: 3, stage: "Mainstage",              name: "Discovery",                    time: "12:00", duration: 150 },
  { id: 2002, day: 3, stage: "Mainstage",              name: "Odd Mob",                      time: "14:30", duration: 60  },
  { id: 2003, day: 3, stage: "Mainstage",              name: "Cyril",                        time: "15:35", duration: 55  },
  { id: 2004, day: 3, stage: "Mainstage",              name: "Lucas & Steve",                time: "16:30", duration: 60  },
  { id: 2005, day: 3, stage: "Mainstage",              name: "Chase & Statu...",             time: "17:35", duration: 65  },
  { id: 2006, day: 3, stage: "Mainstage",              name: "Sara Landry",                  time: "18:40", duration: 60  },
  { id: 2007, day: 3, stage: "Mainstage",              name: "Afrojack b2b...",              time: "19:40", duration: 60  },
  { id: 2008, day: 3, stage: "Mainstage",              name: "Lost Frequencies",             time: "20:40", duration: 65  },
  { id: 2009, day: 3, stage: "Mainstage",              name: "Steve Aoki",                   time: "21:45", duration: 65  },
  { id: 2010, day: 3, stage: "Mainstage",              name: "Martin Garrix",                time: "22:50", duration: 60  },

  // FREEDOM BY BUD
  { id: 2020, day: 3, stage: "Freedom by Bud",         name: "Laura Hoogland",               time: "12:00", duration: 90  },
  { id: 2021, day: 3, stage: "Freedom by Bud",         name: "Axel Haube",                   time: "13:30", duration: 90  },
  { id: 2022, day: 3, stage: "Freedom by Bud",         name: "Push only",                    time: "15:00", duration: 60  },
  { id: 2023, day: 3, stage: "Freedom by Bud",         name: "Korolova",                     time: "16:00", duration: 90  },
  { id: 2024, day: 3, stage: "Freedom by Bud",         name: "Fideles",                      time: "17:30", duration: 90  },
  { id: 2025, day: 3, stage: "Freedom by Bud",         name: "More to be announced",         time: "19:00", duration: 90  },
  { id: 2026, day: 3, stage: "Freedom by Bud",         name: "Artbat",                       time: "20:30", duration: 90  },
  { id: 2027, day: 3, stage: "Freedom by Bud",         name: "Amelie Lens presents Aura",    time: "22:00", duration: 90  },

  // THE ROSE GARDEN
  { id: 2040, day: 3, stage: "The Rose Garden",        name: "BassBrain",                    time: "12:00", duration: 60  },
  { id: 2041, day: 3, stage: "The Rose Garden",        name: "Lost Identity",                time: "13:00", duration: 60  },
  { id: 2042, day: 3, stage: "The Rose Garden",        name: "D-Charged b2b...",             time: "14:00", duration: 60  },
  { id: 2043, day: 3, stage: "The Rose Garden",        name: "Mark With A K...",             time: "15:00", duration: 60  },
  { id: 2044, day: 3, stage: "The Rose Garden",        name: "Hard Driver",                  time: "16:00", duration: 60  },
  { id: 2045, day: 3, stage: "The Rose Garden",        name: "The Purge",                    time: "17:00", duration: 60  },
  { id: 2046, day: 3, stage: "The Rose Garden",        name: "Sound Rush",                   time: "18:00", duration: 60  },
  { id: 2047, day: 3, stage: "The Rose Garden",        name: "Coone",                        time: "19:00", duration: 60  },
  { id: 2048, day: 3, stage: "The Rose Garden",        name: "Da Tweekaz",                   time: "20:00", duration: 90  },
  { id: 2049, day: 3, stage: "The Rose Garden",        name: "Warface",                      time: "21:30", duration: 45  },
  { id: 2050, day: 3, stage: "The Rose Garden",        name: "The Stra...",                   time: "22:15", duration: 45  },

  // ELIXIR
  { id: 2060, day: 3, stage: "Elixir",                 name: "Dino",                         time: "13:00", duration: 90  },
  { id: 2061, day: 3, stage: "Elixir",                 name: "Reeze",                        time: "14:30", duration: 90  },
  { id: 2062, day: 3, stage: "Elixir",                 name: "Lennert Wolfs",                time: "16:00", duration: 60  },
  { id: 2063, day: 3, stage: "Elixir",                 name: "Karakals",                     time: "17:00", duration: 90  },
  { id: 2064, day: 3, stage: "Elixir",                 name: "Vikkstar",                     time: "18:30", duration: 60  },
  { id: 2065, day: 3, stage: "Elixir",                 name: "Kav Verhouzer & de Hofnar...", time: "19:30", duration: 90  },
  { id: 2066, day: 3, stage: "Elixir",                 name: "Jaël Ost & Ma...",             time: "21:00", duration: 60  },
  { id: 2067, day: 3, stage: "Elixir",                 name: "Michael Amani",                time: "22:00", duration: 60  },
  { id: 2068, day: 3, stage: "Elixir",                 name: "Michael Amani...",             time: "23:00", duration: 60  },

  // CAGE
  { id: 2080, day: 3, stage: "Cage",                   name: "Amalie",                       time: "12:00", duration: 90  },
  { id: 2081, day: 3, stage: "Cage",                   name: "Netty Hugo",                   time: "13:30", duration: 90  },
  { id: 2082, day: 3, stage: "Cage",                   name: "Amotik",                       time: "15:00", duration: 120 },
  { id: 2083, day: 3, stage: "Cage",                   name: "Quelza",                       time: "17:00", duration: 120 },
  { id: 2084, day: 3, stage: "Cage",                   name: "Blasha & Allatt",              time: "19:00", duration: 120 },
  { id: 2085, day: 3, stage: "Cage",                   name: "Freddy K",                     time: "21:00", duration: 120 },

  // THE RAVE CAVE
  { id: 2100, day: 3, stage: "The Rave Cave",           name: "Benny Plays",                  time: "13:00", duration: 120 },
  { id: 2101, day: 3, stage: "The Rave Cave",           name: "EME",                          time: "15:00", duration: 60  },
  { id: 2102, day: 3, stage: "The Rave Cave",           name: "Kriss Reeve",                  time: "16:00", duration: 60  },
  { id: 2103, day: 3, stage: "The Rave Cave",           name: "Muze",                         time: "17:00", duration: 60  },
  { id: 2104, day: 3, stage: "The Rave Cave",           name: "Mr. Rewind",                   time: "18:00", duration: 60  },
  { id: 2105, day: 3, stage: "The Rave Cave",           name: "D. Guaetta b2b...",            time: "19:00", duration: 60  },
  { id: 2106, day: 3, stage: "The Rave Cave",           name: "Hyalyte",                      time: "20:00", duration: 60  },
  { id: 2107, day: 3, stage: "The Rave Cave",           name: "Leenders",                     time: "21:00", duration: 60  },
  { id: 2108, day: 3, stage: "The Rave Cave",           name: "DXNØ",                         time: "22:00", duration: 60  },

  // PLANAXIS
  { id: 2120, day: 3, stage: "Planaxis",                name: "Olivex",                       time: "12:00", duration: 60  },
  { id: 2121, day: 3, stage: "Planaxis",                name: "Okayval",                      time: "13:00", duration: 120 },
  { id: 2122, day: 3, stage: "Planaxis",                name: "ANAYA",                        time: "15:00", duration: 60  },
  { id: 2123, day: 3, stage: "Planaxis",                name: "Vassy",                        time: "16:00", duration: 60  },
  { id: 2124, day: 3, stage: "Planaxis",                name: "Yves V b2b St...",             time: "17:00", duration: 60  },
  { id: 2125, day: 3, stage: "Planaxis",                name: "Sick individuals",             time: "18:00", duration: 60  },
  { id: 2126, day: 3, stage: "Planaxis",                name: "Deorro",                       time: "19:00", duration: 60  },
  { id: 2127, day: 3, stage: "Planaxis",                name: "Laidback Luke",                time: "20:00", duration: 60  },
  { id: 2128, day: 3, stage: "Planaxis",                name: "Superheroes",                  time: "21:00", duration: 60  },
  { id: 2129, day: 3, stage: "Planaxis",                name: "Quintino",                     time: "22:00", duration: 60  },
  { id: 2130, day: 3, stage: "Planaxis",                name: "Chuckie",                      time: "23:00", duration: 50  },

  // MELODIA BY CORONA
  { id: 2140, day: 3, stage: "Melodia by Corona",       name: "Dominico",                     time: "12:00", duration: 120 },
  { id: 2141, day: 3, stage: "Melodia by Corona",       name: "Bobbi Antonni",                time: "14:00", duration: 90  },
  { id: 2142, day: 3, stage: "Melodia by Corona",       name: "Cristiano Da S...",            time: "15:30", duration: 60  },
  { id: 2143, day: 3, stage: "Melodia by Corona",       name: "Rayco Santos",                 time: "16:30", duration: 60  },
  { id: 2144, day: 3, stage: "Melodia by Corona",       name: "Valentín Huedo",               time: "17:30", duration: 60  },
  { id: 2145, day: 3, stage: "Melodia by Corona",       name: "Alex Kennon",                  time: "18:30", duration: 60  },
  { id: 2146, day: 3, stage: "Melodia by Corona",       name: "Oriol Calvo",                  time: "19:30", duration: 90  },
  { id: 2147, day: 3, stage: "Melodia by Corona",       name: "Delafino & Luna Fino",         time: "21:00", duration: 60  },
  { id: 2148, day: 3, stage: "Melodia by Corona",       name: "Eli Rojas",                    time: "22:00", duration: 60  },

  // CELESTIA BY KUCOIN
  { id: 2160, day: 3, stage: "Celestia by Kucoin",      name: "Mendosa",                      time: "12:30", duration: 60  },
  { id: 2161, day: 3, stage: "Celestia by Kucoin",      name: "Lisa Korver",                  time: "13:30", duration: 90  },
  { id: 2162, day: 3, stage: "Celestia by Kucoin",      name: "Newtone",                      time: "15:00", duration: 90  },
  { id: 2163, day: 3, stage: "Celestia by Kucoin",      name: "Kyle Starkey",                 time: "16:30", duration: 90  },
  { id: 2164, day: 3, stage: "Celestia by Kucoin",      name: "Bella Claxton b2b Paige To...",time: "18:00", duration: 90  },
  { id: 2165, day: 3, stage: "Celestia by Kucoin",      name: "Morgan Seatree",               time: "19:30", duration: 90  },
  { id: 2166, day: 3, stage: "Celestia by Kucoin",      name: "HU",                           time: "21:00", duration: 90  },

  // ATMOSPHERE
  { id: 2180, day: 3, stage: "Atmosphere",              name: "Mirage",                       time: "12:00", duration: 90  },
  { id: 2181, day: 3, stage: "Atmosphere",              name: "Riana Holley",                 time: "13:30", duration: 90  },
  { id: 2182, day: 3, stage: "Atmosphere",              name: "Portex",                       time: "15:00", duration: 90  },
  { id: 2183, day: 3, stage: "Atmosphere",              name: "Alycia Bezgo b2b Biianco",     time: "16:30", duration: 90  },
  { id: 2184, day: 3, stage: "Atmosphere",              name: "Adrián Mills",                 time: "18:00", duration: 90  },
  { id: 2185, day: 3, stage: "Atmosphere",              name: "Nikolina",                     time: "19:30", duration: 90  },
  { id: 2186, day: 3, stage: "Atmosphere",              name: "Trym",                         time: "21:00", duration: 90  },
  { id: 2187, day: 3, stage: "Atmosphere",              name: "Kobosil",                      time: "22:30", duration: 85  },

  // CORE
  { id: 2200, day: 3, stage: "Core",                    name: "Catalina",                     time: "12:00", duration: 90  },
  { id: 2201, day: 3, stage: "Core",                    name: "Kellar",                       time: "13:30", duration: 120 },
  { id: 2202, day: 3, stage: "Core",                    name: "Saidah",                       time: "15:30", duration: 90  },
  { id: 2203, day: 3, stage: "Core",                    name: "Helena Lauwaert",              time: "17:00", duration: 90  },
  { id: 2204, day: 3, stage: "Core",                    name: "Lammer",                       time: "18:30", duration: 120 },
  { id: 2205, day: 3, stage: "Core",                    name: "Benwal b2b LB aka Labat",      time: "20:30", duration: 90  },
  { id: 2206, day: 3, stage: "Core",                    name: "Malugi",                       time: "22:00", duration: 110 },

  // CRYSTAL GARDEN
  { id: 2220, day: 3, stage: "Crystal Garden",          name: "Benja b2b Franc Fala",         time: "12:00", duration: 180 },
  { id: 2221, day: 3, stage: "Crystal Garden",          name: "Bhaskar",                      time: "15:00", duration: 90  },
  { id: 2222, day: 3, stage: "Crystal Garden",          name: "Brina Knauss",                 time: "16:30", duration: 90  },
  { id: 2223, day: 3, stage: "Crystal Garden",          name: "Like Mike",                    time: "18:00", duration: 90  },
  { id: 2224, day: 3, stage: "Crystal Garden",          name: "Mind Against",                 time: "19:30", duration: 120 },
  { id: 2225, day: 3, stage: "Crystal Garden",          name: "Kevin de Vries b2b Meduza",    time: "21:30", duration: 90  },

  // THE GREAT LIBRARY
  { id: 2240, day: 3, stage: "The Great Library",       name: "Zero Gravity",                 time: "12:00", duration: 60  },
  { id: 2241, day: 3, stage: "The Great Library",       name: "Lucca van Da...",              time: "13:00", duration: 60  },
  { id: 2242, day: 3, stage: "The Great Library",       name: "Diego Miranda...",             time: "14:00", duration: 60  },
  { id: 2243, day: 3, stage: "The Great Library",       name: "Darren Styles",                time: "15:00", duration: 60  },
  { id: 2244, day: 3, stage: "The Great Library",       name: "Kaaze",                        time: "16:00", duration: 60  },
  { id: 2245, day: 3, stage: "The Great Library",       name: "Paris Hilton",                 time: "17:00", duration: 60  },
  { id: 2246, day: 3, stage: "The Great Library",       name: "Joel Corry",                   time: "18:00", duration: 60  },
  { id: 2247, day: 3, stage: "The Great Library",       name: "NERVO",                        time: "19:00", duration: 60  },
  { id: 2248, day: 3, stage: "The Great Library",       name: "Nico Moreno",                  time: "20:00", duration: 60  },
  { id: 2249, day: 3, stage: "The Great Library",       name: "Bassjackers",                  time: "21:00", duration: 60  },
  { id: 2250, day: 3, stage: "The Great Library",       name: "Dimitri Vegas...",             time: "22:00", duration: 60  },
  { id: 2251, day: 3, stage: "The Great Library",       name: "Brennan Heart",                time: "23:00", duration: 55  },

  // MOOSE BAR
  { id: 2260, day: 3, stage: "Moose Bar",               name: "Mr. E",                        time: "12:00", duration: 240 },
  { id: 2261, day: 3, stage: "Moose Bar",               name: "Brian",                        time: "16:00", duration: 180 },
  { id: 2262, day: 3, stage: "Moose Bar",               name: "Peter Wackel",                 time: "19:00", duration: 60  },
  { id: 2263, day: 3, stage: "Moose Bar",               name: "Jan V",                        time: "20:00", duration: 240 },

  // HOUSE OF FORTUNE BY JBL
  { id: 2280, day: 3, stage: "House of Fortune by JBL", name: "DJ Lex",                       time: "13:00", duration: 60  },
  { id: 2281, day: 3, stage: "House of Fortune by JBL", name: "M...",                         time: "14:00", duration: 60  },
  { id: 2282, day: 3, stage: "House of Fortune by JBL", name: "S...",                         time: "15:00", duration: 60  },
  { id: 2283, day: 3, stage: "House of Fortune by JBL", name: "E...",                         time: "16:00", duration: 60  },
  { id: 2284, day: 3, stage: "House of Fortune by JBL", name: "M...",                         time: "17:00", duration: 60  },
  { id: 2285, day: 3, stage: "House of Fortune by JBL", name: "The Criminal S...",            time: "16:00", duration: 60  },
  { id: 2286, day: 3, stage: "House of Fortune by JBL", name: "DJ F.R.A.N.K",                time: "17:00", duration: 60  },
  { id: 2287, day: 3, stage: "House of Fortune by JBL", name: "TIGERLILY",                    time: "18:00", duration: 60  },
  { id: 2288, day: 3, stage: "House of Fortune by JBL", name: "Bassjackers",                  time: "19:00", duration: 60  },
  { id: 2289, day: 3, stage: "House of Fortune by JBL", name: "Joel Corry",                   time: "20:00", duration: 60  },
  { id: 2290, day: 3, stage: "House of Fortune by JBL", name: "The Rocketman",                time: "21:00", duration: 60  },
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
