// ─────────────────────────────────────────────────────────────
// SETUP: paste your 4 published Google Sheet CSV links below.
// You only do this once. After that, everything updates
// automatically whenever you edit the Google Sheet.
// See README.md for step-by-step instructions.
// ─────────────────────────────────────────────────────────────

const SHEET_URLS = {
  students: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTrDtsuNVA3UiCANsrXHRK0o7kwGl0vJwm3hgVZh8ZQ0Q5uBMRWFpNthgqzuhgmysspkUnVeiMcZ8VU/pub?gid=0&single=true&output=csv",
  progress: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTrDtsuNVA3UiCANsrXHRK0o7kwGl0vJwm3hgVZh8ZQ0Q5uBMRWFpNthgqzuhgmysspkUnVeiMcZ8VU/pub?gid=2001851899&single=true&output=csv",
  tasks: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTrDtsuNVA3UiCANsrXHRK0o7kwGl0vJwm3hgVZh8ZQ0Q5uBMRWFpNthgqzuhgmysspkUnVeiMcZ8VU/pub?gid=798672785&single=true&output=csv",
  materials: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTrDtsuNVA3UiCANsrXHRK0o7kwGl0vJwm3hgVZh8ZQ0Q5uBMRWFpNthgqzuhgmysspkUnVeiMcZ8VU/pub?gid=1137609035&single=true&output=csv",
};

// Skill categories shown as progress bars.
// Must match column names in your Progress sheet exactly.
const SKILLS = ["Speaking", "Listening", "Grammar", "Vocabulary"];
