const statusEl = document.getElementById("status");
const portalEl = document.getElementById("portal");
const selectEl = document.getElementById("student-select");

let data = { students: [], vocabulary: [], tasks: [], materials: [] };

function fetchCsv(url) {
  // Append a changing parameter so the browser (and Google's CDN) never
  // serve a cached/stale copy of the sheet — always fetch the latest data.
  const bustCacheUrl = url + (url.includes("?") ? "&" : "?") + "_ts=" + Date.now();

  return new Promise((resolve, reject) => {
    Papa.parse(bustCacheUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      transform: (v) => (typeof v === "string" ? v.trim() : v),
      complete: (results) => resolve(results.data),
      error: reject,
    });
  });
}

function norm(str) {
  return (str || "").toString().trim().toLowerCase();
}

async function loadAll() {
  const urls = SHEET_URLS;
  const placeholders = Object.values(urls).some((u) => u.includes("PASTE_"));
  if (placeholders) {
    statusEl.textContent = "Setup needed: add your Google Sheet links in config.js (see README.md).";
    statusEl.classList.add("error");
    return;
  }

  statusEl.textContent = "Loading...";
  try {
    const [students, vocabulary, tasks, materials] = await Promise.all([
      fetchCsv(urls.students),
      fetchCsv(urls.vocabulary),
      fetchCsv(urls.tasks),
      fetchCsv(urls.materials),
    ]);
    data = { students, vocabulary, tasks, materials };
    populateStudentSelect();
    statusEl.textContent = "";
  } catch (err) {
    statusEl.textContent = "Couldn't load data. Check your Google Sheet links are published correctly.";
    statusEl.classList.add("error");
    console.error(err);
  }
}

function populateStudentSelect() {
  const names = data.students.map((s) => s.Name).filter(Boolean);
  selectEl.innerHTML = names.map((n) => `<option value="${n}">${n}</option>`).join("");
  if (names.length) {
    renderStudent(names[0]);
  } else {
    statusEl.textContent = "No students found. Add rows to your Students sheet.";
  }
}

selectEl.addEventListener("change", (e) => renderStudent(e.target.value));

function renderStudent(name) {
  const student = data.students.find((s) => norm(s.Name) === norm(name));
  if (!student) return;

  portalEl.classList.remove("hidden");
  document.getElementById("student-name").textContent = student.Name;
  document.getElementById("student-level-label").textContent = `Level ${student.Level || "—"}`;
  document.getElementById("stamp-level").textContent = student.Level || "—";

  renderVocabulary(name);
  renderTasks(name);
  renderMaterials(name);
}

// ── Vocabulary (folders of images) ─────────────────────────────

function vocabImageUrl(folder, image) {
  return `${VOCAB_IMAGE_BASE}/${encodeURIComponent(folder)}/${encodeURIComponent(image)}`;
}

function renderVocabulary(name) {
  const rows = data.vocabulary.filter(
    (v) => norm(v.Name) === norm(name) || norm(v.Name) === "all"
  );
  const container = document.getElementById("vocab-folders");

  if (!rows.length) {
    container.innerHTML = `<div class="empty-note">No vocabulary yet.</div>`;
    return;
  }

  // Group rows into folders, in first-seen order.
  const folders = new Map();
  rows.forEach((r) => {
    const folderName = (r.Folder || "Untitled").trim();
    if (!r.Image) return;
    if (!folders.has(folderName)) folders.set(folderName, []);
    folders.get(folderName).push(vocabImageUrl(folderName, r.Image.trim()));
  });

  if (!folders.size) {
    container.innerHTML = `<div class="empty-note">No vocabulary yet.</div>`;
    return;
  }

  container.innerHTML = Array.from(folders.entries())
    .map(([folderName, images]) => {
      const cover = images[0];
      const count = images.length;
      return `
        <button type="button" class="vocab-folder" data-folder="${folderName}">
          <span class="vocab-folder-cover" style="background-image:url('${cover}')">
            <span class="vocab-folder-count">${count} ${count === 1 ? "card" : "cards"}</span>
          </span>
          <span class="vocab-folder-name">${folderName}</span>
        </button>
      `;
    })
    .join("");

  container.querySelectorAll(".vocab-folder").forEach((btn) => {
    btn.addEventListener("click", () => {
      openLightbox(folders.get(btn.dataset.folder), btn.dataset.folder);
    });
  });
}

// ── Lightbox ────────────────────────────────────────────────────

const lightboxEl = document.getElementById("lightbox");
const lightboxImgEl = document.getElementById("lightbox-img");
const lightboxCaptionEl = document.getElementById("lightbox-caption");
let lightboxImages = [];
let lightboxFolderName = "";
let lightboxIndex = 0;

function openLightbox(images, folderName) {
  lightboxImages = images;
  lightboxFolderName = folderName;
  lightboxIndex = 0;
  showLightboxImage();
  lightboxEl.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightboxEl.classList.add("hidden");
  document.body.style.overflow = "";
}

function showLightboxImage() {
  lightboxImgEl.src = lightboxImages[lightboxIndex];
  lightboxCaptionEl.textContent = `${lightboxFolderName} — ${lightboxIndex + 1} / ${lightboxImages.length}`;
}

function lightboxNext() {
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  showLightboxImage();
}

function lightboxPrev() {
  lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  showLightboxImage();
}

document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
document.getElementById("lightbox-next").addEventListener("click", lightboxNext);
document.getElementById("lightbox-prev").addEventListener("click", lightboxPrev);
lightboxEl.addEventListener("click", (e) => {
  if (e.target === lightboxEl) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (lightboxEl.classList.contains("hidden")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") lightboxNext();
  if (e.key === "ArrowLeft") lightboxPrev();
});

function renderTasks(name) {
  const rows = data.tasks.filter((t) => norm(t.Name) === norm(name));
  const container = document.getElementById("tasks-list");
  if (!rows.length) {
    container.innerHTML = `<div class="empty-note">No tasks yet.</div>`;
    return;
  }
  container.innerHTML = rows
    .map((t) => {
      const isDone = norm(t.Status) === "done";
      const icon = isDone
        ? `<svg class="task-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`
        : `<svg class="task-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>`;
      return `
        <div class="task-row ${isDone ? "done" : ""}">
          ${icon}
          <span class="task-title">${t.Task || ""}</span>
          <span class="task-due">${isDone ? "Done" : (t.DueDate || "")}</span>
        </div>
      `;
    })
    .join("");
}

function renderMaterials(name) {
  const rows = data.materials.filter(
    (m) => norm(m.Name) === norm(name) || norm(m.Name) === "all"
  );
  const container = document.getElementById("materials-list");
  if (!rows.length) {
    container.innerHTML = `<div class="empty-note">No materials yet.</div>`;
    return;
  }
  container.innerHTML = rows
    .map(
      (m) => `
      <div class="material-row">
        <svg class="material-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
        <a href="${m.Link || "#"}" target="_blank" rel="noopener" class="material-title">${m.Title || m.Link || "Material"}</a>
      </div>
    `
    )
    .join("");
}

loadAll();
