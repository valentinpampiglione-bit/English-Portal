# English progress portal — setup guide

This is written for zero coding experience. Follow it top to bottom, in order.
It has two parts: **Part A** (the Google Sheet — this is what you'll actually
touch day to day) and **Part B** (putting the website online, done once).

---

## Part A — Create your Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank sheet.
2. Rename it something like "English Portal Data".
3. At the bottom, you'll see one tab called "Sheet1". You need **4 tabs total**.
   Right-click a tab → Duplicate, or click the `+` button, to create them.
   Rename the 4 tabs exactly: `Students`, `Progress`, `Tasks`, `Materials`.

Set up each tab with these exact column headers in row 1:

**Students**
| Name | Level |
|---|---|
| Sofía Gómez | B1 |
| Lucas Fernández | A2 |

**Progress** (numbers 0–100 only, one row per student)
| Name | Speaking | Listening | Grammar | Vocabulary |
|---|---|---|---|---|
| Sofía Gómez | 70 | 60 | 55 | 82 |

**Tasks** (one row per task; Status must be exactly `Done` or `Pending`)
| Name | Task | DueDate | Status |
|---|---|---|---|
| Sofía Gómez | Past simple worksheet | Jul 20 | Done |
| Sofía Gómez | Record 1-min self intro video | Jul 22 | Pending |

**Materials** (use `All` in Name for something every student should see)
| Name | Title | Link |
|---|---|---|
| All | Unit 4 grammar guide (PDF) | https://drive.google.com/... |
| Sofía Gómez | Listening practice: podcast episode | https://... |

> Tip for links: upload the file to Google Drive, right-click → Share → "Anyone
> with the link", then paste that link into the Link column.

### Publish each tab so the website can read it

You do this **once per tab** (4 times total):

1. Open the tab (e.g. `Students`).
2. File → Share → **Publish to web**.
3. In the dropdown, select the specific sheet (`Students`) — not "Entire document".
4. Choose format **Comma-separated values (.csv)**.
5. Click **Publish**, confirm.
6. Copy the link it gives you.

Repeat for `Progress`, `Tasks`, and `Materials`.

You'll end up with 4 links. Paste them into `config.js` (see Part B, step 5).

**From now on, updating a student's progress or adding a task just means
editing a cell in this Sheet. The website updates automatically — no file
editing, no code, ever.**

---

## Part B — Put the website online (GitHub Pages)

This part takes about 15 minutes and you only do it once.

1. Go to [github.com](https://github.com) and create a free account.
2. Click the `+` icon (top right) → **New repository**.
3. Name it e.g. `english-portal`. Keep it **Public**. Click **Create repository**.
4. On the new repo page, click **uploading an existing file**.
5. Before uploading, edit `config.js` to add your 4 links from Part A:

   a. Find `config.js` in the folder of files I gave you.

   b. Open it in a plain text editor — **do not double-click it**, since that
      may try to open it in a browser. Instead:
      - **Windows:** right-click `config.js` → Open with → Notepad.
      - **Mac:** right-click `config.js` → Open With → TextEdit.

   c. You'll see something like this:
      ```
      const SHEET_URLS = {
        students: "PASTE_STUDENTS_SHEET_CSV_LINK_HERE",
        progress: "PASTE_PROGRESS_SHEET_CSV_LINK_HERE",
        tasks: "PASTE_TASKS_SHEET_CSV_LINK_HERE",
        materials: "PASTE_MATERIALS_SHEET_CSV_LINK_HERE",
      };
      ```

   d. For each line, select **only the placeholder text** between the
      quotes (e.g. `PASTE_STUDENTS_SHEET_CSV_LINK_HERE`) and delete it,
      then paste the matching link you copied when you published that tab
      in Part A. Leave the quotation marks `"..."` in place — your link
      goes *inside* them. Do this for all 4 lines: `students`, `progress`,
      `tasks`, `materials`.

   e. Double-check each line still ends with a comma `,` (except the last
      one, `materials`, which doesn't need one) and every link is wrapped
      in quotes. It should now look like:
      ```
      const SHEET_URLS = {
        students: "https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv",
        progress: "https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv",
        tasks: "https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv",
        materials: "https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv",
      };
      ```

   f. Save the file (**Ctrl+S** on Windows, **Cmd+S** on Mac). If TextEdit
      asks about format, choose "Don't change" / keep it as plain text —
      do not save as `.rtf`.
6. Drag all 5 files (`index.html`, `style.css`, `script.js`, `config.js`,
   `README.md`) into the GitHub upload page. Click **Commit changes**.
7. Go to the repo's **Settings** tab → **Pages** (left sidebar).
8. Under "Branch", select `main` and `/ (root)`, click **Save**.
9. Wait ~1 minute, refresh — GitHub shows your live link, something like:
   `https://yourusername.github.io/english-portal/`

Share that link with your students. That's the whole portal.

---

## Updating things later

- **New score, new task, new material** → edit the Google Sheet. Done.
- **New student** → add a row in the `Students` tab (and matching rows in
  `Progress`). They'll appear in the dropdown automatically.
- **Change how it looks** (colors, layout) → that's the one thing that needs
  a code edit, in `style.css`. Happy to help with that any time.
