const feed = document.getElementById("feed");
const loading = document.getElementById("loading");
const toggle = document.getElementById("themeToggle");
const root = document.documentElement;

/* =========================
   THEME HANDLER
========================= */
function setTheme(theme) {
  if (theme === "dark") {
    root.classList.add("dark");
    toggle.textContent = "☀️";
  } else {
    root.classList.remove("dark");
    toggle.textContent = "🌙";
  }
  localStorage.setItem("theme", theme);
}

// init theme
setTheme(localStorage.getItem("theme") || "light");

toggle.addEventListener("click", () => {
  const next = root.classList.contains("dark") ? "light" : "dark";
  setTheme(next);
});

/* =========================
   FETCH DATA
========================= */
fetch("../data/achievements.json")
  .then(res => res.json())
  .then(data => {
    if (!data.length) {
      loading.textContent = "No achievements yet.";
      return;
    }

    feed.innerHTML = data.map(item => `
      <div class="post">
        <div class="text-sm text-gray-500 mb-1">
          ${item.source || "W3Schools"}
        </div>

        <h2 class="font-medium text-base mb-2">
          ${item.title || "Untitled Achievement"}
        </h2>

        <div class="flex justify-between text-sm">
          <a href="${item.url}" target="_blank">
            View exercise
          </a>

          ${item.share?.x ? `
            <a href="${item.share.x}" target="_blank" class="text-gray-400">
              Share
            </a>
          ` : ""}
        </div>
      </div>
    `).join("");

    loading.classList.add("hidden");
    feed.classList.remove("hidden");
  })
  .catch(() => {
    loading.textContent = "Failed to load data.";
  });
