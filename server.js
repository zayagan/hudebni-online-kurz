const express = require("express");
const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const port = Number(process.env.PORT || 8000);
const appUrl = process.env.APP_URL || `http://localhost:${port}`;
app.set("trust proxy", true);
const currency = String(process.env.STRIPE_CURRENCY || "czk").toLowerCase();
const oneTimeAmount = Number(process.env.STRIPE_AMOUNT_ONE_TIME || 200);
const subscriptionAmount = Number(process.env.STRIPE_AMOUNT_SUBSCRIPTION || 100);
const stripeAmountsAreMinor = String(process.env.STRIPE_AMOUNTS_ARE_MINOR || "false").toLowerCase() === "true";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("[stripe] Missing STRIPE_SECRET_KEY in .env");
}

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY || "sk_test_missing");
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;
const paymentsFile = path.join(__dirname, "data", "payments.json");
const knowledgeIndexFile = path.join(__dirname, "data", "knowledge-index.json");
const feedbackFile = path.join(__dirname, "data", "feedback.jsonl");

app.use("/api", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  return next();
});

function ensurePaymentsFile() {
  const dir = path.dirname(paymentsFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(paymentsFile)) fs.writeFileSync(paymentsFile, JSON.stringify({ sessions: {} }, null, 2));
}

function readPayments() {
  ensurePaymentsFile();
  const raw = fs.readFileSync(paymentsFile, "utf-8");
  return JSON.parse(raw);
}

function writePayments(data) {
  fs.writeFileSync(paymentsFile, JSON.stringify(data, null, 2));
}

function savePaidSession(sessionId, plan) {
  const store = readPayments();
  store.sessions[sessionId] = {
    paid: true,
    plan,
    updatedAt: new Date().toISOString(),
  };
  writePayments(store);
}

function getPaidSession(sessionId) {
  const store = readPayments();
  return store.sessions[sessionId] || null;
}

