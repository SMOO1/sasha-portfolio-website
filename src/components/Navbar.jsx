import React, { useState } from "react";

export default function Navbar() {
  const [showResume, setShowResume] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-mono text-accent font-medium tracking-tight text-sm">
            ∑ sasha
          </span>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="https://github.com/SMOO1" target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-light transition-colors tracking-widest uppercase">
              github
            </a>
            <a href="https://www.linkedin.com/in/sasha-muravyev-07b671317/" target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-light transition-colors tracking-widest uppercase">
              linkedin
            </a>
            <a href="mailto:sashamuravyev10@gmail.com"
              className="font-mono text-xs text-muted hover:text-light transition-colors">
              sashamuravyev10@gmail.com
            </a>
            <button
              onClick={() => setShowResume(true)}
              className="font-mono text-xs text-muted border border-border rounded px-4 py-1.5 hover:text-light hover:border-muted transition-colors tracking-widest uppercase"
            >
              resume
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden font-mono text-xs text-muted hover:text-light transition-colors"
          >
            {menuOpen ? "✕" : "≡"}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur px-6 py-4 flex flex-col gap-4">
            <a href="https://github.com/SMOO1" target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-light transition-colors tracking-widest uppercase">
              github
            </a>
            <a href="https://www.linkedin.com/in/sasha-muravyev-07b671317/" target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-light transition-colors tracking-widest uppercase">
              linkedin
            </a>
            <a href="mailto:sashamuravyev10@gmail.com"
              className="font-mono text-xs text-muted hover:text-light transition-colors">
              sashamuravyev10@gmail.com
            </a>
            <button
              onClick={() => { setShowResume(true); setMenuOpen(false); }}
              className="font-mono text-xs text-muted border border-border rounded px-4 py-1.5 hover:text-light hover:border-muted transition-colors tracking-widest uppercase w-fit"
            >
              resume
            </button>
          </div>
        )}
      </nav>

      {showResume && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setShowResume(false)}
        >
          <div
            className="bg-surface border border-border rounded-lg w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-border shrink-0">
              <span className="font-mono text-xs text-muted">// resume</span>
              <button
                onClick={() => setShowResume(false)}
                className="font-mono text-xs text-muted hover:text-light transition-colors"
              >
                ✕ close
              </button>
            </div>
            <iframe
              src="/images/Sasha-m-resume2026.pdf"
              className="w-full flex-1"
              title="Resume"
            />
          </div>
        </div>
      )}
    </>
  );
}