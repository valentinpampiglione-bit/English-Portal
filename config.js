// ─────────────────────────────────────────────────────────────
// SETUP: paste your 4 published Google Sheet CSV links below.
// You only do this once. After that, everything updates
// automatically whenever you edit the Google Sheet.
// See README.md for step-by-step instructions.
// ─────────────────────────────────────────────────────────────

const SHEET_URLS = {
  students: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTrDtsuNVA3UiCANsrXHRK0o7kwGl0vJwm3hgVZh8ZQ0Q5uBMRWFpNthgqzuhgmysspkUnVeiMcZ8VU/pub?gid=0&single=true&output=csv",
  vocabulary: "PASTE_YOUR_VOCABULARY_SHEET_CSV_LINK_HERE",
  tasks: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTrDtsuNVA3UiCANsrXHRK0o7kwGl0vJwm3hgVZh8ZQ0Q5uBMRWFpNthgqzuhgmysspkUnVeiMcZ8VU/pub?gid=798672785&single=true&output=csv",
  materials: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTrDtsuNVA3UiCANsrXHRK0o7kwGl0vJwm3hgVZh8ZQ0Q5uBMRWFpNthgqzuhgmysspkUnVeiMcZ8VU/pub?gid=1137609035&single=true&output=csv",
};

// Folder that holds your vocabulary images inside the GitHub repo.
// Images must live at: <VOCAB_IMAGE_BASE>/<Folder>/<Image>
// e.g. vocabulary-images/Animals/dog.jpg
// See VOCABULARY-SETUP.md for full instructions.
const VOCAB_IMAGE_BASE = "vocabulary-images";
