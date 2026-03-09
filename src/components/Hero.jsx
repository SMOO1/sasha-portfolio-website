import React from "react";

export default function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center math-grid overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(124,106,247,0.12),transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="animate-slide-up">
          <p className="font-mono text-accent text-xs tracking-widest uppercase mb-4">
            // hello world
          </p>
          <h1 className="text-5xl md:text-7xl font-light text-light leading-tight mb-2">
            Sasha
          </h1>
          <h1 className="text-5xl md:text-7xl font-light text-light leading-tight mb-6">
            Muravyev
          </h1>

          <p className="font-mono text-muted text-sm mb-10 max-w-lg leading-relaxed">
            Math student &amp; developer. I find beauty in proofs and elegance
            in clean code. Somewhere between{" "}
            <span className="text-accent-2">abstract algebra</span> and{" "}
            <span className="text-accent">full-stack development</span>.
          </p>

          <div className="flex gap-4">
            <a
              href="#projects"
              className="font-mono text-xs bg-accent text-white px-5 py-2.5 rounded hover:bg-accent/80 transition-colors"
            >
              view projects →
            </a>
            <a
              href="#contact"
              className="font-mono text-xs border border-border text-muted px-5 py-2.5 rounded hover:text-light hover:border-muted transition-colors"
            >
              get in touch
            </a>
          </div>
        </div>

        {/* Floating math symbols */}
        <div className="absolute right-10 top-1/3 hidden lg:block select-none pointer-events-none">
          <div className="text-border font-mono text-7xl opacity-40 leading-none">
            <div>∫</div>
            <div className="text-5xl mt-2">∑</div>
            <div className="text-4xl mt-2">∂</div>
          </div>
        </div>
      </div>
    </section>
  );
}