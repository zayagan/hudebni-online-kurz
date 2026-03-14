const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const OpenAI = require("openai");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const projectRoot = path.join(__dirname, "..");
const knowledgeDir = path.join(projectRoot, "knowledge");
const outputFile = path.join(projectRoot, "data", "knowledge-index.json");
const supportedExt = new Set([".txt", ".md", ".pdf"]);
const apiKey = String(process.env.OPENAI_API_KEY || "").trim();
const canUseOpenAI = Boolean(apiKey) && apiKey !== "tvuj_klic";
const openai = canUseOpenAI ? new OpenAI({ apiKey }) : null;

function walkFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(full));
      continue;
    }
    if (supportedExt.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function readTextFromFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".pdf") {
    try {
      const text = execFileSync("pdftotext", ["-layout", filePath, "-"], {
        encoding: "utf-8",
        maxBuffer: 12 * 1024 * 1024,
      });
      return text || "";
    } catch (_pdftotextError) {
      throw new Error(
        `Cannot extract text from PDF: ${path.basename(filePath)} (pdftotext failed). Install poppler: brew install poppler`
      );
    }
  }
  return fs.readFileSync(filePath, "utf-8");
}

function normalizeText(text) {
  return text
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/\u00a0/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ ]{2,}/g, " ")
    .trim();
}

function chunkText(text, source, chunkSize = 1200, overlap = 180) {
  const clean = normalizeText(text);
  if (!clean) return [];

  const paragraphs = clean.split(/\n\n+/);
  const chunks = [];
  let buffer = "";

  for (const para of paragraphs) {
    if (!para.trim()) continue;
    const candidate = buffer ? `${buffer}\n\n${para}` : para;
    if (candidate.length <= chunkSize) {
      buffer = candidate;
      continue;
    }

    if (buffer) {
      chunks.push({ source, content: buffer });
      const tail = buffer.slice(Math.max(0, buffer.length - overlap));
      buffer = `${tail}\n\n${para}`;
      if (buffer.length <= chunkSize) continue;
    } else {
      buffer = para;
    }

    while (buffer.length > chunkSize) {
      chunks.push({ source, content: buffer.slice(0, chunkSize) });
      buffer = buffer.slice(Math.max(0, chunkSize - overlap));
    }
  }

  if (buffer) chunks.push({ source, content: buffer });

  return chunks.map((chunk, i) => ({
    id: `${source}#${i + 1}`,
    source,
    content: chunk.content.trim(),
  }));
}

async function embedChunks(chunks, model = "text-embedding-3-small") {
  if (!openai) {
    throw new Error("OpenAI client is not configured");
  }
  const batchSize = 50;
  const output = [];

  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    const response = await openai.embeddings.create({
      model,
      input: batch.map((c) => c.content),
    });

    response.data.forEach((row, idx) => {
      output.push({
        ...batch[idx],
        embedding: row.embedding,
      });
    });

    console.log(`Embedded ${Math.min(i + batchSize, chunks.length)}/${chunks.length}`);
  }

  return output;
}

async function main() {
  if (!fs.existsSync(knowledgeDir)) {
    console.error(`Knowledge folder not found: ${knowledgeDir}`);
    process.exit(1);
  }

  const files = walkFiles(knowledgeDir);
  if (!files.length) {
    console.error("No files found in knowledge/. Add .txt, .md or .pdf files.");
    process.exit(1);
  }

  const allChunks = [];
  const failedFiles = [];
  for (const filePath of files) {
    const relativeSource = path.relative(projectRoot, filePath);
    try {
      const raw = await readTextFromFile(filePath);
      const chunks = chunkText(raw, relativeSource);
      console.log(`Prepared ${chunks.length} chunks from ${relativeSource}`);
      allChunks.push(...chunks);
    } catch (error) {
      console.warn(`Skipped ${relativeSource}: ${error.message}`);
      failedFiles.push(relativeSource);
    }
  }

  if (!allChunks.length) {
    console.error("No text extracted from knowledge files.");
    process.exit(1);
  }

  let chunksOut = allChunks;
  let retrievalMode = "lexical";
  let embeddingModel = null;

  if (openai) {
    try {
      chunksOut = await embedChunks(allChunks);
      retrievalMode = "embedding";
      embeddingModel = "text-embedding-3-small";
    } catch (error) {
      console.warn(`Embedding failed (${error.message}). Falling back to lexical index.`);
      chunksOut = allChunks;
      retrievalMode = "lexical";
      embeddingModel = null;
    }
  } else {
    console.log("OPENAI_API_KEY missing or placeholder. Building lexical index only.");
  }

  const index = {
    version: 2,
    createdAt: new Date().toISOString(),
    retrievalMode,
    embeddingModel,
    chunkCount: chunksOut.length,
    chunks: chunksOut,
  };

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, JSON.stringify(index));
  console.log(`Knowledge index saved to ${outputFile}`);
  if (failedFiles.length) {
    console.warn(`Finished with skipped files (${failedFiles.length}):`);
    failedFiles.forEach((file) => console.warn(`- ${file}`));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
