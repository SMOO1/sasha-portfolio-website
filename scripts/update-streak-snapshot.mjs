import fs from "node:fs/promises";
import { execFileSync } from "node:child_process";

const url = `https://script.google.com/macros/s/AKfycbzBGAC4s_EdU2qRvVuMEaCHDT6KHFeYYqw0koWPk8dO2YLsP92jg8q8nHl4PGsK-kdH/exec?view=public-streak&v=${Date.now()}`;
const body = execFileSync("curl", [
  "--fail", "--silent", "--show-error", "--location",
  "--connect-timeout", "10", "--max-time", "30",
  "--retry", "4", "--retry-all-errors", "--retry-delay", "3", url,
], {
  encoding: "utf8",
  maxBuffer: 1024 * 1024,
});

const match = /^__dailyFocusStreak\((.*)\);?\s*$/s.exec(body.trim());
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
