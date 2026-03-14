const modules = [
  {
    id: "m1",
    title: "Modul 1: Elementární hudební teorie",
    lessons: [
      {
        id: "l1",
        title: "Stupnice: základní princip",
        goal: "Pochopit, že stupnice je vzorec intervalů, ne jen seznam tónů.",
        script:
          "Stupnice je pořadí tónů od kořene k jeho opakování v oktávě. Důležitý je vzorec vzdáleností mezi tóny. Když znáš intervalový vzorec, umíš stejný typ stupnice vytvořit v libovolné tónině.",
        task: [
          "Na klaviatuře zahraj C dur stupnici nahoru i dolů.",
          "Zkus totéž od G a všimni si změn v tónech.",
          "Nahlas si řekni vzorec dur: celý, celý, půl, celý, celý, celý, půl.",
        ],
        quiz: [
          {
            q: "Co určuje typ stupnice?",
            options: ["Vzor intervalů", "Hlasitost", "Rychlost skladby"],
            answer: 0,
          },
          {
            q: "Oktáva je:",
            options: ["Stejný tón výš nebo níž", "Náhodná skupina tónů", "Typ akordu"],
            answer: 0,
          },
          {
            q: "Kolik základních tónů (bez opakování oktávy) má diatonická stupnice?",
            options: ["5", "7", "12"],
            answer: 1,
          },
        ],
      },
      {
        id: "l2",
        title: "Jak se tvoří akordy",
        goal: "Postavit trojzvuk jako 1.-3.-5. stupeň od kořene.",
        script:
          "Základní trojzvuk tvoří tři tóny: kořen, tercie a kvinta. Typ akordu se mění podle velikosti tercie a kvinty. Tento princip platí v každé tónině.",
        task: [
          "Zahraj C-E-G a pak A-C-E.",
          "Vyzkoušej stejný postup od D a F.",
          "Porovnej zvuk trojzvuků s různým kořenem.",
        ],
        quiz: [
          {
            q: "Trojzvuk obsahuje stupně:",
            options: ["1-3-5", "1-2-4", "2-4-6"],
            answer: 0,
          },
          {
            q: "Kořen akordu je:",
            options: ["Výchozí tón akordu", "Nejvyšší tón", "Náhodný tón"],
            answer: 0,
          },
          {
            q: "C-E-G je akord postavený od:",
            options: ["C", "E", "G"],
            answer: 0,
          },
        ],
      },
      {
        id: "l3",
        title: "Dur a moll trojzvuk",
        goal: "Rozlišit dur a moll podle tercie.",
        script:
          "Dur má velkou tercii a čistou kvintu (např. C-E-G). Moll má malou tercii a čistou kvintu (C-Eb-G). Rozdíl jednoho tónu okamžitě změní charakter akordu.",
        task: [
          "Na panelu přepínej Dur/Moll a sleduj zvýrazněné klávesy.",
          "Projdi všech 12 tónin.",
          "Všimni si změny 3. tónu akordu.",
        ],
        quiz: [
          {
            q: "Hlavní rozdíl mezi dur a moll je v:",
            options: ["Tercii", "Kvintě", "Oktávě"],
            answer: 0,
          },
          {
            q: "C moll je:",
            options: ["C-E-G", "C-Eb-G", "C-F-G"],
            answer: 1,
          },
          {
            q: "C dur je:",
            options: ["C-E-G", "C-Eb-G", "C-D-G"],
            answer: 0,
          },
        ],
      },
      {
        id: "l4",
        title: "Zvětšené a zmenšené akordy",
        goal: "Pochopit změnu kvinty u augmented a diminished trojzvuku.",
        script:
          "Zvětšený akord má zvýšenou kvintu (C-E-G#). Zmenšený má malou tercii i sníženou kvintu (C-Eb-Gb). Oba typy vytvářejí napětí a často směřují do stabilnějšího akordu.",
        task: [
          "Zvol C, pak přepni na Zvětšený a Zmenšený.",
          "Zkus to samé i pro F# a Bb.",
          "Sleduj změnu 5. tónu akordu.",
        ],
        quiz: [
          {
            q: "C augmented je:",
            options: ["C-E-G", "C-E-G#", "C-Eb-Gb"],
            answer: 1,
          },
          {
            q: "C diminished je:",
            options: ["C-E-G#", "C-Eb-Gb", "C-E-G"],
            answer: 1,
          },
          {
            q: "U zmenšeného trojzvuku je kvinta:",
            options: ["Čistá", "Zvýšená", "Snížená"],
            answer: 2,
          },
        ],
      },
      {
        id: "l5",
        title: "Obraty trojzvuků",
        goal: "Rozlišit základní tvar, 1. obrat a 2. obrat.",
        script:
          "Obrat mění nejnižší tón akordu, ale ponechá stejné tóny. Pro C dur platí: C-E-G (základní), E-G-C (1. obrat), G-C-E (2. obrat). Obraty pomáhají plynulejšímu vedení hlasů.",
        task: [
          "Vyber C dur a přepínej obraty v menu.",
          "Pozoruj změnu spodního tónu na klaviatuře.",
          "Vyzkoušej obraty i v A moll.",
        ],
        quiz: [
          {
            q: "V 1. obratu je v basu:",
            options: ["Kořen", "Tercie", "Kvinta"],
            answer: 1,
          },
          {
            q: "Ve 2. obratu je v basu:",
            options: ["Kvinta", "Kořen", "Tercie"],
            answer: 0,
          },
          {
            q: "2. obrat C dur je:",
            options: ["E-G-C", "G-C-E", "C-E-G"],
            answer: 1,
          },
        ],
      },
    ],
  },
];

