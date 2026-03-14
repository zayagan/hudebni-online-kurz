(function () {
  const STORAGE_KEY = "site_lang";
  const SUPPORTED = ["cs", "en"];

  const dict = {
    cs: {
      page_title_index: "Elementární Hudební Teorie Interaktivně",
      page_title_scale: "Stupnice | Elementární Hudební Teorie",
      page_title_intervals: "Intervaly | Elementární Hudební Teorie",
      page_title_chords: "Akordy | Elementární Hudební Teorie",
      main_title: "Elementární Hudební Teorie Interaktivně",
      hero_badge: "Online kurz",
      nav_demo: "Ukázka",
      nav_ai: "AI pomocník",
      nav_feedback: "Zpětná vazba",
      go_modules: "Přejít na moduly",
      hero_kicker: "Interaktivní výuka bez zbytečné teorie navíc",
      hero_title: "Nauč se stupnice, intervaly a akordy tak, aby sis je opravdu zahrál.",
      hero_subtitle:
        "Kurz je pro začátečníky, samouky i učitele. Kombinuje klaviaturu, mini kvízy, praktické úkoly a AI asistenta, takže se učíš hudební teorii rovnou v praxi.",
      hero_cta_primary: "Začít studovat",
      hero_cta_secondary: "Vyzkoušet ukázku",
      pricing_title: "Přístup ke kurzu",
      pricing_subtitle: "Jednorázový přístup nebo měsíční předplatné. Stripe běží v test režimu.",
      pricing_buy_once: "Koupit jednorázově",
      pricing_buy_sub: "Spustit předplatné",
      pricing_test_tools: "Testovací nástroje",
      pricing_sim_once: "Simulace jednorázové",
      pricing_sim_sub: "Simulace předplatného",
      benefits_title: "Pro koho je kurz a co získáš",
      benefit_1_title: "Pro začátečníky i samouky",
      benefit_1_text: "Žádná předchozí teorie není nutná. Vede tě krok za krokem od základů.",
      benefit_2_title: "Učíš se u klaviatury",
      benefit_2_text: "Každý pojem si hned zkusíš na interaktivní klaviatuře a slyšíš výsledek.",
      benefit_3_title: "AI pomocník v kurzu",
      benefit_3_text: "Když se zasekneš, AI knihovna ti vysvětlí téma jednoduše a s mini úkolem.",
      benefit_4_title: "Krátké lekce, jasný pokrok",
      benefit_4_text: "Moduly, úkoly a kvízy dávají přehled, co už umíš a co procvičit dál.",
      demo_title: "Ukázka interaktivity",
      demo_subtitle: "Klikni na téma a přejdi do konkrétní výuky.",
      how_title: "Jak kurz funguje",
      how_step_1: "Vyber modul a krátkou lekci.",
      how_step_2: "Zahraj si téma na klaviatuře a ověř uchem.",
      how_step_3: "Splň mini úkol a kvíz.",
      how_step_4: "Když nevíš, zeptej se AI knihovny.",
      modules_title: "Moduly",
      empty_lesson_title: "Vyber lekci vlevo",
      empty_lesson_text: "Začni první lekcí a sleduj svůj pokrok.",
      shortcut_keyboard: "Klaviatura",
      shortcut_quiz: "Kvíz",
      shortcut_table: "Tabulka",
      topic_scale: "Stupnice",
      topic_intervals: "Intervaly",
      topic_chords: "Akordy",
      keyboard_demo: "Klaviatura",
      keyboard_hint: "Klikni na klávesu a uslyšíš tón.",
      feedback_title: "Zpětná vazba",
      feedback_hint: "Napiš, co bylo nejasné nebo co bys chtěl v kurzu zlepšit.",
      feedback_send: "Odeslat",
      ai_title: "AI Knihovna",
      ai_subtitle: "Zeptej se na cokoliv k elementární hudební teorii.",
      ai_welcome: "Napiš dotaz, třeba „Vysvětli mi intervaly jednoduše“.",
      ai_input_ph: "Napiš otázku...",
      ai_send: "Odeslat",
      ai_explain_lesson: "Vysvětli tuto lekci",
      ai_explain_chord: "Vysvětli tento akord",
      trust_title: "Proč to funguje",
      trust_1: "Teorie je vždy propojená se zvukem a klaviaturou.",
      trust_2: "Každá lekce má konkrétní mini cíl a úkol.",
      trust_3: "Učíš se aktivně, ne jen čtením dlouhých textů.",
      trust_4: "Můžeš poslat feedback a kurz se průběžně vylepšuje.",
      paper_title: "Papír nápadů: uč se hrou",
      paper_hint: "Vyber pojem, hoď ho na papír, přesouvej kartičky, kresli si vztahy a když se ti to nelíbí, vymaž to.",
      paper_pen: "Pero",
      paper_eraser: "Guma",
      paper_clear_ink: "Vymazat kresbu",
      paper_new: "Nový papír",
      paper_trash: "Přetáhni sem pro smazání",
      paper_start_hint: "Začni kliknutím na pojem nahoře.",
      curriculum_title: "Kurikulum: praktický výcuc",
      curriculum_hint: "Praktické minimum, které se opakuje napříč nejlepšími kurzy hudební teorie.",
      filter_all: "Vše",
      filter_basics: "Základy",
      filter_harmony: "Harmonie",
      filter_practice: "Praxe",
      feedback_mail_hint: "Nebo napiš přímo na e-mail:",
      feedback_name_ph: "Jméno (volitelné)",
      feedback_email_ph: "E-mail (volitelné)",
      feedback_msg_ph: "Napiš zprávu...",
      footer_rights: "© 2026 Zayagan. Všechna práva vyhrazena.",
      footer_terms: "Podmínky použití",
      back: "Zpět",
      basic_definition: "Základní definice",
      scale_definition:
        "Stupnici (scale) definujeme jako stoupající nebo klesající řadu tónů, které jsou uspořádány podle určitých pravidel.",
      interval_definition:
        "Interval (interval) znamená vzdálenost, pokud měříme určitý prostor nebo čas. V hudbě se tak označuje vzájemná vzdálenost výšek dvou tónů.",
      chord_definition:
        "Akord (chord) je souzvuk nejméně tří tónů (pokud by to byly pouze tóny dva, jedná se o harmonický interval).",
    },
    en: {
      page_title_index: "Elementary Music Theory Interactive",
      page_title_scale: "Scales | Elementary Music Theory",
      page_title_intervals: "Intervals | Elementary Music Theory",
      page_title_chords: "Chords | Elementary Music Theory",
      main_title: "Elementary Music Theory Interactive",
      hero_badge: "Online course",
      nav_demo: "Demo",
      nav_ai: "AI assistant",
      nav_feedback: "Feedback",
      go_modules: "Go to modules",
      hero_kicker: "Interactive learning without unnecessary theory overload",
      hero_title: "Learn scales, intervals and chords so you can actually play them.",
      hero_subtitle:
        "The course is for beginners, self-learners and teachers. It combines keyboard, mini quizzes, practical tasks and an AI assistant so you learn music theory in practice.",
      hero_cta_primary: "Start learning",
      hero_cta_secondary: "Try demo",
      pricing_title: "Course access",
      pricing_subtitle: "One-time access or monthly subscription. Stripe is currently in test mode.",
      pricing_buy_once: "Buy one-time",
      pricing_buy_sub: "Start subscription",
      pricing_test_tools: "Testing tools",
      pricing_sim_once: "Simulate one-time",
      pricing_sim_sub: "Simulate subscription",
      benefits_title: "Who this course is for and what you get",
      benefit_1_title: "For beginners and self-learners",
      benefit_1_text: "No previous theory is required. You move step by step from fundamentals.",
      benefit_2_title: "You learn at the keyboard",
      benefit_2_text: "You immediately try each concept on an interactive keyboard and hear the result.",
      benefit_3_title: "AI helper in the course",
      benefit_3_text: "When you get stuck, the AI library explains topics simply and gives mini practice tasks.",
      benefit_4_title: "Short lessons, clear progress",
      benefit_4_text: "Modules, tasks and quizzes make your progress easy to track.",
      demo_title: "Interactive demo",
      demo_subtitle: "Click a topic and jump into a focused lesson.",
      how_title: "How the course works",
      how_step_1: "Pick a module and a short lesson.",
      how_step_2: "Play the topic on the keyboard and verify by ear.",
      how_step_3: "Complete a mini task and quiz.",
      how_step_4: "Ask the AI library when something is unclear.",
      modules_title: "Modules",
      empty_lesson_title: "Choose a lesson on the left",
      empty_lesson_text: "Start with the first lesson and track your progress.",
      shortcut_keyboard: "Keyboard",
      shortcut_quiz: "Quiz",
      shortcut_table: "Table",
      topic_scale: "Scales",
      topic_intervals: "Intervals",
      topic_chords: "Chords",
      keyboard_demo: "Keyboard",
      keyboard_hint: "Click a key to hear the tone.",
      feedback_title: "Feedback",
      feedback_hint: "Write what was unclear or what you would improve in the course.",
      feedback_send: "Send",
      ai_title: "AI Library",
      ai_subtitle: "Ask anything about elementary music theory.",
      ai_welcome: "Ask something like “Explain intervals simply”.",
      ai_input_ph: "Type your question...",
      ai_send: "Send",
      ai_explain_lesson: "Explain this lesson",
      ai_explain_chord: "Explain this chord",
      trust_title: "Why this works",
      trust_1: "Theory is always connected to sound and keyboard practice.",
      trust_2: "Each lesson has a concrete mini goal and task.",
      trust_3: "You learn actively, not only by reading long text blocks.",
      trust_4: "You can send feedback and the course improves continuously.",
      paper_title: "Idea paper: learn by play",
      paper_hint: "Pick a concept, drop it on paper, move cards, sketch relations and reset anytime.",
      paper_pen: "Pen",
      paper_eraser: "Eraser",
      paper_clear_ink: "Clear drawing",
      paper_new: "New paper",
      paper_trash: "Drop here to remove",
      paper_start_hint: "Start by clicking a concept above.",
      curriculum_title: "Curriculum: practical core",
      curriculum_hint: "The practical minimum repeated across top music theory courses.",
      filter_all: "All",
      filter_basics: "Basics",
      filter_harmony: "Harmony",
      filter_practice: "Practice",
      feedback_mail_hint: "Or send directly by e-mail:",
      feedback_name_ph: "Name (optional)",
      feedback_email_ph: "E-mail (optional)",
      feedback_msg_ph: "Write your message...",
      footer_rights: "© 2026 Zayagan. All rights reserved.",
      footer_terms: "Terms of use",
      back: "Back",
      basic_definition: "Basic definition",
      scale_definition:
        "A scale is defined as an ascending or descending sequence of tones arranged according to specific rules.",
      interval_definition:
        "An interval means distance when measuring a given space or time. In music, it refers to the pitch distance between two tones.",
      chord_definition:
        "A chord is a combination of at least three tones (if there are only two tones, it is a harmonic interval).",
    },
  };

  function safeLang(lang) {
    return SUPPORTED.includes(lang) ? lang : "cs";
  }

  function getInitialLang() {
    const fromStorage = localStorage.getItem(STORAGE_KEY);
    if (fromStorage) return safeLang(fromStorage);
    return safeLang(document.documentElement.lang || "cs");
  }

  function t(lang, key) {
    return dict[lang]?.[key] || dict.cs[key] || "";
  }

  function applyTranslations(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = t(lang, key);
      if (value) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const value = t(lang, key);
      if (value) el.setAttribute("placeholder", value);
    });

    const titleKey = document.body?.dataset?.i18nTitleKey;
    if (titleKey) document.title = t(lang, titleKey);

    const toggle = document.getElementById("langToggleBtn");
    if (toggle) toggle.textContent = lang === "cs" ? "EN" : "CZ";
  }

  function setLang(lang) {
    const normalized = safeLang(lang);
    localStorage.setItem(STORAGE_KEY, normalized);
    applyTranslations(normalized);
  }

  const initial = getInitialLang();
  applyTranslations(initial);

  const toggle = document.getElementById("langToggleBtn");
  if (toggle) {
    toggle.addEventListener("click", function () {
      const current = safeLang(localStorage.getItem(STORAGE_KEY) || document.documentElement.lang);
      setLang(current === "cs" ? "en" : "cs");
    });
  }
})();
