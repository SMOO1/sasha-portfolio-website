const STREAK_URL = "https://script.google.com/macros/s/AKfycbzBGAC4s_EdU2qRvVuMEaCHDT6KHFeYYqw0koWPk8dO2YLsP92jg8q8nHl4PGsK-kdH/exec?view=public-streak";

module.exports = async function streak(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end();
  }

  try {
    const response = await fetch(STREAK_URL, { signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("Streak source unavailable");
    const body = await response.text();
    const match = /^__dailyFocusStreak\((.*)\);?\s*$/s.exec(body.trim());
    if (!match) throw new Error("Unexpected streak response");
    const data = JSON.parse(match[1]);
    if (!Array.isArray(data.calendar) || data.calendar.length !== 364 ||
        typeof data.current !== "number" || typeof data.best !== "number") {
      throw new Error("Invalid streak response");
    }
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=1800");
    return res.status(200).json(data);
  } catch {
    return res.status(503).json({ error: "Streak temporarily unavailable" });
  }
};