const storageKey = "hudebni-kurz-progress-v1";
const progress = JSON.parse(localStorage.getItem(storageKey) || "{}");
const paymentStorageKey = "hudebni-kurz-payment-v1";
const paymentState = JSON.parse(localStorage.getItem(paymentStorageKey) || "{\"premium\":false,\"plan\":null}");
let activeLessonId = null;
const checkoutApi = {
  endpoint: "/api/create-checkout-session",
  statusEndpoint: "/api/checkout-status",
};
const metronome = {
  bpm: 80,
  beatsPerBar: 4,
  currentBeat: 0,
  nextNoteTime: 0,
  schedulerId: null,
  audioContext: null,
  isRunning: false,
  ui: null,
};
const samplePatterns = {
  rock: {
    label: "Rock groove",
    bpm: 104,
    beatsPerBar: 4,
    subdivision: 2,
    steps: {
      kick: [0, 3, 4, 6],
      snare: [2, 6],
      hat: [0, 1, 2, 3, 4, 5, 6, 7],
    },
  },
  waltz: {
    label: "Valčík",
    bpm: 132,
    beatsPerBar: 3,
    subdivision: 2,
    steps: {
      kick: [0],
      snare: [2, 4],
      hat: [1, 3, 5],
    },
  },
};
const samplePlayer = {
  pattern: "rock",
  schedulerId: null,
  nextStepTime: 0,
  stepIndex: 0,
  isRunning: false,
  ui: null,
  noiseBuffer: null,
};
const NOTE_TO_SEMITONE = {
  C: 0,
  "C#": 1,
  D: 2,
  Eb: 3,
  E: 4,
  F: 5,
  "F#": 6,
  G: 7,
  Ab: 8,
  A: 9,
  Bb: 10,
  B: 11,
};
const SEMITONE_TO_NAME = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const SEMITONE_TO_ENHARMONIC = [
  ["C", "C"],
  ["Des", "Cis"],
  ["D", "D"],
  ["Es", "Dis"],
  ["E", "E"],
  ["F", "F"],
  ["Ges", "Fis"],
  ["G", "G"],
  ["As", "Gis"],
  ["A", "A"],
  ["B", "Ais"],
  ["H", "H"],
];
const CHORD_INTERVALS = {
  dur: [0, 4, 7],
  moll: [0, 3, 7],
  aug: [0, 4, 8],
  dim: [0, 3, 6],
};
const EXPLAINER_TOPICS = [
  {
    id: "scale",
    label: "Stupnice",
    title: "Stupnice = intervalový vzorec",
    rule: "Neuč se jen seznam tónů. Nauč se vzorec vzdáleností. Dur: celý-celý-půl-celý-celý-celý-půl.",
    example: "Příklad: C dur = C D E F G A B C. G dur má stejný vzorec, ale jiné tóny.",
    task: "Mini úkol: zahraj C dur a pak G dur se stejným intervalovým vzorcem.",
  },
  {
    id: "triad",
    label: "Trojzvuk",
    title: "Akord stavíš po terciích (1-3-5)",
    rule: "Základní trojzvuk bere 1., 3. a 5. stupeň nad kořenem.",
    example: "Příklad: C-E-G je C dur trojzvuk.",
    task: "Mini úkol: zahraj 1-3-5 od C, D a F.",
  },
  {
    id: "quality",
    label: "Dur/Moll",
    title: "Dur vs moll určuje tercie",
    rule: "Dur = velká tercie + čistá kvinta. Moll = malá tercie + čistá kvinta.",
    example: "Příklad: C dur = C-E-G, C moll = C-Eb-G.",
    task: "Mini úkol: přepínej Dur/Moll u stejného kořene a sleduj změnu 3. tónu.",
  },
  {
    id: "tension",
    label: "Zvětš./Zmenš.",
    title: "Zvětšený a zmenšený mění kvintu",
    rule: "Augmented má zvýšenou kvintu. Diminished má malou tercii i sníženou kvintu.",
    example: "Příklad: C aug = C-E-G#, C dim = C-Eb-Gb.",
    task: "Mini úkol: porovnej C dur, C aug a C dim.",
  },
  {
    id: "inversion",
    label: "Obraty",
    title: "Obrat mění bas, ne identitu akordu",
    rule: "Základní tvar: kořen v basu. 1. obrat: tercie v basu. 2. obrat: kvinta v basu.",
    example: "Příklad C dur: C-E-G, E-G-C, G-C-E.",
    task: "Mini úkol: přepínej obraty a sleduj nejnižší tón.",
  },
];
const LESSON_EXPLAINER_MAP = {
  l1: "scale",
  l2: "triad",
  l3: "quality",
  l4: "tension",
  l5: "inversion",
};
const THEORY_BUBBLES = [
  {
    id: "b1",
    label: "1. Notopis",
    title: "Notopis",
    text: "Základní jazyk hudby: osnova, klíče, hodnoty not a pomlk, posuvky a předznamenání.",
  },
  {
    id: "b2",
    label: "2. Takt",
    title: "Takt a metrum",
    text: "Metrum určuje puls, takt organizuje čas do opakujících se celků.",
  },
  {
    id: "b3",
    label: "3. Výraz",
    title: "Dynamika, tempo, artikulace",
    text: "Dynamika = hlasitost, tempo = rychlost, artikulace = způsob zahrání tónu.",
  },
  {
    id: "b4",
    label: "4. Intervaly",
    title: "Interval",
    text: "Interval je vzdálenost mezi dvěma tóny a je základ pro stupnice i akordy.",
  },
  {
    id: "b5",
    label: "5. Stupnice",
    title: "Stupnice",
    text: "Stupnice je intervalový vzorec přenositelný do různých tónin.",
  },
  {
    id: "b6",
    label: "6. Kruh",
    title: "Kvarto-kvintový kruh",
    text: "Mapa tónin a předznamenání, která pomáhá orientaci v harmonii a transpozici.",
  },
  {
    id: "b7",
    label: "7. Trojzvuky",
    title: "Trojzvuky (1-3-5)",
    text: "Základní akordová stavba. Kvalita akordu se mění podle tercie a kvinty.",
  },
  {
    id: "b8",
    label: "8. Čtyřzvuky",
    title: "Čtyřzvuky a tenze",
    text: "Rozšíření trojzvuků o další tóny pro bohatší barvu akordu.",
  },
  {
    id: "b9",
    label: "9. Poloha",
    title: "Poloha a rozloha akordů",
    text: "Stejný akord může znít jinak podle rozmístění tónů a vedení hlasů.",
  },
];
const CURRICULUM_CORE = [
  {
    id: "c1",
    category: "basics",
    title: "Notopis a rytmické hodnoty",
    why: "Bez čtení not a rytmu nejde efektivně studovat ani analyzovat hudbu.",
    essence: "Osnova, klíče, délky not/pomlk, taktové čáry, metrum.",
    drill: "Zapiš 1 takt 4/4: čtvrťová + dvě osminy + dvě čtvrťové.",
  },
  {
    id: "c2",
    category: "basics",
    title: "Intervaly",
    why: "Interval je základ pro stupnice, akordy i sluchový trénink.",
    essence: "Počítání stupňů + kvalita (čisté, malé, velké...).",
    drill: "Najdi na klaviatuře čistou kvintu od C a malou tercii od A.",
  },
  {
    id: "c3",
    category: "basics",
    title: "Stupnice a tóniny",
    why: "Stupnice je přenosný vzorec, ne jen seznam tónů.",
    essence: "Dur vzorec, moll varianty, předznamenání, orientace v tónině.",
    drill: "Zahraj C dur a G dur se stejným intervalovým vzorcem.",
  },
  {
    id: "c4",
    category: "harmony",
    title: "Trojzvuky a kvalita akordu",
    why: "Většina doprovodů stojí na trojzvucích a jejich variantách.",
    essence: "1-3-5, dur/moll/aug/dim, kořen a funkce tónů v akordu.",
    drill: "Postav C dur, C moll, C aug, C dim a porovnej zvuk.",
  },
  {
    id: "c5",
    category: "harmony",
    title: "Obraty a vedení hlasů",
    why: "Obraty dělají doprovod plynulý a hudebně čistý.",
    essence: "Základní tvar, 1. obrat, 2. obrat; minimální pohyb tónů.",
    drill: "Přepínej obraty C dur a sleduj změnu spodního tónu.",
  },
  {
    id: "c6",
    category: "harmony",
    title: "Funkční harmonie",
    why: "Tónika-subdominanta-dominanta vysvětluje napětí a návrat.",
    essence: "I-IV-V-I a běžné kadence v dur i moll.",
    drill: "V C dur zahraj postup C-F-G-C a popiš, kde je napětí.",
  },
  {
    id: "c7",
    category: "harmony",
    title: "Čtyřzvuky a základní jazz/pop barvy",
    why: "Moderní hudba často používá septakordy a rozšířené barvy.",
    essence: "Maj7, m7, 7; základní použití v progresích.",
    drill: "Porovnej zvuk Cmaj7 a C7 na klaviatuře.",
  },
  {
    id: "c8",
    category: "practice",
    title: "Ear training (sluch)",
    why: "Teorie bez ucha zůstane jen na papíře.",
    essence: "Rozpoznávání intervalů, akordové kvality, rytmických vzorců.",
    drill: "Nejdřív zazpívej interval, teprve potom ho zahraj.",
  },
  {
    id: "c9",
    category: "practice",
    title: "Forma a motiv",
    why: "Pomáhá chápat, jak je skladba postavená, ne jen jaké má akordy.",
    essence: "Motiv, fráze, perioda, malé formy, opakování a kontrast.",
    drill: "Najdi v oblíbené skladbě motiv, který se opakuje.",
  },
  {
    id: "c10",
    category: "practice",
    title: "Propojení teorie s nástrojem",
    why: "Cíl je hrát, ne sbírat pojmy.",
    essence: "Každé pravidlo hned ověř na klaviatuře, ve dvou tóninách a v rytmu.",
    drill: "Každý nový pojem zahraj ve dvou tóninách během 3 minut.",
  },
];
const harmonyLab = {
  root: "C",
  chordType: "dur",
  inversion: "root",
  keyboardStartMidi: 48, // C3
  keyboardOctaves: 3,
  whiteKeyWidth: 42,
  whiteKeyHeight: 180,
  blackKeyWidth: 26,
  blackKeyHeight: 112,
  activeNotes: [],
  ui: null,
};
const keyboardInteraction = {
  pointerDown: false,
  lastMidi: null,
};
const paperLab = {
  mode: "pen",
  drawing: false,
  dragState: null,
  noteCounter: 0,
  ctx: null,
  canvas: null,
  board: null,
  notesLayer: null,
  trash: null,
  hint: null,
};
const previewKeyboardLab = {
  rendered: false,
};

function getAllLessons() {
  return modules.flatMap((m) => m.lessons);
}

function midiToFrequency(midi) {
  return 440 * 2 ** ((midi - 69) / 12);
}

function getNoteName(midi) {
  return SEMITONE_TO_NAME[midi % 12];
}

function getEnharmonicLabel(midi) {
  const semitone = midi % 12;
  const [flatName, sharpName] = SEMITONE_TO_ENHARMONIC[semitone];
  if (flatName === sharpName) return flatName;
  return `${flatName}/${sharpName}`;
}

function isBlackKey(midi) {
  const semitone = midi % 12;
  return [1, 3, 6, 8, 10].includes(semitone);
}

