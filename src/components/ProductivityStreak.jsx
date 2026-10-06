import React, { useEffect, useState } from "react";
import "./ProductivityStreak.css";

const STREAK_URL = "https://script.google.com/macros/s/AKfycbzBGAC4s_EdU2qRvVuMEaCHDT6KHFeYYqw0koWPk8dO2YLsP92jg8q8nHl4PGsK-kdH/exec";
const CACHE_KEY = "daily-focus-public-streak";
const CACHE_MAX_AGE = 48 * 60 * 60 * 1000;

function validStreak(data) {
  return data && Array.isArray(data.calendar) && data.calendar.length === 364 &&
    typeof data.current === "number" && typeof data.best === "number";
}

function readCachedStreak() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    return cached && Date.now() - cached.savedAt < CACHE_MAX_AGE && validStreak(cached.data)
      ? cached.data : null;
  } catch {
    return null;
  }
}

function loadScriptStreak(onSuccess, onError) {
  const script = document.createElement("script");
  let finished = false;
  const finish = (data) => {
    if (finished) return;
    finished = true;
    clearTimeout(timeout);
    script.remove();
    delete window.__dailyFocusStreak;
    if (validStreak(data)) {
      onSuccess(data);
    } else {
      onError();
    }
  };

  window.__dailyFocusStreak = finish;
  script.src = `${STREAK_URL}?view=public-streak&v=${Date.now()}`;
  script.async = true;
  script.onerror = () => finish(null);
  const timeout = setTimeout(() => finish(null), 12000);
  document.head.appendChild(script);
  return () => {
    if (!finished) {
      finished = true;
      clearTimeout(timeout);
      script.remove();
      delete window.__dailyFocusStreak;
    }
  };
}

function loadStreak(onSuccess, onError) {
  const controller = new AbortController();
  let cancelScript = () => {};
  let cancelled = false;
  const timeout = setTimeout(() => controller.abort(), 10000);
  fetch("/api/streak", { signal: controller.signal })
    .then((response) => {
      if (!response.ok) throw new Error("Streak request failed");
      return response.json();
    })
    .then((data) => {
      if (!validStreak(data)) throw new Error("Invalid streak data");
      if (!cancelled) onSuccess(data);
    })
    .catch(() => {
      if (!cancelled) cancelScript = loadScriptStreak(onSuccess, onError);
    })
    .finally(() => clearTimeout(timeout));
  return () => { cancelled = true; clearTimeout(timeout); controller.abort(); cancelScript(); };
}

export default function ProductivityStreak() {
  const [streak, setStreak] = useState(readCachedStreak);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancel = () => {};
    let retryTimer;
    let attempts = 0;
    let active = true;
    const attempt = () => {
      cancel = loadStreak(
        (data) => {
          if (!active) return;
          setStreak(data);
          setStatus("ready");
          try { localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data })); } catch {}
        },
        () => {
          if (!active) return;
          if (++attempts < 3) {
            retryTimer = setTimeout(attempt, attempts * 2000);
          } else {
            setStatus("unavailable");
          }
        }
      );
    };
    const refresh = () => {
      cancel();
      clearTimeout(retryTimer);
      attempts = 0;
      attempt();
    };
    refresh();
    const interval = setInterval(refresh, 30 * 60 * 1000);
    return () => { active = false; clearInterval(interval); clearTimeout(retryTimer); cancel(); };
  }, []);

  const months = streak?.calendar.filter((day, index) => index % 7 === 0).map((day, index, weeks) => {
    const label = new Date(`${day.date}T12:00:00Z`).toLocaleString("en-US", { month: "short", timeZone: "UTC" });
    const previous = index ? new Date(`${weeks[index - 1].date}T12:00:00Z`).toLocaleString("en-US", { month: "short", timeZone: "UTC" }) : "";
    return label !== previous ? label : "";
  });
  const completed = streak?.calendar.filter((day) => day.completed).length || 0;

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
              <div className="streak-grid" role="img" aria-label={`${completed} completed days in the past 52 weeks`}>
                {streak.calendar.map((day) => (
                  <span
                    key={day.date}
                    className={`streak-square${day.completed ? " is-complete" : ""}${day.date > streak.today ? " is-future" : ""}`}
                    title={`${day.date}: ${day.completed ? "all goals complete" : "not complete"}`}
                  />
                ))}
              </div>
            </div>
            <p className="font-mono text-muted text-xs mt-2">{completed} complete days in the last year</p>
            {status === "unavailable" && <p className="font-mono text-muted text-xs mt-2" role="status">Showing the last loaded streak.</p>}
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