function appendFeedback(entry) {
  const dir = path.dirname(feedbackFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.appendFileSync(feedbackFile, `${JSON.stringify(entry)}\n`, "utf-8");
}

function readFeedbackEntries() {
  if (!fs.existsSync(feedbackFile)) return [];
  const raw = fs.readFileSync(feedbackFile, "utf-8");
  const lines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const entries = [];
  for (const line of lines) {
    try {
      entries.push(JSON.parse(line));
    } catch (_error) {
      // Skip malformed line; keep endpoint resilient.
    }
  }
  return entries;
}

function isFeedbackAdminAuthorized(req) {
  const token = String(process.env.FEEDBACK_ADMIN_TOKEN || "").trim();
  if (!token) return false;
  const sent =
    String(req.query?.key || "").trim() ||
    String(req.get("x-admin-token") || "").trim();
  return sent && sent === token;
}

function readKnowledgeIndex() {
  if (!fs.existsSync(knowledgeIndexFile)) return null;
  try {
    const raw = fs.readFileSync(knowledgeIndexFile, "utf-8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.chunks)) return null;
    return parsed;
  } catch (_error) {
    return null;
  }
}

function cosineSimilarity(a, b) {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i += 1) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

function tokenizeText(value) {
  const normalized = String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return normalized
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 2);
}

function lexicalScore(query, content) {
  const queryTokens = tokenizeText(query);
  if (!queryTokens.length) return 0;
  const contentTokens = tokenizeText(content);
  if (!contentTokens.length) return 0;
  let hits = 0;
  for (const token of queryTokens) {
    const matched = contentTokens.some((ct) => {
      if (ct === token) return true;
      if (token.length >= 4 && ct.startsWith(token)) return true;
      if (ct.length >= 4 && token.startsWith(ct)) return true;
      return false;
    });
    if (matched) hits += 1;
  }
  return hits / queryTokens.length;
}

function isLikelyTableOfContents(text) {
  const value = String(text || "").toLowerCase();
  const dotLeaders = (value.match(/\.{3,}/g) || []).length;
  const manySectionNumbers = (value.match(/\b\d+\.\d+\b/g) || []).length;
  const hasObsah = value.includes("obsah");
  return (hasObsah && dotLeaders >= 2) || manySectionNumbers >= 10;
}

const LOCAL_THEORY_SNIPPETS = [
  {
    keys: ["stupnice", "dur", "moll"],
    title: "Stupnice",
    text: "Stupnice je intervalový vzorec. Dur: celý-celý-půl-celý-celý-celý-půl. Nejdřív si vzorec zahraj v C, pak ho přenes do jiné tóniny.",
    task: "Mini úkol: zahraj C dur a G dur a řekni nahlas intervalový vzorec.",
  },
  {
    keys: ["interval", "tercie", "kvinta", "sekunda"],
    title: "Intervaly",
    text: "Interval je vzdálenost mezi dvěma tóny. V praxi ti intervaly určují barvu akordu i melodie.",
    task: "Mini úkol: zahraj čistou kvintu od C (C-G) a pak malou tercii od C (C-Eb).",
  },
  {
    keys: ["akord", "trojzvuk", "kvintakord", "dur", "moll", "zvětšen", "zmenšen"],
    title: "Akordy",
    text: "Trojzvuk stavíš jako 1-3-5. Dur má velkou tercii, moll malou tercii, zvětšený má zvýšenou kvintu a zmenšený sníženou kvintu.",
    task: "Mini úkol: porovnej C dur, C moll, C augmented a C diminished na klaviatuře.",
  },
  {
    keys: ["obrat", "sextakord", "kvartsextakord", "bas"],
    title: "Obraty",
    text: "Obrat mění spodní tón akordu, ale ne jeho identitu. Základní tvar = kořen v basu, 1. obrat = tercie, 2. obrat = kvinta.",
    task: "Mini úkol: přepni u C dur základní tvar -> 1. obrat -> 2. obrat a sleduj spodní tón.",
  },
];

function buildLocalTheoryAnswer(message, context = {}) {
  const normalized = String(message || "").toLowerCase();
  const hit = LOCAL_THEORY_SNIPPETS.find((item) => item.keys.some((k) => normalized.includes(k)));
  const snippet = hit || LOCAL_THEORY_SNIPPETS[0];
  const chordPart = context.root && context.chordType
    ? `Aktuálně máš zvolený akord: ${context.root} ${context.chordType}${context.inversion ? ` (${context.inversion})` : ""}. `
    : "";
  const lessonPart = context.lessonTitle ? `Kontekst lekce: ${context.lessonTitle}. ` : "";
  return `${lessonPart}${chordPart}${snippet.text}\n\nPříklad: ${snippet.title} v praxi vždy zkoušej na klaviatuře po malých krocích.\n\n${snippet.task}`;
}

function buildKnowledgeOnlyAnswer(message, retrieved, context = {}) {
  const uniqueSources = Array.from(new Set((retrieved || []).map((item) => item.source))).slice(0, 3);
  const bestChunks = (retrieved || []).slice(0, 2).map((item) => item.content).filter(Boolean);
  if (!bestChunks.length) {
    return {
      text: buildLocalTheoryAnswer(message, context),
      sources: ["local-theory-library"],
      usedKnowledge: false,
      mode: "local_fallback",
    };
  }

  const compact = bestChunks
    .map((text) => text.replace(/\s+/g, " ").trim().slice(0, 520))
    .join("\n\n");

  return {
    text:
      `Na základě tvých podkladů v kurzu:\n\n${compact}\n\n` +
      "Pokud chceš, napiš navazující otázku a rozložím to krok po kroku s mini cvičením.",
    sources: uniqueSources.length ? uniqueSources : ["knowledge-index"],
    usedKnowledge: true,
    mode: "knowledge_lexical",
  };
}

async function retrieveKnowledge(query, topK = 6) {
  const index = readKnowledgeIndex();
  if (!index || !index.chunks.length) return [];

  const mode = String(index.retrievalMode || "").toLowerCase();

  if (mode === "lexical" || !index.chunks.some((chunk) => Array.isArray(chunk.embedding))) {
    return index.chunks
      .filter((chunk) => !isLikelyTableOfContents(chunk.content))
      .map((chunk) => ({
        ...chunk,
        score: lexicalScore(query, chunk.content),
      }))
      .filter((chunk) => chunk.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }

  if (!openai) {
    return [];
  }

  const embeddingResponse = await openai.embeddings.create({
    model: index.embeddingModel || "text-embedding-3-small",
    input: query,
  });
  const queryEmbedding = embeddingResponse.data[0]?.embedding;
  if (!queryEmbedding) return [];

  const ranked = index.chunks
    .filter((chunk) => Array.isArray(chunk.embedding))
    .map((chunk) => ({
      ...chunk,
      score: cosineSimilarity(queryEmbedding, chunk.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return ranked;
}

function getPlanConfig(plan) {
  if (plan === "subscription") {
    return {
      priceId: process.env.STRIPE_PRICE_SUBSCRIPTION,
      mode: "subscription",
      plan: "subscription",
      amount: subscriptionAmount,
      productName: "Hudebni kurz - mesicni predplatne",
    };
  }
  return {
    priceId: process.env.STRIPE_PRICE_ONE_TIME,
    mode: "payment",
    plan: "one_time",
    amount: oneTimeAmount,
    productName: "Hudebni kurz - jednorazovy pristup",
  };
}

const ZERO_DECIMAL_CURRENCIES = new Set([
  "bif",
  "clp",
  "djf",
  "gnf",
  "jpy",
  "kmf",
  "krw",
  "mga",
  "pyg",
  "rwf",
  "ugx",
  "vnd",
  "vuv",
  "xaf",
  "xof",
  "xpf",
]);

function toStripeMinorUnits(amountMajor) {
  if (stripeAmountsAreMinor) return Math.round(amountMajor);
  const factor = ZERO_DECIMAL_CURRENCIES.has(currency) ? 1 : 100;
  return Math.round(amountMajor * factor);
}

function buildLineItem(config) {
  if (config.priceId) {
    return { price: config.priceId, quantity: 1 };
  }

  if (!Number.isFinite(config.amount) || config.amount <= 0) {
    throw new Error(`Invalid amount for ${config.plan}`);
  }

  const priceData = {
    currency,
    unit_amount: toStripeMinorUnits(config.amount),
    product_data: {
      name: config.productName,
    },
  };

  if (config.mode === "subscription") {
    priceData.recurring = { interval: "month" };
  }

  return {
    price_data: priceData,
    quantity: 1,
  };
}

app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const signature = req.headers["stripe-signature"];
    const secret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!secret) {
      return res.status(500).json({ error: "Missing STRIPE_WEBHOOK_SECRET" });
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, signature, secret);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const plan = session.metadata?.plan || (session.mode === "subscription" ? "subscription" : "one_time");
      savePaidSession(session.id, plan);
    }

    return res.json({ received: true });
  }
);

app.post("/api/create-checkout-session", express.json(), async (req, res) => {
  const planInput = req.body?.plan;
  const config = getPlanConfig(planInput);

  try {
    const baseUrl = process.env.APP_URL || `${req.protocol}://${req.get("host")}`;
    const lineItem = buildLineItem(config);
    const session = await stripe.checkout.sessions.create({
      mode: config.mode,
      line_items: [lineItem],
      success_url: `${baseUrl}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?checkout=cancel`,
      metadata: {
        plan: config.plan,
      },
      allow_promotion_codes: true,
    });

    return res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/api/checkout-status", async (req, res) => {
  const sessionId = String(req.query.session_id || "").trim();
  if (!sessionId) {
    return res.status(400).json({ error: "session_id is required" });
  }

  const local = getPaidSession(sessionId);
  if (local?.paid) {
    return res.json({ paid: true, plan: local.plan });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === "paid" || session.status === "complete";
    const plan = session.metadata?.plan || (session.mode === "subscription" ? "subscription" : "one_time");

    if (paid) {
      savePaidSession(sessionId, plan);
    }

    return res.json({ paid, plan: paid ? plan : null });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/chat", express.json(), async (req, res) => {
  try {
    const { message, root, chordType, inversion, lessonTitle } = req.body || {};
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const retrieved = await retrieveKnowledge(message.trim(), 6);

    if (!openai) {
      return res.json(buildKnowledgeOnlyAnswer(message.trim(), retrieved, { root, chordType, inversion, lessonTitle }));
    }

    const systemPrompt = `
Jsi AI lektor hudební teorie pro online kurz.
Vysvětluj česky, prakticky a strukturovaně:

1) Krátké vysvětlení
2) Konkrétní příklad
3) Mini úkol pro studenta

Pokud je zadaný kontext akordu nebo tóniny, využij ho.
Neodkazuj na interní pravidla.
`;

    const contextLines = [];
    if (root) contextLines.push(`Kořen: ${root}`);
    if (chordType) contextLines.push(`Typ akordu: ${chordType}`);
    if (inversion) contextLines.push(`Obrat: ${inversion}`);
    const relevantContext = retrieved
      .filter((item) => item.score >= 0.18)
      .map((item, idx) => `Zdroj ${idx + 1} (${item.source}):\n${item.content}`)
      .join("\n\n");

    const effectiveSystemPrompt = relevantContext
      ? `${systemPrompt}\n\nPoužívej primárně následující podklady z kurzu. Pokud odpověď v podkladech není, řekni to otevřeně.\n`
      : `${systemPrompt}\n\nPokud nemáš podklady z kurzu, odpověz obecně, ale stručně.`;

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        { role: "system", content: effectiveSystemPrompt },
        ...(contextLines.length
          ? [{ role: "user", content: `Kontext z aplikace:\n${contextLines.join("\n")}` }]
          : []),
        ...(relevantContext ? [{ role: "user", content: `Podklady z kurzu:\n\n${relevantContext}` }] : []),
        { role: "user", content: message.trim() },
      ],
    });

    const sources = Array.from(new Set(retrieved.map((item) => item.source))).slice(0, 5);

    return res.json({
      text: response.output_text || "Nemám odpověď, zkus prosím dotaz upřesnit.",
      sources,
      usedKnowledge: Boolean(relevantContext),
    });
  } catch (error) {
    const fallbackCodes = new Set(["insufficient_quota", "invalid_api_key"]);
    if (fallbackCodes.has(error?.code) || error?.status === 429 || error?.status === 401) {
      const { message, root, chordType, inversion, lessonTitle } = req.body || {};
      const retrieved = await retrieveKnowledge(String(message || ""), 6);
      return res.json(buildKnowledgeOnlyAnswer(String(message || ""), retrieved, { root, chordType, inversion, lessonTitle }));
    }
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/feedback", express.json(), (req, res) => {
  const name = String(req.body?.name || "").trim();
  const email = String(req.body?.email || "").trim();
  const message = String(req.body?.message || "").trim();
  const page = String(req.body?.page || "").trim() || "unknown";
  const score = Number(req.body?.score || 0);

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  if (message.length < 2) {
    return res.status(400).json({ error: "Message is too short" });
  }
  if (message.length > 4000) {
    return res.status(400).json({ error: "Message is too long" });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  if (score && (!Number.isFinite(score) || score < 1 || score > 5)) {
    return res.status(400).json({ error: "Score must be 1-5" });
  }

  const id = `fb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const entry = {
    id,
    createdAt: new Date().toISOString(),
    name: name || null,
    email: email || null,
    message,
    page,
    score: score || null,
    userAgent: req.get("user-agent") || null,
  };

  appendFeedback(entry);
  return res.json({ ok: true, id });
});

app.get("/api/feedback/list", (req, res) => {
  if (!process.env.FEEDBACK_ADMIN_TOKEN) {
    return res.status(503).json({ error: "FEEDBACK_ADMIN_TOKEN is not configured" });
  }
  if (!isFeedbackAdminAuthorized(req)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const limitRaw = Number(req.query.limit || 100);
  const limit = Number.isFinite(limitRaw) ? Math.max(1, Math.min(500, Math.round(limitRaw))) : 100;
  const entries = readFeedbackEntries()
    .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))
    .slice(0, limit);

  return res.json({
    ok: true,
    count: entries.length,
    entries,
  });
});

app.get("/api/knowledge-status", (_req, res) => {
  const index = readKnowledgeIndex();
  if (!index) {
    return res.json({
      ready: false,
      chunkCount: 0,
      message: "Knowledge index not found. Run npm run build:knowledge.",
    });
  }
  return res.json({
    ready: true,
    chunkCount: index.chunkCount || index.chunks.length,
    embeddingModel: index.embeddingModel || "text-embedding-3-small",
    createdAt: index.createdAt || null,
  });
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`[app] running at ${appUrl}`);
});