function renderKeyboard() {
  const keyboardEl = document.getElementById("keyboard");
  if (!keyboardEl) return;

  keyboardEl.innerHTML = "";
  const totalKeys = harmonyLab.keyboardOctaves * 12;
  const inner = document.createElement("div");
  inner.className = "keyboard-inner";

  let whiteIndex = 0;
  for (let i = 0; i < totalKeys; i += 1) {
    const midi = harmonyLab.keyboardStartMidi + i;
    if (isBlackKey(midi)) continue;
    inner.appendChild(createPianoKey(midi, "white", whiteIndex * harmonyLab.whiteKeyWidth));
    whiteIndex += 1;
  }

  let whiteCountBefore = 0;
  for (let i = 0; i < totalKeys; i += 1) {
    const midi = harmonyLab.keyboardStartMidi + i;
    if (!isBlackKey(midi)) {
      whiteCountBefore += 1;
      continue;
    }
    const left = whiteCountBefore * harmonyLab.whiteKeyWidth - harmonyLab.blackKeyWidth / 2;
    inner.appendChild(createPianoKey(midi, "black", left));
  }

  inner.style.width = `${whiteIndex * harmonyLab.whiteKeyWidth}px`;
  inner.style.height = `${harmonyLab.whiteKeyHeight}px`;
  keyboardEl.appendChild(inner);
}

function createPianoKey(midi, type, leftPx) {
  const key = document.createElement("button");
  key.type = "button";
  key.className = `piano-key ${type}`;
  if (type === "white" && midi % 12 === 0 && midi !== harmonyLab.keyboardStartMidi) {
    key.classList.add("octave-divider");
  }
  key.style.left = `${leftPx}px`;
  key.style.width = `${type === "black" ? harmonyLab.blackKeyWidth : harmonyLab.whiteKeyWidth}px`;
  key.style.height = `${type === "black" ? harmonyLab.blackKeyHeight : harmonyLab.whiteKeyHeight}px`;
  key.dataset.midi = String(midi);
  key.dataset.semitone = String(midi % 12);
  key.setAttribute("aria-label", `${getEnharmonicLabel(midi)} ${Math.floor(midi / 12) - 1}`);

  const label = document.createElement("span");
  label.className = "key-note-label";
  label.textContent = getEnharmonicLabel(midi);
  key.appendChild(label);

  async function triggerKeyPlay() {
    if (keyboardInteraction.pointerDown && keyboardInteraction.lastMidi === midi) return;
    keyboardInteraction.lastMidi = midi;
    try {
      const audioContext = ensureAudioContext();
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }
      playKeyboardTone(midi, 0.5);
      key.classList.add("pressed-note");
      window.setTimeout(() => key.classList.remove("pressed-note"), 130);
      setHarmonyStatus(`Zahrán tón ${getEnharmonicLabel(midi)}.`, true);
    } catch (error) {
      setHarmonyStatus("Nepodařilo se spustit zvuk klaviatury.");
    }
  }

  key.addEventListener("pointerdown", async (event) => {
    event.preventDefault();
    keyboardInteraction.pointerDown = true;
    keyboardInteraction.lastMidi = null;
    await triggerKeyPlay();
  });

  key.addEventListener("pointerenter", async () => {
    if (!keyboardInteraction.pointerDown) return;
    await triggerKeyPlay();
  });

  return key;
}

function setPreviewKeyboardStatus(text, ok = false) {
  const el = document.getElementById("previewKeyboardStatus");
  if (!el) return;
  el.textContent = text;
  el.className = ok ? "feedback ok" : "feedback";
}

function createPreviewPianoKey(midi, type, leftPx) {
  const key = document.createElement("button");
  key.type = "button";
  key.className = `piano-key ${type}`;
  if (type === "white" && midi % 12 === 0 && midi !== harmonyLab.keyboardStartMidi) {
    key.classList.add("octave-divider");
  }
  key.style.left = `${leftPx}px`;
  key.style.width = `${type === "black" ? harmonyLab.blackKeyWidth : harmonyLab.whiteKeyWidth}px`;
  key.style.height = `${type === "black" ? harmonyLab.blackKeyHeight : harmonyLab.whiteKeyHeight}px`;
  key.dataset.midi = String(midi);
  key.dataset.semitone = String(midi % 12);

  const label = document.createElement("span");
  label.className = "key-note-label";
  label.textContent = getEnharmonicLabel(midi);
  key.appendChild(label);

  async function triggerKeyPlay() {
    if (keyboardInteraction.pointerDown && keyboardInteraction.lastMidi === midi) return;
    keyboardInteraction.lastMidi = midi;
    try {
      const audioContext = ensureAudioContext();
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }
      playKeyboardTone(midi, 0.5);
      key.classList.add("pressed-note");
      window.setTimeout(() => key.classList.remove("pressed-note"), 130);
      setPreviewKeyboardStatus(`Zahrán tón ${getEnharmonicLabel(midi)}.`, true);
    } catch (error) {
      setPreviewKeyboardStatus("Nepodařilo se spustit zvuk.");
    }
  }

  key.addEventListener("pointerdown", async (event) => {
    event.preventDefault();
    keyboardInteraction.pointerDown = true;
    keyboardInteraction.lastMidi = null;
    await triggerKeyPlay();
  });

  key.addEventListener("pointerenter", async () => {
    if (!keyboardInteraction.pointerDown) return;
    await triggerKeyPlay();
  });

  return key;
}

function renderPreviewKeyboard() {
  const keyboardEl = document.getElementById("previewKeyboard");
  if (!keyboardEl) return;

  keyboardEl.innerHTML = "";
  const totalKeys = harmonyLab.keyboardOctaves * 12;
  const inner = document.createElement("div");
  inner.className = "keyboard-inner";

  let whiteIndex = 0;
  for (let i = 0; i < totalKeys; i += 1) {
    const midi = harmonyLab.keyboardStartMidi + i;
    if (isBlackKey(midi)) continue;
    inner.appendChild(createPreviewPianoKey(midi, "white", whiteIndex * harmonyLab.whiteKeyWidth));
    whiteIndex += 1;
  }

  let whiteCountBefore = 0;
  for (let i = 0; i < totalKeys; i += 1) {
    const midi = harmonyLab.keyboardStartMidi + i;
    if (!isBlackKey(midi)) {
      whiteCountBefore += 1;
      continue;
    }
    const left = whiteCountBefore * harmonyLab.whiteKeyWidth - harmonyLab.blackKeyWidth / 2;
    inner.appendChild(createPreviewPianoKey(midi, "black", left));
  }

  inner.style.width = `${whiteIndex * harmonyLab.whiteKeyWidth}px`;
  inner.style.height = `${harmonyLab.whiteKeyHeight}px`;
  keyboardEl.appendChild(inner);
  previewKeyboardLab.rendered = true;
}

function updateKeyboardLabels() {
  const keys = document.querySelectorAll("#keyboard .piano-key");
  keys.forEach((key) => {
    const midi = Number(key.dataset.midi);
    const label = key.querySelector(".key-note-label");
    const labelText = getEnharmonicLabel(midi);
    if (label) label.textContent = labelText;
    key.setAttribute("aria-label", `${labelText} ${Math.floor(midi / 12) - 1}`);
  });
}

function setHarmonyStatus(text, ok = false) {
  if (!harmonyLab.ui?.statusEl) return;
  harmonyLab.ui.statusEl.textContent = text;
  harmonyLab.ui.statusEl.className = ok ? "feedback ok" : "feedback";
}

function getSelectedChordNotes() {
  const rootSemitone = NOTE_TO_SEMITONE[harmonyLab.root];
  const rootMidi = 60 + rootSemitone; // C4 base
  const intervals = CHORD_INTERVALS[harmonyLab.chordType] || CHORD_INTERVALS.dur;
  const notes = intervals.map((step) => rootMidi + step);

  if (harmonyLab.inversion === "first") {
    notes[0] += 12;
  } else if (harmonyLab.inversion === "second") {
    notes[0] += 12;
    notes[1] += 12;
  }

  return notes.sort((a, b) => a - b);
}

function highlightChordOnKeyboard(notes) {
  const keys = document.querySelectorAll("#keyboard .piano-key");
  keys.forEach((key) => {
    const midi = Number(key.dataset.midi);
    key.classList.toggle("active-note", notes.includes(midi));
  });
}

function playKeyboardTone(midi, duration = 0.7) {
  const audioContext = ensureAudioContext();
  const osc = audioContext.createOscillator();
  const colorOsc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const colorGain = audioContext.createGain();

  const start = audioContext.currentTime;
  const sustainAt = start + 0.055;
  const releaseAt = start + duration;

  osc.type = "triangle";
  colorOsc.type = "sine";
  osc.frequency.value = midiToFrequency(midi);
  colorOsc.frequency.value = midiToFrequency(midi) * 2;

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(0.18, start + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.09, sustainAt);
  gain.gain.exponentialRampToValueAtTime(0.0001, releaseAt);

  colorGain.gain.setValueAtTime(0.0001, start);
  colorGain.gain.exponentialRampToValueAtTime(0.05, start + 0.01);
  colorGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.2);

  osc.connect(gain);
  colorOsc.connect(colorGain);
  gain.connect(audioContext.destination);
  colorGain.connect(audioContext.destination);

  osc.start(start);
  colorOsc.start(start);
  osc.stop(releaseAt + 0.03);
  colorOsc.stop(start + 0.22);
}

