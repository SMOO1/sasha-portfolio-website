import React, { useState } from "react";

const PROJECTS = [
  {
    label: "// current project",
    labelColor: "text-accent-2",
    title: "Proof Assistant CLI",
    desc: "A command-line tool for checking simple propositional logic proofs and generating truth tables automatically.",
    tags: ["TypeScript", "Logic", "CLI"],
    eq: "p → q ≡ ¬p ∨ q",
    image: null, // replace with image path e.g. "/images/proof-cli.png"
    link: "#",
  },
  {
    label: "// featured project",
    labelColor: "text-accent",
    title: "Graph Theory Visualizer",
    desc: "Interactive tool to visualize graph algorithms — BFS, DFS, Dijkstra, and more. Built to help students build intuition.",
    tags: ["React", "D3.js", "Algorithms"],
    eq: "G = (V, E)",
    image: null, // replace with image path e.g. "/images/graph-viz.png"
    link: "#",
  },
];

export default function ProjectCarousel() {
  const [index, setIndex] = useState(0);
  const project = PROJECTS[index];

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Dot indicators */}
      <div className="flex gap-2 mb-1">
        {PROJECTS.map((p, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`font-mono text-xs tracking-widest transition-colors ${
              i === index ? p.labelColor : "text-border hover:text-muted"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Card */}
      <a
        href={project.link}
        className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-all duration-300 block"
      >
        {/* Image area */}
        <div className="w-full h-40 bg-bg border-b border-border overflow-hidden">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-mono text-xs text-border">// image coming soon</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-light font-medium group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <span className="font-mono text-xs text-border group-hover:text-accent/50 transition-colors ml-2 shrink-0">
              ↗
            </span>
          </div>
          <div className="font-mono text-xs text-accent bg-bg border border-border rounded px-3 py-1.5 mb-4 inline-block">
            {project.eq}
          </div>
          <p className="text-muted text-sm leading-relaxed mb-4">{project.desc}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs text-muted border border-border rounded px-2 py-0.5 group-hover:border-accent/30 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>

      {/* Prev / Next */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={() => setIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length)}
          className="font-mono text-xs text-muted border border-border rounded px-3 py-1 hover:text-light hover:border-muted transition-colors"
        >
          ← prev
        </button>
        <button
          onClick={() => setIndex((i) => (i + 1) % PROJECTS.length)}
          className="font-mono text-xs text-muted border border-border rounded px-3 py-1 hover:text-light hover:border-muted transition-colors"
        >
          next →
        </button>
      </div>
    </div>
  );
}