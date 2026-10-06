import React, { useEffect, useState } from "react";
import "./ProductivityStreak.css";

const STREAK_URL = "https://script.google.com/macros/s/AKfycbzBGAC4s_EdU2qRvVuMEaCHDT6KHFeYYqw0koWPk8dO2YLsP92jg8q8nHl4PGsK-kdH/exec";

function loadStreak(onSuccess, onError) {
  if (!STREAK_URL) {
    onError();
    return () => {};
  }

  const script = document.createElement("script");
  let finished = false;
  const finish = (data) => {
    if (finished) return;
    finished = true;
    clearTimeout(timeout);
    script.remove();
    delete window.__dailyFocusStreak;
    if (data && Array.isArray(data.calendar) && data.calendar.length === 364) {
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

export default function ProductivityStreak() {
  const [streak, setStreak] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancel = () => {};
    const refresh = () => {
      cancel();
      cancel = loadStreak(
        (data) => { setStreak(data); setStatus("ready"); },
        () => setStatus("unavailable")
      );
    };
    refresh();
    const interval = setInterval(refresh, 30 * 60 * 1000);
    return () => { clearInterval(interval); cancel(); };
  }, []);

  const months = streak?.calendar.filter((day, index) => index % 7 === 0).map((day, index, weeks) => {
    const label = new Date(`${day.date}T12:00:00Z`).toLocaleString("en-US", { month: "short", timeZone: "UTC" });
    const previous = index ? new Date(`${weeks[index - 1].date}T12:00:00Z`).toLocaleString("en-US", { month: "short", timeZone: "UTC" }) : "";
    return label !== previous ? label : "";
  });
  const completed = streak?.calendar.filter((day) => day.completed).length || 0;

  return (
    <section id="streak" className="max-w-5xl mx-auto px-6 pb-24">
      <div className="streak-panel">
        <div className="streak-topline">
          <div>
            <p className="font-mono text-accent-2 text-xs tracking-widest uppercase mb-3">// daily focus</p>
            <h2 className="text-2xl md:text-3xl font-light text-light">Productivity streak</h2>
            <p className="font-mono text-muted text-xs mt-3 leading-relaxed">A green square means I finished every goal that day.</p>
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
            <p className="font-mono text-muted text-xs mt-4">{completed} complete days in the last year</p>
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