async function playChord(notes) {
  const audioContext = ensureAudioContext();
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
  notes.forEach((midi) => {
    playKeyboardTone(midi, 0.95);
  });
}

function getChordLabel() {
  const typeLabels = {
    dur: "dur",
    moll: "moll",
    aug: "zvětšený",
    dim: "zmenšený",
  };
  const inversionLabels = {
    root: "základní tvar (kvintakord)",
    first: "1. obrat (sextakord)",
    second: "2. obrat (kvartsextakord)",
  };
  return `${harmonyLab.root} ${typeLabels[harmonyLab.chordType]} (${inversionLabels[harmonyLab.inversion]})`;
}

function refreshChordView() {
  const notes = getSelectedChordNotes();
  harmonyLab.activeNotes = notes;
  highlightChordOnKeyboard(notes);

  const noteNames = notes.map((midi) => getEnharmonicLabel(midi)).join(" - ");
  setHarmonyStatus(`Zobrazeno: ${getChordLabel()} | tóny: ${noteNames}.`, true);

  if (!harmonyLab.ui) return;
  const mapping = {
    dur: harmonyLab.ui.durBtn,
    moll: harmonyLab.ui.mollBtn,
    aug: harmonyLab.ui.augBtn,
    dim: harmonyLab.ui.dimBtn,
  };
  Object.entries(mapping).forEach(([type, button]) => {
    if (!button) return;
    button.classList.toggle("secondary", harmonyLab.chordType !== type);
  });

  harmonyLab.ui.rootButtons.forEach((button) => {
    const isActive = button.dataset.root === harmonyLab.root;
    button.classList.toggle("secondary", !isActive);
  });

  harmonyLab.ui.inversionButtons.forEach((button) => {
    const isActive = button.dataset.inversion === harmonyLab.inversion;
    button.classList.toggle("secondary", !isActive);
  });

}

function wireHarmonyUI() {
  harmonyLab.ui = {
    rootButtons: Array.from(document.querySelectorAll("#rootButtons [data-root]")),
    inversionButtons: Array.from(document.querySelectorAll("#inversionButtons [data-inversion]")),
    durBtn: document.getElementById("chordDurBtn"),
    mollBtn: document.getElementById("chordMollBtn"),
    augBtn: document.getElementById("chordAugBtn"),
    dimBtn: document.getElementById("chordDimBtn"),
    playBtn: document.getElementById("playChordBtn"),
    resetBtn: document.getElementById("resetChordBtn"),
    statusEl: document.getElementById("harmonyStatus"),
  };

  renderKeyboard();

  harmonyLab.ui.rootButtons.forEach((button) => {
    button.addEventListener("click", () => {
      harmonyLab.root = button.dataset.root;
      refreshChordView();
    });
  });

  harmonyLab.ui.inversionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      harmonyLab.inversion = button.dataset.inversion;
      refreshChordView();
    });
  });

  harmonyLab.ui.durBtn.addEventListener("click", () => {
    harmonyLab.chordType = "dur";
    refreshChordView();
  });
  harmonyLab.ui.mollBtn.addEventListener("click", () => {
    harmonyLab.chordType = "moll";
    refreshChordView();
  });
  harmonyLab.ui.augBtn.addEventListener("click", () => {
    harmonyLab.chordType = "aug";
    refreshChordView();
  });
  harmonyLab.ui.dimBtn.addEventListener("click", () => {
    harmonyLab.chordType = "dim";
    refreshChordView();
  });

  harmonyLab.ui.playBtn.addEventListener("click", async () => {
    try {
      await playChord(harmonyLab.activeNotes);
      setHarmonyStatus(`Přehrán akord: ${getChordLabel()}.`, true);
    } catch (error) {
      setHarmonyStatus("Nepodařilo se přehrát akord.");
    }
  });

  harmonyLab.ui.resetBtn.addEventListener("click", () => {
    harmonyLab.activeNotes = [];
    highlightChordOnKeyboard([]);
    setHarmonyStatus("Zvýraznění klaviatury bylo vymazáno.");
  });

  refreshChordView();
}

function renderExplainerTopic(topicId) {
  const topic = EXPLAINER_TOPICS.find((item) => item.id === topicId) || EXPLAINER_TOPICS[0];
  const titleEl = document.getElementById("explainerTitle");
  const ruleEl = document.getElementById("explainerRule");
  const exampleEl = document.getElementById("explainerExample");
  const taskEl = document.getElementById("explainerTask");
  if (!titleEl || !ruleEl || !exampleEl || !taskEl) return;
  titleEl.textContent = topic.title;
  ruleEl.textContent = topic.rule;
  exampleEl.textContent = topic.example;
  taskEl.textContent = topic.task;
}

function wireExplainerUI(lessonId) {
  const host = document.getElementById("explainerButtons");
  if (!host) return;
  host.innerHTML = "";

  EXPLAINER_TOPICS.forEach((topic) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn secondary explainer-btn";
    button.dataset.topic = topic.id;
    button.textContent = topic.label;
    button.addEventListener("click", () => {
      host.querySelectorAll(".explainer-btn").forEach((btn) => btn.classList.add("secondary"));
      button.classList.remove("secondary");
      renderExplainerTopic(topic.id);
    });
    host.appendChild(button);
  });

  const defaultTopic = LESSON_EXPLAINER_MAP[lessonId] || EXPLAINER_TOPICS[0].id;
  const activeButton = host.querySelector(`[data-topic='${defaultTopic}']`);
  if (activeButton) activeButton.classList.remove("secondary");
  renderExplainerTopic(defaultTopic);
}

function renderTheoryBubble(bubbleId) {
  const bubble = THEORY_BUBBLES.find((item) => item.id === bubbleId) || THEORY_BUBBLES[0];
  const titleEl = document.getElementById("theoryBubbleTitle");
  const textEl = document.getElementById("theoryBubbleText");
  if (!titleEl || !textEl) return;
  titleEl.textContent = bubble.title;
  textEl.textContent = bubble.text;
}

function wireTheoryBubblesUI() {
  const host = document.getElementById("theoryBubbleButtons");
  if (!host) return;
  host.innerHTML = "";

  THEORY_BUBBLES.forEach((bubble, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn secondary bubble-btn";
    button.dataset.bubble = bubble.id;
    button.textContent = bubble.label;
    button.addEventListener("click", () => {
      host.querySelectorAll(".bubble-btn").forEach((btn) => btn.classList.add("secondary"));
      button.classList.remove("secondary");
      renderTheoryBubble(bubble.id);
    });
    host.appendChild(button);

    if (index === 0) {
      button.classList.remove("secondary");
      renderTheoryBubble(bubble.id);
    }
  });
}

window.addEventListener("pointerup", () => {
  keyboardInteraction.pointerDown = false;
  keyboardInteraction.lastMidi = null;
});

window.addEventListener("pointercancel", () => {
  keyboardInteraction.pointerDown = false;
  keyboardInteraction.lastMidi = null;
});

function saveProgress() {
  localStorage.setItem(storageKey, JSON.stringify(progress));
}

function savePaymentState() {
  localStorage.setItem(paymentStorageKey, JSON.stringify(paymentState));
}

function isDone(lessonId) {
  return Boolean(progress[lessonId]?.done);
}

async function readPaymentReturnFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const checkout = params.get("checkout");
  const plan = params.get("plan");
  const sessionId = params.get("session_id");

  if (checkout === "success" && (plan === "one_time" || plan === "subscription")) {
    paymentState.premium = true;
    paymentState.plan = plan;
    savePaymentState();
    window.history.replaceState({}, document.title, window.location.pathname);
    return;
  }

  if (!sessionId) return;

  try {
    const response = await fetch(`${checkoutApi.statusEndpoint}?session_id=${encodeURIComponent(sessionId)}`);
    if (!response.ok) throw new Error("status-check-failed");
    const payload = await response.json();
    if (payload.paid) {
      paymentState.premium = true;
      paymentState.plan = payload.plan || "one_time";
      savePaymentState();
    }
  } catch (error) {
    // Keep the user flow alive if backend is temporarily unavailable.
  }
  window.history.replaceState({}, document.title, window.location.pathname);
}

function renderSidebar() {
  const list = document.getElementById("moduleList");
  list.innerHTML = "";

  modules.forEach((module) => {
    const moduleEl = document.createElement("section");
    moduleEl.className = "module";

    const title = document.createElement("h3");
    title.textContent = module.title;
    moduleEl.appendChild(title);

    module.lessons.forEach((lesson, index) => {
      const btn = document.createElement("button");
      btn.className = "lesson-link";
      if (lesson.id === activeLessonId) btn.classList.add("active");
      if (isDone(lesson.id)) btn.classList.add("done");
      btn.textContent = `${index + 1}. ${lesson.title}`;
      btn.addEventListener("click", () => {
        activeLessonId = lesson.id;
        renderSidebar();
        renderLesson(lesson);
      });
      moduleEl.appendChild(btn);
    });

    list.appendChild(moduleEl);
  });
}

