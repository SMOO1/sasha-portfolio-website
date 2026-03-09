import React from "react";
import ProjectCarousel from "./Projects";

const SOCIALS = [
  { label: "github", href: "https://github.com/sashamuravyev", icon: "⌥" },
  { label: "linkedin", href: "https://linkedin.com/in/sashamuravyev", icon: "⌘" },
];

export default function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center math-grid overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(124,106,247,0.12),transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center gap-16">

          {/* Left — bio */}
          <div className="animate-slide-up flex-1">
            <p className="font-mono text-accent text-xs tracking-widest uppercase mb-4">
              // hello world
            </p>
            <h1 className="text-5xl md:text-7xl font-light text-light leading-tight mb-2">
              Sasha
            </h1>
            <h1 className="text-5xl md:text-7xl font-light text-light leading-tight mb-6">
              Muravyev
            </h1>
            <p className="font-mono text-muted text-sm mb-8 max-w-lg leading-relaxed">
              Math student{" "}
              <span className="text-green-500">@uWaterloo</span>.{" "}
              I'm interested in{" "}
              <span className="text-">machine learning</span> and{" "}
              <span className="text-violet-400">full stack development</span>.
              I also like mac and cheese.
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-xs text-muted border border-border rounded px-4 py-2 hover:text-light hover:border-muted transition-colors"
                >
                  <span>{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — project carousel */}
          <div className="flex-1 max-w-md w-full">
            <ProjectCarousel />
          </div>

        </div>
      </div>
    </section>
  );
}