import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-mono text-accent font-medium tracking-tight text-sm">
          ∑ sasha.dev
        </span>
        <div className="flex items-center gap-6">
          <a
            href="mailto:sashamuravyev10@gmail.com"
            className="font-mono text-xs text-muted hover:text-light transition-colors"
          >
            sashamuravyev10@gmail.com
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted border border-border rounded px-4 py-1.5 hover:text-light hover:border-muted transition-colors tracking-widest uppercase"
          >
            resume
          </a>
        </div>
      </div>
    </nav>
  );
}