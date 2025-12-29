const fs = require("fs");
const { URL } = require("url");

const raw = fs.readFileSync("raw/urls.txt", "utf8")
  .split("\n")
  .map(l => l.trim())
  .filter(Boolean);

const results = raw.map(link => {
  const u = new URL(link);
  const target = u.searchParams.get("url");
  const text = decodeURIComponent(u.searchParams.get("text") || "");

  return {
    title: text.split("\n")[0].replace("✅", "").trim(),
    url: target,
    source: "W3Schools",
    shared_from: "X"
  };
});

fs.writeFileSync(
  "data/achievements.json",
  JSON.stringify(results, null, 2)
);

console.log(`✅ Generated ${results.length} achievements`);
