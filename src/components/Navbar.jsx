import React, { useState } from "react";

export default function Navbar() {
  const [showResume, setShowResume] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-mono text-accent font-medium tracking-tight text-sm">
            ∑ sasha.dev
          </span>
          <div className="flex items-center gap-6">
            <a
              href="mailto:sasha@example.com"
              className="font-mono text-xs text-muted hover:text-light transition-colors tracking-widest uppercase"
            >
              email
            </a>
            <button
              onClick={() => setShowResume(true)}
              className="font-mono text-xs text-muted border border-border rounded px-4 py-1.5 hover:text-light hover:border-muted transition-colors tracking-widest uppercase"
            >
              resume
            </button>
          </div>
        </div>
      </nav>

      {/* Resume modal */}
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
              src="/resume.pdf"
              className="w-full flex-1"
              title="Resume"
            />
          </div>
        </div>
      )}
    </>
  );
}