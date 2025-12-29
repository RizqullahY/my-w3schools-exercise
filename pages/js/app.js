const feed = document.getElementById("feed");
const loading = document.getElementById("loading");
const root = document.documentElement;

/* =========================
   RANDOM IMAGE
========================= */
const IMAGE_COUNT = 55;

function randomImage() {
  const index = Math.floor(Math.random() * IMAGE_COUNT) + 1;
  return `images/${index}.png`;
}

/* =========================
   FETCH DATA (ASYNC)
========================= */
async function loadFeed() {
  try {
    const res = await fetch("../data/achievements.json");
    const data = await res.json();

    if (!data.length) {
      loading.textContent = "No achievements yet.";
      return;
    }

    feed.innerHTML = data.map(item => `
      <div class="post">
        <img src="${randomImage()}" class="post-avatar" alt="icon">

        <div class="post-content">
          <div class="post-source">
            ${item.source || "W3Schools"}
          </div>

          <h2 class="post-title">
            ${item.title || "Untitled Achievement"}
          </h2>

          <div class="post-actions">
            <a href="${item.url}" target="_blank">View exercise</a>

            ${item.share?.x ? `
              <a href="${item.share.x}" target="_blank">Share</a>
            ` : ""}
          </div>
        </div>
      </div>
    `).join("");

    loading.classList.add("hidden");
    feed.classList.remove("hidden");

  } catch (err) {
    loading.textContent = "Failed to load data.";
  }
}

loadFeed();