function renderProgressChip() {
  const all = getAllLessons();
  const doneCount = all.filter((lesson) => isDone(lesson.id)).length;
  document.getElementById("progressText").textContent = `${doneCount}/${all.length} splněno`;
}

function setPaymentStatus(text, ok = false) {
  const statusEl = document.getElementById("paymentStatus");
  if (!statusEl) return;
  statusEl.textContent = text;
  statusEl.className = ok ? "feedback ok" : "feedback";
}

function getPaymentPlanLabel() {
  if (paymentState.plan === "subscription") return "Předplatné";
  if (paymentState.plan === "one_time") return "Jednorázová platba";
  return null;
}

async function openStripePayment(plan) {
  setPaymentStatus("Připravuji Stripe checkout...");
  try {
    const response = await fetch(checkoutApi.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    const payload = await response.json();
    if (!response.ok || !payload.url) {
      throw new Error(payload?.error || "checkout-create-failed");
    }
    window.location.href = payload.url;
  } catch (error) {
    setPaymentStatus("Stripe backend neběží. Spusť server nebo použij Simulaci.", false);
  }
}

function simulatePaymentSuccess(plan) {
  const planParam = plan === "one_time" ? "one_time" : "subscription";
  const url = `${window.location.pathname}?checkout=success&plan=${planParam}`;
  window.location.href = url;
}

function wirePaymentUI() {
  const oneTimeBtn = document.getElementById("buyOneTimeBtn");
  const subBtn = document.getElementById("buySubBtn");
  const simulateOneTimeBtn = document.getElementById("simulateOneTimeBtn");
  const simulateSubBtn = document.getElementById("simulateSubBtn");
  if (!oneTimeBtn || !subBtn || !simulateOneTimeBtn || !simulateSubBtn) return;

  const planLabel = getPaymentPlanLabel();
  if (paymentState.premium && planLabel) {
    setPaymentStatus(`Kurz je odemčený. Aktivní plán: ${planLabel}.`, true);
  } else {
    setPaymentStatus("Kurz zatím není odemčený.");
  }

  oneTimeBtn.addEventListener("click", () => {
    openStripePayment("one_time");
  });
  subBtn.addEventListener("click", () => {
    openStripePayment("subscription");
  });
  simulateOneTimeBtn.addEventListener("click", () => {
    simulatePaymentSuccess("one_time");
  });
  simulateSubBtn.addEventListener("click", () => {
    simulatePaymentSuccess("subscription");
  });
}

function wireLandingUI() {
  const goToModulesBtn = document.getElementById("goToModulesBtn");
  const modulesSection = document.getElementById("modulesSection") || document.querySelector(".layout");
  const paperSection = document.getElementById("paperLabSection");
  const wheelSection = document.getElementById("musicWheelSection");
  const tabWheelBtn = document.getElementById("tabWheelBtn");
  const tabModulesBtn = document.getElementById("tabModulesBtn");
  const tabPaperBtn = document.getElementById("tabPaperBtn");
  const tabKeyboardBtn = document.getElementById("tabKeyboardBtn");

  if (goToModulesBtn && modulesSection) {
    goToModulesBtn.addEventListener("click", () => {
      modulesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (tabModulesBtn && modulesSection) {
    tabModulesBtn.addEventListener("click", () => {
      modulesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (tabWheelBtn && wheelSection) {
    tabWheelBtn.addEventListener("click", () => {
      wheelSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (tabPaperBtn && paperSection) {
    tabPaperBtn.addEventListener("click", () => {
      paperSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (tabKeyboardBtn) {
    tabKeyboardBtn.addEventListener("click", () => {
      const keyboard = document.getElementById("keyboard");
      if (keyboard) {
        keyboard.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      if (modulesSection) {
        modulesSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
}

function wireMusicWheelUI() {
  const nodes = Array.from(document.querySelectorAll(".wheel-node"));
  const topics = Array.from(document.querySelectorAll(".wheel-topic"));

  const modulesSection = document.getElementById("modulesSection");
  const setActive = (targetId) => {
    nodes.forEach((node) => {
      node.classList.toggle("is-active", node.dataset.wheelTarget === targetId);
    });
    topics.forEach((topic) => {
      topic.classList.toggle("is-active", topic.id === targetId);
    });
  };

  nodes.forEach((node) => {
    node.addEventListener("click", () => {
      const targetId = node.dataset.wheelTarget;
      if (!targetId) return;
      setActive(targetId);
      const target = document.getElementById(targetId);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });

  const shortcutButtons = Array.from(document.querySelectorAll(".preview-shortcut"));
  const previewKeyboardPanel = document.getElementById("previewKeyboardPanel");
  shortcutButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.triadTarget;
      if (!targetId) return;
      setActive(targetId);
      const target = document.getElementById(targetId);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "nearest" });
      if (targetId === "topic-akordy" && previewKeyboardPanel) {
        previewKeyboardPanel.hidden = false;
        if (!previewKeyboardLab.rendered) renderPreviewKeyboard();
        previewKeyboardPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  });

  const previewModulesBtn = document.getElementById("previewModulesBtn");
  if (previewModulesBtn && modulesSection) {
    previewModulesBtn.addEventListener("click", () => {
      document.body.classList.remove("frontend-preview");
      modulesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function wireFeedbackForm() {
  const form = document.getElementById("feedbackForm");
  const statusEl = document.getElementById("feedbackStatus");
  const submitBtn = document.getElementById("feedbackSubmitBtn");
  if (!form || !statusEl || !submitBtn) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = String(document.getElementById("feedbackMessage")?.value || "").trim();

    if (!message) {
      statusEl.textContent = "Napiš prosím připomínku.";
      statusEl.className = "feedback";
      return;
    }

    submitBtn.disabled = true;
    statusEl.textContent = "Odesílám...";
    statusEl.className = "feedback";

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          page: window.location.pathname || "/",
        }),
      });
      let payload = {};
      try {
        payload = await response.json();
      } catch (_error) {
        payload = {};
      }
      if (!response.ok || !payload.ok) {
        throw new Error(payload?.error || "feedback-submit-failed");
      }
      form.reset();
      statusEl.textContent = "Díky, připomínka byla uložena.";
      statusEl.className = "feedback ok";
    } catch (error) {
      statusEl.textContent = `Nepodařilo se odeslat připomínku: ${error.message}`;
      statusEl.className = "feedback";
    } finally {
      submitBtn.disabled = false;
    }
  });
}

function renderCurriculum(filter = "all") {
  const host = document.getElementById("curriculumGrid");
  if (!host) return;
  host.innerHTML = "";
  const items = CURRICULUM_CORE.filter((item) => filter === "all" || item.category === filter);
  items.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "curriculum-card";
    card.innerHTML = `
      <p class="curriculum-index">${index + 1}</p>
      <h3>${item.title}</h3>
      <p><strong>Proč:</strong> ${item.why}</p>
      <p><strong>Výcuc:</strong> ${item.essence}</p>
      <p class="curriculum-drill"><strong>Mini cvičení:</strong> ${item.drill}</p>
    `;
    host.appendChild(card);
  });
}

function wireCurriculumUI() {
  const filterButtons = Array.from(document.querySelectorAll(".curriculum-filter"));
  if (!filterButtons.length) return;
  renderCurriculum("all");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";
      filterButtons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");
      renderCurriculum(filter);
    });
  });
}

function getPaperKnowledgeItems() {
  return THEORY_BUBBLES.map((item) => ({
    id: item.id,
    label: item.title,
    text: item.text,
  }));
}

function setPaperHint(text, ok = false) {
  if (!paperLab.hint) return;
  paperLab.hint.textContent = text;
  paperLab.hint.className = ok ? "feedback ok" : "feedback";
}

function resizePaperCanvas() {
  if (!paperLab.canvas || !paperLab.board || !paperLab.ctx) return;
  const rect = paperLab.board.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  paperLab.canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  paperLab.canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  paperLab.canvas.style.width = `${rect.width}px`;
  paperLab.canvas.style.height = `${rect.height}px`;
  paperLab.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  paperLab.ctx.lineJoin = "round";
  paperLab.ctx.lineCap = "round";
}

function clearPaperInk() {
  if (!paperLab.ctx || !paperLab.canvas) return;
  paperLab.ctx.clearRect(0, 0, paperLab.canvas.width, paperLab.canvas.height);
}

function setPaperMode(mode) {
  paperLab.mode = mode === "eraser" ? "eraser" : "pen";
  const penBtn = document.getElementById("paperPenBtn");
  const eraserBtn = document.getElementById("paperEraserBtn");
  if (penBtn) penBtn.classList.toggle("secondary", paperLab.mode !== "pen");
  if (eraserBtn) eraserBtn.classList.toggle("secondary", paperLab.mode !== "eraser");
}

function placePaperNote(note, x, y) {
  if (!paperLab.board) return;
  const boardRect = paperLab.board.getBoundingClientRect();
  const noteRect = note.getBoundingClientRect();
  const maxX = Math.max(0, boardRect.width - noteRect.width - 8);
  const maxY = Math.max(0, boardRect.height - noteRect.height - 8);
  const nextX = Math.min(Math.max(8, x), maxX);
  const nextY = Math.min(Math.max(8, y), maxY);
  note.style.left = `${nextX}px`;
  note.style.top = `${nextY}px`;
}

function isInsideRect(x, y, rect) {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function createPaperNote(item, start = null) {
  if (!paperLab.notesLayer) return;
  const note = document.createElement("article");
  note.className = "paper-note";
  note.dataset.noteId = `note-${paperLab.noteCounter += 1}`;
  note.dataset.itemId = item.id || "";
  note.innerHTML = `
    <header><strong>${item.label}</strong></header>
    <p>${item.text}</p>
  `;
  paperLab.notesLayer.appendChild(note);

  const startX = start?.x ?? (16 + (paperLab.noteCounter % 4) * 28);
  const startY = start?.y ?? (16 + (paperLab.noteCounter % 3) * 22);
  placePaperNote(note, startX, startY);

  note.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    const rect = note.getBoundingClientRect();
    paperLab.dragState = {
      note,
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };
    note.setPointerCapture(event.pointerId);
    note.classList.add("dragging");
  });

  note.addEventListener("pointermove", (event) => {
    if (!paperLab.dragState || paperLab.dragState.note !== note || paperLab.dragState.pointerId !== event.pointerId) return;
    const boardRect = paperLab.board.getBoundingClientRect();
    const nextX = event.clientX - boardRect.left - paperLab.dragState.offsetX;
    const nextY = event.clientY - boardRect.top - paperLab.dragState.offsetY;
    placePaperNote(note, nextX, nextY);
  });

  note.addEventListener("pointerup", (event) => {
    if (!paperLab.dragState || paperLab.dragState.note !== note || paperLab.dragState.pointerId !== event.pointerId) return;
    note.classList.remove("dragging");
    const boardRect = paperLab.board.getBoundingClientRect();
    const chipsRect = document.getElementById("paperKnowledgeChips")?.getBoundingClientRect();

    const droppedOutsideBoard = !isInsideRect(event.clientX, event.clientY, boardRect);
    const droppedOnChips = chipsRect ? isInsideRect(event.clientX, event.clientY, chipsRect) : false;

    if (droppedOutsideBoard || droppedOnChips) {
      note.remove();
      setPaperHint("Kartička vrácena zpět.", true);
      paperLab.dragState = null;
      return;
    }

    if (paperLab.trash) {
      const t = paperLab.trash.getBoundingClientRect();
      const insideTrash = isInsideRect(event.clientX, event.clientY, t);
      if (insideTrash) {
        note.remove();
        setPaperHint("Kartička byla odhozena do koše.");
      }
    }
    paperLab.dragState = null;
  });
}

function wirePaperDrawing() {
  if (!paperLab.canvas || !paperLab.ctx || !paperLab.board) return;
  const ctx = paperLab.ctx;

  function strokeAt(clientX, clientY, start = false) {
    const rect = paperLab.canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    ctx.globalCompositeOperation = paperLab.mode === "eraser" ? "destination-out" : "source-over";
    ctx.strokeStyle = "#2e355f";
    ctx.lineWidth = paperLab.mode === "eraser" ? 16 : 2.5;
    if (start) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      return;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  paperLab.canvas.addEventListener("pointerdown", (event) => {
    paperLab.drawing = true;
    paperLab.canvas.setPointerCapture(event.pointerId);
    strokeAt(event.clientX, event.clientY, true);
  });

  paperLab.canvas.addEventListener("pointermove", (event) => {
    if (!paperLab.drawing) return;
    strokeAt(event.clientX, event.clientY, false);
  });

  function stopDrawing() {
    paperLab.drawing = false;
    ctx.beginPath();
  }

  paperLab.canvas.addEventListener("pointerup", stopDrawing);
  paperLab.canvas.addEventListener("pointercancel", stopDrawing);
}

function wirePaperLabUI() {
  const board = document.getElementById("paperBoard");
  const canvas = document.getElementById("paperCanvas");
  const notesLayer = document.getElementById("paperNotesLayer");
  const chips = document.getElementById("paperKnowledgeChips");
  const trash = document.getElementById("paperTrashZone");
  const hint = document.getElementById("paperHint");
  const penBtn = document.getElementById("paperPenBtn");
  const eraserBtn = document.getElementById("paperEraserBtn");
  const clearInkBtn = document.getElementById("paperClearInkBtn");
  const resetAllBtn = document.getElementById("paperResetAllBtn");
  if (!board || !canvas || !notesLayer || !chips || !trash || !hint || !penBtn || !eraserBtn || !clearInkBtn || !resetAllBtn) return;

  paperLab.board = board;
  paperLab.canvas = canvas;
  paperLab.notesLayer = notesLayer;
  paperLab.trash = trash;
  paperLab.hint = hint;
  paperLab.ctx = canvas.getContext("2d");
  if (!paperLab.ctx) return;

  resizePaperCanvas();
  wirePaperDrawing();
  setPaperMode("pen");

  chips.innerHTML = "";
  getPaperKnowledgeItems().forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn secondary paper-chip";
    button.textContent = item.label;
    button.draggable = true;
    button.dataset.itemId = item.id;
    button.addEventListener("dragstart", (event) => {
      event.dataTransfer?.setData("application/x-paper-item", item.id);
      event.dataTransfer?.setData("text/plain", item.id);
      if (event.dataTransfer) event.dataTransfer.effectAllowed = "copy";
      setPaperHint(`Táhni "${item.label}" na papír.`, true);
    });
    button.addEventListener("click", () => {
      createPaperNote(item);
      setPaperHint(`Přidáno na papír: ${item.label}`, true);
    });
    chips.appendChild(button);
  });

  board.addEventListener("dragover", (event) => {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
  });
  board.addEventListener("drop", (event) => {
    event.preventDefault();
    const itemId = event.dataTransfer?.getData("application/x-paper-item") || event.dataTransfer?.getData("text/plain");
    if (!itemId) return;
    const item = getPaperKnowledgeItems().find((it) => it.id === itemId);
    if (!item) return;
    const boardRect = board.getBoundingClientRect();
    createPaperNote(item, {
      x: event.clientX - boardRect.left - 80,
      y: event.clientY - boardRect.top - 30,
    });
    setPaperHint(`Přidáno na papír: ${item.label}`, true);
  });

  penBtn.addEventListener("click", () => {
    setPaperMode("pen");
    setPaperHint("Režim: pero.");
  });
  eraserBtn.addEventListener("click", () => {
    setPaperMode("eraser");
    setPaperHint("Režim: guma.");
  });
  clearInkBtn.addEventListener("click", () => {
    clearPaperInk();
    setPaperHint("Kresba byla smazána.");
  });
  resetAllBtn.addEventListener("click", () => {
    clearPaperInk();
    notesLayer.innerHTML = "";
    setPaperHint("Nový papír připraven.", true);
  });

  window.addEventListener("resize", resizePaperCanvas);
}

function wireAIChat() {
  const input = document.getElementById("aiInput");
  const sendBtn = document.getElementById("aiSendBtn");
  const log = document.getElementById("aiChatLog");
  const askLessonBtn = document.getElementById("aiAskLessonBtn");
  const askChordBtn = document.getElementById("aiAskChordBtn");

  if (!input || !sendBtn || !log) return;

  function addMsg(who, text) {
    const row = document.createElement("div");
    const strong = document.createElement("strong");
    strong.textContent = `${who}: `;
    row.appendChild(strong);
    row.appendChild(document.createTextNode(text));
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
  }

  async function send(prefilledMessage = "") {
    const message = (prefilledMessage || input.value).trim();
    if (!message) return;

    input.value = "";
    addMsg("Ty", message);
    sendBtn.disabled = true;

    const payload = JSON.stringify({
      message,
      root: harmonyLab.root,
      chordType: harmonyLab.chordType,
      inversion: harmonyLab.inversion,
      lessonTitle: getAllLessons().find((l) => l.id === activeLessonId)?.title || null,
    });

    async function postChat(url) {
      return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });
    }

    try {
      let response;
      try {
        response = await postChat("/api/chat");
      } catch (_sameOriginErr) {
        response = await postChat("http://localhost:8000/api/chat");
      }

      const raw = await response.text();
      let data = null;
      try {
        data = raw ? JSON.parse(raw) : null;
      } catch (_error) {
        data = null;
      }

      if (!response.ok) {
        if (response.status === 404) {
          addMsg("AI", "API /api/chat nebylo nalezeno. Spusť aplikaci přes node server.js, ne jen statický server.");
        } else {
          const fallback = raw ? `Server vrátil chybu (${response.status}): ${raw.slice(0, 220)}` : `Server vrátil chybu (${response.status}).`;
          addMsg("AI", (data && data.error) || fallback);
        }
      } else {
        addMsg("AI", (data && data.text) || "Nemám odpověď, zkus prosím dotaz upřesnit.");
      }
    } catch (error) {
      addMsg("AI", `Nepodařilo se spojit se serverem. Zkontroluj, že běží node server na http://localhost:8000. (${error && error.message ? error.message : "network error"})`);
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  }

  sendBtn.addEventListener("click", send);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      send();
    }
  });

  if (askLessonBtn) {
    askLessonBtn.addEventListener("click", () => {
      const lesson = getAllLessons().find((l) => l.id === activeLessonId);
      const title = lesson?.title || "aktuální lekce";
      send(`Vysvětli mi jednoduše ${title}. Dej krátké shrnutí, příklad a mini úkol.`);
    });
  }

  if (askChordBtn) {
    askChordBtn.addEventListener("click", () => {
      send(`Vysvětli mi akord ${harmonyLab.root} ${harmonyLab.chordType} v obratu ${harmonyLab.inversion} a jak ho slyšet v praxi.`);
    });
  }
}

function ensureAudioContext() {
  if (!metronome.audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    metronome.audioContext = new AudioCtx();
  }
  return metronome.audioContext;
}

function playClick(time, isAccent) {
  const audioContext = ensureAudioContext();
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = "square";
  osc.frequency.value = isAccent ? 1240 : 880;

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.24, time + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);

  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(time);
  osc.stop(time + 0.06);
}

function updateBeatUI(activeIndex) {
  if (!metronome.ui?.beatDots?.length) return;
  metronome.ui.beatDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === activeIndex);
    dot.classList.toggle("accent", index === 0 && index === activeIndex);
  });
}

