# Forever Third — Pub Quiz Screening Tool

A web-based screening quiz for prospective members of the **Forever Third** KQA pub quiz team.

## Files

| File | Purpose |
|---|---|
| `index.html` | The full quiz — open this in a browser |
| `questions.json` | 100 MCQ questions from Mahaquizzer & MindSweep |
| `appscript.js` | Google Apps Script for saving scores to Google Sheets |
| `README.md` | This file |

---

## Quick Start (local)

Just open `index.html` in any browser. That's it. Scores save to your browser's local storage.

---

## Deploy to the Web (GitHub + Netlify)

This setup means you push question updates to GitHub → they go live automatically on the same URL.

### Step 1: Create a GitHub repo

1. Go to [github.com/new](https://github.com/new)
2. Name it `forever-third-quiz` (or anything)
3. Set to **Public**
4. Click **Create repository**

### Step 2: Push these files

```bash
cd /path/to/this/folder
git init
git add .
git commit -m "Initial quiz"
git remote add origin https://github.com/YOUR_USERNAME/forever-third-quiz.git
git push -u origin main
```

### Step 3: Connect to Netlify

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**
2. Connect your GitHub account → select the repo
3. Build settings: leave everything blank (it's a static site)
4. Click **Deploy site**
5. Netlify gives you a URL like `https://forever-third-quiz.netlify.app`

**To update questions:** edit `questions.json`, commit, push. Netlify auto-deploys within ~30 seconds.

---

## Set Up Google Sheets Score Saving

### Step 1: Create the Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click **New Project**
3. Delete the empty function and paste the contents of `appscript.js`
4. Click the save icon (Ctrl+S) — name it "Forever Third Scores"

### Step 2: Deploy as a Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon next to "Type" → select **Web app**
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. Authorise when prompted (it needs access to your Google Sheets)
6. **Copy the deployment URL** — it looks like `https://script.google.com/macros/s/AKfycb.../exec`

### Step 3: Wire it into the quiz

Open `index.html`, find this line near the top of the `<script>` block:

```js
const GOOGLE_SHEET_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
```

Replace with your deployment URL:

```js
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycb.../exec";
```

Commit and push — scores now save to a Google Sheet called **"Scores"** in your Google Drive.

### Step 4: Test it

Run the `testPost()` function in the Apps Script editor (select it in the dropdown, click Run). Check your Google Sheet for a row with "Test Player".

---

## Adding More Questions

Edit `questions.json`. Each question follows this schema:

```json
{
  "id": "unique_id",
  "source": "mahaquizzer_2025",
  "year": 2025,
  "category": "General Knowledge",
  "difficulty": 2,
  "question": "Your question text here?",
  "answer": "The answer",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctOption": 2,
  "win": ["Correct! The QM's impressed.", "Right you are!"],
  "lose": ["Nope! The answer was X. Have a sip."]
}
```

- `difficulty`: `1` = Pint Newbie, `2` = The Regular, `3` = Local Legend
- `correctOption`: 0-based index into `options`
- `win`: array of messages shown on correct answer (one is picked randomly)
- `lose`: array of messages shown on wrong answer (one is picked randomly)

---

## Quiz Rules Summary

| Level | Questions | Time per question |
|---|---|---|
| Pint Newbie | 10 | 60 seconds |
| The Regular | 15 | 40 seconds |
| Local Legend | 20 | 25 seconds |

- Questions shuffle every attempt
- No answers are revealed on retry
- Score saves to local browser history and optionally to Google Sheets
- Adaptive nudge appears if score drops below 40% after question 5

---

## Future Roadmap

- [ ] **Prep mode** — open-ended answers with fuzzy matching
- [ ] **Live quiz hosting** — QM screen + contestant screens
- [ ] **Team leaderboard** — public scoreboard page
- [ ] **Themed quizzes** — Sport only, India only, etc.
- [ ] **Category filtering** — let users pick preferred categories
