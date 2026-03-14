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
      go_modules: "Přejít na moduly",
      shortcut_keyboard: "Klaviatura",
      shortcut_quiz: "Kvíz",
      shortcut_table: "Tabulka",
      topic_scale: "Stupnice",
      topic_intervals: "Intervaly",
      topic_chords: "Akordy",
      keyboard_demo: "Klaviatura",
      keyboard_hint: "Klikni na klávesu a uslyšíš tón.",
      feedback_title: "Připomínky a zlepšení",
      feedback_hint: "Napiš, co bylo nejasné nebo co bys chtěl v kurzu zlepšit.",
      feedback_send: "Odeslat připomínku",
      feedback_mail_hint: "Nebo napiš přímo na e-mail:",
      feedback_name_ph: "Jméno (volitelné)",
      feedback_email_ph: "E-mail (volitelné)",
      feedback_msg_ph: "Tvoje připomínka...",
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
      go_modules: "Go to modules",
      shortcut_keyboard: "Keyboard",
      shortcut_quiz: "Quiz",
      shortcut_table: "Table",
      topic_scale: "Scales",
      topic_intervals: "Intervals",
      topic_chords: "Chords",
      keyboard_demo: "Keyboard",
      keyboard_hint: "Click a key to hear the tone.",
      feedback_title: "Feedback and improvements",
      feedback_hint: "Write what was unclear or what you would improve in the course.",
      feedback_send: "Send feedback",
      feedback_mail_hint: "Or send directly by e-mail:",
      feedback_name_ph: "Name (optional)",
      feedback_email_ph: "E-mail (optional)",
      feedback_msg_ph: "Your feedback...",
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