function scheduleBeatPulse(beatIndex, noteTime) {
  const audioContext = metronome.audioContext;
  if (!audioContext || !metronome.ui) return;
  const delay = Math.max(0, (noteTime - audioContext.currentTime) * 1000);
  window.setTimeout(() => {
    updateBeatUI(beatIndex);
  }, delay);
}

function scheduleMetronome() {
  if (!metronome.audioContext) return;
  const lookAhead = 0.1;

  while (metronome.nextNoteTime < metronome.audioContext.currentTime + lookAhead) {
    const beatIndex = metronome.currentBeat;
    const isAccent = beatIndex === 0;
    playClick(metronome.nextNoteTime, isAccent);
    scheduleBeatPulse(beatIndex, metronome.nextNoteTime);

    const secondsPerBeat = 60 / metronome.bpm;
    metronome.nextNoteTime += secondsPerBeat;
    metronome.currentBeat = (metronome.currentBeat + 1) % metronome.beatsPerBar;
  }
}

function setMetronomeStatus(text, ok = false) {
  if (!metronome.ui?.statusEl) return;
  metronome.ui.statusEl.textContent = text;
  metronome.ui.statusEl.className = ok ? "feedback ok" : "feedback";
}

function stopMetronome() {
  if (metronome.schedulerId) {
    window.clearInterval(metronome.schedulerId);
    metronome.schedulerId = null;
  }
  metronome.isRunning = false;
  metronome.currentBeat = 0;
  updateBeatUI(-1);
  setMetronomeStatus("Metronom je zastavený.");
}

