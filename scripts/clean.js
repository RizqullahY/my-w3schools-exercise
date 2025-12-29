const fs = require("fs");
const { URL } = require("url");

const raw = fs.readFileSync("raw/urls.txt", "utf8")
  .split("\n")
  .map(l => l.trim())
  .filter(Boolean);

const map = new Map();

for (const link of raw) {
  const u = new URL(link);

  let text = "";
  let target = null;

  // ambil text
  text =
    u.searchParams.get("text") ||
    u.searchParams.get("hashtag") ||
    "";

  text = decodeURIComponent(text);

  // ambil target URL (yang penting ini)
  target =
    u.searchParams.get("url") ||
    u.searchParams.get("link") ||
    text.match(/https?:\/\/\S+/)?.[0];

  if (!target) continue;

  // 👉 kunci dedup: target URL
  if (map.has(target)) continue;

  map.set(target, {
    title: text.split("\n")[0].replace("✅", "").trim(),
    url: target,
    source: "W3Schools",
    shared_from: new URL(link).hostname
  });
}

const results = [...map.values()];

fs.writeFileSync(
  "data/achievements.json",
  JSON.stringify(results, null, 2)
);

console.log(`✅ Generated ${results.length} achievements`);
