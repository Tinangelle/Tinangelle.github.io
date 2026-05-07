import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const ROOT = process.cwd();
const I18N_PATH = path.join(ROOT, "i18n.js");
const DEEPL_API_URL = process.env.DEEPL_API_URL || "https://api-free.deepl.com/v2/translate";
const DEEPL_AUTH_KEY = process.env.DEEPL_AUTH_KEY || "";

function fail(message) {
  console.error(`[sync-i18n] ${message}`);
  process.exit(1);
}

function extractStringsLiteral(fileContent) {
  const marker = "const STRINGS = ";
  const start = fileContent.indexOf(marker);
  if (start < 0) fail("未找到 `const STRINGS =`。");

  const braceStart = fileContent.indexOf("{", start);
  if (braceStart < 0) fail("未找到 STRINGS 对象起始 `{`。");

  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = braceStart; i < fileContent.length; i += 1) {
    const ch = fileContent[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === quote) {
        inString = false;
        quote = "";
      }
      continue;
    }
    if (ch === "'" || ch === '"' || ch === "`") {
      inString = true;
      quote = ch;
      continue;
    }
    if (ch === "{") depth += 1;
    if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        return {
          literal: fileContent.slice(braceStart, i + 1),
          start: braceStart,
          end: i + 1,
        };
      }
    }
  }
  fail("未正确解析 STRINGS 对象结束位置。");
}

function parseStrings(literal) {
  const script = new vm.Script(`(${literal})`);
  const result = script.runInNewContext({});
  if (!result || typeof result !== "object") fail("STRINGS 解析失败。");
  return result;
}

function isValidIdentifier(key) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);
}

function quoteString(value) {
  return JSON.stringify(value);
}

function renderObject(obj, indentLevel = 0) {
  const pad = "  ".repeat(indentLevel);
  const innerPad = "  ".repeat(indentLevel + 1);
  const entries = Object.entries(obj);
  if (entries.length === 0) return "{}";

  const lines = entries.map(([key, value]) => {
    const renderedKey = isValidIdentifier(key) ? key : quoteString(key);
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return `${innerPad}${renderedKey}: ${renderObject(value, indentLevel + 1)},`;
    }
    return `${innerPad}${renderedKey}: ${quoteString(String(value))},`;
  });
  return `{\n${lines.join("\n")}\n${pad}}`;
}

function shouldTranslate(text) {
  if (!text) return false;
  if (/^[\x00-\x7F\s]+$/.test(text)) return false;
  return true;
}

async function translateText(text, targetLang) {
  const body = new URLSearchParams();
  body.set("auth_key", DEEPL_AUTH_KEY);
  body.set("text", text);
  body.set("target_lang", targetLang);
  body.set("preserve_formatting", "1");

  const response = await fetch(DEEPL_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`DeepL 请求失败 (${response.status}): ${detail}`);
  }

  const data = await response.json();
  const out = data?.translations?.[0]?.text;
  if (!out) throw new Error("DeepL 返回内容为空。");
  return out;
}

async function buildLocaleFromZh(zhPack, existingPack, targetLang) {
  const output = { ...existingPack };
  const cache = new Map();

  for (const [key, zhTextRaw] of Object.entries(zhPack)) {
    const zhText = String(zhTextRaw ?? "");
    if (!shouldTranslate(zhText)) {
      output[key] = zhText;
      continue;
    }
    const cacheKey = `${targetLang}::${zhText}`;
    if (!cache.has(cacheKey)) {
      cache.set(cacheKey, await translateText(zhText, targetLang));
    }
    output[key] = cache.get(cacheKey);
  }

  return output;
}

async function main() {
  if (!DEEPL_AUTH_KEY) {
    fail("缺少环境变量 DEEPL_AUTH_KEY。请先在 PowerShell 中设置后再运行。");
  }

  const source = await fs.readFile(I18N_PATH, "utf8");
  const extracted = extractStringsLiteral(source);
  const strings = parseStrings(extracted.literal);

  if (!strings.zh) fail("STRINGS.zh 不存在。");
  strings.en = await buildLocaleFromZh(strings.zh, strings.en || {}, "EN-US");
  strings.fr = await buildLocaleFromZh(strings.zh, strings.fr || {}, "FR");

  const rendered = renderObject(strings, 1);
  const replaced =
    source.slice(0, extracted.start) + rendered + source.slice(extracted.end);

  await fs.writeFile(I18N_PATH, replaced, "utf8");
  console.log("[sync-i18n] 已根据 zh 自动刷新 en / fr。");
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