async function startMetronome() {
  try {
    const audioContext = ensureAudioContext();
    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    if (metronome.isRunning) return;
    if (samplePlayer.isRunning) stopSamplePlayer();

    metronome.nextNoteTime = audioContext.currentTime + 0.04;
    metronome.currentBeat = 0;
    metronome.schedulerId = window.setInterval(scheduleMetronome, 25);
    metronome.isRunning = true;
    setMetronomeStatus(`Metronom běží na ${metronome.bpm} BPM.`, true);
  } catch (error) {
    setMetronomeStatus("Nepodařilo se spustit zvuk. Zkus jiný prohlížeč.");
  }
}

function getNoiseBuffer() {
  const audioContext = ensureAudioContext();
  if (samplePlayer.noiseBuffer && samplePlayer.noiseBuffer.sampleRate === audioContext.sampleRate) {
    return samplePlayer.noiseBuffer;
  }

  const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.2, audioContext.sampleRate);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < channelData.length; i += 1) {
    channelData[i] = Math.random() * 2 - 1;
  }
  samplePlayer.noiseBuffer = buffer;
  return buffer;
}

function playKick(time, velocity = 1) {
  const audioContext = ensureAudioContext();
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(150, time);
  osc.frequency.exponentialRampToValueAtTime(45, time + 0.12);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.55 * velocity, time + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.14);
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(time);
  osc.stop(time + 0.15);
}

function playSnare(time, velocity = 1) {
  const audioContext = ensureAudioContext();
  const noise = audioContext.createBufferSource();
  noise.buffer = getNoiseBuffer();
  const noiseFilter = audioContext.createBiquadFilter();
  noiseFilter.type = "highpass";
  noiseFilter.frequency.value = 1500;
  const noiseGain = audioContext.createGain();
  noiseGain.gain.setValueAtTime(0.0001, time);
  noiseGain.gain.exponentialRampToValueAtTime(0.22 * velocity, time + 0.002);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(audioContext.destination);
  noise.start(time);
  noise.stop(time + 0.13);

  const tone = audioContext.createOscillator();
  const toneGain = audioContext.createGain();
  tone.type = "triangle";
  tone.frequency.value = 180;
  toneGain.gain.setValueAtTime(0.0001, time);
  toneGain.gain.exponentialRampToValueAtTime(0.08 * velocity, time + 0.003);
  toneGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.08);
  tone.connect(toneGain);
  toneGain.connect(audioContext.destination);
  tone.start(time);
  tone.stop(time + 0.09);
}

function playHat(time, velocity = 1) {
  const audioContext = ensureAudioContext();
  const noise = audioContext.createBufferSource();
  noise.buffer = getNoiseBuffer();
  const filter = audioContext.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 5000;
  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.12 * velocity, time + 0.001);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.045);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  noise.start(time);
  noise.stop(time + 0.05);
}

function setSampleStatus(text, ok = false) {
  if (!samplePlayer.ui?.statusEl) return;
  samplePlayer.ui.statusEl.textContent = text;
  samplePlayer.ui.statusEl.className = ok ? "feedback ok" : "feedback";
}

function getActivePattern() {
  return samplePatterns[samplePlayer.pattern] || samplePatterns.rock;
}

function scheduleSamplePlayer() {
  const audioContext = metronome.audioContext;
  if (!audioContext || !samplePlayer.isRunning) return;

  const pattern = getActivePattern();
  const totalSteps = pattern.beatsPerBar * pattern.subdivision;
  const stepDuration = 60 / pattern.bpm / pattern.subdivision;
  const lookAhead = 0.1;

  while (samplePlayer.nextStepTime < audioContext.currentTime + lookAhead) {
    const step = samplePlayer.stepIndex % totalSteps;
    if (pattern.steps.kick.includes(step)) {
      playKick(samplePlayer.nextStepTime, step === 0 ? 1 : 0.85);
    }
    if (pattern.steps.snare.includes(step)) {
      playSnare(samplePlayer.nextStepTime, 0.9);
    }
    if (pattern.steps.hat.includes(step)) {
      playHat(samplePlayer.nextStepTime, 0.65);
    }

    samplePlayer.stepIndex += 1;
    samplePlayer.nextStepTime += stepDuration;
  }
}

function stopSamplePlayer() {
  if (samplePlayer.schedulerId) {
    window.clearInterval(samplePlayer.schedulerId);
    samplePlayer.schedulerId = null;
  }
  samplePlayer.isRunning = false;
  setSampleStatus("Ukázka je zastavená.");
}

async function startSamplePlayer() {
  try {
    const audioContext = ensureAudioContext();
    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    if (samplePlayer.isRunning) stopSamplePlayer();
    if (metronome.isRunning) stopMetronome();

    const pattern = getActivePattern();
    samplePlayer.nextStepTime = audioContext.currentTime + 0.04;
    samplePlayer.stepIndex = 0;
    samplePlayer.schedulerId = window.setInterval(scheduleSamplePlayer, 25);
    samplePlayer.isRunning = true;
    setSampleStatus(`Hraje ${pattern.label} (${pattern.bpm} BPM).`, true);
  } catch (error) {
    setSampleStatus("Nepodařilo se spustit ukázku. Zkus jiný prohlížeč.");
  }
}

