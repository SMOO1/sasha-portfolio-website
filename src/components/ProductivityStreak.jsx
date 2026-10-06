import React, { useEffect, useState } from "react";
import "./ProductivityStreak.css";
import snapshot from "../streak-snapshot.json";

const SNAPSHOT_URL = "https://raw.githubusercontent.com/SMOO1/sasha-portfolio-website/main/src/streak-snapshot.json";

function validStreak(data) {
  return data && Array.isArray(data.calendar) && data.calendar.length === 364 &&
    typeof data.current === "number" && typeof data.best === "number";
}

function loadStreak(onSuccess, onError) {
  const controller = new AbortController();
  let cancelled = false;
  const timeout = setTimeout(() => controller.abort(), 4000);
  fetch(`${SNAPSHOT_URL}?v=${Date.now()}`, { signal: controller.signal })
    .then((response) => {
      if (!response.ok) throw new Error("Snapshot unavailable");
      return response.json();
    })
    .then((latest) => {
      const updatedAt = Date.parse(latest.updatedAt);
      if (!validStreak(latest.data) || !Number.isFinite(updatedAt)) throw new Error("Invalid snapshot");
      if (!cancelled) onSuccess(latest.data, updatedAt);
    })
    .catch(() => {
      if (!cancelled) onError();
    })
    .finally(() => clearTimeout(timeout));
  return () => { cancelled = true; clearTimeout(timeout); controller.abort(); };
}

export default function ProductivityStreak() {
  const [{ streak, updatedAt }, setStreak] = useState(() => ({
    streak: snapshot.data,
    updatedAt: Date.parse(snapshot.updatedAt),
  }));
  const [status, setStatus] = useState("ready");

  useEffect(() => {
    let cancel = () => {};
    let active = true;
    const refresh = () => {
      cancel();
      cancel = loadStreak(
        (data, remoteUpdatedAt) => {
          if (!active) return;
          setStreak((current) => remoteUpdatedAt > current.updatedAt
            ? { streak: data, updatedAt: remoteUpdatedAt }
            : current);
          setStatus("ready");
        },
        () => {
          if (!active) return;
          setStatus("offline");
        }
      );
    };
    refresh();
    const interval = setInterval(refresh, 30 * 60 * 1000);
    return () => { active = false; clearInterval(interval); cancel(); };
  }, []);

  const months = streak?.calendar.filter((day, index) => index % 7 === 0).map((day, index, weeks) => {
    const label = new Date(`${day.date}T12:00:00Z`).toLocaleString("en-US", { month: "short", timeZone: "UTC" });
    const previous = index ? new Date(`${weeks[index - 1].date}T12:00:00Z`).toLocaleString("en-US", { month: "short", timeZone: "UTC" }) : "";
    return label !== previous ? label : "";
  });
  const completed = streak?.calendar.filter((day) => day.completed).length || 0;
  const firstCompletedDate = streak?.calendar.find((day) => day.completed)?.date;

  return (
    <section id="streak" className="streak-section">
      <div className="streak-panel">
        <div className="streak-topline">
          <div>
            <p className="font-mono text-accent-2 text-xs tracking-widest uppercase mb-2">// daily focus</p>
            <h2 className="text-2xl md:text-3xl font-light text-light">Productivity streak</h2>
            <p className="font-mono text-muted text-xs mt-2 leading-relaxed">A green square means I finished every goal that day.</p>
          </div>
          {streak && (
            <div className="streak-stats" aria-label={`${streak.current} day current streak, ${streak.best} day best streak`}>
              <div><strong>{streak.current}</strong><span>current streak</span></div>
              <div><strong>{streak.best}</strong><span>best streak</span></div>
            </div>
          )}
        </div>

        {streak ? (
          <>
            <div className="streak-scroll">
              <div className="streak-months" aria-hidden="true">
                {months.map((month, index) => <span key={index}>{month}</span>)}
              </div>
              <div className="streak-grid" role="img" aria-label={`${completed} completed days in the past 52 weeks${firstCompletedDate ? `. Started tracking goals on ${firstCompletedDate}` : ""}`}>
                {streak.calendar.map((day) => (
                  <span
                    key={day.date}
                    className={`streak-square${day.completed ? " is-complete" : ""}${day.date > streak.today ? " is-future" : ""}${day.date === firstCompletedDate ? " is-first-complete" : ""}`}
                    title={`${day.date}: ${day.date === firstCompletedDate ? "started tracking goals; " : ""}${day.completed ? "all goals complete" : "not complete"}`}
                  />
                ))}
              </div>
            </div>
            <div className="streak-footer font-mono text-muted text-xs mt-2">
              <span>{completed} complete days <span className="streak-year-label">in the last year</span></span>
              {firstCompletedDate && <span className="streak-start-key"><span className="streak-start-swatch" aria-hidden="true" />Started tracking goals</span>}
            </div>
            {status === "offline" && Date.now() - updatedAt > 24 * 60 * 60 * 1000 &&
              <p className="font-mono text-muted text-xs mt-2" role="status">Showing the last synced streak from {new Date(updatedAt).toLocaleDateString()}.</p>}
          </>
        ) : (
          <p className="font-mono text-muted text-xs mt-8" role="status">
            {status === "loading" ? "Loading streak…" : "Streak is temporarily unavailable."}
          </p>
        )}
      </div>
    </section>
  );
}
