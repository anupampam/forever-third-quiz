// ═══════════════════════════════════════════════════════════════════
// Forever Third — Google Apps Script
// Receives POST requests from the quiz and writes scores to a Sheet.
//
// SETUP:
//   1. Go to https://script.google.com → New Project
//   2. Paste this entire file
//   3. Click "Deploy" → "New deployment" → Web App
//      · Execute as: Me
//      · Who has access: Anyone
//   4. Copy the deployment URL
//   5. In index.html, replace YOUR_GOOGLE_APPS_SCRIPT_URL_HERE with that URL
// ═══════════════════════════════════════════════════════════════════

const SHEET_NAME = "Scores";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create sheet with header if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["Timestamp", "Name", "Score", "Total", "Percentage", "Difficulty", "Date (IST)"]);
      sheet.getRange(1, 1, 1, 7).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      data.name || "Anonymous",
      data.score || 0,
      data.total || 0,
      (data.pct || 0) + "%",
      data.diff || "Unknown",
      data.date || new Date().toLocaleString(),
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run this manually to verify the sheet writes correctly
function testPost() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        name: "Test Player",
        score: 8,
        total: 10,
        pct: 80,
        diff: "The Regular",
        date: new Date().toLocaleString(),
      }),
    },
  };
  const result = doPost(fakeEvent);
  Logger.log(result.getContent());
}