function wireMetronomeUI() {
  metronome.ui = {
    bpmSlider: document.getElementById("bpmSlider"),
    bpmValue: document.getElementById("bpmValue"),
    startBtn: document.getElementById("metroStartBtn"),
    stopBtn: document.getElementById("metroStopBtn"),
    statusEl: document.getElementById("metroStatus"),
    beatDots: Array.from(document.querySelectorAll("#beatDots .beat-dot")),
  };

  metronome.ui.bpmSlider.value = String(metronome.bpm);
  metronome.ui.bpmValue.textContent = `${metronome.bpm} BPM`;

  metronome.ui.bpmSlider.addEventListener("input", (event) => {
    metronome.bpm = Number(event.target.value);
    metronome.ui.bpmValue.textContent = `${metronome.bpm} BPM`;
    if (metronome.isRunning) {
      setMetronomeStatus(`Metronom běží na ${metronome.bpm} BPM.`, true);
    }
  });

  metronome.ui.startBtn.addEventListener("click", () => {
    startMetronome();
  });

  metronome.ui.stopBtn.addEventListener("click", () => {
    stopMetronome();
  });

  if (metronome.isRunning) {
    setMetronomeStatus(`Metronom běží na ${metronome.bpm} BPM.`, true);
  } else {
    updateBeatUI(-1);
    setMetronomeStatus("Klikni na Start a zkoušej rytmus.");
  }
}

function wireSamplePlayerUI() {
  samplePlayer.ui = {
    selectEl: document.getElementById("sampleSelect"),
    playBtn: document.getElementById("samplePlayBtn"),
    stopBtn: document.getElementById("sampleStopBtn"),
    statusEl: document.getElementById("sampleStatus"),
  };

  samplePlayer.ui.selectEl.value = samplePlayer.pattern;
  samplePlayer.ui.selectEl.addEventListener("change", (event) => {
    samplePlayer.pattern = event.target.value;
    const pattern = getActivePattern();
    if (samplePlayer.isRunning) {
      setSampleStatus(`Hraje ${pattern.label} (${pattern.bpm} BPM).`, true);
    } else {
      setSampleStatus(`Zvolená ukázka: ${pattern.label} (${pattern.bpm} BPM).`);
    }
  });

  samplePlayer.ui.playBtn.addEventListener("click", () => {
    samplePlayer.pattern = samplePlayer.ui.selectEl.value;
    startSamplePlayer();
  });

  samplePlayer.ui.stopBtn.addEventListener("click", () => {
    stopSamplePlayer();
  });

  const pattern = getActivePattern();
  if (samplePlayer.isRunning) {
    setSampleStatus(`Hraje ${pattern.label} (${pattern.bpm} BPM).`, true);
  } else {
    setSampleStatus(`Vyber styl a klikni na Přehrát ukázku. (${pattern.label})`);
  }
}

function renderLesson(lesson) {
  const panel = document.getElementById("lessonPanel");
  const tpl = document.getElementById("lessonTemplate");
  panel.innerHTML = "";
  panel.appendChild(tpl.content.cloneNode(true));
  wireHarmonyUI();
  wireExplainerUI(lesson.id);
  wireTheoryBubblesUI();

  document.getElementById("lessonMeta").textContent = "Modul 1";
  document.getElementById("lessonTitle").textContent = lesson.title;
  document.getElementById("lessonGoal").textContent = `Cíl: ${lesson.goal}`;
  document.getElementById("lessonScript").textContent = lesson.script;

  const taskEl = document.getElementById("lessonTask");
  lesson.task.forEach((line) => {
    const li = document.createElement("li");
    li.textContent = line;
    taskEl.appendChild(li);
  });

  const taskFeedback = document.getElementById("taskFeedback");
  const quizFeedback = document.getElementById("quizFeedback");
  const markLessonBtn = document.getElementById("markLessonBtn");

  const quizForm = document.getElementById("quizForm");
  lesson.quiz.forEach((item, qIndex) => {
    const box = document.createElement("div");
    box.className = "question";
    box.dataset.qIndex = String(qIndex);

    const qTitle = document.createElement("p");
    qTitle.textContent = `${qIndex + 1}. ${item.q}`;
    box.appendChild(qTitle);

    item.options.forEach((option, oIndex) => {
      const id = `${lesson.id}-${qIndex}-${oIndex}`;
      const label = document.createElement("label");
      label.className = "quiz-option";
      label.setAttribute("for", id);
      label.dataset.optionIndex = String(oIndex);
      if (oIndex === item.answer) {
        label.dataset.correct = "true";
      }

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `${lesson.id}-${qIndex}`;
      input.id = id;
      input.value = String(oIndex);

      label.appendChild(input);
      label.append(` ${option}`);
      box.appendChild(label);
    });

    const result = document.createElement("p");
    result.className = "question-result";
    box.appendChild(result);

    quizForm.appendChild(box);
  });

  document.getElementById("taskDoneBtn").addEventListener("click", () => {
    progress[lesson.id] = progress[lesson.id] || {};
    progress[lesson.id].taskDone = true;
    saveProgress();
    taskFeedback.textContent = "Super. Úkol je označen jako procvičený.";
    taskFeedback.className = "feedback ok";
  });

  document.getElementById("checkQuizBtn").addEventListener("click", (event) => {
    event.preventDefault();

    quizForm.querySelectorAll(".question").forEach((box) => {
      box.classList.remove("correct", "wrong");
      box.querySelectorAll(".quiz-option").forEach((label) => {
        label.classList.remove("correct", "wrong");
      });
      const result = box.querySelector(".question-result");
      if (result) {
        result.textContent = "";
        result.classList.remove("ok", "bad");
      }
    });

    let correct = 0;
    let answered = 0;

    lesson.quiz.forEach((q, qIndex) => {
      const checked = quizForm.querySelector(`input[name='${lesson.id}-${qIndex}']:checked`);
      if (!checked) return;
      answered += 1;
      if (Number(checked.value) === q.answer) correct += 1;
    });

    if (answered !== lesson.quiz.length) {
      quizFeedback.textContent = "Vyplň prosím všechny otázky.";
      quizFeedback.className = "feedback";
      markLessonBtn.disabled = true;
      return;
    }

    lesson.quiz.forEach((q, qIndex) => {
      const checked = quizForm.querySelector(`input[name='${lesson.id}-${qIndex}']:checked`);
      const questionBox = quizForm.querySelector(`.question[data-q-index='${qIndex}']`);
      if (!checked || !questionBox) return;

      const selectedIndex = Number(checked.value);
      const isCorrect = selectedIndex === q.answer;
      questionBox.classList.add(isCorrect ? "correct" : "wrong");

      const optionLabels = questionBox.querySelectorAll(".quiz-option");
      optionLabels.forEach((label) => {
        const optionIndex = Number(label.dataset.optionIndex);
        const isAnswer = optionIndex === q.answer;
        const isSelected = optionIndex === selectedIndex;

        if (isAnswer) {
          label.classList.add("correct");
        } else if (isSelected && !isAnswer) {
          label.classList.add("wrong");
        }
      });

      const result = questionBox.querySelector(".question-result");
      if (!result) return;
      if (isCorrect) {
        result.textContent = "Správně.";
        result.classList.add("ok");
      } else {
        const correctText = q.options[q.answer];
        result.textContent = `Správná odpověď je: ${correctText}.`;
        result.classList.add("bad");
      }
    });

    progress[lesson.id] = progress[lesson.id] || {};
    progress[lesson.id].quizScore = correct;
    saveProgress();

    const passed = correct >= lesson.quiz.length - 1;
    quizFeedback.textContent = passed
      ? `Výborně. Správně: ${correct}/${lesson.quiz.length}. Můžeš označit lekci jako splněnou.`
      : `Máš ${correct}/${lesson.quiz.length}. Zkus kvíz ještě jednou.`;
    quizFeedback.className = passed ? "feedback ok" : "feedback";
    markLessonBtn.disabled = !passed;
  });

  markLessonBtn.addEventListener("click", (event) => {
    event.preventDefault();
    progress[lesson.id] = progress[lesson.id] || {};
    progress[lesson.id].done = true;
    saveProgress();
    renderProgressChip();
    renderSidebar();
    quizFeedback.textContent = "Lekce je splněná. Skvělá práce.";
    quizFeedback.className = "feedback ok";
    markLessonBtn.disabled = true;
  });

  if (isDone(lesson.id)) {
    markLessonBtn.disabled = true;
    quizFeedback.textContent = "Tuhle lekci už máš splněnou.";
    quizFeedback.className = "feedback ok";
  }
}

async function init() {
  await readPaymentReturnFromUrl();
  wirePaymentUI();
  wireLandingUI();
  wireMusicWheelUI();
  wireFeedbackForm();
  wireCurriculumUI();
  wirePaperLabUI();
  wireAIChat();
  activeLessonId = modules[0].lessons[0].id;
  renderProgressChip();
  renderSidebar();
  renderLesson(modules[0].lessons[0]);
}

window.addEventListener("beforeunload", () => {
  stopMetronome();
  stopSamplePlayer();
});

init();
