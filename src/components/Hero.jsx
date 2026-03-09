import React from "react";
import ProjectCarousel from "./Projects";



export default function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center math-grid overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(124,106,247,0.12),transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 pt-32 pb-16 w-full flex items-center min-h-screen">
        <div className="flex flex-col lg:flex-row lg:items-center gap-16 w-full">

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
            <p className="font-mono text-muted text-sm mb-4 max-w-lg leading-relaxed">
              Math student{" "}
              <span className="text-green-500">@uWaterloo</span>.{" "}
              I'm interested in{" "}
              <span className="text-accent">machine learning</span> and{" "}
              <span className="text-accent">full stack development</span>.
              I also like mac and cheese.
            </p>

            {/* Favourite languages */}
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs text-muted">favourite languages:</span>
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                alt="Python"
                className="w-8 h-8"
                title="Python"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
                alt="Java"
                className="w-8 h-8"
                title="Java"
              />
            </div>

            {/* Currently learning */}
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-xs text-muted">currently learning:</span>
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg"
                alt="Spring Boot"
                className="w-8 h-8"
                title="Spring Boot"
              />
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