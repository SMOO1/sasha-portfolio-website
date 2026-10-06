import fs from "node:fs/promises";

const url = "https://script.google.com/macros/s/AKfycbzBGAC4s_EdU2qRvVuMEaCHDT6KHFeYYqw0koWPk8dO2YLsP92jg8q8nHl4PGsK-kdH/exec?view=public-streak";
const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
if (!response.ok) throw new Error(`Streak feed returned ${response.status}`);

const match = /^__dailyFocusStreak\((.*)\);?\s*$/s.exec((await response.text()).trim());
if (!match) throw new Error("Unexpected streak feed format");
const data = JSON.parse(match[1]);
if (!Array.isArray(data.calendar) || data.calendar.length !== 364 ||
    typeof data.current !== "number" || typeof data.best !== "number" ||
    typeof data.today !== "string") {
  throw new Error("Invalid streak feed data");
}

const path = new URL("../src/streak-snapshot.json", import.meta.url);
const next = { updatedAt: new Date().toISOString(), data };
await fs.writeFile(path, `${JSON.stringify(next)}\n`);
console.log(`Saved public streak for ${data.today}: ${data.current} current, ${data.best} best`);
